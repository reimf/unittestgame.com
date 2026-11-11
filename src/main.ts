import { Levels } from './levels.js'
import { Store } from './store.js'
import { Panel, Message, ComputerMessage, QuestionMessage } from './frame.js'
import { Anchor, Details, Html, ListItem, OrderedList, Button, Span, Summary, UnorderedList } from './html.js'
import { AnyLevel } from './level-base.js'
import { ConversationLanguage, ConversationText } from './conversation-language-base.js'
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
        this.showProgrammingLanguageSwitcher()
        this.continue()
    }

    private continue(): void {
        this.showLevelOverviewPanel()
        this.showInvitationMessage()
        this.showNextLevel()
    }

    private play(level: AnyLevel): void {
        this.showLevelProgress(level)
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

    private switcher(id: string, currentName: ConversationText, options: readonly Html[]): Details {
        return new Details().setId(id).appendChildren([
            new Summary().addClass('secondary').appendChild(
                new Span().appendText(currentName)
            ),
            new UnorderedList().appendChildren(options.map(option => new ListItem().appendChild(option.addClass('btn').addClass('secondary'))))
        ])
    }

    private programmingLanguageSwitcher(): Details {
        const options = programmingLanguages
            .filter(programmingLanguage => programmingLanguage.id !== this.programmingLanguage.id)
            .map(programmingLanguage => new Anchor(this.urlWith('programming_language', programmingLanguage.id)).appendText(ConversationLanguage.bless(programmingLanguage.name)))
        return this.switcher('programming-language-switcher', ConversationLanguage.bless(this.programmingLanguage.name), options)
    }

    private showAboutPanel(): void {
        const content = [this.conversationLanguage.slogan()]
        new Panel('unittestgame', this.conversationLanguage.unitTestGameTitle(), content).show()
    }

    // The programming language belongs to the game, so the game adds it to the settings menu in the nav.
    private showProgrammingLanguageSwitcher(): void {
        document.querySelector('#settings-menu > ul')!.appendChild(new ListItem().appendChild(this.programmingLanguageSwitcher()).getElement())
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
                children.push(new Button(this.conversationLanguage.retryButton(), () => this.retry(level)).addClass('level-action').addClass('secondary'))
            else if (level === nextLevel)
                children.push(new Button(this.conversationLanguage.playButton(), () => this.playNextLevel(level)).addClass('level-action').addClass('secondary'))
            else
                children.push(new Button(this.conversationLanguage.lockedButton(), () => {}).addClass('level-action').setDisabled())
            return new ListItem().addClass(state).appendChildren(children)
        })
        const div = new OrderedList().addClass('level-board').appendChildren(items)
        new Panel('level-overview', this.conversationLanguage.levelOverviewTitle(), [div]).show()
    }

    // The nav shows the level, and a bar with the finished levels, only while a level is played.
    private showLevelProgress(level: AnyLevel|undefined): void {
        document.getElementById('level-name')!.textContent = level ? level.name() : ''
        document.getElementById('level-progress')!.hidden = level === undefined
        document.getElementById('level-progress-label')!.textContent = level ? this.conversationLanguage.levelProgress(level.levelNumber) : ''
        const progress = document.querySelector<HTMLProgressElement>('#level-progress progress')!
        progress.max = this.levels.length
        progress.value = this.levels.filter(level => level.penalties() !== -1).length
    }

    private showNextLevel(): void {
        const nextLevel = this.levels.find(level => level.penalties() === -1)
        this.showLevelProgress(undefined)
        this.nextLevelMessage = nextLevel
            ? new QuestionMessage(this.conversationLanguage.nextLevelButton(nextLevel.description()), () => this.play(nextLevel))
            : new QuestionMessage(this.conversationLanguage.allLevels(), () => this.quit())
        this.nextLevelMessage.show()
    }

    private quit(): void {
        new ComputerMessage([this.conversationLanguage.closeTab()]).show()
    }
}
