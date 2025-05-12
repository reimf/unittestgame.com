import { Completed } from './completed.js'
import { Example } from './example.js'
import { Panel, ComputerMessage, QuestionMessage } from './frame.js'
import { Div } from './html.js'
import { Level } from './level.js'
import { Methodology } from './methodology.js'
import { MutationTesting } from './methodology_mutation_testing.js'
import { TestDrivenDevelopment } from './methodology_test_driven_development.js'
import { UseCase } from './use_case.js'
import { BatteryLevel } from './use_case_battery_level.js'
import { VotingAge } from './use_case_voting_age.js'
import { EvenOdd } from './use_case_even_odd.js'
import { FizzBuzz } from './use_case_fizz_buzz.js'
import { TriangleType } from './use_case_triangle_type.js'
import { LeapYear } from './use_case_leap_year.js'
import { FloatFormat } from './use_case_float_format.js'
import { PasswordStrength } from './use_case_password_strength.js'
import { SpeedDisplay } from './use_case_speed_display.js'

export class Main {
    private readonly testDrivenDevelopment: Methodology = new TestDrivenDevelopment()
    private readonly mutationTesting: Methodology = new MutationTesting()
    private readonly methodologies = [this.testDrivenDevelopment, this.mutationTesting]
    private readonly batteryLevel: UseCase = new BatteryLevel()
    private readonly votingAge: UseCase = new VotingAge()
    private readonly evenOdd: UseCase = new EvenOdd()
    private readonly fizzBuzz: UseCase = new FizzBuzz()
    private readonly triangleType: UseCase = new TriangleType()
    private readonly leapYear: UseCase = new LeapYear()
    private readonly floatFormat: UseCase = new FloatFormat()
    private readonly passwordStrength: UseCase = new PasswordStrength()
    private readonly speedDisplay: UseCase = new SpeedDisplay()
    private readonly levels: Level[] = [
        new Example(this.testDrivenDevelopment, this.batteryLevel),
        new Level(this.testDrivenDevelopment, this.votingAge),
        new Example(this.mutationTesting, this.batteryLevel),
        new Level(this.mutationTesting, this.evenOdd),
        new Level(this.testDrivenDevelopment, this.fizzBuzz),
        new Level(this.mutationTesting, this.triangleType),
        new Level(this.testDrivenDevelopment, this.evenOdd),
        new Level(this.mutationTesting, this.votingAge),
        new Level(this.testDrivenDevelopment, this.triangleType),
        new Level(this.mutationTesting, this.fizzBuzz),
        new Level(this.testDrivenDevelopment, this.leapYear),
        new Level(this.mutationTesting, this.passwordStrength),
        new Level(this.testDrivenDevelopment, this.speedDisplay),
        new Level(this.mutationTesting, this.floatFormat),
        new Level(this.testDrivenDevelopment, this.passwordStrength),
        new Level(this.mutationTesting, this.leapYear),
        new Level(this.testDrivenDevelopment, this.floatFormat),
        new Level(this.mutationTesting, this.speedDisplay),
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
        for (const methodology of this.methodologies)
            methodology.showBasicDefinition()
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
        const methodologies = this.methodologies.map(methodology => methodology.name()).join(' and ')
        new Panel('UnitTestGame', [
            `Learn to write effective unit tests using ${methodologies}. ` +
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
                    new Div().appendText(this.levelDescription(level)).addClass(level === previousLevel ? 'new' : '')
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
