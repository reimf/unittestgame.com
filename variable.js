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
    value(element) {
        const selector = `input[name="${element.name}"]:checked`;
        const checked = document.querySelector(selector);
        return checked.value;
    }
    toHtml() {
        const radioButtons = this.texts.map(text => {
            const input = new Input().type('radio').name(this.name).value(text);
            return new Label().appendChild(input).appendText(text);
        });
        return new Div().appendText(this.label).appendChildren(radioButtons);
    }
}
class CheckboxVariable extends Variable {
    constructor(label, name) {
        super(label, name);
    }
    value(element) {
        return element.checked;
    }
    toHtml() {
        const input = new Input().type('checkbox').name(this.name);
        const label = new Label().appendChild(input);
        return new Div().appendChild(label).appendText(this.label);
    }
}
class TextVariable extends Variable {
    constructor(label, name) {
        super(label, name);
    }
    value(element) {
        return element.value;
    }
    toHtml() {
        const input = new Input().type('text').name(this.name).autocomplete(false);
        const label = new Label().appendText(this.label).appendChild(input);
        return new Div().appendChild(label);
    }
}
class NumberVariable extends Variable {
    constructor(label, name) {
        super(label, name);
    }
    value(element) {
        return Number(element.value);
    }
    toHtml() {
        const input = new Input().type('number').name(this.name).autocomplete(false);
        const label = new Label().appendText(this.label).appendChild(input);
        return new Div().appendChild(label);
    }
}
