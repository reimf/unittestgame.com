import { Panel, ComputerMessage, HumanMessage } from './frame.js';
import { MutationTesting } from './game_mutation_testing.js';
import { TestDrivenDevelopment } from './game_test_driven_development.js';
import { Button, Paragraph, Anchor } from './html.js';
import { VotingAge } from './level_1_voting_age.js';
import { EvenOdd } from './level_2_even_odd.js';
import { FizzBuzz } from './level_3_fizz_buzz.js';
import { TriangleType } from './level_4_triangle_type.js';
import { LeapYear } from './level_5_leap_year.js';
import { FloatFormat } from './level_6_float_format.js';
import { PasswordStrength } from './level_7_password_strength.js';
import { SpeedDisplay } from './level_8_speed_display.js';
import { Round } from './round.js';
export class Main {
    constructor() {
        this.games = [
            new TestDrivenDevelopment(),
            new MutationTesting(),
        ];
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
    }
    start() {
        this.showAboutPanel();
        this.showIntroductionMessage();
        this.continue();
    }
    showAboutPanel() {
        const learnParagraph = new Paragraph().appendText('Learn to write effective unit tests using Test Driven Development and Mutation Testing.');
        const mailto = new Anchor().href('mailto:feedback@unittestgame.com').appendText('feedback');
        const site = new Anchor().href('https://unittestgame.com').appendText('UnitTestGame.com');
        const feedbackParagraph = new Paragraph().appendText('Please send us ').appendChild(mailto).appendText(' at ').appendChild(site);
        new Panel('About', [
            learnParagraph,
            feedbackParagraph
        ]).show();
    }
    showIntroductionMessage() {
        new ComputerMessage([
            new Paragraph().appendLines([
                'Welcome to UnitTestGame.com!',
                'I am an AI bot specialized in Test-Driven Development and Mutation Testing.',
                'What do you want to improve?',
            ]),
        ]).show();
    }
    continue() {
        const rounds = this.games.map(game => this.levels.map(level => new Round(game, level, () => this.continue())));
        this.showHighScoresPanel(rounds);
        this.showNextRound(rounds);
    }
    showHighScoresPanel(rounds) {
        const highScores = rounds.flatMap(roundsPerGame => roundsPerGame
            .filter(round => round.getHighScore(localStorage) > 0)
            .map(round => new Paragraph().appendText(`${round.description}: ${round.getHighScore(localStorage)}%`)));
        if (highScores.length > 0)
            new Panel('High Scores', highScores).show();
    }
    showNextRound(rounds) {
        const nextRoundButtons = rounds
            .map(roundsPerGame => roundsPerGame.find(round => round.getHighScore(localStorage) === 0))
            .filter(round => round !== undefined)
            .map(round => new Button().onClick(() => this.playRound(round)).appendText(`I want to play ${round.description}`));
        new HumanMessage(nextRoundButtons.length > 0
            ? nextRoundButtons
            : [new Button().onClick(() => window.close()).appendText('Quit UnitTestGame.com')]).show();
    }
    removeAllPanels() {
        document.querySelectorAll('#panels > section').forEach(panel => panel.remove());
    }
    playRound(round) {
        this.removeAllPanels();
        round.play();
    }
}
