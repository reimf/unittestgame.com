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
    getValue() {
        const input = document.querySelector(`input[name="${this.name}"]:checked`);
        return input.value;
    }
    toHtml() {
        const radioButtons = this.texts.map(text => {
            const input = new Input().setType('radio').setName(this.name).setValue(text);
            const label = new Label().appendChild(input).appendText(text);
            return label;
        });
        const paragraph = new Paragraph().appendText(this.label).appendChildren(radioButtons);
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
    getValue() {
        const input = document.querySelector(`input[name="${this.name}"]`);
        return input.checked;
    }
    toHtml() {
        const input = new Input().setType('checkbox').setName(this.name);
        const label = new Label().appendChild(input).appendText(this.label);
        const paragraph = new Paragraph().appendChild(label);
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
    getValue() {
        const input = document.querySelector(`input[name="${this.name}"]`);
        return input.value;
    }
    toHtml() {
        const input = new Input().setType('text').setName(this.name).setAutocomplete(false);
        const label = new Label().appendText(this.label).appendChild(input);
        const paragraph = new Paragraph().appendChild(label);
        return paragraph;
    }
    format(value) {
        return value === undefined ? 'undefined' : `"${value}"`;
    }
}
export class NumberVariable extends TextVariable {
}
