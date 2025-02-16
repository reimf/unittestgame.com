import { Game } from './game.js'
import { Button, Paragraph, Anchor, Div, UnorderedList, Panel, HumanMenuMessage, ComputerMessage } from './html.js'
import { VotingAge } from './game_voting_age.js'
import { EvenOdd } from './game_even_odd.js'
import { LeapYear } from './game_leap_year.js'
import { Triangle } from './game_triangle.js'
import { Speed } from './game_speed.js'
import { Float } from './game_float.js'
import { Password } from './game_password.js'

export class Main {
    public static readonly instance = new Main()
    private games = [
        new VotingAge(),
        new EvenOdd(),
        new LeapYear(),
        new Triangle(),
        new Float(),
        new Password(),
        new Speed(),
    ]

    private constructor() { }

    private aboutPanel(): Panel {
        const learnParagraph = new Paragraph('Learn Unit Testing with UnitTestGame.com')
        const anchor = new Anchor('mailto:feedback@unittestgame.com')
        anchor.appendText('feedback@unittestgame.com')
        const feedbackParagraph = new Paragraph('Please send us ')
        feedbackParagraph.appendChild(anchor)
        return new Panel('About', [
            learnParagraph,
            feedbackParagraph
        ])
    }

    private highScorePanel(): Panel {
        return new Panel('High Scores', [
            new UnorderedList(
                this.games.
                map(game => game.highScore()).
                filter(highScore => highScore !== null).
                map(highScore => new Div().appendText(highScore.toString()))
            ).ifEmpty('You have not played a game yet.'),
        ])
    }

    private welcomeMessage(): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'Welcome to UnitTestGame.com! ' +
                'I am an AI-bot and I am hired as your co-developer. ' +
                'Your task is to prevent me from hallucinating. ' +
                'What are we going to do now?'
            ),
        ])
    }

    public start(): void {
        this.aboutPanel().show('about')
        this.welcomeMessage().show()
        this.highScorePanel().show('high-scores')
        this.gameMenu()
    }

    private gameMenu(): void {
        new HumanMenuMessage(
            this.games.map(game => new Button(game.description, () => this.playGame(game))),
        ).show()
    }

    private playGame(game: Game): void {
        Panel.remove('about')
        Panel.remove('high-scores')
        game.play()
    }

    public restart(): void {
        this.highScorePanel().show('high-scores')
        new HumanMenuMessage([
            new Button('Pick another task', () => this.gameMenu()),
            new Button('Close UnitTestGame.com', () => window.close()),
        ]).show()
    }
}
