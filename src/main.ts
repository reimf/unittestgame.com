import { Panel, ComputerMessage, HumanMessage } from './frame.js'
import { MutationTesting } from './methodology_mutation_testing.js'
import { Methodology } from './methodology.js'
import { TestDrivenDevelopment } from './methodology_test_driven_development.js'
import { Button, Paragraph, Anchor } from './html.js'
import { Level } from './level.js'
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
        this.showAboutPanel()
        this.showIntroductionMessage()
        this.continue()
    }

    private showAboutPanel(): void {
        const learnParagraph = new Paragraph().text('Learn to write effective unit tests using Test Driven Development and Mutation Testing.')
        const mailto = new Anchor().href('mailto:feedback@unittestgame.com').text('feedback')
        const site = new Anchor().href('https://unittestgame.com').text('UnitTestGame.com')
        const feedbackParagraph = new Paragraph().text('Please send us ').child(mailto).text(' at ').child(site)
        new Panel('About', [learnParagraph, feedbackParagraph]).show()
    }

    private showIntroductionMessage(): void {
        new ComputerMessage([
            new Paragraph().text(
                'Welcome to UnitTestGame.com! ' +
                'I am an AI bot specialized in Test-Driven Development and Mutation Testing.'
            ),
        ]).show()
    }

    private showInvitationMessage(): void {
        new ComputerMessage([
            new Paragraph().text('What do you want to play?'),
        ]).show()
    }

    private continue(): void {
        this.showHighScoresPanel()
        this.showInvitationMessage()
        this.showNextLevel()
    }

    private levelDescription(level: Level): string {
        const index = this.levels.findIndex(otherLevel => otherLevel === level)
        return `Level ${index + 1} - ${level.description}`

    }
    private showHighScoresPanel(): void {
        const highScores = this.levels
            .filter(level => level.getHighScore(localStorage) !== 0)
            .map(level => `${this.levelDescription(level)}: ${level.getHighScore(localStorage)}%`)
        if (highScores.length > 0) {
            new Panel('High Scores',
                highScores.map(highScore => new Paragraph().text(highScore))
            ).show()
        }
    }

    private showNextLevel(): void {
        const nextLevel = this.levels.find(level => level.getHighScore(localStorage) === 0)
        new HumanMessage([
            nextLevel
                ? new Button().onClick(() => this.playNextLevel(nextLevel)).text(`I want to play ${this.levelDescription(nextLevel)}`)
                : new Button().onClick(() => window.close()).text('Quit UnitTestGame.com'),
        ]).show()
    }

    private showCurrentLevelPanel(level: Level): void {
        new Panel('Current Level', [new Paragraph().text(this.levelDescription(level))]).show()
    }

    private removeAllPanels(): void {
        document.querySelectorAll('#panels > section').forEach(panel => panel.remove())
    }

    private playNextLevel(level: Level): void {
        // We don't know the names of the panels created by the previous level, so we simply remove all panels
        this.removeAllPanels()
        this.showCurrentLevelPanel(level)
        level.play(() => this.continue())
    }
}
