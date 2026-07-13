import { Game } from './game.js'
import { Store } from './store.js'
import { Panel, Message, ComputerMessage, QuestionMessage } from './frame.js'
import { Div, Label, Option, Select, Span } from './html.js'
import { AnyLevel } from './level-base.js'
import { Locale } from './locale.js'
import { Picker } from './picker.js'
import { ProgrammingLanguage } from './programming-language-base.js'
import { programmingLanguages } from './programming-languages.js'

export class Main {
    private readonly locale: Locale
    private readonly programmingLanguage: ProgrammingLanguage
    private readonly levels: ReturnType<Game['levels']>

    constructor(locale: Locale, programmingLanguage: ProgrammingLanguage, picker: Picker, store: Store) {
        this.locale = locale
        this.programmingLanguage = programmingLanguage
        const game = new Game(locale, programmingLanguage, picker, store)
        this.levels = game.levels()
    }

    public start(): void {
        this.showWelcomeMessage()
        this.showAboutPanel()
        this.showSettingsPanel()
        this.continue()
    }

    private continue(): void {
        this.showLevelOverviewPanel()
        this.showInvitationMessage()
        this.showNextLevel()
    }

    private play(level: AnyLevel): void {
        Message.hideAllButLast()
        Panel.removeAll()
        level.play(() => this.continue())
    }

    private showWelcomeMessage(): void {
        new ComputerMessage([this.locale.welcome()]).show()
    }

    private switchTo(parameterName: string, parameterValue: string): void {
        const url = new URL(window.location.href)
        url.searchParams.set(parameterName, parameterValue)
        window.location.href = url.toString()
    }

    private languageSwitcher(): Label {
        const select = new Select(language => this.switchTo('language', language)).setId('language-switcher')
        const options = Locale.languages.map(language => new Option(language, Locale.languageName(language), language === this.locale.language))
        select.appendChildren(options)
        return new Label().appendText(this.locale.changeLanguage()).appendChild(new Span().appendChild(select))
    }

    private programmingLanguageSwitcher(): Label {
        const select = new Select(id => this.switchTo('programmingLanguage', id)).setId('programming-language-switcher')
        const options = programmingLanguages.map(programmingLanguage => new Option(programmingLanguage.id, Locale.bless(programmingLanguage.name), programmingLanguage.id === this.programmingLanguage.id))
        select.appendChildren(options)
        return new Label().appendText(this.locale.changeProgrammingLanguage()).appendChild(new Span().appendChild(select))
    }

    private switchers(): Div {
        return new Div().addClass('switchers').appendChildren([this.languageSwitcher(), this.programmingLanguageSwitcher()])
    }

    private showAboutPanel(): void {
        const content = [this.locale.slogan(), this.locale.links()]
        new Panel('unittestgame', this.locale.unitTestGameTitle(), content).show()
    }

    private showSettingsPanel(): void {
        new Panel('settings', this.locale.settingsTitle(), [this.switchers()]).show()
    }

    private showInvitationMessage(): void {
        new ComputerMessage([this.locale.invitation()]).show()
    }

    private showLevelOverviewPanel(): void {
        const nextLevel = this.levels.find(level => !level.isFinished())
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
