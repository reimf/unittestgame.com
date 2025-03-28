import { ComputerMessage } from './frame.js';
export class Methodology {
    showIncorrectUnitTestMessage(penaltyIncorrectUnitTest) {
        new ComputerMessage(['I did NOT add the unit test, because it is NOT correct.']).add();
        new ComputerMessage([`The cost for trying to add an incorrect unit test is ${penaltyIncorrectUnitTest}%.`]).add();
    }
    showMinimumScoreEndMessage(score) {
        new ComputerMessage([
            'You have to retry this level, ' +
                `because your score dropped to ${score}%.`,
        ]).add();
    }
}
