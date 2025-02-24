import { Input, Label, Div } from './html.js';
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
        this.texts = texts;
    }
    value() {
        const input = document.querySelector(`input[name="${this.name}"]:checked`);
        return input.value;
    }
    toHtml() {
        const radioButtons = this.texts.map(text => {
            const input = new Input('radio');
            input.name(this.name);
            input.value(text);
            const label = new Label();
            label.appendChild(input);
            label.appendText(text);
            return label;
        });
        const div = new Div();
        div.appendText(this.label);
        div.appendChildren(radioButtons);
        return div;
    }
    format(value) {
        return `"${value}"`;
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
        const input = new Input('checkbox');
        input.name(this.name);
        const label = new Label();
        label.appendChild(input);
        label.appendText(this.label);
        const div = new Div();
        div.appendChild(label);
        return div;
    }
    format(value) {
        return value.toString();
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
        const input = new Input('text');
        input.name(this.name);
        input.autocomplete(false);
        const label = new Label();
        label.appendText(this.label);
        label.appendChild(input);
        const div = new Div();
        div.appendChild(label);
        return div;
    }
    format(value) {
        return `"${value}"`;
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
        const input = new Input('number');
        input.name(this.name);
        input.autocomplete(false);
        const label = new Label();
        label.appendText(this.label);
        label.appendChild(input);
        const div = new Div();
        div.appendChild(label);
        return div;
    }
    format(value) {
        return value.toString();
    }
}
