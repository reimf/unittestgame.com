import { Levels } from './levels.js'
import { Store } from './store.js'
import { Panel, Message, ComputerMessage, QuestionMessage } from './frame.js'
import { Anchor, Details, Html, ListItem, OrderedList, Button, Span, Summary, UnorderedList } from './html.js'
import { AnyLevel } from './level-base.js'
import { ConversationLanguage } from './conversation-language-base.js'
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

    private urlWith(parameterName: string, parameterValue: string): string {
        const url = new URL(window.location.href)
        url.searchParams.set(parameterName, parameterValue)
        return url.toString()
    }

    private programmingLanguageSwitcher(): Details {
        const items = programmingLanguages
            .filter(programmingLanguage => programmingLanguage.id !== this.programmingLanguage.id)
            .map(programmingLanguage => new ListItem().appendChild(
                new Anchor(this.urlWith('programming_language', programmingLanguage.id)).addClass('btn').appendText(ConversationLanguage.bless(programmingLanguage.name))
            ))
        return new Details().addClass('switcher').setId('programming-language-switcher').appendChildren([
            new Summary().appendChild(
                new Span().appendText(ConversationLanguage.bless(this.programmingLanguage.name))
            ),
            new UnorderedList().appendChildren(items)
        ])
    }

    private showAboutPanel(): void {
        const content = [this.conversationLanguage.slogan(), this.conversationLanguage.home()]
        new Panel('unittestgame', this.conversationLanguage.unitTestGameTitle(), content).show()
    }

    private showSettingsPanel(): void {
        new Panel('settings', this.conversationLanguage.settingsTitle(), [this.programmingLanguageSwitcher()]).show()
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
