import { Button, Paragraph, Anchor } from './html.js';
import { Panel, HumanMessage, ComputerMessage } from './frame.js';
import { VotingAge } from './level_1_voting_age.js';
import { EvenOdd } from './level_2_even_odd.js';
import { FizzBuzz } from './level_3_fizz_buzz.js';
import { TriangleType } from './level_4_triangle_type.js';
import { LeapYear } from './level_5_leap_year.js';
import { FloatFormat } from './level_6_float_format.js';
import { PasswordStrength } from './level_7_password_strength.js';
import { SpeedDisplay } from './level_8_speed_display.js';
export class Main {
    constructor() {
        this.levels = [
            new VotingAge(1),
            new EvenOdd(2),
            new FizzBuzz(3),
            new TriangleType(4),
            new LeapYear(5),
            new FloatFormat(6),
            new PasswordStrength(7),
            new SpeedDisplay(8),
        ];
    }
    showAboutPanel() {
        const learnParagraph = new Paragraph().appendText('Learn Unit Testing with UnitTestGame.com');
        const anchor = new Anchor().href('mailto:feedback@unittestgame.com').appendText('feedback@unittestgame.com');
        const feedbackParagraph = new Paragraph().appendText('Please send us ').appendChild(anchor);
        new Panel('About', [
            learnParagraph,
            feedbackParagraph
        ]).show();
    }
    showWelcomeMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'Welcome to UnitTestGame.com!',
                'I am an AI-bot that does Test Driven Development.',
                'You write failing unit tests and I write a function that passes.',
                'Let\'s go next level!',
            ]),
        ]).show();
    }
    start() {
        this.showAboutPanel();
        this.showWelcomeMessage();
        this.continue();
    }
    continue() {
        this.showHighScoresPanel();
        this.showNextLevel();
    }
    showHighScoresPanel() {
        const highScores = this.levels
            .filter(level => level.getHighScore(localStorage) > 0)
            .map(level => new Paragraph().appendText(`${level.description}: ${level.getHighScore(localStorage)}%`));
        if (highScores.length > 0)
            new Panel('High Scores', highScores).show();
    }
    showNextLevel() {
        const level = this.levels.find(level => level.getHighScore(localStorage) === 0);
        new HumanMessage([
            level
                ? new Button().onClick(() => this.playLevel(level)).appendText(`I want to play ${level.description}`)
                : new Button().onClick(() => window.close()).appendText('Quit UnitTestGame.com')
        ]).show();
    }
    playLevel(level) {
        Panel.remove('About');
        Panel.remove('High Scores');
        level.play(() => this.continue());
    }
}
Main.instance = new Main();
