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
    text(text) {
        this.element.appendChild(document.createTextNode(text));
        return this;
    }
    markdown(markdown) {
        while (markdown !== '') {
            const startPos = markdown.indexOf('*');
            const endPos = markdown.indexOf('*', startPos + 1);
            if (endPos === -1)
                return this.text(markdown);
            const em = new Em().text(markdown.slice(startPos + 1, endPos));
            this.text(markdown.slice(0, startPos)).child(em);
            markdown = markdown.slice(endPos + 1);
        }
        return this;
    }
    lines(lines) {
        this.text(lines.join(' ').replace(/\n /g, '\n'));
        return this;
    }
    child(child) {
        this.element.appendChild(child.element);
        return this;
    }
    children(children) {
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
class Em extends Html {
    constructor() {
        super('em');
    }
}
