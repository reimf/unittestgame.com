import { Completed } from './completed.js'
import { Panel, ComputerMessage, QuestionMessage } from './frame.js'
import { Div } from './html.js'
import { Level } from './level.js'
import { MutationTesting } from './level-mutation-testing.js'
import { TestDrivenDevelopment } from './level-test-driven-development.js'
import { UseCase } from './use-case.js'
import { BatteryLevel } from './use-case-battery-level.js'
import { VotingAge } from './use-case-voting-age.js'
import { EvenOdd } from './use-case-even-odd.js'
import { FizzBuzz } from './use-case-fizz-buzz.js'
import { TriangleType } from './use-case-triangle-type.js'
import { LeapYear } from './use-case-leap-year.js'
import { FloatFormat } from './use-case-float-format.js'
import { PasswordStrength } from './use-case-password-strength.js'
import { SpeedDisplay } from './use-case-speed-display.js'

export class Main {
    private readonly batteryLevel: UseCase = new BatteryLevel()
    private readonly votingAge: UseCase = new VotingAge()
    private readonly evenOdd: UseCase = new EvenOdd()
    private readonly fizzBuzz: UseCase = new FizzBuzz()
    private readonly triangleType: UseCase = new TriangleType()
    private readonly leapYear: UseCase = new LeapYear()
    private readonly floatFormat: UseCase = new FloatFormat()
    private readonly passwordStrength: UseCase = new PasswordStrength()
    private readonly speedDisplay: UseCase = new SpeedDisplay()
    private readonly exampleTestDrivenDevelopment: Level = new TestDrivenDevelopment(this.batteryLevel)
    private readonly exampleMutationTesting: Level = new MutationTesting(this.batteryLevel)
    private readonly examples = [this.exampleTestDrivenDevelopment, this.exampleMutationTesting]
    private readonly levels: Level[] = [
        this.exampleTestDrivenDevelopment,
        new TestDrivenDevelopment(this.votingAge),
        this.exampleMutationTesting,
        new MutationTesting(this.evenOdd),
        new TestDrivenDevelopment(this.fizzBuzz),
        new MutationTesting(this.triangleType),
        new TestDrivenDevelopment(this.evenOdd),
        new MutationTesting(this.votingAge),
        new TestDrivenDevelopment(this.triangleType),
        new MutationTesting(this.fizzBuzz),
        new TestDrivenDevelopment(this.leapYear),
        new MutationTesting(this.passwordStrength),
        new TestDrivenDevelopment(this.speedDisplay),
        new MutationTesting(this.floatFormat),
        new TestDrivenDevelopment(this.passwordStrength),
        new MutationTesting(this.leapYear),
        new TestDrivenDevelopment(this.floatFormat),
        new MutationTesting(this.speedDisplay),
    ]
    private readonly isSidebarShown: Completed = new Completed('Main - Sidebar Shown')

    public start(): void {
        this.showWelcomeMessage()
        if (this.isSidebarShown.get())
            this.sidebar()
        else
            this.showQuestionSidebar(() => this.sidebar())
    }

    private sidebar(): void {
        this.isSidebarShown.set(1)
        this.showUnittestgamePanel()
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
        new ComputerMessage(['Welcome to *UnitTestGame*!']).add()
        new ComputerMessage(['I am an AI bot specialized in *Test-Driven Development* and *Mutation Testing*.']).add()
    }

    private showQuestionSidebar(callback: () => void): void {
        new QuestionMessage(
            'I want a sidebar with information on terms with a purple background',
            () => callback()
        ).add()
    }

    private showUnittestgamePanel(): void {
        const names = this.examples.map(example => example.name()).join(' and ')
        new Panel('UnitTestGame', [
            `Learn to write effective unit tests using ${names}. ` +
            '[Give feedback](mailto:feedback@unittestgame.com)',
        ]).show()
    }

    private showInvitationMessage(): void {
        new ComputerMessage(['What do you want to do?']).add()
    }

    private levelDescription(level: Level): string {
        const index = this.levels.findIndex(otherLevel => otherLevel === level)
        const medal = ['', '🥇', '🥈', '🥉'].at(Math.min(3, level.isFinished()))
        return [`Level ${index + 1}`, level.description(), medal].filter(Boolean).join(' - ')
    }

    private showFinishedLevelsPanel(previousLevel?: Level): void {
        const finishedLevels = this.getFinishedLevels()
        if (finishedLevels.length > 0) {
            new Panel('Finished Levels',
                finishedLevels.map(level =>
                    new Div().appendText(this.levelDescription(level)).addClass(level === previousLevel ? 'new' : 'old')
                )
            ).show()
        }
    }

    private showNextLevel(): void {
        const nextLevel = this.levels.find(level => !level.isFinished())
        if (nextLevel)
            new QuestionMessage(`I want to play ${this.levelDescription(nextLevel)}`, () => this.play(nextLevel)).add()
        else
            new QuestionMessage('I played all the levels', () => this.quit()).add()
    }

    private quit(): void {
        new ComputerMessage(['Well done! You can close this tab now and start writing effective unit tests for your real-world projects.']).add()
    }
}
