import { Input, Label, Paragraph } from './html.js';
export class Variable {
    constructor(label, name) {
        this.label = label;
        this.name = name;
    }
}
export class RadioVariable extends Variable {
    constructor(label, name, texts) {
        super(label, name);
        this.texts = texts;
    }
    value() {
        const input = document.querySelector(`input[name="${this.name}"]:checked`);
        return input.value;
    }
    toHtml() {
        const radioButtons = this.texts.map(text => {
            const input = new Input().type('radio').name(this.name).value(text);
            const label = new Label().child(input).text(text);
            return label;
        });
        const paragraph = new Paragraph().text(this.label).children(radioButtons);
        return paragraph;
    }
    format(value) {
        return value === undefined ? 'undefined' : `"${value}"`;
    }
}
export class CheckboxVariable extends Variable {
    constructor(label, name) {
        super(label, name);
    }
    value() {
        const input = document.querySelector(`input[name="${this.name}"]`);
        return input.checked;
    }
    toHtml() {
        const input = new Input().type('checkbox').name(this.name);
        const label = new Label().child(input).text(this.label);
        const paragraph = new Paragraph().child(label);
        return paragraph;
    }
    format(value) {
        return value === undefined ? 'undefined' : value.toString();
    }
}
export class TextVariable extends Variable {
    constructor(label, name) {
        super(label, name);
    }
    value() {
        const input = document.querySelector(`input[name="${this.name}"]`);
        return input.value;
    }
    toHtml() {
        const input = new Input().type('text').name(this.name).autocomplete(false);
        const label = new Label().text(this.label).child(input);
        const paragraph = new Paragraph().child(label);
        return paragraph;
    }
    format(value) {
        return value === undefined ? 'undefined' : `"${value}"`;
    }
}
export class NumberVariable extends Variable {
    constructor(label, name) {
        super(label, name);
    }
    value() {
        const input = document.querySelector(`input[name="${this.name}"]`);
        return Number(input.value);
    }
    toHtml() {
        const input = new Input().type('number').name(this.name).autocomplete(false);
        const label = new Label().text(this.label).child(input);
        const paragraph = new Paragraph().child(label);
        return paragraph;
    }
    format(value) {
        return value === undefined ? 'undefined' : value.toString();
    }
}
