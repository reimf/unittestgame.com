import { test, expect } from '@playwright/test'
import { Span, Div, Section, Code, Label, Paragraph, Form, Header, Input, Bold, Italic, Anchor, Text } from '../../src/html.js'


test.describe('class Html', () => {
    test('appends text', () => {
        const header = new Header().appendText('abc')
        const child = header.children[0] as Text
        expect(child.toString()).toBe('abc')
    })

    test('appends child', () => {
        const header = new Header().appendChild(new Text('abc'))
        const child = header.children[0] as Text
        expect(child.toString()).toBe('abc')
    })

    test('appends children', () => {
        const header = new Header().appendChildren([new Text('abc'), new Text('def')])
        const child1 = header.children[0] as Text
        expect(child1.toString()).toBe('abc')
        const child2 = header.children[1] as Text
        expect(child2.toString()).toBe('def')
    })

    test('prepends child', () => {
        const header = new Header().appendChild(new Text('def'))
        header.prependChild(new Text('abc'))
        const child1 = header.children[0] as Text
        expect(child1.toString()).toBe('abc')
        const child2 = header.children[1] as Text
        expect(child2.toString()).toBe('def')
    })

    test('appends bold in markdown', () => {
        const header = new Header().appendMarkdown('this is **bold**')
        const child1 = header.children[0] as Text
        const child2 = header.children[1]
        expect(child1.toString()).toBe('this is ')
        expect(child2).toBeInstanceOf(Bold)
        const bold = child2 as Bold
        const boldText = bold.children[0] as Text
        expect(boldText.toString()).toBe('bold')
    })

    test('appends italic in markdown', () => {
        const header = new Header().appendMarkdown('this is *italic*')
        const child1 = header.children[0] as Text
        const child2 = header.children[1]
        expect(child1.toString()).toBe('this is ')
        expect(child2).toBeInstanceOf(Italic)
        const italic = child2 as Italic
        const italicText = italic.children[0] as Text
        expect(italicText.toString()).toBe('italic')
    })

    test('appends anchor in markdown', () => {
        const header = new Header().appendMarkdown('this is a [website](https://example.com)')
        const child1 = header.children[0] as Text
        expect(child1.toString()).toBe('this is a ')
        const child2 = header.children[1]
        expect(child2).toBeInstanceOf(Anchor)
        const anchor = child2 as Anchor
        expect(anchor.href).toBe('https://example.com')
        const anchorText = anchor.children[0] as Text
        expect(anchorText.toString()).toBe('website')
    })

    test('has input', () => {
        const input = new Input()
        expect(input.toString()).toBe('<input></input>')
    })

    test('has form', () => {
        const form = new Form().onSubmit(_ => {})
        expect(form.toString()).toBe('<form></form>')
    })

    test('has header', () => {
        const header = new Header().appendText('title')
        expect(header.toString()).toBe('<header>title</header>')
    })

    test('has paragraph', () => {
        const paragraph = new Paragraph().appendText('text')
        expect(paragraph.toString()).toBe('<p>text</p>')
    })

    test('has button', () => {
        const button = new Anchor()
        expect(button.toString()).toBe('<a></a>')
    })

    test('has label', () => {
        const label = new Label().appendText('text')
        expect(label.toString()).toBe('<label>text</label>')
    })

    test('has code', () => {
        const code = new Code().appendText('text')
        expect(code.toString()).toBe('<code>text</code>')
    })

    test('has section', () => {
        const section = new Section().appendText('text')
        expect(section.toString()).toBe('<section>text</section>')
    })

    test('has div', () => {
        const div = new Div().appendText('text')
        expect(div.toString()).toBe('<div>text</div>')
    })

    test('has span', () => {
        const span = new Span().appendText('text')
        expect(span.toString()).toBe('<span>text</span>')
    })

    test('has italic', () => {
        const italic = new Italic().appendText('text')
        expect(italic.toString()).toBe('<i>text</i>')
    })

    test('has bold', () => {
        const bold = new Bold().appendText('text')
        expect(bold.toString()).toBe('<b>text</b>')
    })
})
