"use strict";
class Html {
    constructor(tagName) {
        this.element = document.createElement(tagName);
    }
    id(id) {
        this.element.id = id;
    }
    addClass(value) {
        this.element.classList.add(value);
    }
    appendText(value) {
        this.element.appendChild(document.createTextNode(value));
    }
    appendChild(value) {
        this.element.appendChild(value.element);
    }
    appendChildren(values) {
        for (const value of values)
            this.element.appendChild(value.element);
    }
    on(eventType, callback) {
        this.element.addEventListener(eventType, callback);
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
    }
    name(value) {
        this.input.name = value;
    }
    value(value) {
        this.input.value = value;
    }
    autocomplete(value) {
        this.input.autocomplete = value ? 'on' : 'off';
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
class UnorderedList extends Html {
    constructor(listItems) {
        super('ul');
        this.appendChildren(listItems);
    }
}
class ListItem extends Html {
    constructor(child) {
        super('li');
        this.appendChild(child);
    }
}
class Menu extends Html {
    constructor(buttons) {
        super('menu');
        this.appendChildren(buttons.map(button => new ListItem(button)));
    }
}
class Button extends Html {
    constructor(text, callback) {
        super('button');
        this.appendText(text);
        this.on('click', event => {
            new Message([new Paragraph(this.element.textContent + '.')]).replaceLastHuman();
            callback(event);
        });
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
