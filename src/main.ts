import { Game } from './game.js'
import { Store } from './store.js'
import { Panel, Message, ComputerMessage, QuestionMessage } from './frame.js'
import { Anchor, Details, Div, Span, Summary, UnorderedList } from './html.js'
import { AnyLevel } from './level-base.js'
import { Language, Locale } from './locale.js'
import { Picker } from './picker.js'
import { PROGRAMMING_LANGUAGE_ID_TO_NAME, ProgrammingLanguage, ProgrammingLanguageId } from './programming-language.js'

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

    private languageLink(language: Language): Anchor {
        const url = new URL(window.location.href)
        url.searchParams.set('language', language)
        return new Anchor(url.toString()).appendText(this.locale.switchToLanguage(language))
    }

    private languageSwitcher(): Details {
        const otherLanguages = Locale.languages.filter(language => language !== this.locale.language)
        return new Details().setId('language-switcher')
            .appendChild(new Summary().appendText(this.locale.changeLanguage()))
            .appendChild(new UnorderedList(otherLanguages.map(language => this.languageLink(language))))
    }

    private programmingLanguageSwitcher(): Details {
        const otherProgrammingLanguageIds = ProgrammingLanguage.programmingLanguageIds.filter(programmingLanguageId => programmingLanguageId !== this.programmingLanguage.id)
        return new Details().setId('programming-language-switcher')
            .appendChild(new Summary().appendText(this.locale.changeProgrammingLanguage(PROGRAMMING_LANGUAGE_ID_TO_NAME.get(this.programmingLanguage.id)!)))
            .appendChild(new UnorderedList(otherProgrammingLanguageIds.map(programmingLanguageId => this.programmingLanguageLink(programmingLanguageId))))
    }

    private programmingLanguageLink(programmingLanguageId: ProgrammingLanguageId): Anchor {
        const url = new URL(window.location.href)
        url.searchParams.set('programmingLanguage', programmingLanguageId)
        return new Anchor(url.toString()).appendText(this.locale.switchToProgrammingLanguage(PROGRAMMING_LANGUAGE_ID_TO_NAME.get(programmingLanguageId)!))
    }

    private showAboutPanel(): void {
        const content = [this.locale.slogan(), this.locale.links(), this.languageSwitcher(), this.programmingLanguageSwitcher()]
        new Panel('unittestgame', this.locale.unitTestGameTitle(), content).show()
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
