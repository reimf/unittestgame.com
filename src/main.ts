import { Level } from './level.js'
import { Button, Paragraph, Anchor, Panel, HumanMessage, ComputerMessage } from './html.js'
import { VotingAge } from './level_1_voting_age.js'
import { EvenOdd } from './level_2_even_odd.js'
import { FizzBuzz } from './level_3_fizz_buzz.js'
import { LeapYear } from './level_5_leap_year.js'
import { TriangleType } from './level_4_triangle_type.js'
import { FloatFormat } from './level_6_float_format.js'
import { PasswordStrength } from './level_7_password_strength.js'
import { SpeedDisplay } from './level_8_speed_display.js'

export class Main {
    public static readonly instance = new Main()
    private levels = [
        new VotingAge(),
        new EvenOdd(),
        new FizzBuzz(),
        new TriangleType(),
        new LeapYear(),
        new FloatFormat(),
        new PasswordStrength(),
        new SpeedDisplay(),
    ]

    private constructor() { }

    private showAboutPanel(): void {
        const learnParagraph = new Paragraph('Learn Unit Testing with UnitTestGame.com')
        const anchor = new Anchor('mailto:feedback@unittestgame.com')
        anchor.appendText('feedback@unittestgame.com')
        const feedbackParagraph = new Paragraph('Please send us ')
        feedbackParagraph.appendChild(anchor)
        new Panel('About', [
            learnParagraph,
            feedbackParagraph
        ]).show('about')
    }

    private showWelcomeMessage(): void {
        new ComputerMessage([
            new Paragraph(
                'Welcome to UnitTestGame.com! ' +
                'I am an AI-bot and I am hired as your co-developer. ' +
                'Your task is to prevent me from hallucinating. ' +
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
        this.showLevelMenu()
    }

    private showHighScoresPanel(): void {
        const highScores = this.levels.filter(level => level.hasHighScore(localStorage)).map(level =>
            new Paragraph(`Level ${level.index} - ${level.name}: ${level.getHighScore(localStorage)}%`)
        )
        if (highScores.length > 0)
            new Panel(
                'High Scores',
                highScores
            ).show('high-scores')
    }

    private showLevelMenu(): void {
        const level = this.levels.find(level => !level.hasHighScore(localStorage))
        new HumanMessage([
            level
            ? new Button(`I want to play Level ${level.index} - ${level.name}`, () => this.playLevel(level))
            : new Button('Quit UnitTestGame.com', () => window.close())
        ]).show()
    }

    private playLevel(level: Level): void {
        Panel.remove('about')
        Panel.remove('high-scores')
        level.play(() => this.continue())
    }
}
