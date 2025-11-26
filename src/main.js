import { Config } from './config.js';
import { Panel, ComputerMessage, QuestionMessage } from './frame.js';
import { Div, Span, Paragraph } from './html.js';
export class Main {
    lng = (new URL(window.location.href)).searchParams.get('lng') || navigator.language.split('-')[0];
    config = new Config(this.lng);
    locale = this.config.locale;
    levels = this.config.allLevels();
    start() {
        this.showWelcomeMessage();
        this.showAboutPanel();
        this.showBasicDefinitionTestDrivenDevelopment();
        this.showBasicDefinitionMutationTesting();
        this.continue();
    }
    continue() {
        this.showLevelOverviewPanel();
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
    showLevelOverviewPanel() {
        const nextLevel = this.levels.find(level => !level.isFinished());
        const cells = this.levels.map(level => {
            const emoji = level.emoji(nextLevel);
            const state = level === nextLevel || level.isFinished() ? 'unlocked' : 'locked';
            return new Span().addClass('cell').addClass(state).appendChildren([
                new Span().addClass('number').appendText(`${level.levelNumber}`),
                new Span().addClass('emoji').appendText(emoji)
            ]);
        });
        const div = new Div().addClass('level-board').appendChildren(cells);
        const paragraph = new Paragraph().appendChild(div);
        new Panel('level-overview', this.locale.levelOverview(), [paragraph]).show();
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
