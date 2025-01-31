"use strict";
class Variable {
    constructor(label, name) {
        this.label = label;
        this.name = name;
    }
}
class HorizontalRadioVariable extends Variable {
    constructor(label, name, options) {
        super(label, name);
        this.options = options;
        this.options = options;
    }
    value(element) {
        const selector = `input[name="${element.name}"]:checked`;
        const checked = document.querySelector(selector);
        return checked.value;
    }
    toHtml() {
        const callback = (event) => {
            const target = event.target;
            const form = target.closest('form');
            const button = form.querySelector('input[type="submit"]');
            button.click();
        };
        const radioButtons = this.options.map(option => {
            const input = new Html('input').type('radio').name(this.name).accessKey(option).value(option).on('mouseup', callback);
            return new Html('label').addClass('with-horizontal-radio-input').appendChild(input).appendText(option);
        });
        return new Html('div').addClass('with-horizontal-radio-input').appendText(this.label).appendChildren(radioButtons);
    }
}
class VerticalRadioVariable extends Variable {
    constructor(label, name, options) {
        super(label, name);
        this.options = options;
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
            return new Html('label').addClass('with-vertical-radio-input').appendChild(input).appendText(option);
        });
        return new Html('div').addClass('with-vertical-radio-input').appendText(this.label).appendChildren(radioButtons);
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
        const input = new Html('input').type('checkbox').name(this.name);
        const label = new Html('label').addClass('with-checkbox-input').appendChild(input);
        return new Html('div').addClass('with-checkbox-input').appendChild(label).appendText(this.label);
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
        const input = new Html('input').type('text').name(this.name).autocomplete('off');
        const label = new Html('label').addClass('with-text-input').appendText(this.label).appendChild(input);
        return new Html('div').addClass('with-text-input').appendChild(label);
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
        const label = new Html('label').addClass('with-number-input').appendText(this.label).appendChild(input);
        return new Html('div').addClass('with-number-input').appendChild(label);
    }
}
