import { Panel, ComputerMessage } from './frame.js';
export class Methodology {
    showUnitTestsPanel(unitTests) {
        new Panel('Unit Tests', unitTests.length === 0
            ? ['You have not written any unit tests yet.']
            : unitTests.map(unitTest => unitTest.toString())).show();
    }
    showIncorrectUnitTestMessage(penaltyIncorrectUnitTest) {
        new ComputerMessage(['I did NOT add the unit test, because it is NOT correct.']).replace();
        new ComputerMessage([`The cost for trying to add an incorrect unit test is ${penaltyIncorrectUnitTest}%.`]).show();
    }
    showMinimumScoreEndMessage(score) {
        new ComputerMessage([
            'You have to retry this level, ' +
                `because your score dropped to ${score}%.`,
        ]).show();
    }
}
