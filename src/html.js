export class Html {
    constructor() {
        this.tagName = '';
        this.id = '';
        this.classList = [];
        this.children = [];
    }
    callDelayed(callback) {
        const now = Date.now();
        const delay = Math.max(0, 500 + Html.timeOfLastDelayedCall - now);
        Html.timeOfLastDelayedCall = now + delay;
        window.setTimeout(() => callback(), delay);
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
    addClass(value, condition = true) {
        if (condition)
            this.classList.push(value);
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
    toAttributes() {
        const attributes = [];
        if (this.classList.length > 0)
            attributes.push(`class="${this.classList.join(' ')}"`);
        if (this.id)
            attributes.push(`id="${this.id}"`);
        return attributes;
    }
    toString() {
        return '<' + this.tagName + this.toAttributes().sort().map(attribute => ' ' + attribute).join('') + '>' +
            this.children.map(child => child.toString()).join('') +
            '</' + this.tagName + '>';
    }
    toNode() {
        const node = document.createElement(this.tagName);
        for (const klasse of this.classList)
            node.classList.add(klasse);
        if (this.id)
            node.id = this.id;
        for (const child of this.children)
            node.appendChild(child.toNode());
        return node;
    }
}
Html.timeOfLastDelayedCall = 0;
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
    toAttributes() {
        const attributes = super.toAttributes();
        if (this.type)
            attributes.push(`type="${this.type}"`);
        if (this.name)
            attributes.push(`name="${this.name}"`);
        if (this.value)
            attributes.push(`value="${this.value}"`);
        if (this.autocomplete)
            attributes.push(`autocomplete="${this.autocomplete}"`);
        return attributes;
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
            node.addEventListener('submit', event => {
                event.preventDefault();
                this.onSubmitCallback(event);
            });
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
        this.title = '';
        this.onClickCallback = undefined;
        this.setTagName('button');
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    onClick(callback) {
        this.onClickCallback = callback;
        return this;
    }
    toAttributes() {
        const attributes = super.toAttributes();
        if (this.title)
            attributes.push(`title="${this.title}"`);
        return attributes;
    }
    toNode() {
        const node = super.toNode();
        if (this.title)
            node.title = this.title;
        if (this.onClickCallback)
            node.addEventListener('click', event => {
                event.preventDefault();
                const target = event.target;
                const div = target.closest('div');
                const section = target.closest('section');
                if (section && div) {
                    section.classList.remove('reveal');
                    const text = (target.title || target.textContent) + ".";
                    const textNode = document.createTextNode(text);
                    const paragraph = document.createElement('p');
                    paragraph.appendChild(textNode);
                    div.replaceChildren(paragraph);
                    this.callDelayed(() => section.classList.add('reveal'));
                    this.onClickCallback(event);
                }
            });
        return node;
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
    toAttributes() {
        const attributes = super.toAttributes();
        if (this.href)
            attributes.push(`href="${this.href}"`);
        return attributes;
    }
    toNode() {
        const node = super.toNode();
        if (this.href)
            node.href = this.href;
        return node;
    }
}
