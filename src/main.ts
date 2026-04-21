import { Config } from './config.js'
import { Panel, Message, ComputerMessage, QuestionMessage } from './frame.js'
import { Div, Span } from './html.js'
import { Level } from './level-base.js'

export class Main {
    private readonly lng = (new URL(window.location.href)).searchParams.get('lng') || navigator.language.split('-')[0]!
    private readonly config = new Config(this.lng)
    private readonly locale = this.config.locale
    private readonly levels = this.config.allLevels(localStorage)

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
        new Panel('unittestgame', this.locale.unitTestGameTitle(), [this.locale.slogan(), this.locale.links()]).show()
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
                new Span().addClass('number').appendText(`${level.levelNumber}`),
                new Span().addClass('emoji').appendText(emoji)
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
