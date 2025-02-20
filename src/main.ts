import { Level } from './level.js'
import { Button, Paragraph, Anchor, Panel, HumanMenuMessage, ComputerMessage } from './html.js'
import { VotingAge } from './level_voting_age.js'
import { EvenOdd } from './level_even_odd.js'
import { FizzBuzz } from './level_fizz_buzz.js'
import { LeapYear } from './level_leap_year.js'
import { TriangleType } from './level_triangle_type.js'
import { FloatFormat } from './level_float_format.js'
import { PasswordStrength } from './level_password_strength.js'
import { SpeedDisplay } from './level_speed_display.js'

export class Main {
    public static readonly instance = new Main()
    private levels = [
        new VotingAge(1),
        new EvenOdd(2),
        new FizzBuzz(3),
        new LeapYear(4),
        new TriangleType(5),
        new FloatFormat(6),
        new PasswordStrength(7),
        new SpeedDisplay(8),
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
        this.showLevelMenu()
    }

    private showLevelMenu(): void {
        const highestPlayableLevelIndex = this.levels.find(level => !level.hasHighScore(localStorage))?.index || this.levels.length + 1
        const levelButtons = this.levels.map(level =>
            new Button(level.buttonText(localStorage, highestPlayableLevelIndex), () => this.playLevel(level))
            .disabled(level.index > highestPlayableLevelIndex)
            .addClass(level.index < highestPlayableLevelIndex ? 'played' : 'not-played')
        )
        const quitButtons = highestPlayableLevelIndex > this.levels.length ? [new Button('Quit UnitTestGame.com', () => location.reload())] : []
        new HumanMenuMessage(
            [...levelButtons, ...quitButtons]
        ).show().focusLast()
    }

    private playLevel(level: Level): void {
        Panel.remove('about')
        Panel.remove('high-scores')
        level.play(() => this.showLevelMenu())
    }
}
