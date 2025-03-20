export class Html {
    constructor(tagName) {
        this.element = document.createElement(tagName);
    }
    id(id) {
        this.element.id = id
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, ' ')
            .trim()
            .replace(/ +/g, '-');
        return this;
    }
    addClass(value) {
        this.element.classList.add(value);
        return this;
    }
    markdown(markdown) {
        const html = markdown
            // PASS 0: Escape HTML to prevent injection issues
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
            // PASS 1: Handle **bold**
            .replace(/\*\*(.+?)\*\*/g, (_, text) => `<b>${text}</b>`)
            // PASS 2: Handle *italic*
            .replace(/\*(.+?)\*/g, (_, text) => `<i>${text}</i>`)
            // PASS 3: Handle [text](url)
            .replace(/\[(.+?)\]\((.+?)\)/g, (_, text, url) => `<a href="${url}">${text}</a>`);
        this.element.insertAdjacentHTML('beforeend', html);
        return this;
    }
    text(text) {
        this.element.appendChild(document.createTextNode(text));
        return this;
    }
    prependChild(child) {
        this.element.prepend(child.element);
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
export class Input extends Html {
    constructor() {
        super('input');
        this.input = this.element;
    }
    type(type) {
        this.input.type = type;
        return this;
    }
    name(name) {
        this.input.name = name;
        return this;
    }
    value(value) {
        this.input.value = value;
        return this;
    }
    autocomplete(autocomplete) {
        this.input.autocomplete = autocomplete ? 'on' : 'off';
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
