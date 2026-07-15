import { Game } from './game.js'
import { Store } from './store.js'
import { Panel, Message, ComputerMessage, QuestionMessage } from './frame.js'
import { Div, Label, Option, Select, Span } from './html.js'
import { AnyLevel } from './level-base.js'
import { ConversationLanguage } from './conversation-language-base.js'
import { conversationLanguages } from './conversation-languages.js'
import { Picker } from './picker.js'
import { ProgrammingLanguage } from './programming-language-base.js'
import { programmingLanguages } from './programming-languages.js'

export class Main {
    private readonly conversationLanguage: ConversationLanguage
    private readonly programmingLanguage: ProgrammingLanguage
    private readonly levels: ReturnType<Game['levels']>

    constructor(conversationLanguage: ConversationLanguage, programmingLanguage: ProgrammingLanguage, picker: Picker, store: Store) {
        this.conversationLanguage = conversationLanguage
        this.programmingLanguage = programmingLanguage
        const game = new Game(conversationLanguage, programmingLanguage, picker, store)
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
        new ComputerMessage([this.conversationLanguage.welcome()]).show()
    }

    private switchTo(parameterName: string, parameterValue: string): void {
        const url = new URL(window.location.href)
        url.searchParams.set(parameterName, parameterValue)
        window.location.href = url.toString()
    }

    private languageSwitcher(): Label {
        const select = new Select(id => this.switchTo('language', id)).setId('language-switcher')
        const options = conversationLanguages.map(conversationLanguage => new Option(conversationLanguage.id, ConversationLanguage.bless(conversationLanguage.name), conversationLanguage.id === this.conversationLanguage.id))
        select.appendChildren(options)
        return new Label().appendText(this.conversationLanguage.changeLanguage()).appendChild(new Span().appendChild(select))
    }

    private programmingLanguageSwitcher(): Label {
        const select = new Select(id => this.switchTo('programming_language', id)).setId('programming-language-switcher')
        const options = programmingLanguages.map(programmingLanguage => new Option(programmingLanguage.id, ConversationLanguage.bless(programmingLanguage.name), programmingLanguage.id === this.programmingLanguage.id))
        select.appendChildren(options)
        return new Label().appendText(this.conversationLanguage.changeProgrammingLanguage()).appendChild(new Span().appendChild(select))
    }

    private switchers(): Div {
        return new Div().addClass('switchers').appendChildren([this.languageSwitcher(), this.programmingLanguageSwitcher()])
    }

    private showAboutPanel(): void {
        const content = [this.conversationLanguage.slogan(), this.conversationLanguage.links()]
        new Panel('unittestgame', this.conversationLanguage.unitTestGameTitle(), content).show()
    }

    private showSettingsPanel(): void {
        new Panel('settings', this.conversationLanguage.settingsTitle(), [this.switchers()]).show()
    }

    private showInvitationMessage(): void {
        new ComputerMessage([this.conversationLanguage.invitation()]).show()
    }

    private showLevelOverviewPanel(): void {
        const nextLevel = this.levels.find(level => !level.isFinished())
        const cells = this.levels.map(level => {
            const emoji = level.emoji(nextLevel)
            const state = level === nextLevel || level.isFinished() ? 'unlocked' : 'locked'
            return new Span().addClass('cell').addClass(state).appendChildren([
                new Span().addClass('number').appendText(ConversationLanguage.bless(`${level.levelNumber}`)),
                new Span().addClass('emoji').appendText(ConversationLanguage.bless(emoji))
            ])
        })
        const div = new Div().addClass('level-board').appendChildren(cells)
        new Panel('level-overview', this.conversationLanguage.levelOverviewTitle(), [div]).show()
    }

    private showNextLevel(): void {
        const nextLevel = this.levels.find(level => !level.isFinished())
        if (nextLevel)
            new QuestionMessage(this.conversationLanguage.nextLevelButton(nextLevel.description()), () => this.play(nextLevel)).show()
        else
            new QuestionMessage(this.conversationLanguage.allLevels(), () => this.quit()).show()
    }

    private quit(): void {
        new ComputerMessage([this.conversationLanguage.closeTab()]).show()
    }
}
