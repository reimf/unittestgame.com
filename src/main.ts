import { Panel, ComputerMessage, QuestionMessage } from './frame.js'
import { OrderedList, ListItem } from './html.js'
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
        new TestDrivenDevelopment(this.locale, this.batteryLevel, 1, 20),
        new TestDrivenDevelopment(this.locale, this.votingAge, 2, 20),
        new MutationTesting(this.locale, this.batteryLevel, 3, 20),
        new MutationTesting(this.locale, this.evenOdd, 4, 20),
        new TestDrivenDevelopment(this.locale, this.fizzBuzz, 5, 20),
        new MutationTesting(this.locale, this.triangleType, 6, 20),
        new TestDrivenDevelopment(this.locale, this.review, 7, 20),
        new MutationTesting(this.locale, this.votingAge, 8, 20),
        new TestDrivenDevelopment(this.locale, this.evenOdd, 9, 20),
        new MutationTesting(this.locale, this.review, 10, 20),
        new TestDrivenDevelopment(this.locale, this.triangleType, 11, 20),
        new MutationTesting(this.locale, this.fizzBuzz, 12, 20),
        new TestDrivenDevelopment(this.locale, this.leapYear, 13, 20),
        new MutationTesting(this.locale, this.passwordStrength, 14, 20),
        new TestDrivenDevelopment(this.locale, this.speedDisplay, 15, 20),
        new MutationTesting(this.locale, this.floatFormat, 16, 20),
        new TestDrivenDevelopment(this.locale, this.passwordStrength, 17, 20),
        new MutationTesting(this.locale, this.leapYear, 18, 20),
        new TestDrivenDevelopment(this.locale, this.floatFormat, 19, 20),
        new MutationTesting(this.locale, this.speedDisplay, 20, 20),
    ]

    public start(): void {
        this.showWelcomeMessage()
        this.showAboutPanel()
        this.showBasicDefinitionTestDrivenDevelopment()
        this.showBasicDefinitionMutationTesting()
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

    public showBasicDefinitionTestDrivenDevelopment(): void {
        new Panel('test-driven-development', this.locale.testDrivenDevelopment(), [this.locale.definitionTDD()]).show()
    }

    public showBasicDefinitionMutationTesting(): void {
        new Panel('mutation-testing', this.locale.mutationTesting(), [this.locale.definitionMT()]).show()
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

    private showFinishedLevelsPanel(previousLevel?: Level): void {
        const finishedLevels = this.getFinishedLevels()
        if (finishedLevels.length > 0) {
            new Panel('finished-levels', this.locale.finishedLevels(),
                [new OrderedList().appendChildren(
                    finishedLevels.map(level =>
                        new ListItem().appendText(level.description()).addClass(level === previousLevel ? 'new' : 'old')
                    )
                )]
            ).show()
        }
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
