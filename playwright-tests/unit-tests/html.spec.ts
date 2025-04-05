import { test, expect } from '@playwright/test'
import { Header, Bold, Italic, Anchor, Text } from '../../src/html.js'

  
test.describe('class Html', () => {
    test('appends text', () => {
        const header = new Header().appendText('abc')
        const child = header.children[0] as Text
        expect(child.text).toBe('abc')
    })

    test('appends child', () => {
        const header = new Header().appendChild(new Text('abc'))
        const child = header.children[0] as Text
        expect(child.text).toBe('abc')
    })

    test('appends children', () => {
        const header = new Header().appendChildren([new Text('abc'), new Text('def')])
        const child1 = header.children[0] as Text
        expect(child1.text).toBe('abc')
        const child2 = header.children[1] as Text
        expect(child2.text).toBe('def')
    })

    test('prepends child', () => {
        const header = new Header().appendChild(new Text('def'))
        header.prependChild(new Text('abc'))
        const child1 = header.children[0] as Text
        expect(child1.text).toBe('abc')
        const child2 = header.children[1] as Text
        expect(child2.text).toBe('def')
    })

    test('appends markdown bold', () => {
        const header = new Header().appendMarkdown('this is **bold**')
        const child1 = header.children[0] as Text
        const child2 = header.children[1]
        expect(child1.text).toBe('this is ')
        expect(child2).toBeInstanceOf(Bold)
        const bold = child2 as Bold
        const boldText = bold.children[0] as Text
        expect(boldText.text).toBe('bold')
    })

    test('appends markdown italic', () => {
        const header = new Header().appendMarkdown('this is *italic*')
        const child1 = header.children[0] as Text
        const child2 = header.children[1]
        expect(child1.text).toBe('this is ')
        expect(child2).toBeInstanceOf(Italic)
        const italic = child2 as Italic
        const italicText = italic.children[0] as Text
        expect(italicText.text).toBe('italic')
    })

    test('appends markdown anchor', () => {
        const header = new Header().appendMarkdown('this is a [website](https://example.com)')
        const child1 = header.children[0] as Text
        expect(child1.text).toBe('this is a ')
        const child2 = header.children[1]
        expect(child2).toBeInstanceOf(Anchor)
        const anchor = child2 as Anchor
        expect(anchor.href).toBe('https://example.com')
        const anchorText = anchor.children[0] as Text
        expect(anchorText.text).toBe('website')
    })
})
