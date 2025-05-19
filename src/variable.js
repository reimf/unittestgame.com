import { Input, Label, Paragraph, Span } from './html.js';
export class Variable {
    constructor(label, name) {
        this.value = '';
        this.disabled = false;
        this.label = label;
        this.name = name;
    }
    setValue(value) {
        this.value = value;
        return this;
    }
    setDisabled(disabled) {
        this.disabled = disabled;
        return this;
    }
}
export class RadioVariable extends Variable {
    constructor(label, name, texts) {
        super(label, name);
        this.texts = texts;
    }
    getInput(value) {
        return value;
    }
    toHtml() {
        const radioButtons = this.texts.map(text => {
            const input = new Input().setType('radio').setName(this.name).setValue(text).setChecked(text === this.value).setDisabled(this.disabled).setRequired();
            return new Label().appendChild(input).appendText(text);
        });
        const paragraph = new Paragraph().appendChild(new Span().appendText(this.label)).appendChildren(radioButtons);
        return paragraph;
    }
    format(value) {
        return value === undefined ? 'undefined' : `"${value}"`;
    }
}
export class BooleanVariable extends Variable {
    constructor(label, name) {
        super(label, name);
    }
    getInput(value) {
        return value === 'true';
    }
    toHtml() {
        const radioButtons = ['true', 'false'].map(text => {
            const input = new Input().setType('radio').setName(this.name).setValue(text).setChecked(text === this.value).setDisabled(this.disabled).setRequired();
            return new Label().appendChild(input).appendText(text);
        });
        const paragraph = new Paragraph().appendChild(new Span().appendText(this.label)).appendChildren(radioButtons);
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
    getInput(value) {
        return value;
    }
    toHtml() {
        const input = new Input().setType('text').setName(this.name).setAutocomplete(false).setValue(this.value).addClass(this.value ? 'preset' : 'empty').setDisabled(this.disabled).setRequired();
        const label = new Label().appendChild(new Span().appendText(this.label)).appendChild(input);
        return new Paragraph().appendChild(label);
    }
    format(value) {
        return value === undefined ? 'undefined' : `"${value}"`;
    }
}
export class IntegerVariable extends Variable {
    constructor(label, name) {
        super(label, name);
    }
    getInput(value) {
        return Number(value);
    }
    toHtml() {
        const displayValue = this.value ? Number(this.value).toFixed() : '';
        const input = new Input().setType('text').setName(this.name).setAutocomplete(false).setValue(displayValue).addClass(displayValue ? 'preset' : 'empty').setDisabled(this.disabled).setRequired().setPattern('[0-9]+');
        const label = new Label().appendChild(new Span().appendText(this.label)).appendChild(input);
        return new Paragraph().appendChild(label);
    }
    format(value) {
        return value === undefined ? 'undefined' : value;
    }
}
export class FloatVariable extends Variable {
    constructor(label, name) {
        super(label, name);
    }
    getInput(value) {
        return Number(value);
    }
    toHtml() {
        const displayValue = this.value ? Number(this.value).toFixed(1) : '';
        const input = new Input().setType('text').setName(this.name).setAutocomplete(false).setValue(displayValue).addClass(displayValue ? 'preset' : 'empty').setDisabled(this.disabled).setRequired().setPattern('[0-9]+(\.[0-9])?');
        const label = new Label().appendChild(new Span().appendText(this.label)).appendChild(input);
        return new Paragraph().appendChild(label);
    }
    format(value) {
        return value === undefined ? 'undefined' : value;
    }
}
