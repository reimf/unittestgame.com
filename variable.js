"use strict";
class Variable {
    constructor(label, name) {
        this.label = label;
        this.name = name;
    }
}
class RadioVariable extends Variable {
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
            const input = new Input('radio').name(this.name).value(text);
            return new Label().appendChild(input).appendText(text);
        });
        return new Div().appendText(this.label).appendChildren(radioButtons);
    }
}
class CheckboxVariable extends Variable {
    constructor(label, name) {
        super(label, name);
    }
    value() {
        const input = document.querySelector(`input[name="${this.name}"]`);
        return input.checked;
    }
    toHtml() {
        const input = new Input('checkbox').name(this.name);
        const label = new Label().appendChild(input);
        return new Div().appendChild(label).appendText(this.label);
    }
}
class TextVariable extends Variable {
    constructor(label, name) {
        super(label, name);
    }
    value() {
        const input = document.querySelector(`input[name="${this.name}"]`);
        return input.value;
    }
    toHtml() {
        const input = new Input('text').name(this.name).autocomplete(false);
        const label = new Label().appendText(this.label).appendChild(input);
        return new Div().appendChild(label);
    }
}
class NumberVariable extends Variable {
    constructor(label, name) {
        super(label, name);
    }
    value() {
        const input = document.querySelector(`input[name="${this.name}"]`);
        return Number(input.value);
    }
    toHtml() {
        const input = new Input('number').name(this.name).autocomplete(false);
        const label = new Label().appendText(this.label).appendChild(input);
        return new Div().appendChild(label);
    }
}
