import { Panel, ComputerMessage, HumanMessage } from './frame.js';
import { Button, Paragraph } from './html.js';
import { Level } from './level.js';
import { MutationTesting } from './methodology_mutation_testing.js';
import { TestDrivenDevelopment } from './methodology_test_driven_development.js';
import { VotingAge } from './use_case_voting_age.js';
import { EvenOdd } from './use_case_even_odd.js';
import { FizzBuzz } from './use_case_fizz_buzz.js';
import { TriangleType } from './use_case_triangle_type.js';
import { LeapYear } from './use_case_leap_year.js';
import { FloatFormat } from './use_case_float_format.js';
import { PasswordStrength } from './use_case_password_strength.js';
import { SpeedDisplay } from './use_case_speed_display.js';
export class Main {
    constructor() {
        this.testDrivenDevelopment = new TestDrivenDevelopment();
        this.mutationTesting = new MutationTesting();
        this.methodologies = [this.testDrivenDevelopment, this.mutationTesting];
        this.votingAge = new VotingAge();
        this.evenOdd = new EvenOdd();
        this.fizzBuzz = new FizzBuzz();
        this.triangleType = new TriangleType();
        this.leapYear = new LeapYear();
        this.floatFormat = new FloatFormat();
        this.passwordStrength = new PasswordStrength();
        this.speedDisplay = new SpeedDisplay();
        this.levels = [
            new Level(this.testDrivenDevelopment, this.votingAge),
            new Level(this.mutationTesting, this.evenOdd),
            new Level(this.testDrivenDevelopment, this.fizzBuzz),
            new Level(this.mutationTesting, this.triangleType),
            new Level(this.testDrivenDevelopment, this.evenOdd),
            new Level(this.mutationTesting, this.votingAge),
            new Level(this.testDrivenDevelopment, this.triangleType),
            new Level(this.mutationTesting, this.fizzBuzz),
            new Level(this.testDrivenDevelopment, this.leapYear),
            new Level(this.mutationTesting, this.passwordStrength),
            new Level(this.testDrivenDevelopment, this.speedDisplay),
            new Level(this.mutationTesting, this.floatFormat),
            new Level(this.testDrivenDevelopment, this.passwordStrength),
            new Level(this.mutationTesting, this.leapYear),
            new Level(this.testDrivenDevelopment, this.floatFormat),
            new Level(this.mutationTesting, this.speedDisplay),
        ];
    }
    start() {
        this.showWelcomeMessage();
        if (this.getLevelsWithHighScore().length === 0)
            this.showQuestionSidebar(() => this.sidebar());
        else
            this.sidebar();
    }
    sidebar() {
        this.showUnittestgamePanel();
        for (const methodology of this.methodologies)
            methodology.showBasicDefinition();
        this.continue();
    }
    continue() {
        this.showHighScoresPanel();
        this.showInvitationMessage();
        this.showNextLevel((level) => this.play(level));
    }
    play(level) {
        Panel.removeAll();
        level.play(() => this.continue());
    }
    getLevelsWithHighScore() {
        return this.levels.filter(level => level.getHighScore(localStorage) > 0);
    }
    showWelcomeMessage() {
        new ComputerMessage(['Welcome to *UnitTestGame*!']).add();
        new ComputerMessage(['I am an AI bot specialized in *Test-Driven Development* and *Mutation Testing*.']).add();
    }
    showQuestionSidebar(callback) {
        new HumanMessage([
            new Paragraph().appendChild(new Button().onClick(() => callback()).text('I want a sidebar for terms with a purple background')),
        ]).add();
    }
    showUnittestgamePanel() {
        const methodologies = this.methodologies.map(methodology => methodology.name()).join(' and ');
        new Panel('UnitTestGame', [
            `Learn to write effective unit tests using ${methodologies}. ` +
                '[feedback](mailto:feedback@unittestgame.com)',
        ]).show();
    }
    showInvitationMessage() {
        new ComputerMessage(['What do you want to do now?']).add();
    }
    levelDescription(level) {
        const index = this.levels.findIndex(otherLevel => otherLevel === level);
        return `Level ${index + 1} - ${level.description()}`;
    }
    showHighScoresPanel() {
        const levels = this.getLevelsWithHighScore();
        if (levels.length > 0) {
            new Panel('High Scores', levels.map(level => `${this.levelDescription(level)}: ${level.getHighScore(localStorage)}%`)).show();
        }
    }
    showNextLevel(callback) {
        const nextLevel = this.levels.find(level => level.getHighScore(localStorage) === 0);
        new HumanMessage([
            new Paragraph().appendChild(nextLevel
                ? new Button().onClick(() => callback(nextLevel)).text(`I want to play ${this.levelDescription(nextLevel)}`)
                : new Button().onClick(() => window.close()).text('Quit')),
        ]).add();
    }
}
