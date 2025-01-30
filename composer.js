"use strict";
class Html {
    constructor(tagName) {
        this.element = document.createElement(tagName);
    }
    id(id) {
        this.element.id = id;
        return this;
    }
    href(value) {
        this.element.href = value;
        return this;
    }
    type(value) {
        this.element.type = value;
        return this;
    }
    name(value) {
        this.element.name = value;
        return this;
    }
    value(value) {
        this.element.value = value;
        return this;
    }
    autocomplete(value) {
        this.element.autocomplete = value;
        return this;
    }
    textContent(value) {
        this.element.textContent = value;
        return this;
    }
    className(value) {
        if (value)
            this.element.classList.add(value);
        return this;
    }
    appendText(value) {
        this.element.appendChild(document.createTextNode(value));
        return this;
    }
    appendChild(value) {
        const element = value instanceof HTMLElement ? value : value.toHTMLElement();
        this.element.appendChild(element);
        return this;
    }
    appendChildren(values) {
        for (const value of values) {
            const element = value instanceof HTMLElement ? value : value.toHTMLElement();
            this.element.appendChild(element);
        }
        return this;
    }
    onSubmit(callback) {
        this.element.addEventListener('submit', callback);
        return this;
    }
    toHTMLElement() {
        return this.element;
    }
}
