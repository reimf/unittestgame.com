import { test, expect } from '@playwright/test'
import { JSDOM } from 'jsdom'
import { Span, Div, Section, Code, CodeBlock, Label, Paragraph, Form, Header, Input, Italic, Anchor, Submit, Select, Option, Img } from '../../src/html.js'
import { ConversationLanguage } from '../../src/conversation-language-base.js'

const { document } = new JSDOM('<!DOCTYPE html>').window
global.document = document

test.describe('class Html', () => {
    test('appends text', () => {
        const header = new Header().appendText(ConversationLanguage.bless('abc'))
        expect(header.getElement().outerHTML).toBe(
            '<header>abc</header>'
        )
    })

    test('appends child', () => {
        const span = new Span().appendMarkdown(ConversationLanguage.bless('abc'))
        const header = new Header().appendChild(span)
        expect(header.getElement().outerHTML).toBe(
            '<header>' +
                '<span>abc</span>' +
            '</header>'
        )
    })

    test('appends children', () => {
        const span1 = new Span().appendMarkdown(ConversationLanguage.bless('abc'))
        const span2 = new Span().appendMarkdown(ConversationLanguage.bless('def'))
        const header = new Header().appendChildren([span1, span2])
        expect(header.getElement().outerHTML).toBe(
            '<header>' +
                '<span>abc</span>' +
                '<span>def</span>' +
            '</header>'
        )
    })

    test('prepends child', () => {
        const span1 = new Span().appendMarkdown(ConversationLanguage.bless('abc'))
        const span2 = new Span().appendMarkdown(ConversationLanguage.bless('def'))
        const header = new Header().appendChild(span2)
        header.prependChild(span1)
        expect(header.getElement().outerHTML).toBe(
            '<header>' +
                '<span>abc</span>' +
                '<span>def</span>' +
            '</header>'
        )
    })

    test('appends italic in markdown', () => {
        const header = new Header().appendMarkdown(ConversationLanguage.bless('this is *italic* and this is not'))
        expect(header.getElement().outerHTML).toBe(
            '<header>this is <i>italic</i> and this is not</header>'
        )
    })

    test('appends code in markdown', () => {
        const header = new Header().appendMarkdown(ConversationLanguage.bless('this is `code` and this is not'))
        expect(header.getElement().outerHTML).toBe(
            '<header>this is <code>code</code> and this is not</header>'
        )
    })

    test('appends anchor in markdown', () => {
        const header = new Header().appendMarkdown(ConversationLanguage.bless('this is a [website](https://example.com)'))
        expect(header.getElement().outerHTML).toBe(
            '<header>this is a <a href="https://example.com">website</a></header>'
        )
    })

    test('appends img in markdown', () => {
        const header = new Header().appendMarkdown(ConversationLanguage.bless('this is a ![example](https://example.com/image.png)'))
        expect(header.getElement().outerHTML).toBe(
            '<header>this is a <img src="https://example.com/image.png" alt="example"></header>'
        )
    })

    test('has input', () => {
        const input = new Input().setType('text').setName('postcode').setValue('value').setRequired().setPattern(/[0-9]{4}[A-Z]{2}/).setTitle('ongeldige postcode')
        expect(input.getElement().outerHTML).toBe(
            '<input type="text" autocomplete="off" name="postcode" required="" pattern="[0-9]{4}[A-Z]{2}" title="ongeldige postcode">'
        )
    })

    test('has submit', () => {
        const submit = new Submit(ConversationLanguage.bless('Click me'))
        expect(submit.getElement().outerHTML).toBe(
            '<input type="submit" value="Click me">'
        )
    })

    test('has form', () => {
        const form = new Form(_ => {})
        expect(form.getElement().outerHTML).toBe(
            '<form></form>'
        )
    })

    test('has header', () => {
        const header = new Header().appendText(ConversationLanguage.bless('title'))
        expect(header.getElement().outerHTML).toBe(
            '<header>title</header>'
        )
    })

    test('has paragraph', () => {
        const paragraph = new Paragraph().appendText(ConversationLanguage.bless('text'))
        expect(paragraph.getElement().outerHTML).toBe(
            '<p>text</p>'
        )
    })

    test('has anchor', () => {
        const anchor = new Anchor('https://example.com').appendText(ConversationLanguage.bless('website'))
        expect(anchor.getElement().outerHTML).toBe(
            '<a href="https://example.com">website</a>'
        )
    })

    test('has label', () => {
        const label = new Label().appendText(ConversationLanguage.bless('text'))
        expect(label.getElement().outerHTML).toBe(
            '<label>text</label>'
        )
    })

    test('has code', () => {
        const code = new Code().appendText(ConversationLanguage.bless('text'))
        expect(code.getElement().outerHTML).toBe(
            '<code>text</code>'
        )
    })

    test('has code block', () => {
        const codeBlock = new CodeBlock().appendText(ConversationLanguage.bless('text'))
        expect(codeBlock.getElement().outerHTML).toBe(
            '<code class="block">text</code>'
        )
    })

    test('has section', () => {
        const section = new Section().appendText(ConversationLanguage.bless('text'))
        expect(section.getElement().outerHTML).toBe(
            '<section>text</section>'
        )
    })

    test('has div', () => {
        const div = new Div().appendText(ConversationLanguage.bless('text'))
        expect(div.getElement().outerHTML).toBe(
            '<div>text</div>'
        )
    })

    test('has span', () => {
        const span = new Span().appendText(ConversationLanguage.bless('text'))
        expect(span.getElement().outerHTML).toBe(
            '<span>text</span>'
        )
    })

    test('has italic', () => {
        const italic = new Italic().appendText(ConversationLanguage.bless('text'))
        expect(italic.getElement().outerHTML).toBe(
            '<i>text</i>'
        )
    })

    test('has select', () => {
        const select = new Select(() => {})
            .appendChildren([
                new Option('a', ConversationLanguage.bless('Option A'), false),
                new Option('b', ConversationLanguage.bless('Option B'), true),
            ])
        expect(select.getElement().outerHTML).toBe(
            '<select><option value="a">Option A</option><option value="b" selected="">Option B</option></select>'
        )
    })

    test('has img', () => {
        const img = new Img('https://example.com/image.png', 'example')
        expect(img.getElement().outerHTML).toBe(
            '<img src="https://example.com/image.png" alt="example">'
        )
    })
})
