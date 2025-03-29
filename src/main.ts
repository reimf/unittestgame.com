import { Panel, ComputerMessage, HumanMessage } from './frame.js'
import { Button, Paragraph } from './html.js'
import { Level } from './level.js'
import { Methodology } from './methodology.js'
import { MutationTesting } from './methodology_mutation_testing.js'
import { TestDrivenDevelopment } from './methodology_test_driven_development.js'
import { UseCase } from './use_case.js'
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
    private readonly votingAge: UseCase = new VotingAge()
    private readonly evenOdd: UseCase = new EvenOdd()
    private readonly fizzBuzz: UseCase = new FizzBuzz()
    private readonly triangleType: UseCase = new TriangleType()
    private readonly leapYear: UseCase = new LeapYear()
    private readonly floatFormat: UseCase = new FloatFormat()
    private readonly passwordStrength: UseCase = new PasswordStrength()
    private readonly speedDisplay: UseCase = new SpeedDisplay()
    private readonly levels: Level[] = [
        new Level(this.testDrivenDevelopment, this.votingAge),
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

    public start(): void {
        this.showWelcomeMessage()
        if (this.getLevelsWithHighScore().length === 0)
            this.showQuestionSidebar(() => this.sidebar())
        else
            this.sidebar()
    }

    private sidebar(): void {
        this.showUnittestgamePanel()
        for (const methodology of this.methodologies)
            methodology.showBasicDefinition()
        this.continue()
    }

    private continue(): void {
        this.showHighScoresPanel()
        this.showInvitationMessage()
        this.showNextLevel((level: Level) => this.play(level))
    }

    private play(level: Level): void {
        Panel.removeAll()
        level.play(() => this.continue())
    }

    private getLevelsWithHighScore(): Level[] {
        return this.levels.filter(level => level.getHighScore(localStorage) > 0)
    }

    private showWelcomeMessage(): void {
        new ComputerMessage(['Welcome to *UnitTestGame*!']).add()
        new ComputerMessage(['I am an AI bot specialized in *Test-Driven Development* and *Mutation Testing*.']).add()
    }

    private showQuestionSidebar(callback: () => void): void {
        new HumanMessage([
            new Paragraph().appendChild(
                new Button().onClick(() => callback()).text('I want a sidebar for terms with a purple background'),
            ),
        ]).add()
    }

    private showUnittestgamePanel(): void {
        const methodologies = this.methodologies.map(methodology => methodology.name()).join(' and ')
        new Panel('UnitTestGame', [
            `Learn to write effective unit tests using ${methodologies}. ` +
            '[feedback](mailto:feedback@unittestgame.com)',
        ]).show()
    }

    private showInvitationMessage(): void {
        new ComputerMessage(['What do you want to do now?']).add()
    }

    private levelDescription(level: Level): string {
        const index = this.levels.findIndex(otherLevel => otherLevel === level)
        return `Level ${index + 1} - ${level.description()}`
    }

    private showHighScoresPanel(): void {
        const levels = this.getLevelsWithHighScore()
        if (levels.length > 0) {
            new Panel('High Scores',
                levels.map(level => `${this.levelDescription(level)}: ${level.getHighScore(localStorage)}%`)
        ).show()
        }
    }

    private showNextLevel(callback: (level: Level) => void): void {
        const nextLevel = this.levels.find(level => level.getHighScore(localStorage) === 0)
        new HumanMessage([
            new Paragraph().appendChild(
                nextLevel
                ? new Button().onClick(() => callback(nextLevel)).text(`I want to play ${this.levelDescription(nextLevel)}`)
                : new Button().onClick(() => window.close()).text('Quit'),
            ),
        ]).add()
    }
}
