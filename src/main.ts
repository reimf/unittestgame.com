import Game from './game.js'
import Theme from './theme.js'
import { Button, Paragraph, Anchor, Span, UnorderedList, ListItem, Panel, HumanMenuMessage, ComputerMessage } from './html.js'
import HighScore from './high_score.js'
import VotingAge from './game_intro_votingage.js'
import Evenodd from './game_aibot_evenodd.js'
import LeapYear from './game_school_leapyear.js'
import Triangle from './game_school_triangle.js'
import Speed from './game_company_speed.js'
import Float from './game_company_float.js'
import Password from './game_company_password.js'

export default class Main {
    public static readonly instance = new Main()
    private games = [
        new VotingAge(),
        new Evenodd(),
        new LeapYear(),
        new Triangle(),
        new Speed(),
        new Float(),
        new Password(),
    ]
    private themes = this.games.map(game => game.theme).filter((theme, index, themes) => themes.indexOf(theme) === index)

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
        const highScores = this.games.map(game => HighScore.fromLocalStorage(game.constructor.name)).filter(highScore => highScore !== null)
        return new Panel('High Scores', [
            highScores.length === 0
            ? new Paragraph('You have not played a game yet.')
            : new UnorderedList(highScores.map(highScore => new ListItem(new Span(highScore.toString()))))
        ])
    }

    private welcomeMessage(): ComputerMessage {
        return new ComputerMessage([
            new Paragraph(
                'Welcome to UnitTestGame.com! ' +
                'Here you can learn to write the right unit tests. ' +
                'But first, pick a theme to start the game.'
            ),
        ])
    }

    public start(): void {
        this.aboutPanel().show('about')
        this.welcomeMessage().show()
        this.highScorePanel().show('high-scores')
        this.themeMenu()
    }

    private themeMenu(): void {
        new HumanMenuMessage(
            this.themes.map(theme => new Button(theme.description, () => this.gameMenu(theme)))
        ).show()
    }

    private gameMenu(theme: Theme): void {
        const gamesForThisTheme = this.games.filter(game => game.theme === theme)
        new HumanMenuMessage(
            gamesForThisTheme.map(game => new Button(game.description, () => this.playGame(game))),
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
            new Button('Pick another theme and game', () => this.themeMenu()),
            new Button('Exit UnitTestGame.com', () => window.close()),
        ]).show()
    }
}
