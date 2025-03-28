export class Html {
    constructor(element) {
        this.element = element;
    }
    static getIdFromTitle(title) {
        return title.toLowerCase().replace(/[^a-z0-9-]/g, ' ').trim().replace(/ +/g, '-');
    }
    id(title) {
        this.element.id = Html.getIdFromTitle(title);
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
    appendChild(child) {
        this.element.appendChild(child.element);
        return this;
    }
    appendChildren(children) {
        for (const child of children)
            this.element.appendChild(child.element);
        return this;
    }
    appendSpinner() {
        return this.appendChild(new Span().addClass('processing'));
    }
    on(eventType, callback) {
        this.element.addEventListener(eventType, callback);
        return this;
    }
}
export class Input extends Html {
    constructor() {
        super(document.createElement('input'));
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
        super(document.createElement('form'));
    }
    onSubmit(callback) {
        this.on('submit', event => callback(event));
        return this;
    }
}
export class Header extends Html {
    constructor() {
        super(document.createElement('header'));
    }
}
export class Paragraph extends Html {
    constructor() {
        super(document.createElement('p'));
    }
}
export class Button extends Html {
    constructor() {
        super(document.createElement('button'));
    }
    onClick(callback) {
        this.on('click', event => callback(event));
        return this;
    }
    title(title) {
        this.element.title = title;
        return this;
    }
}
export class Label extends Html {
    constructor() {
        super(document.createElement('label'));
    }
}
export class Code extends Html {
    constructor() {
        super(document.createElement('code'));
    }
}
export class Section extends Html {
    constructor() {
        super(document.createElement('section'));
    }
}
export class Div extends Html {
    constructor() {
        super(document.createElement('div'));
    }
}
export class Span extends Html {
    constructor() {
        super(document.createElement('span'));
    }
}
export class Italic extends Html {
    constructor() {
        super(document.createElement('i'));
    }
}
