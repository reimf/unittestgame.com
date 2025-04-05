export class Html {
    constructor() {
        this.tagName = '';
        this.id = '';
        this.classList = [];
        this.children = [];
        this.onClickCallback = undefined;
        this.title = '';
    }
    setTagName(tagName) {
        this.tagName = tagName;
        return this;
    }
    setId(id) {
        this.id = id;
        return this;
    }
    getId() {
        return this.id;
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    addClass(value, condition = true) {
        if (condition)
            this.classList.push(value);
        return this;
    }
    onClick(callback) {
        this.onClickCallback = callback;
        return this;
    }
    appendMarkdown(markdown) {
        const buffer = [];
        const flush = (buffer) => {
            if (buffer.length > 0) {
                this.appendText(buffer.join(''));
                buffer.length = 0;
            }
        };
        for (let pos = 0; pos < markdown.length; pos++) {
            // Bold: **text**
            if (markdown.slice(pos, pos + 2) === '**') {
                const end = markdown.indexOf('**', pos + 2);
                if (end > pos) {
                    flush(buffer);
                    const text = markdown.slice(pos + 2, end);
                    const bold = new Bold().appendMarkdown(text);
                    this.appendChild(bold);
                    pos = end + 1;
                    continue;
                }
            }
            // Italic: *text*
            if (markdown[pos] === '*') {
                const end = markdown.indexOf('*', pos + 1);
                if (end > pos) {
                    flush(buffer);
                    const text = markdown.slice(pos + 1, end);
                    const italic = new Italic().appendMarkdown(text);
                    this.appendChild(italic);
                    pos = end;
                    continue;
                }
            }
            // Link: [text](url)
            if (markdown[pos] === '[') {
                const closeBracket = markdown.indexOf(']', pos);
                const openParen = markdown.indexOf('(', closeBracket);
                const closeParen = markdown.indexOf(')', openParen);
                if (closeBracket > pos && openParen === closeBracket + 1 && closeParen > openParen) {
                    flush(buffer);
                    const text = markdown.slice(pos + 1, closeBracket);
                    const url = markdown.slice(openParen + 1, closeParen);
                    const anchor = new Anchor().setHref(url).appendMarkdown(text);
                    this.appendChild(anchor);
                    pos = closeParen;
                    continue;
                }
            }
            // Plain text
            buffer.push(markdown[pos]);
        }
        flush(buffer);
        return this;
    }
    appendText(text) {
        this.children.push(new Text(text));
        return this;
    }
    prependChild(child) {
        this.children.unshift(child);
        return this;
    }
    appendChild(child) {
        this.children.push(child);
        return this;
    }
    appendChildren(children) {
        this.children.push(...children);
        return this;
    }
    toString() {
        return '<' + this.tagName +
            (this.classList.length > 0 ? ' class="' + this.classList.join(' ') + '"' : '') +
            (this.id ? ` id="${this.id}"` : '') +
            (this.title ? ` title="${this.title}"` : '') +
            '>' +
            this.children.map(child => child.toString()).join('') +
            '</' + this.tagName + '>';
    }
    toNode() {
        const node = document.createElement(this.tagName);
        if (this.id)
            node.id = this.id;
        if (this.title)
            node.title = this.title;
        if (this.onClickCallback)
            node.addEventListener('click', event => this.onClickCallback(event));
        for (const klasse of this.classList)
            node.classList.add(klasse);
        for (const child of this.children)
            node.appendChild(child.toNode());
        return node;
    }
}
export class Text extends Html {
    constructor(text) {
        super();
        this.text = text;
    }
    toString() {
        return this.text;
    }
    toNode() {
        return document.createTextNode(this.text);
    }
}
export class Input extends Html {
    constructor() {
        super();
        this.type = '';
        this.name = '';
        this.value = '';
        this.autocomplete = '';
        this.setTagName('input');
    }
    setType(type) {
        this.type = type;
        return this;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setValue(value) {
        this.value = value;
        return this;
    }
    setAutocomplete(autocomplete) {
        this.autocomplete = autocomplete ? 'on' : 'off';
        return this;
    }
    toNode() {
        const node = super.toNode();
        if (this.type)
            node.type = this.type;
        if (this.name)
            node.name = this.name;
        if (this.value)
            node.value = this.value;
        if (this.autocomplete)
            node.autocomplete = this.autocomplete;
        return node;
    }
}
export class Form extends Html {
    constructor() {
        super();
        this.onSubmitCallback = undefined;
        this.setTagName('form');
    }
    onSubmit(callback) {
        this.onSubmitCallback = callback;
        return this;
    }
    toNode() {
        const node = super.toNode();
        if (this.onSubmitCallback)
            node.addEventListener('submit', event => this.onSubmitCallback(event));
        return node;
    }
}
export class Header extends Html {
    constructor() {
        super();
        this.setTagName('header');
    }
}
export class Paragraph extends Html {
    constructor() {
        super();
        this.setTagName('p');
    }
}
export class Button extends Html {
    constructor() {
        super();
        this.setTagName('button');
    }
}
export class Label extends Html {
    constructor() {
        super();
        this.setTagName('label');
    }
}
export class Code extends Html {
    constructor() {
        super();
        this.setTagName('code');
    }
}
export class Section extends Html {
    constructor() {
        super();
        this.setTagName('section');
    }
}
export class Div extends Html {
    constructor() {
        super();
        this.setTagName('div');
    }
}
export class Span extends Html {
    constructor() {
        super();
        this.setTagName('span');
    }
}
export class Italic extends Html {
    constructor() {
        super();
        this.setTagName('i');
    }
}
export class Bold extends Html {
    constructor() {
        super();
        this.setTagName('b');
    }
}
export class Anchor extends Html {
    constructor() {
        super();
        this.href = '';
        this.setTagName('a');
    }
    setHref(href) {
        this.href = href;
        return this;
    }
    toNode() {
        const node = super.toNode();
        if (this.href)
            node.href = this.href;
        return node;
    }
}
