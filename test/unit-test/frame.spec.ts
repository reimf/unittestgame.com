import { test, expect } from '@playwright/test'
import { JSDOM } from 'jsdom'
import { Panel, ComputerMessage, HumanMessage, QuestionMessage } from '../../src/frame.js'
import { ConversationLanguage } from '../../src/conversation-language-base.js'

const { document } = new JSDOM('<!DOCTYPE html>').window
global.document = document

test.describe('class Frame', () => {
    test('subclass Panel', () => {
        const panel = new Panel('current-level', ConversationLanguage.bless('Current Level'), [ConversationLanguage.bless('Level 1')])
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
        const computerMessage = new ComputerMessage([ConversationLanguage.bless('Hello'), ConversationLanguage.bless('World')])
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
        const humanMessage = new HumanMessage([ConversationLanguage.bless('Hello'), ConversationLanguage.bless('World')])
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
        const questionMessage = new QuestionMessage(ConversationLanguage.bless('Hello'), () => {})
        expect(questionMessage.getElement().outerHTML).toBe(
            '<section class="human">' +
                '<div>' +
                   '<button>Hello</button>' +
                '</div>' +
            '</section>'
        )
    })
})
