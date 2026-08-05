import { Levels } from './levels.js'
import { Store } from './store.js'
import { Panel, Message, ComputerMessage, QuestionMessage } from './frame.js'
import { Div, Html, Label, ListItem, Option, OrderedList, Button, Select, Span } from './html.js'
import { AnyLevel } from './level-base.js'
import { ConversationLanguage } from './conversation-language-base.js'
import { conversationLanguages } from './conversation-languages.js'
import { Picker } from './picker.js'
import { ProgrammingLanguage } from './programming-language-base.js'
import { programmingLanguages } from './programming-languages.js'

export class Main {
    private readonly conversationLanguage: ConversationLanguage
    private readonly programmingLanguage: ProgrammingLanguage
    private readonly levels: ReturnType<Levels['all']>
    private nextLevelMessage: QuestionMessage|undefined

    constructor(conversationLanguage: ConversationLanguage, programmingLanguage: ProgrammingLanguage, picker: Picker, store: Store) {
        this.conversationLanguage = conversationLanguage
        this.programmingLanguage = programmingLanguage
        const levels = new Levels(conversationLanguage, programmingLanguage, picker, store)
        this.levels = levels.all()
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

    private playNextLevel(level: AnyLevel): void {
        this.nextLevelMessage?.answer(this.conversationLanguage.nextLevelButton(level.description()))
        this.play(level)
    }

    private retry(level: AnyLevel): void {
        this.nextLevelMessage?.answer(this.conversationLanguage.retryLevelButton(level.description()))
        this.play(level)
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
        const select = new Select(id => this.switchTo('conversation_language', id)).setId('language-switcher')
        const options = conversationLanguages.map(conversationLanguage => new Option(conversationLanguage.id, ConversationLanguage.bless(conversationLanguage.name), conversationLanguage.id === this.conversationLanguage.id))
        select.appendChildren(options)
        return new Label().appendChildren([
            new Span().appendText(this.conversationLanguage.changeLanguage()),
            new Span().appendChild(select)
        ])
    }

    private programmingLanguageSwitcher(): Label {
        const select = new Select(id => this.switchTo('programming_language', id)).setId('programming-language-switcher')
        const options = programmingLanguages.map(programmingLanguage => new Option(programmingLanguage.id, ConversationLanguage.bless(programmingLanguage.name), programmingLanguage.id === this.programmingLanguage.id))
        select.appendChildren(options)
        return new Label().appendChildren([
            new Span().appendText(this.conversationLanguage.changeProgrammingLanguage()),
            new Span().appendChild(select)
        ])
    }

    private switchers(): Div {
        return new Div().addClass('switchers').appendChildren([this.languageSwitcher(), this.programmingLanguageSwitcher()])
    }

    private showAboutPanel(): void {
        const content = [this.conversationLanguage.slogan(), this.conversationLanguage.home()]
        new Panel('unittestgame', this.conversationLanguage.unitTestGameTitle(), content).show()
    }

    private showSettingsPanel(): void {
        new Panel('settings', this.conversationLanguage.settingsTitle(), [this.switchers()]).show()
    }

    private showInvitationMessage(): void {
        new ComputerMessage([this.conversationLanguage.invitation()]).show()
    }

    private showLevelOverviewPanel(): void {
        const nextLevel = this.levels.find(level => level.penalties() === -1)
        const items = this.levels.map(level => {
            const emoji = level.emoji(nextLevel)
            const state = level === nextLevel || level.penalties() !== -1 ? 'unlocked' : 'locked'
            const info = new Span().addClass('level-info').appendChildren([
                new Span().appendText(ConversationLanguage.bless(emoji)),
                new Span().appendText(ConversationLanguage.bless(level.description()))
            ])
            const children: Html[] = [info]
            if (level.penalties() !== -1)
                children.push(new Button(this.conversationLanguage.retryButton(), () => this.retry(level)).addClass('level-action'))
            else if (level === nextLevel)
                children.push(new Button(this.conversationLanguage.playButton(), () => this.playNextLevel(level)).addClass('level-action'))
            else
                children.push(new Button(this.conversationLanguage.lockedButton(), () => {}).addClass('level-action').setDisabled())
            return new ListItem().addClass(state).appendChildren(children)
        })
        const div = new OrderedList().addClass('level-board').appendChildren(items)
        new Panel('level-overview', this.conversationLanguage.levelOverviewTitle(), [div]).show()
    }

    private showNextLevel(): void {
        const nextLevel = this.levels.find(level => level.penalties() === -1)
        this.nextLevelMessage = nextLevel
            ? new QuestionMessage(this.conversationLanguage.nextLevelButton(nextLevel.description()), () => this.play(nextLevel))
            : new QuestionMessage(this.conversationLanguage.allLevels(), () => this.quit())
        this.nextLevelMessage.show()
    }

    private quit(): void {
        new ComputerMessage([this.conversationLanguage.closeTab()]).show()
    }
}
