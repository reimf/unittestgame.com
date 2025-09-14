import { Panel, ComputerMessage, QuestionMessage } from './frame.js'
import { Div } from './html.js'
import { Level } from './level-base.js'
import { MutationTesting } from './level-mutation-testing.js'
import { TestDrivenDevelopment } from './level-test-driven-development.js'
import { Locale } from './locale.js'
import { Translation } from './translation.js'
import { BatteryLevel } from './use-case-battery-level.js'
import { EvenOdd } from './use-case-even-odd.js'
import { FizzBuzz } from './use-case-fizz-buzz.js'
import { FloatFormat } from './use-case-float-format.js'
import { LeapYear } from './use-case-leap-year.js'
import { PasswordStrength } from './use-case-password-strength.js'
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
    private readonly triangleType = new TriangleType(this.locale)
    private readonly leapYear = new LeapYear(this.locale)
    private readonly floatFormat = new FloatFormat(this.locale)
    private readonly passwordStrength = new PasswordStrength(this.locale)
    private readonly speedDisplay = new SpeedDisplay(this.locale)
    private readonly exampleTestDrivenDevelopment = new TestDrivenDevelopment(this.locale, this.batteryLevel)
    private readonly exampleMutationTesting = new MutationTesting(this.locale, this.batteryLevel)
    private readonly examples = [
        this.exampleTestDrivenDevelopment,
        this.exampleMutationTesting
    ]
    private readonly levels: Level[] = [
        this.exampleTestDrivenDevelopment,
        new TestDrivenDevelopment(this.locale, this.votingAge),
        this.exampleMutationTesting,
        new MutationTesting(this.locale, this.evenOdd),
        new TestDrivenDevelopment(this.locale, this.fizzBuzz),
        new MutationTesting(this.locale, this.triangleType),
        new TestDrivenDevelopment(this.locale, this.evenOdd),
        new MutationTesting(this.locale, this.votingAge),
        new TestDrivenDevelopment(this.locale, this.triangleType),
        new MutationTesting(this.locale, this.fizzBuzz),
        new TestDrivenDevelopment(this.locale, this.leapYear),
        new MutationTesting(this.locale, this.passwordStrength),
        new TestDrivenDevelopment(this.locale, this.speedDisplay),
        new MutationTesting(this.locale, this.floatFormat),
        new TestDrivenDevelopment(this.locale, this.passwordStrength),
        new MutationTesting(this.locale, this.leapYear),
        new TestDrivenDevelopment(this.locale, this.floatFormat),
        new MutationTesting(this.locale, this.speedDisplay),
    ]

    public start(): void {
        this.showWelcomeMessage()
        this.showAboutPanel()
        for (const example of this.examples)
            example.showBasicDefinition()
        this.continue()
    }

    private continue(previousLevel?: Level): void {
        this.showFinishedLevelsPanel(previousLevel)
        this.showInvitationMessage()
        this.showNextLevel()
    }

    private play(level: Level): void {
        Panel.removeAll()
        level.play(() => this.continue(level))
    }

    private getFinishedLevels(): Level[] {
        return this.levels.filter(level => level.isFinished())
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

    private levelDescription(level: Level): Translation {
        const index = this.levels.findIndex(otherLevel => otherLevel === level)
        const emoji = ['🔓', '🥇', '🥈', '🥉'].at(level.isFinished()) || '🥉'
        return this.locale.level(index + 1, this.levels.length, level.description(), emoji)
    }

    private showFinishedLevelsPanel(previousLevel?: Level): void {
        const finishedLevels = this.getFinishedLevels()
        if (finishedLevels.length > 0) {
            new Panel('finished-levels', this.locale.finishedLevels(),
                finishedLevels.map(level =>
                    new Div().appendTranslation(this.levelDescription(level)).addClass(level === previousLevel ? 'new' : 'old')
                )
            ).show()
        }
    }

    private showNextLevel(): void {
        const nextLevel = this.levels.find(level => !level.isFinished())
        if (nextLevel)
            new QuestionMessage(this.locale.iWantToPlayTheNextLevel(this.levelDescription(nextLevel)), () => this.play(nextLevel)).add()
        else
            new QuestionMessage(this.locale.iPlayedAllTheLevels(), () => this.quit()).add()
    }

    private quit(): void {
        new ComputerMessage([this.locale.wellDoneYouCanCloseThisTab()]).add()
    }
}
