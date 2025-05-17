import { Completed } from './completed.js';
import { Panel, ComputerMessage, QuestionMessage } from './frame.js';
import { Div } from './html.js';
import { MutationTesting } from './level-mutation-testing.js';
import { TestDrivenDevelopment } from './level-test-driven-development.js';
import { BatteryLevel } from './use-case-battery-level.js';
import { VotingAge } from './use-case-voting-age.js';
import { EvenOdd } from './use-case-even-odd.js';
import { FizzBuzz } from './use-case-fizz-buzz.js';
import { TriangleType } from './use-case-triangle-type.js';
import { LeapYear } from './use-case-leap-year.js';
import { FloatFormat } from './use-case-float-format.js';
import { PasswordStrength } from './use-case-password-strength.js';
import { SpeedDisplay } from './use-case-speed-display.js';
export class Main {
    constructor() {
        this.batteryLevel = new BatteryLevel();
        this.votingAge = new VotingAge();
        this.evenOdd = new EvenOdd();
        this.fizzBuzz = new FizzBuzz();
        this.triangleType = new TriangleType();
        this.leapYear = new LeapYear();
        this.floatFormat = new FloatFormat();
        this.passwordStrength = new PasswordStrength();
        this.speedDisplay = new SpeedDisplay();
        this.exampleTestDrivenDevelopment = new TestDrivenDevelopment(this.batteryLevel);
        this.exampleMutationTesting = new MutationTesting(this.batteryLevel);
        this.examples = [this.exampleTestDrivenDevelopment, this.exampleMutationTesting];
        this.levels = [
            this.exampleTestDrivenDevelopment,
            new TestDrivenDevelopment(this.votingAge),
            this.exampleMutationTesting,
            new MutationTesting(this.evenOdd),
            new TestDrivenDevelopment(this.fizzBuzz),
            new MutationTesting(this.triangleType),
            new TestDrivenDevelopment(this.evenOdd),
            new MutationTesting(this.votingAge),
            new TestDrivenDevelopment(this.triangleType),
            new MutationTesting(this.fizzBuzz),
            new TestDrivenDevelopment(this.leapYear),
            new MutationTesting(this.passwordStrength),
            new TestDrivenDevelopment(this.speedDisplay),
            new MutationTesting(this.floatFormat),
            new TestDrivenDevelopment(this.passwordStrength),
            new MutationTesting(this.leapYear),
            new TestDrivenDevelopment(this.floatFormat),
            new MutationTesting(this.speedDisplay),
        ];
        this.isSidebarShown = new Completed('Main - Sidebar Shown');
    }
    start() {
        this.showWelcomeMessage();
        if (this.isSidebarShown.get())
            this.sidebar();
        else
            this.showQuestionSidebar(() => this.sidebar());
    }
    sidebar() {
        this.isSidebarShown.set(1);
        this.showUnittestgamePanel();
        for (const example of this.examples)
            example.showBasicDefinition();
        this.continue();
    }
    continue(previousLevel) {
        this.showFinishedLevelsPanel(previousLevel);
        this.showInvitationMessage();
        this.showNextLevel();
    }
    play(level) {
        Panel.removeAll();
        level.play(() => this.continue(level));
    }
    getFinishedLevels() {
        return this.levels.filter(level => level.isFinished());
    }
    showWelcomeMessage() {
        new ComputerMessage(['Welcome to *UnitTestGame*!']).add();
        new ComputerMessage(['I am an AI bot specialized in *Test-Driven Development* and *Mutation Testing*.']).add();
    }
    showQuestionSidebar(callback) {
        new QuestionMessage('I want a sidebar with information on terms with a purple background', () => callback()).add();
    }
    showUnittestgamePanel() {
        const names = this.examples.map(example => example.name()).join(' and ');
        new Panel('UnitTestGame', [
            `Learn to write effective unit tests using ${names}. ` +
                '[Give feedback](mailto:feedback@unittestgame.com)',
        ]).show();
    }
    showInvitationMessage() {
        new ComputerMessage(['What do you want to do?']).add();
    }
    levelDescription(level) {
        const index = this.levels.findIndex(otherLevel => otherLevel === level);
        const medal = ['', '🥇', '🥈', '🥉'].at(Math.min(3, level.isFinished()));
        return [`Level ${index + 1}`, level.description(), medal].filter(Boolean).join(' - ');
    }
    showFinishedLevelsPanel(previousLevel) {
        const finishedLevels = this.getFinishedLevels();
        if (finishedLevels.length > 0) {
            new Panel('Finished Levels', finishedLevels.map(level => new Div().appendText(this.levelDescription(level)).addClass(level === previousLevel ? 'new' : ''))).show();
        }
    }
    showNextLevel() {
        const nextLevel = this.levels.find(level => !level.isFinished());
        if (nextLevel)
            new QuestionMessage(`I want to play ${this.levelDescription(nextLevel)}`, () => this.play(nextLevel)).add();
        else
            new QuestionMessage('I played all the levels', () => this.quit()).add();
    }
    quit() {
        new ComputerMessage(['Well done! You can close this tab now and start writing effective unit tests for your real-world projects.']).add();
    }
}
