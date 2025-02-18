import { Level } from './level.js'
import { Button, Paragraph, Anchor, Panel, HumanMenuMessage, ComputerMessage } from './html.js'
import { VotingAge } from './level_voting_age.js'
import { EvenOdd } from './level_even_odd.js'
import { LeapYear } from './level_leap_year.js'
import { Triangle } from './level_triangle.js'
import { Speed } from './level_speed.js'
import { Float } from './level_float.js'
import { Password } from './level_password.js'

export class Main {
    public static readonly instance = new Main()
    private levels = [
        new VotingAge(1),
        new EvenOdd(2),
        new LeapYear(3),
        new Triangle(4),
        new Float(5),
        new Password(6),
        new Speed(7),
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
                'What are we going to do now?'
            ),
        ]).show()
    }

    public start(): void {
        this.showAboutPanel()
        this.showWelcomeMessage()
        this.showLevelMenu()
    }

    public showLevelMenu(): void {
        const highestPlayableLevelIndex = this.levels.find(level => !level.hasHighScore(localStorage))?.index || this.levels.length
        new HumanMenuMessage(
            this.levels.map(level =>
                new Button(level.buttonText(localStorage, highestPlayableLevelIndex), () => this.playLevel(level))
                .disabled(level.index > highestPlayableLevelIndex)
            ),
        ).show().focusLast()
    }

    private playLevel(level: Level): void {
        Panel.remove('about')
        Panel.remove('high-scores')
        level.play(() => this.showLevelMenu())
    }
}
