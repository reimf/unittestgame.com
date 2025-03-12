import { Panel, ComputerMessage, HumanMessage } from './frame.js'
import { MutationTesting } from './game_mutation_testing.js'
import { Game } from './game.js'
import { TestDrivenDevelopment } from './game_test_driven_development.js'
import { Button, Paragraph, Anchor } from './html.js'
import { Level } from './level.js'
import { VotingAge } from './level_1_voting_age.js'
import { EvenOdd } from './level_2_even_odd.js'
import { FizzBuzz } from './level_3_fizz_buzz.js'
import { TriangleType } from './level_4_triangle_type.js'
import { LeapYear } from './level_5_leap_year.js'
import { FloatFormat } from './level_6_float_format.js'
import { PasswordStrength } from './level_7_password_strength.js'
import { SpeedDisplay } from './level_8_speed_display.js'
import { Round } from './round.js'

export class Main {
    private readonly testDrivenDevelopment: Game = new TestDrivenDevelopment()
    private readonly mutationTesting: Game = new MutationTesting()
    private readonly votingAge: Level = new VotingAge()
    private readonly evenOdd: Level = new EvenOdd()
    private readonly fizzBuzz: Level = new FizzBuzz()
    private readonly triangleType: Level = new TriangleType()
    private readonly leapYear: Level = new LeapYear()
    private readonly floatFormat: Level = new FloatFormat()
    private readonly passwordStrength: Level = new PasswordStrength()
    private readonly speedDisplay: Level = new SpeedDisplay()
    private readonly callback = () => this.continue()
    private readonly rounds: Round[] = [
        new Round(1, this.testDrivenDevelopment, this.votingAge, this.callback),
        new Round(2, this.mutationTesting, this.evenOdd, this.callback),
        new Round(3, this.testDrivenDevelopment, this.fizzBuzz, this.callback),
        new Round(4, this.mutationTesting, this.triangleType, this.callback),
        new Round(5, this.testDrivenDevelopment, this.evenOdd, this.callback),
        new Round(6, this.mutationTesting, this.votingAge, this.callback),
        new Round(7, this.testDrivenDevelopment, this.triangleType, this.callback),
        new Round(8, this.mutationTesting, this.fizzBuzz, this.callback),
        new Round(9, this.testDrivenDevelopment, this.leapYear, this.callback),
        new Round(10, this.mutationTesting, this.passwordStrength, this.callback),
        new Round(11, this.testDrivenDevelopment, this.speedDisplay, this.callback),
        new Round(12, this.mutationTesting, this.floatFormat, this.callback),
        new Round(13, this.testDrivenDevelopment, this.passwordStrength, this.callback),
        new Round(14, this.mutationTesting, this.leapYear, this.callback),
        new Round(15, this.testDrivenDevelopment, this.floatFormat, this.callback),
        new Round(16, this.mutationTesting, this.speedDisplay, this.callback),
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
            new Paragraph().text('Welcome to UnitTestGame.com! ' +
                'I am an AI bot specialized in Test-Driven Development and Mutation Testing.'),
        ]).show()
    }

    private continue(): void {
        this.showHighScoresPanel()
        this.showNextRound()
    }

    private showHighScoresPanel(): void {
        const roundsWithHighScore = this.rounds.filter(round => round.getHighScore(localStorage) > 0)
        if (roundsWithHighScore.length > 0) {
            new Panel('High Scores',
                roundsWithHighScore.map(round =>
                    new Paragraph().text(`${round.description}: ${round.getHighScore(localStorage)}%`))).show()
        }
    }

    private showNextRound(): void {
        const nextRound = this.rounds.find(round => round.getHighScore(localStorage) === 0)
        new HumanMessage([
            nextRound
                ? new Button().onClick(() => this.playNextRound(nextRound)).text(`I want to play ${nextRound.description}`)
                : new Button().onClick(() => window.close()).text('Quit UnitTestGame.com'),
        ]).show()
    }

    private removeAllPanels(): void {
        document.querySelectorAll('#panels > section').forEach(panel => panel.remove())
    }

    private playNextRound(round: Round): void {
        // We don't know the names of the panels created by the previous round, so we simply remove all panels
        this.removeAllPanels()
        round.play()
    }
}
