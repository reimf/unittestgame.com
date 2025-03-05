import { Button, Paragraph, Anchor } from './html.js';
import { Panel, HumanMessage } from './frame.js';
import { VotingAge } from './level_1_voting_age.js';
import { EvenOdd } from './level_2_even_odd.js';
import { FizzBuzz } from './level_3_fizz_buzz.js';
import { TriangleType } from './level_4_triangle_type.js';
import { LeapYear } from './level_5_leap_year.js';
import { FloatFormat } from './level_6_float_format.js';
import { PasswordStrength } from './level_7_password_strength.js';
import { SpeedDisplay } from './level_8_speed_display.js';
export class Main {
    constructor(RoundType) {
        this.levels = [
            new VotingAge(),
            new EvenOdd(),
            new FizzBuzz(),
            new TriangleType(),
            new LeapYear(),
            new FloatFormat(),
            new PasswordStrength(),
            new SpeedDisplay(),
        ];
        this.RoundType = RoundType;
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
    start() {
        this.showAboutPanel();
        this.RoundType.showWelcomeMessage();
        this.continue();
    }
    continue() {
        const rounds = this.levels.map(level => new this.RoundType(level, () => this.continue()));
        this.showHighScoresPanel(rounds);
        this.showNextRound(rounds);
    }
    showHighScoresPanel(rounds) {
        const highScores = rounds
            .filter(round => round.getHighScore(localStorage) > 0)
            .map(round => new Paragraph().appendText(`${round.description}: ${round.getHighScore(localStorage)}%`));
        if (highScores.length > 0)
            new Panel('High Scores', highScores).show();
    }
    showNextRound(rounds) {
        const round = rounds.find(round => round.getHighScore(localStorage) === 0);
        new HumanMessage([
            round
                ? new Button().onClick(() => this.playRound(round)).appendText(`I want to play ${round.description}`)
                : new Button().onClick(() => window.close()).appendText('Quit UnitTestGame.com')
        ]).show();
    }
    playRound(round) {
        new Panel('About').remove();
        new Panel('High Scores').remove();
        round.play();
    }
}
