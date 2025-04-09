import { Panel, ComputerMessage, ButtonMessage } from './frame.js';
import { Div } from './html.js';
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
import { StoredValue } from './stored_value.js';
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
        this.sidebarShown = new StoredValue('Main - Sidebar Shown');
    }
    start() {
        this.showWelcomeMessage();
        if (this.sidebarShown.get(localStorage))
            this.sidebar();
        else
            this.showQuestionSidebar(() => this.sidebar());
    }
    sidebar() {
        this.sidebarShown.set(localStorage);
        this.showUnittestgamePanel();
        for (const methodology of this.methodologies)
            methodology.showBasicDefinition();
        this.continue();
    }
    continue() {
        this.showLevelsPanel();
        this.showInvitationMessage();
        this.showNextLevel();
    }
    play(level) {
        Panel.removeAll();
        level.play(() => this.continue());
    }
    getLevelsWithScore() {
        return this.levels.filter(level => level.getScore(localStorage) !== '');
    }
    showWelcomeMessage() {
        new ComputerMessage(['Welcome to *UnitTestGame*!']).add();
        new ComputerMessage(['I am an AI bot specialized in *Test-Driven Development* and *Mutation Testing*.']).add();
    }
    showQuestionSidebar(callback) {
        new ButtonMessage('I want a sidebar for terms with a purple background', () => callback()).add();
    }
    showUnittestgamePanel() {
        const methodologies = this.methodologies.map(methodology => methodology.name()).join(' and ');
        new Panel('UnitTestGame', [
            `Learn to write effective unit tests using ${methodologies}. ` +
                '[Give feedback](mailto:feedback@unittestgame.com)',
        ]).show();
    }
    showInvitationMessage() {
        new ComputerMessage(['What do you want to do now?']).add();
    }
    levelDescription(level) {
        const index = this.levels.findIndex(otherLevel => otherLevel === level);
        return `Level ${index + 1} - ${level.description()}`;
    }
    showLevelsPanel() {
        const levels = this.getLevelsWithScore();
        if (levels.length > 0) {
            new Panel('Levels', levels.map(level => new Div().appendText(`${this.levelDescription(level)}: ${level.getScore(localStorage)}`))).show();
        }
    }
    showNextLevel() {
        const nextLevel = this.levels.find(level => level.getScore(localStorage) === '');
        if (nextLevel && !nextLevel.getExampleSeen(localStorage)) {
            new ButtonMessage(`I want to see an example of ${nextLevel.methodologyName()}`, () => nextLevel.showExample(() => this.setExampleSeen(nextLevel))).add();
        }
        else if (nextLevel)
            new ButtonMessage(`I want to play ${this.levelDescription(nextLevel)}`, () => this.play(nextLevel)).add();
        else
            new ButtonMessage('I want to quit', () => window.close()).add();
    }
    setExampleSeen(nextLevel) {
        nextLevel.setExampleSeen(localStorage);
        this.continue();
    }
}
