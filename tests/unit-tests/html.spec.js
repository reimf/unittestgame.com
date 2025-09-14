import { test, expect } from '@playwright/test';
import { Span, Div, Section, Code, Label, Paragraph, Form, Header, Input, Bold, Italic, Anchor } from '../../src/html.js';
import { Translation } from '../../src/translation.js';
test.describe('class Html', () => {
    test('appends text', () => {
        const header = new Header().appendTranslation(new Translation('abc'));
        expect(header.toString()).toBe('<header>abc</header>');
    });
    test('appends child', () => {
        const span = new Span().appendMarkdown(new Translation('abc'));
        const header = new Header().appendChild(span);
        expect(header.toString()).toBe('<header><span>abc</span></header>');
    });
    test('appends children', () => {
        const span1 = new Span().appendMarkdown(new Translation('abc'));
        const span2 = new Span().appendMarkdown(new Translation('def'));
        const header = new Header().appendChildren([span1, span2]);
        expect(header.toString()).toBe('<header><span>abc</span><span>def</span></header>');
    });
    test('prepends child', () => {
        const span1 = new Span().appendMarkdown(new Translation('abc'));
        const span2 = new Span().appendMarkdown(new Translation('def'));
        const header = new Header().appendChild(span2);
        header.prependChild(span1);
        expect(header.toString()).toBe('<header><span>abc</span><span>def</span></header>');
    });
    test('appends bold in markdown', () => {
        const header = new Header().appendMarkdown(new Translation('this is **bold**'));
        expect(header.toString()).toBe('<header>this is <b>bold</b></header>');
    });
    test('appends italic in markdown', () => {
        const header = new Header().appendMarkdown(new Translation('this is *italic*'));
        expect(header.toString()).toBe('<header>this is <i>italic</i></header>');
    });
    test('appends anchor in markdown', () => {
        const header = new Header().appendMarkdown(new Translation('this is a [website](https://example.com)'));
        expect(header.toString()).toBe('<header>this is a <a href="https://example.com">website</a></header>');
    });
    test('has input', () => {
        const input = new Input();
        expect(input.toString()).toBe('<input></input>');
    });
    test('has form', () => {
        const form = new Form().onSubmit(_ => { });
        expect(form.toString()).toBe('<form></form>');
    });
    test('has header', () => {
        const header = new Header().appendTranslation(new Translation('title'));
        expect(header.toString()).toBe('<header>title</header>');
    });
    test('has paragraph', () => {
        const paragraph = new Paragraph().appendTranslation(new Translation('text'));
        expect(paragraph.toString()).toBe('<p>text</p>');
    });
    test('has button', () => {
        const button = new Anchor();
        expect(button.toString()).toBe('<a></a>');
    });
    test('has label', () => {
        const label = new Label().appendTranslation(new Translation('text'));
        expect(label.toString()).toBe('<label>text</label>');
    });
    test('has code', () => {
        const code = new Code().appendTranslation(new Translation('text'));
        expect(code.toString()).toBe('<code>text</code>');
    });
    test('has section', () => {
        const section = new Section().appendTranslation(new Translation('text'));
        expect(section.toString()).toBe('<section>text</section>');
    });
    test('has div', () => {
        const div = new Div().appendTranslation(new Translation('text'));
        expect(div.toString()).toBe('<div>text</div>');
    });
    test('has span', () => {
        const span = new Span().appendTranslation(new Translation('text'));
        expect(span.toString()).toBe('<span>text</span>');
    });
    test('has italic', () => {
        const italic = new Italic().appendTranslation(new Translation('text'));
        expect(italic.toString()).toBe('<i>text</i>');
    });
    test('has bold', () => {
        const bold = new Bold().appendTranslation(new Translation('text'));
        expect(bold.toString()).toBe('<b>text</b>');
    });
});
