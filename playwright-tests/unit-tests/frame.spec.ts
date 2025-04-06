import { test, expect } from '@playwright/test'
import { Panel, ComputerMessage, HumanMessage, ButtonMessage } from '../../src/frame.js'

  
test.describe('class Frame', () => {
    test('subclass Panel', () => {
        const panel = new Panel('My Score', ['Level1: 100%'])
        expect(panel.toString()).toBe('<section id="my-score"><header>My Score</header><div><p>Level1: 100%</p></div></section>')
    })

    test('subclass ComputerMessage', () => {
        const computerMessage = new ComputerMessage(['Hello', 'World']).appendProcessing()
        expect(computerMessage.toString()).toBe('<section class="computer"><div><p class="processing">Hello</p><p>World</p></div></section>')
    })

    test('subclass HumanMessage', () => {
        const humanMessage = new HumanMessage(['Hello', 'World'])
        expect(humanMessage.toString()).toBe('<section class="human"><div><p>Hello</p><p>World</p></div></section>')
    })

    test('subclass ButtonMessage', () => {
        const buttonMessage = new ButtonMessage('Hello', () => {})
        expect(buttonMessage.toString()).toBe('<section class="human"><div><p><button>Hello</button></p></div></section>')
    })
})
