import { Panel, ComputerMessage, QuestionMessage } from './frame.js';
import { Div } from './html.js';
import { MutationTesting } from './level-mutation-testing.js';
import { TestDrivenDevelopment } from './level-test-driven-development.js';
import { Locale } from './locale.js';
import { BatteryLevel } from './use-case-battery-level.js';
import { EvenOdd } from './use-case-even-odd.js';
import { FizzBuzz } from './use-case-fizz-buzz.js';
import { FloatFormat } from './use-case-float-format.js';
import { LeapYear } from './use-case-leap-year.js';
import { PasswordStrength } from './use-case-password-strength.js';
import { Review } from './use-case-review.js';
import { SpeedDisplay } from './use-case-speed-display.js';
import { TriangleType } from './use-case-triangle-type.js';
import { VotingAge } from './use-case-voting-age.js';
import { Bug } from './bug.js';
export class Main {
    lng = (new URL(window.location.href)).searchParams.get('lng') || navigator.language.split('-')[0];
    locale = new Locale(this.lng);
    batteryLevel = new BatteryLevel(this.locale);
    votingAge = new VotingAge(this.locale);
    evenOdd = new EvenOdd(this.locale);
    fizzBuzz = new FizzBuzz(this.locale);
    review = new Review(this.locale);
    triangleType = new TriangleType(this.locale);
    leapYear = new LeapYear(this.locale);
    floatFormat = new FloatFormat(this.locale);
    passwordStrength = new PasswordStrength(this.locale);
    speedDisplay = new SpeedDisplay(this.locale);
    levels = [
        new TestDrivenDevelopment(this.locale, this.batteryLevel),
        new TestDrivenDevelopment(this.locale, this.votingAge),
        new MutationTesting(this.locale, this.batteryLevel),
        new MutationTesting(this.locale, this.evenOdd),
        new TestDrivenDevelopment(this.locale, this.fizzBuzz),
        new MutationTesting(this.locale, this.triangleType),
        new TestDrivenDevelopment(this.locale, this.review),
        new MutationTesting(this.locale, this.votingAge),
        new TestDrivenDevelopment(this.locale, this.evenOdd),
        new MutationTesting(this.locale, this.review),
        new TestDrivenDevelopment(this.locale, this.triangleType),
        new MutationTesting(this.locale, this.fizzBuzz),
        new TestDrivenDevelopment(this.locale, this.leapYear),
        new MutationTesting(this.locale, this.passwordStrength),
        new TestDrivenDevelopment(this.locale, this.speedDisplay),
        new MutationTesting(this.locale, this.floatFormat),
        new TestDrivenDevelopment(this.locale, this.passwordStrength),
        new MutationTesting(this.locale, this.leapYear),
        new TestDrivenDevelopment(this.locale, this.floatFormat),
        new MutationTesting(this.locale, this.speedDisplay),
    ];
    start() {
        new Bug().start();
        this.showWelcomeMessage();
        this.showAboutPanel();
        this.showBasicDefinitionTestDrivenDevelopment();
        this.showBasicDefinitionMutationTesting();
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
    showBasicDefinitionTestDrivenDevelopment() {
        new Panel('test-driven-development', this.locale.testDrivenDevelopment(), [this.locale.definitionTDD()]).show();
    }
    showBasicDefinitionMutationTesting() {
        new Panel('mutation-testing', this.locale.mutationTesting(), [this.locale.definitionMT()]).show();
    }
    getFinishedLevels() {
        return this.levels.filter(level => level.isFinished());
    }
    showWelcomeMessage() {
        new ComputerMessage([this.locale.welcomeToUnittestgame()]).add();
        new ComputerMessage([this.locale.iAmAnAiBot()]).add();
    }
    showAboutPanel() {
        new Panel('unittestgame', this.locale.about(), [this.locale.learnToWriteEffectiveUnitTests()]).show();
    }
    showInvitationMessage() {
        new ComputerMessage([this.locale.whatDoYouWantToDo()]).add();
    }
    levelDescription(level) {
        const index = this.levels.findIndex(otherLevel => otherLevel === level);
        const emoji = ['🔓', '🥇', '🥈', '🥉'].at(level.isFinished()) || '🥉';
        return this.locale.level(index + 1, this.levels.length, level.description(), emoji);
    }
    showFinishedLevelsPanel(previousLevel) {
        const finishedLevels = this.getFinishedLevels();
        if (finishedLevels.length > 0) {
            new Panel('finished-levels', this.locale.finishedLevels(), finishedLevels.map(level => new Div().appendText(this.levelDescription(level)).addClass(level === previousLevel ? 'new' : 'old'))).show();
        }
    }
    showNextLevel() {
        const nextLevel = this.levels.find(level => !level.isFinished());
        if (nextLevel)
            new QuestionMessage(this.locale.iWantToPlayTheNextLevel(this.levelDescription(nextLevel)), () => this.play(nextLevel)).add();
        else
            new QuestionMessage(this.locale.iPlayedAllTheLevels(), () => this.quit()).add();
    }
    quit() {
        new ComputerMessage([this.locale.wellDoneYouCanCloseThisTab()]).add();
    }
}
