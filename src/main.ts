import { Panel, ComputerMessage, QuestionMessage } from './frame.js'
import { Span, Paragraph } from './html.js'
import { Level } from './level-base.js'
import { MutationTesting } from './level-mutation-testing.js'
import { TestDrivenDevelopment } from './level-test-driven-development.js'
import { Locale } from './locale.js'
import { BatteryLevel } from './use-case-battery-level.js'
import { EvenOdd } from './use-case-even-odd.js'
import { FizzBuzz } from './use-case-fizz-buzz.js'
import { FloatFormat } from './use-case-float-format.js'
import { LeapYear } from './use-case-leap-year.js'
import { PasswordStrength } from './use-case-password-strength.js'
import { Review } from './use-case-review.js'
import { SpeedDisplay } from './use-case-speed-display.js'
import { TriangleType } from './use-case-triangle-type.js'
import { VotingAge } from './use-case-voting-age.js'

export class Main {
    private readonly lng = (new URL(window.location.href)).searchParams.get('lng') || navigator.language.split('-')[0]
    private readonly locale = new Locale(this.lng)
    private readonly batteryLevel = new BatteryLevel(this.locale)
    private readonly votingAge = new VotingAge(this.locale)
    private readonly evenOdd = new EvenOdd(this.locale)
    private readonly fizzBuzz = new FizzBuzz(this.locale)
    private readonly review = new Review(this.locale)
    private readonly triangleType = new TriangleType(this.locale)
    private readonly leapYear = new LeapYear(this.locale)
    private readonly floatFormat = new FloatFormat(this.locale)
    private readonly passwordStrength = new PasswordStrength(this.locale)
    private readonly speedDisplay = new SpeedDisplay(this.locale)
    private readonly levels: Level[] = [
        new TestDrivenDevelopment(this.locale, this.batteryLevel, 1),
        new TestDrivenDevelopment(this.locale, this.votingAge, 2),
        new MutationTesting(this.locale, this.batteryLevel, 3),
        new MutationTesting(this.locale, this.evenOdd, 4),
        new TestDrivenDevelopment(this.locale, this.fizzBuzz, 5),
        new MutationTesting(this.locale, this.triangleType, 6),
        new TestDrivenDevelopment(this.locale, this.review, 7),
        new MutationTesting(this.locale, this.votingAge, 8),
        new TestDrivenDevelopment(this.locale, this.evenOdd, 9),
        new MutationTesting(this.locale, this.review, 10),
        new TestDrivenDevelopment(this.locale, this.triangleType, 11),
        new MutationTesting(this.locale, this.fizzBuzz, 12),
        new TestDrivenDevelopment(this.locale, this.leapYear, 13),
        new MutationTesting(this.locale, this.passwordStrength, 14),
        new TestDrivenDevelopment(this.locale, this.speedDisplay, 15),
        new MutationTesting(this.locale, this.floatFormat, 16),
        new TestDrivenDevelopment(this.locale, this.passwordStrength, 17),
        new MutationTesting(this.locale, this.leapYear, 18),
        new TestDrivenDevelopment(this.locale, this.floatFormat, 19),
        new MutationTesting(this.locale, this.speedDisplay, 20),
    ]

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
        const paragraph = new Paragraph().appendChildren(cells)
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
