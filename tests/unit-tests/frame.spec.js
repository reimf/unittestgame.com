import { test, expect } from '@playwright/test';
import { Panel, ComputerMessage, HumanMessage, QuestionMessage } from '../../src/frame.js';
import { Translation } from '../../src/translation.js';
test.describe('class Frame', () => {
    test('subclass Panel', () => {
        const panel = new Panel('current-level', new Translation('Current Level'), [new Translation('Level 1')]);
        expect(panel.toString()).toBe('<section id="current-level"><header>Current Level</header><div><p>Level 1</p></div></section>');
    });
    test('subclass ComputerMessage', () => {
        const computerMessage = new ComputerMessage([new Translation('Hello'), new Translation('World')]);
        expect(computerMessage.toString()).toBe('<section class="computer"><div><p>Hello</p><p>World</p></div></section>');
    });
    test('subclass HumanMessage', () => {
        const humanMessage = new HumanMessage([new Translation('Hello'), new Translation('World')]);
        expect(humanMessage.toString()).toBe('<section class="human"><div><p>Hello</p><p>World</p></div></section>');
    });
    test('subclass QuestionMessage', () => {
        const questionMessage = new QuestionMessage(new Translation('Hello'), () => { });
        expect(questionMessage.toString()).toBe('<section class="human"><div><button>Hello</button></div></section>');
    });
});
