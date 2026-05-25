import { Game } from './game.js'
import { Panel, Message, ComputerMessage, QuestionMessage } from './frame.js'
import { Div, Select, Option as Option, Span } from './html.js'
import { Level } from './level-base.js'
import { Locale } from './locale.js'
import { Picker } from './picker.js'

export class Main {
    private readonly locale: Locale
    private readonly levels: ReturnType<Game['levels']>

    constructor(locale: Locale, picker: Picker, storage: Storage) {
        this.locale = locale
        const game = new Game(locale, picker, storage)
        this.levels = game.levels()
    }

    public start(): void {
        this.showWelcomeMessage()
        this.showAboutPanel()
        this.continue()
    }

    private continue(): void {
        this.showLevelOverviewPanel()
        this.showInvitationMessage()
        this.showNextLevel()
    }

    private play(level: Level): void {
        Message.hideAllButLast()
        Panel.removeAll()
        level.play(() => this.continue())
    }

    private showWelcomeMessage(): void {
        new ComputerMessage([this.locale.welcome()]).show()
    }

    private showAboutPanel(): void {
        const options = this.locale.languages().map(language => {
            const isCurrentLanguage = language === this.locale.language
            const optionText = isCurrentLanguage ? this.locale.switchLanguage() : this.locale.switchToLanguage(language)
            return new Option(language, optionText).setSelected(isCurrentLanguage)
        })
        const select = new Select().appendChildren(options).onChange(language => {
            const url = new URL(window.location.href)
            url.searchParams.set('language', language)
            window.location.href = url.toString()
        })
        new Panel('unittestgame', this.locale.unitTestGameTitle(), [this.locale.slogan(), this.locale.links(), select]).show()
    }

    private showInvitationMessage(): void {
        new ComputerMessage([this.locale.invitation()]).show()
    }

    private showLevelOverviewPanel(): void {
        const nextLevel = this.levels.find(level => !level.isFinished())!
        const cells = this.levels.map(level => {
            const emoji = level.emoji(nextLevel)
            const state = level === nextLevel || level.isFinished() ? 'unlocked' : 'locked'
            return new Span().addClass('cell').addClass(state).appendChildren([
                new Span().addClass('number').appendText(Locale.bless(`${level.levelNumber}`)),
                new Span().addClass('emoji').appendText(Locale.bless(emoji))
            ])
        })
        const div = new Div().addClass('level-board').appendChildren(cells)
        new Panel('level-overview', this.locale.levelOverviewTitle(), [div]).show()
    }

    private showNextLevel(): void {
        const nextLevel = this.levels.find(level => !level.isFinished())
        if (nextLevel)
            new QuestionMessage(this.locale.nextLevelButton(nextLevel.description()), () => this.play(nextLevel)).show()
        else
            new QuestionMessage(this.locale.allLevels(), () => this.quit()).show()
    }

    private quit(): void {
        new ComputerMessage([this.locale.closeTab()]).show()
    }
}
