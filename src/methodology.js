import { ComputerMessage } from './frame.js';
export class Methodology {
    getExampleSeen(storage) {
        return storage.getItem(this.name()) === 'true';
    }
    setExampleSeen(storage) {
        storage.setItem(this.name(), 'true');
    }
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
