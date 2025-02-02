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
    href(value) {
        if (this.element instanceof HTMLAnchorElement)
            this.element.href = value;
        return this;
    }
    type(value) {
        if (this.element instanceof HTMLInputElement)
            this.element.type = value;
        return this;
    }
    name(value) {
        if (this.element instanceof HTMLInputElement)
            this.element.name = value;
        return this;
    }
    value(value) {
        if (this.element instanceof HTMLInputElement)
            this.element.value = value;
        return this;
    }
    autocomplete(value) {
        if (this.element instanceof HTMLInputElement)
            this.element.autocomplete = value ? 'on' : 'off';
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
    constructor() {
        super('a');
    }
}
class Input extends Html {
    constructor() {
        super('input');
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
    constructor(text) {
        super('button');
        this.appendText(text);
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
    constructor() {
        super('code');
    }
}
