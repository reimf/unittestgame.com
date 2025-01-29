"use strict";
class Variable {
    constructor(label, name) {
        this.label = label;
        this.name = name;
    }
}
class RadioVariable extends Variable {
    constructor(label, name, options) {
        super(label, name);
        this.options = options;
    }
    value(element) {
        const selector = `input[name="${element.name}"]:checked`;
        const checked = document.querySelector(selector);
        return checked.value;
    }
    toHtmlElement() {
        const div = document.createElement('div');
        const text = document.createTextNode(this.label);
        div.appendChild(text);
        for (const option of this.options) {
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = this.name;
            input.value = option;
            const label = document.createElement('label');
            label.appendChild(input);
            const text = document.createTextNode(option);
            label.appendChild(text);
            div.appendChild(label);
        }
        return div;
    }
}
class BooleanVariable extends Variable {
    constructor(label, name) {
        super(label, name);
    }
    value(element) {
        return element.checked;
    }
    toHtmlElement() {
        const div = document.createElement('div');
        const label = document.createElement('label');
        const text = document.createTextNode(this.label);
        label.appendChild(text);
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = this.name;
        label.appendChild(input);
        div.appendChild(label);
        return div;
    }
}
class StringVariable extends Variable {
    constructor(label, name) {
        super(label, name);
    }
    value(element) {
        return element.value;
    }
    toHtmlElement() {
        const div = document.createElement('div');
        const label = document.createElement('label');
        const text = document.createTextNode(this.label);
        label.appendChild(text);
        const input = document.createElement('input');
        input.type = 'text';
        input.name = this.name;
        input.autocomplete = 'off';
        label.appendChild(input);
        div.appendChild(label);
        return div;
    }
}
class NumberVariable extends Variable {
    constructor(label, name) {
        super(label, name);
    }
    value(element) {
        return Number(element.value);
    }
    toHtmlElement() {
        const div = document.createElement('div');
        const label = document.createElement('label');
        const text = document.createTextNode(this.label);
        label.appendChild(text);
        const input = document.createElement('input');
        input.type = 'number';
        input.name = this.name;
        input.autocomplete = 'off';
        label.appendChild(input);
        div.appendChild(label);
        return div;
    }
}
