import { Level } from './level.js'
import { Button, Paragraph, Anchor, Panel, HumanMessage, ComputerMessage } from './html.js'
import { VotingAge } from './level_1_voting_age.js'
import { EvenOdd } from './level_2_even_odd.js'
import { FizzBuzz } from './level_3_fizz_buzz.js'
import { TriangleType } from './level_4_triangle_type.js'
import { LeapYear } from './level_5_leap_year.js'
import { FloatFormat } from './level_6_float_format.js'
import { PasswordStrength } from './level_7_password_strength.js'
import { SpeedDisplay } from './level_8_speed_display.js'

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
        const learnParagraph = new Paragraph('Learn Unit Testing with UnitTestGame.com')
        const anchor = new Anchor('mailto:feedback@unittestgame.com').appendText('feedback@unittestgame.com')
        const feedbackParagraph = new Paragraph('Please send us ').appendChild(anchor)
        new Panel('About', [
            learnParagraph,
            feedbackParagraph
        ]).show('about')
    }

    private showWelcomeMessage(): void {
        new ComputerMessage([
            new Paragraph(
                'Welcome to UnitTestGame.com! ' +
                'I am an AI-bot that does Test Driven Development. ' +
                'You write unit tests and I write a function that passes. ' +
                'Let\'s go next level!'
            ),
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
        .map(level => {
            if (level.getHighScore(localStorage) > 0)
                return new Paragraph(`${level.description}: ${level.getHighScore(localStorage)}%`)
            return undefined
        })
        .filter(paragraph => paragraph instanceof Paragraph)
        if (highScores.length > 0)
            new Panel(
                'High Scores',
                highScores
            ).show('high-scores')
    }

    private showNextLevel(): void {
        const level = this.levels.find(level => level.getHighScore(localStorage) === 0)
        new HumanMessage([
            level
            ? new Button(`I want to play ${level.description}`, () => this.playLevel(level))
            : new Button('Quit UnitTestGame.com', () => window.close())
        ]).show()
    }

    private playLevel(level: Level): void {
        Panel.remove('about')
        Panel.remove('high-scores')
        level.play(() => this.continue())
    }
}
