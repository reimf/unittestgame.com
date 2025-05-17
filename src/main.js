import { Completed } from './completed.js';
import { Panel, ComputerMessage, QuestionMessage } from './frame.js';
import { Div } from './html.js';
import { Level } from './level.js';
import { MutationTesting } from './methodology-mutation-testing.js';
import { TestDrivenDevelopment } from './methodology-test-driven-development.js';
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
        this.testDrivenDevelopment = new TestDrivenDevelopment();
        this.mutationTesting = new MutationTesting();
        this.methodologies = [this.testDrivenDevelopment, this.mutationTesting];
        this.batteryLevel = new BatteryLevel();
        this.votingAge = new VotingAge();
        this.evenOdd = new EvenOdd();
        this.fizzBuzz = new FizzBuzz();
        this.triangleType = new TriangleType();
        this.leapYear = new LeapYear();
        this.floatFormat = new FloatFormat();
        this.passwordStrength = new PasswordStrength();
        this.speedDisplay = new SpeedDisplay();
        this.levels = [
            new Level(this.testDrivenDevelopment, this.batteryLevel),
            new Level(this.testDrivenDevelopment, this.votingAge),
            new Level(this.mutationTesting, this.batteryLevel),
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
        for (const methodology of this.methodologies)
            methodology.showBasicDefinition();
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
        const methodologies = this.methodologies.map(methodology => methodology.name()).join(' and ');
        new Panel('UnitTestGame', [
            `Learn to write effective unit tests using ${methodologies}. ` +
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
