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
    toHtml() {
        const radioButtons = this.options.map(option => {
            const input = new Html('input').type('radio').name(this.name).accessKey(option).value(option);
            return new Html('label').appendChild(input).appendText(option);
        });
        return new Html('div').appendText(this.label).appendChildren(radioButtons);
    }
}
class BooleanVariable extends Variable {
    constructor(label, name) {
        super(label, name);
    }
    value(element) {
        return element.checked;
    }
    toHtml() {
        const input = new Html('input').type('checkbox').name(this.name);
        const label = new Html('label').appendChild(input);
        return new Html('div').appendChild(label).appendText(this.label);
    }
}
class StringVariable extends Variable {
    constructor(label, name) {
        super(label, name);
    }
    value(element) {
        return element.value;
    }
    toHtml() {
        const input = new Html('input').type('text').name(this.name).autocomplete('off');
        const label = new Html('label').appendText(this.label).appendChild(input);
        return new Html('div').appendChild(label);
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
        const input = new Html('input').type('number').name(this.name).autocomplete('off');
        const label = new Html('label').appendText(this.label).appendChild(input);
        return new Html('div').appendChild(label);
    }
}
