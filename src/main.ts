import { Level } from './level.js'
import { Button, Paragraph, Anchor } from './html.js'
import { Panel, HumanMessage, ComputerMessage } from './frame.js'
import { VotingAge } from './level_1_voting_age.js'
import { EvenOdd } from './level_2_even_odd.js'
import { FizzBuzz } from './level_3_fizz_buzz.js'
import { TriangleType } from './level_4_triangle_type.js'
import { LeapYear } from './level_5_leap_year.js'
import { FloatFormat } from './level_6_float_format.js'
import { PasswordStrength } from './level_7_password_strength.js'
import { SpeedDisplay } from './level_8_speed_display.js'
import { TddRound } from './round_tdd.js'
import { MtRound } from './round_mt.js'

export class Main {
    public static readonly instance = new Main()
    private levels = [
        new VotingAge(1),
        new EvenOdd(2),
        new FizzBuzz(3),
        new TriangleType(4),
        new LeapYear(5),
        new FloatFormat(6),
        new PasswordStrength(7),
        new SpeedDisplay(8),
    ]

    private constructor() { }

    private showAboutPanel(): void {
        const learnParagraph = new Paragraph().appendText('Learn Unit Testing with UnitTestGame.com')
        const anchor = new Anchor().href('mailto:feedback@unittestgame.com').appendText('feedback@unittestgame.com')
        const feedbackParagraph = new Paragraph().appendText('Please send us ').appendChild(anchor)
        new Panel('About', [
            learnParagraph,
            feedbackParagraph
        ]).show()
    }

    private showWelcomeMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'Welcome to UnitTestGame.com!',
                'I am an AI-bot that does Test Driven Development.',
                'You write failing unit tests and I write a function that passes.',
                'Let\'s go next level!',
            ]),
        ]).show()
    }

    public start(): void {
        this.showAboutPanel()
        this.showWelcomeMessage()
        this.continue()
    }

    private continue(): void {
        this.showHighScoresPanel()
        this.showNextLevel()
    }

    private showHighScoresPanel(): void {
        const highScores = this.levels
            .filter(level => level.getHighScore(localStorage) > 0)
            .map(level => new Paragraph().appendText(`${level.description}: ${level.getHighScore(localStorage)}%`))
        if (highScores.length > 0)
            new Panel('High Scores',
                highScores
            ).show()
    }

    private showNextLevel(): void {
        const level = this.levels.find(level => level.getHighScore(localStorage) === 0)
        new HumanMessage([
            level
            ? new Button().onClick(() => this.playLevel(level)).appendText(`I want to play ${level.description}`)
            : new Button().onClick(() => window.close()).appendText('Quit UnitTestGame.com')
        ]).show()
    }

    private playLevel(level: Level): void {
        Panel.remove('About')
        Panel.remove('High Scores')
        new TddRound(level, () => this.continue()).play()
    }
}
