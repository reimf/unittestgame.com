import { test, expect } from '@playwright/test'
import { JSDOM } from 'jsdom'
import { Panel, ComputerMessage, HumanMessage, QuestionMessage } from '../../src/frame.js'
import { Locale } from '../../src/locale.js'

const { document } = new JSDOM('<!DOCTYPE html>').window
global.document = document

test.describe('class Frame', () => {
    test('subclass Panel', () => {
        const panel = new Panel('current-level', Locale.bless('Current Level'), [Locale.bless('Level 1')])
        expect(panel.getElement().outerHTML).toBe(
            '<section id="current-level">' +
                '<header>Current Level</header>' +
                '<div>' +
                    '<p>Level 1</p>' +
                '</div>' +
            '</section>'
        )
    })

    test('subclass ComputerMessage', () => {
        const computerMessage = new ComputerMessage([Locale.bless('Hello'), Locale.bless('World')])
        expect(computerMessage.getElement().outerHTML).toBe(
            '<section class="computer">' +
                '<div>' +
                   '<p>Hello</p>' +
                    '<p>World</p>' +
                '</div>' +
            '</section>'
        )
    })

    test('subclass HumanMessage', () => {
        const humanMessage = new HumanMessage([Locale.bless('Hello'), Locale.bless('World')])
        expect(humanMessage.getElement().outerHTML).toBe(
            '<section class="human">' +
                '<div>' +
                    '<p>Hello</p>' +
                    '<p>World</p>' +
                '</div>' +
            '</section>'
        )
    })

    test('subclass QuestionMessage', () => {
        const questionMessage = new QuestionMessage(Locale.bless('Hello'), () => {})
        expect(questionMessage.getElement().outerHTML).toBe(
            '<section class="human">' +
                '<div>' +
                   '<button>Hello</button>' +
                '</div>' +
            '</section>'
        )
    })
})
