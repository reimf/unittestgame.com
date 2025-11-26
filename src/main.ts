import { Config } from './config.js'
import { Panel, ComputerMessage, QuestionMessage } from './frame.js'
import { Div, Span, Paragraph } from './html.js'
import { Level } from './level-base.js'

export class Main {
    private readonly lng = (new URL(window.location.href)).searchParams.get('lng') || navigator.language.split('-')[0]
    private readonly config = new Config(this.lng)
    private readonly locale = this.config.locale
    private readonly levels: Level[] = this.config.allLevels()

    public start(): void {
        this.showWelcomeMessage()
        this.showAboutPanel()
        this.showBasicDefinitionTestDrivenDevelopment()
        this.showBasicDefinitionMutationTesting()
        this.continue()
    }

    private continue(): void {
        this.showLevelOverviewPanel()
        this.showInvitationMessage()
        this.showNextLevel()
    }

    private play(level: Level): void {
        Panel.removeAll()
        level.play(() => this.continue())
    }

    public showBasicDefinitionTestDrivenDevelopment(): void {
        new Panel('test-driven-development', this.locale.testDrivenDevelopment(), [this.locale.definitionTDD()]).show()
    }

    public showBasicDefinitionMutationTesting(): void {
        new Panel('mutation-testing', this.locale.mutationTesting(), [this.locale.definitionMT()]).show()
    }

    private showWelcomeMessage(): void {
        new ComputerMessage([this.locale.welcomeToUnittestgame()]).add()
        new ComputerMessage([this.locale.iAmAnAiBot()]).add()
    }

    private showAboutPanel(): void {
        new Panel('unittestgame', this.locale.about(), [this.locale.learnToWriteEffectiveUnitTests()]).show()
    }

    private showInvitationMessage(): void {
        new ComputerMessage([this.locale.whatDoYouWantToDo()]).add()
    }

    private showLevelOverviewPanel(): void {
        const nextLevel = this.levels.find(level => !level.isFinished())
        const cells = this.levels.map(level => {
            const emoji = level.emoji(nextLevel)
            const state = level === nextLevel || level.isFinished() ? 'unlocked' : 'locked'
            return new Span().addClass('cell').addClass(state).appendChildren([
                new Span().addClass('number').appendText(`${level.levelNumber}`),
                new Span().addClass('emoji').appendText(emoji)
            ])
        })
        const div = new Div().addClass('level-board').appendChildren(cells)
        const paragraph = new Paragraph().appendChild(div)
        new Panel('level-overview', this.locale.levelOverview(), [paragraph]).show()
    }

    private showNextLevel(): void {
        const nextLevel = this.levels.find(level => !level.isFinished())
        if (nextLevel)
            new QuestionMessage(this.locale.iWantToPlayTheNextLevel(nextLevel.description()), () => this.play(nextLevel)).add()
        else
            new QuestionMessage(this.locale.iPlayedAllTheLevels(), () => this.quit()).add()
    }

    private quit(): void {
        new ComputerMessage([this.locale.wellDoneYouCanCloseThisTab()]).add()
    }
}
