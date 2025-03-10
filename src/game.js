import { Panel } from './frame.js';
import { Paragraph } from './html.js';
export class Game {
    constructor() {
        this.name = this.constructor.name.replace(/(?<=[a-z])(?=[A-Z])/g, ' ');
    }
    showUnitTestsPanel(unitTests) {
        new Panel('Unit Tests', unitTests.length === 0
            ? [new Paragraph().appendText('You have not written any unit tests yet.')]
            : unitTests.map(unitTest => new Paragraph().appendText(unitTest.toString()))).show();
    }
    showScorePanel(description, score) {
        new Panel('Score', [
            new Paragraph().appendText(`${description}: ${score}%`),
        ]).show();
    }
}
