import { Button, Paragraph, Anchor, Span, UnorderedList, ListItem, Panel, HumanMenuMessage, ComputerMessage } from './html.js';
import { VotingAge } from './game_voting_age.js';
import { EvenOdd } from './game_even_odd.js';
import { LeapYear } from './game_leap_year.js';
import { Triangle } from './game_triangle.js';
import { Speed } from './game_speed.js';
import { Float } from './game_float.js';
import { Password } from './game_password.js';
export class Main {
    constructor() {
        this.games = [
            new VotingAge(),
            new EvenOdd(),
            new LeapYear(),
            new Triangle(),
            new Float(),
            new Password(),
            new Speed(),
        ];
    }
    aboutPanel() {
        const learnParagraph = new Paragraph('Learn Unit Testing with UnitTestGame.com');
        const anchor = new Anchor('mailto:feedback@unittestgame.com');
        anchor.appendText('feedback@unittestgame.com');
        const feedbackParagraph = new Paragraph('Please send us ');
        feedbackParagraph.appendChild(anchor);
        return new Panel('About', [
            learnParagraph,
            feedbackParagraph
        ]);
    }
    highScorePanel() {
        return new Panel('High Scores', [
            new UnorderedList(this.games.
                map(game => game.highScore()).
                filter(highScore => highScore !== null).
                map(highScore => new ListItem(new Span(highScore.toString())))).ifEmpty('You have not played a game yet.'),
        ]);
    }
    welcomeMessage() {
        return new ComputerMessage([
            new Paragraph('Welcome to UnitTestGame.com! ' +
                'I am an AI-bot and I am hired as your co-developer. ' +
                'Your task is to prevent me from hallucinating. ' +
                'What are we going to do now?'),
        ]);
    }
    start() {
        this.aboutPanel().show('about');
        this.welcomeMessage().show();
        this.highScorePanel().show('high-scores');
        this.gameMenu();
    }
    gameMenu() {
        new HumanMenuMessage(this.games.map(game => new Button(game.description, () => this.playGame(game)))).show();
    }
    playGame(game) {
        Panel.remove('about');
        Panel.remove('high-scores');
        game.play();
    }
    restart() {
        this.highScorePanel().show('high-scores');
        new HumanMenuMessage([
            new Button('Pick another task', () => this.gameMenu()),
            new Button('Close UnitTestGame.com', () => window.close()),
        ]).show();
    }
}
Main.instance = new Main();
