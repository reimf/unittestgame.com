import { ComputerMessage } from './frame.js';
import { Completed } from './completed.js';
export class Methodology {
    constructor() {
        this.isExampleSeen = new Completed(`${this.name()} - Example Seen`);
    }
    getExampleSeen() {
        return this.isExampleSeen.get();
    }
    setExampleSeen() {
        this.isExampleSeen.set();
    }
    showIncorrectUnitTestMessage() {
        new ComputerMessage(['I did NOT add the unit test, because it is NOT correct.']).add();
    }
}
