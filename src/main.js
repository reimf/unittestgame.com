import { Button, Paragraph, Anchor, Panel, HumanMenuMessage, ComputerMessage } from './html.js';
import { VotingAge } from './level_voting_age.js';
import { EvenOdd } from './level_even_odd.js';
import { LeapYear } from './level_leap_year.js';
import { Triangle } from './level_triangle.js';
import { Speed } from './level_speed.js';
import { Float } from './level_float.js';
import { Password } from './level_password.js';
export class Main {
    constructor() {
        this.levels = [
            new VotingAge(1),
            new EvenOdd(2),
            new LeapYear(3),
            new Triangle(4),
            new Float(5),
            new Password(6),
            new Speed(7),
        ];
    }
    showAboutPanel() {
        const learnParagraph = new Paragraph('Learn Unit Testing with UnitTestGame.com');
        const anchor = new Anchor('mailto:feedback@unittestgame.com');
        anchor.appendText('feedback@unittestgame.com');
        const feedbackParagraph = new Paragraph('Please send us ');
        feedbackParagraph.appendChild(anchor);
        new Panel('About', [
            learnParagraph,
            feedbackParagraph
        ]).show('about');
    }
    showWelcomeMessage() {
        new ComputerMessage([
            new Paragraph('Welcome to UnitTestGame.com! ' +
                'I am an AI-bot and I am hired as your co-developer. ' +
                'Your task is to prevent me from hallucinating. ' +
                'Let\'s go next level!'),
        ]).show();
    }
    start() {
        this.showAboutPanel();
        this.showWelcomeMessage();
        this.showLevelMenu();
    }
    showLevelMenu() {
        var _a;
        const highestPlayableLevelIndex = ((_a = this.levels.find(level => !level.hasHighScore(localStorage))) === null || _a === void 0 ? void 0 : _a.index) || this.levels.length;
        new HumanMenuMessage(this.levels.map(level => new Button(level.buttonText(localStorage, highestPlayableLevelIndex), () => this.playLevel(level))
            .disabled(level.index > highestPlayableLevelIndex))).show().focusLast();
    }
    playLevel(level) {
        Panel.remove('about');
        Panel.remove('high-scores');
        level.play(() => this.showLevelMenu());
    }
}
Main.instance = new Main();
