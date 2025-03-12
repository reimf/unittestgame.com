import { Panel, ComputerMessage } from './frame.js';
import { Paragraph } from './html.js';
export class Game {
    constructor() {
        this.name = this.constructor.name.replace(/(?<=[a-z])(?=[A-Z])/g, ' ');
    }
    showUnitTestsPanel(unitTests) {
        new Panel('Unit Tests', unitTests.length === 0
            ? [new Paragraph().text('You have not written any unit tests yet.')]
            : unitTests.map(unitTest => new Paragraph().text(unitTest.toString()))).show();
    }
    showIncorrectUnitTestMessage(penaltyIncorrectUnitTest) {
        new ComputerMessage([
            new Paragraph().text('I did NOT add the unit test, because it is NOT correct.'),
            new Paragraph().text(`The cost for trying to add an incorrect unit test is ${penaltyIncorrectUnitTest}%.`),
        ]).show();
    }
    showScorePanel(description, score) {
        new Panel('Score', [new Paragraph().text(`${description}: ${score}%`)]).show();
    }
    showMinimumScoreEndMessage(score) {
        new ComputerMessage([
            new Paragraph().text('You have to retry this level, ' +
                `because your score dropped to ${score}%.`),
        ]).show();
    }
}
