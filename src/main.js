import { Panel, ComputerMessage, QuestionMessage } from './frame.js';
import { Div, Span } from './html.js';
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
        new TestDrivenDevelopment(this.locale, this.batteryLevel, 1, 20),
        new TestDrivenDevelopment(this.locale, this.votingAge, 2, 20),
        new MutationTesting(this.locale, this.batteryLevel, 3, 20),
        new MutationTesting(this.locale, this.evenOdd, 4, 20),
        new TestDrivenDevelopment(this.locale, this.fizzBuzz, 5, 20),
        new MutationTesting(this.locale, this.triangleType, 6, 20),
        new TestDrivenDevelopment(this.locale, this.review, 7, 20),
        new MutationTesting(this.locale, this.votingAge, 8, 20),
        new TestDrivenDevelopment(this.locale, this.evenOdd, 9, 20),
        new MutationTesting(this.locale, this.review, 10, 20),
        new TestDrivenDevelopment(this.locale, this.triangleType, 11, 20),
        new MutationTesting(this.locale, this.fizzBuzz, 12, 20),
        new TestDrivenDevelopment(this.locale, this.leapYear, 13, 20),
        new MutationTesting(this.locale, this.passwordStrength, 14, 20),
        new TestDrivenDevelopment(this.locale, this.speedDisplay, 15, 20),
        new MutationTesting(this.locale, this.floatFormat, 16, 20),
        new TestDrivenDevelopment(this.locale, this.passwordStrength, 17, 20),
        new MutationTesting(this.locale, this.leapYear, 18, 20),
        new TestDrivenDevelopment(this.locale, this.floatFormat, 19, 20),
        new MutationTesting(this.locale, this.speedDisplay, 20, 20),
    ];
    start() {
        this.showWelcomeMessage();
        this.showAboutPanel();
        this.showBasicDefinitionTestDrivenDevelopment();
        this.showBasicDefinitionMutationTesting();
        this.continue();
    }
    continue() {
        this.showFinishedLevelsPanel();
        this.showInvitationMessage();
        this.showNextLevel();
    }
    play(level) {
        Panel.removeAll();
        level.play(() => this.continue());
    }
    showBasicDefinitionTestDrivenDevelopment() {
        new Panel('test-driven-development', this.locale.testDrivenDevelopment(), [this.locale.definitionTDD()]).show();
    }
    showBasicDefinitionMutationTesting() {
        new Panel('mutation-testing', this.locale.mutationTesting(), [this.locale.definitionMT()]).show();
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
    showFinishedLevelsPanel() {
        const cells = this.levels.map(level => new Span().addClass('cell').appendChildren([
            new Span().addClass('number').appendText(`${level.levelNumber}`),
            new Span().addClass('emoji').appendText(`${level.emoji(this.isNextLevel(level))}`)
        ]));
        const numberOfRows = 4;
        const cellsPerRow = cells.length / numberOfRows;
        const rows = [...Array(numberOfRows)].map((_, index) => new Div().appendChildren(cells.slice(index * cellsPerRow, (index + 1) * cellsPerRow)));
        const table = new Div().addClass('levelnumbers').appendChildren(rows);
        new Panel('finished-levels', this.locale.finishedLevels(), [table]).show();
    }
    isNextLevel(level) {
        return level === this.levels.find(level => !level.isFinished());
    }
    showNextLevel() {
        const nextLevel = this.levels.find(level => !level.isFinished());
        if (nextLevel)
            new QuestionMessage(this.locale.iWantToPlayTheNextLevel(nextLevel.description()), () => this.play(nextLevel)).add();
        else
            new QuestionMessage(this.locale.iPlayedAllTheLevels(), () => this.quit()).add();
    }
    quit() {
        new ComputerMessage([this.locale.wellDoneYouCanCloseThisTab()]).add();
    }
}
