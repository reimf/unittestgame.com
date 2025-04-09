import { ComputerMessage } from './frame.js';
import { StoredValue } from './stored_value.js';
export class Methodology {
    constructor() {
        this.exampleSeen = new StoredValue(`${this.name()} - Example Seen`);
    }
    getExampleSeen(storage) {
        return this.exampleSeen.get(storage);
    }
    setExampleSeen(storage) {
        this.exampleSeen.set(storage);
    }
    showIncorrectUnitTestMessage() {
        new ComputerMessage(['I did NOT add the unit test, because it is NOT correct.']).add();
    }
}
