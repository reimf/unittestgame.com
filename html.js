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
    accessKey(value) {
        this.element.accessKey = value[0];
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
    addClass(value) {
        if (value)
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
        var _a;
        const old = document.querySelector('#' + this.element.id);
        if (old)
            old.replaceWith(this.element);
        else
            document.querySelector('#' + parentId).appendChild(this.element);
        (_a = this.element.querySelector('input')) === null || _a === void 0 ? void 0 : _a.focus();
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
