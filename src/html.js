export class Html {
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
    appendText(text) {
        this.element.appendChild(document.createTextNode(text));
        return this;
    }
    appendLines(lines) {
        this.appendText(lines.join(' '));
        return this;
    }
    appendChild(child) {
        this.element.appendChild(child.element);
        return this;
    }
    appendChildren(children) {
        for (const child of children)
            this.element.appendChild(child.element);
        return this;
    }
    on(eventType, callback) {
        this.element.addEventListener(eventType, callback);
        return this;
    }
}
export class Anchor extends Html {
    constructor() {
        super('a');
        this.anchor = this.element;
    }
    href(value) {
        this.anchor.href = value;
        return this;
    }
}
export class Input extends Html {
    constructor() {
        super('input');
        this.input = this.element;
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
export class Form extends Html {
    constructor() {
        super('form');
    }
    onSubmit(callback) {
        this.on('submit', event => callback(event));
        return this;
    }
}
export class Header extends Html {
    constructor() {
        super('header');
    }
}
export class Paragraph extends Html {
    constructor() {
        super('p');
    }
}
export class Button extends Html {
    constructor() {
        super('button');
    }
    onClick(callback) {
        this.on('click', event => callback(event));
        return this;
    }
}
export class Label extends Html {
    constructor() {
        super('label');
    }
}
export class Code extends Html {
    constructor() {
        super('code');
    }
}
export class Section extends Html {
    constructor() {
        super('section');
    }
}
export class Div extends Html {
    constructor() {
        super('div');
    }
}
export class Em extends Html {
    constructor() {
        super('em');
    }
}
