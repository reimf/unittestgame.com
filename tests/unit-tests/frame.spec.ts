import { test, expect } from '@playwright/test'
import { Panel, ComputerMessage, HumanMessage, QuestionMessage } from '../../src/frame.js'


test.describe('class Frame', () => {
    test('subclass Panel', () => {
        const panel = new Panel('Current Level', ['Level 1'])
        expect(panel.toString()).toBe('<section id="current-level"><header>Current Level</header><div><p>Level 1</p></div></section>')
    })

    test('subclass ComputerMessage', () => {
        const computerMessage = new ComputerMessage(['Hello', 'World'])
        expect(computerMessage.toString()).toBe('<section class="computer"><div><p>Hello</p><p>World</p></div></section>')
    })

    test('subclass HumanMessage', () => {
        const humanMessage = new HumanMessage(['Hello', 'World'])
        expect(humanMessage.toString()).toBe('<section class="human"><div><p>Hello</p><p>World</p></div></section>')
    })

    test('subclass QuestionMessage', () => {
        const questionMessage = new QuestionMessage('Hello', () => {})
        expect(questionMessage.toString()).toBe('<section class="human"><div><button>Hello</button></div></section>')
    })
})
