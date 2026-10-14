import { Levels } from './levels.js'
import { Store } from './store.js'
import { Panel, Message, ComputerMessage, QuestionMessage } from './frame.js'
import { Anchor, Details, Html, ListItem, OrderedList, Button, Span, Summary, UnorderedList } from './html.js'
import { AnyLevel } from './level-base.js'
import { ConversationLanguage, ConversationText } from './conversation-language-base.js'
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

    private urlWith(parameterName: string, parameterValue: string): string {
        const url = new URL(window.location.href)
        url.searchParams.set(parameterName, parameterValue)
        return url.toString()
    }

    private urlInConversationLanguage(conversationLanguageId: string): string {
        const url = new URL(window.location.href)
        url.pathname = url.pathname.replace(`/${this.conversationLanguage.id}/`, `/${conversationLanguageId}/`)
        return url.toString()
    }

    private switcher(id: string, currentName: ConversationText, options: readonly Html[]): Details {
        return new Details().addClass('switcher').setId(id).appendChildren([
            new Summary().appendChild(
                new Span().appendText(currentName)
            ),
            new UnorderedList().appendChildren(options.map(option => new ListItem().appendChild(option.addClass('btn'))))
        ])
    }

    private programmingLanguageSwitcher(): Details {
        const options = programmingLanguages
            .filter(programmingLanguage => programmingLanguage.id !== this.programmingLanguage.id)
            .map(programmingLanguage => new Anchor(this.urlWith('programming_language', programmingLanguage.id)).appendText(ConversationLanguage.bless(programmingLanguage.name)))
        return this.switcher('programming-language-switcher', ConversationLanguage.bless(this.programmingLanguage.name), options)
    }

    private conversationLanguageSwitcher(): Details {
        const options = conversationLanguages
            .filter(conversationLanguage => conversationLanguage.id !== this.conversationLanguage.id)
            .map(conversationLanguage => new Anchor(this.urlInConversationLanguage(conversationLanguage.id)).appendText(ConversationLanguage.bless(conversationLanguage.name)))
        return this.switcher('conversation-language-switcher', ConversationLanguage.bless(this.conversationLanguage.name), options)
    }

    private switchTheme(theme: string): void {
        Theme.set(theme)
        Theme.apply(theme)
        this.showSettingsPanel()
    }

    private themeSwitcher(): Details {
        const themes = new Map([
            ['light-color', this.conversationLanguage.lightColorTheme()],
            ['light-grayscale', this.conversationLanguage.lightGrayscaleTheme()],
            ['dark-color', this.conversationLanguage.darkColorTheme()],
            ['dark-grayscale', this.conversationLanguage.darkGrayscaleTheme()],
        ])
        const currentTheme = Theme.get()
        const options = [...themes]
            .filter(([theme]) => theme !== currentTheme)
            .map(([theme, name]) => new Button(name, () => this.switchTheme(theme)))
        return this.switcher('theme-switcher', themes.get(currentTheme)!, options)
    }

    private showAboutPanel(): void {
        const content = [this.conversationLanguage.slogan()]
        new Panel('unittestgame', this.conversationLanguage.unitTestGameTitle(), content).show()
    }

    private showSettingsPanel(): void {
        const content = [this.conversationLanguageSwitcher(), this.programmingLanguageSwitcher(), this.themeSwitcher()]
        new Panel('settings', this.conversationLanguage.settingsTitle(), content).show()
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
                children.push(new Button(this.conversationLanguage.retryButton(), () => this.retry(level)).addClass('level-action').addClass('retry'))
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
