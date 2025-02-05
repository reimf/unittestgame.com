"use strict";
class Html {
    constructor(tagName) {
        this.element = document.createElement(tagName);
    }
    id(id) {
        this.element.id = id;
        return this;
    }
    addClass(value) {
        this.element.classList.add(value);
        return this;
    }
    appendText(value) {
        this.element.appendChild(document.createTextNode(value));
        return this;
    }
    appendChild(value) {
        this.element.appendChild(value.element);
        return this;
    }
    appendChildren(values) {
        for (const value of values)
            this.element.appendChild(value.element);
        return this;
    }
    on(eventType, callback) {
        this.element.addEventListener(eventType, callback);
        return this;
    }
    addTo(parentId) {
        const old = document.querySelector('#' + this.element.id);
        if (old)
            old.replaceWith(this.element);
        else
            document.querySelector('#' + parentId).appendChild(this.element);
    }
}
class Anchor extends Html {
    constructor(href) {
        super('a');
        this.anchor = this.element;
        this.href(href);
    }
    href(value) {
        this.anchor.href = value;
        return this;
    }
}
class Input extends Html {
    constructor(type) {
        super('input');
        this.input = this.element;
        this.type(type);
    }
    type(value) {
        this.input.type = value;
        return this;
    }
    name(value) {
        this.input.name = value;
        return this;
    }
    value(value) {
        this.input.value = value;
        return this;
    }
    autocomplete(value) {
        this.input.autocomplete = value ? 'on' : 'off';
        return this;
    }
}
class Header extends Html {
    constructor(text) {
        super('header');
        this.appendText(text);
    }
}
class Paragraph extends Html {
    constructor(text) {
        super('p');
        this.appendText(text);
    }
}
class Button extends Html {
    constructor(text, callback) {
        super('button');
        this.appendText(text).on('click', callback);
    }
}
class Label extends Html {
    constructor() {
        super('label');
    }
}
class Div extends Html {
    constructor() {
        super('div');
    }
}
class Code extends Html {
    constructor(text) {
        super('code');
        this.appendText(text);
    }
}
