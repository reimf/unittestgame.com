import { Button, Div, Html, Header, Paragraph, Section } from './html.js';
class Frame extends Section {
    constructor(elements) {
        super();
        const children = elements.map(element => element instanceof Html ? element : new Paragraph().appendMarkdown(element));
        this.appendChild(new Div().appendChildren(children));
    }
    existingElement() {
        return document.querySelector('#' + this.getId());
    }
    replaceExisting() {
        this.existingElement().replaceWith(this.toNode());
    }
    removeExisting() {
        this.existingElement().remove();
    }
    addTo(parentId) {
        const node = this.toNode();
        document.querySelector('#' + parentId).appendChild(node);
        return node;
    }
}
export class Panel extends Frame {
    constructor(title, elements) {
        super(elements);
        const id = title.toLowerCase().replace(/[^a-z0-9-]/g, ' ').trim().replace(/ +/g, '-');
        this.setId(id).prependChild(new Header().appendText(title));
    }
    static removeAll() {
        var _a;
        (_a = document.querySelector('#panels')) === null || _a === void 0 ? void 0 : _a.replaceChildren();
    }
    show() {
        if (this.existingElement())
            this.replaceExisting();
        else
            this.addTo('panels');
    }
    remove() {
        var _a;
        (_a = document.querySelector('#' + this.getId())) === null || _a === void 0 ? void 0 : _a.remove();
    }
}
class Message extends Frame {
    constructor(elements) {
        super(elements);
    }
    add(extra) {
        this.callDelayed(() => {
            const count = document.querySelector('#messages').childElementCount;
            this.setId(`message-${count}`);
            const node = this.addTo('messages');
            node.classList.add('reveal');
            node.scrollIntoView();
            this.focusFirst();
            if (extra)
                extra();
        });
    }
    focusFirst() {
        const focusable = document.querySelector('button, input');
        if (focusable)
            focusable.focus();
    }
    replaceExisting() {
        this.callDelayed(() => super.replaceExisting());
    }
}
export class ComputerMessage extends Message {
    constructor(elements) {
        super(elements);
        this.addClass('computer');
    }
    static removeLast() {
        const id = document.querySelector('#messages').lastElementChild.id;
        new ComputerMessage([]).setId(id).removeExisting();
    }
}
export class ProcessingMessage extends ComputerMessage {
    constructor(text, callback, delay) {
        super([new Paragraph().appendMarkdown(text).addClass('processing')]);
        this.callback = callback;
        this.delay = delay;
    }
    add() {
        super.add(() => window.setTimeout(() => { ComputerMessage.removeLast(); this.callback(); }, this.delay));
    }
}
export class HumanMessage extends Message {
    constructor(children) {
        super(children);
        this.addClass('human');
    }
    replace() {
        const id = document.querySelector('#messages').lastElementChild.id;
        this.setId(id).addClass('reveal').replaceExisting();
    }
}
export class ButtonMessage extends HumanMessage {
    constructor(text, callback) {
        super([
            new Paragraph().appendChild(new Button().onClick(callback).appendText(text))
        ]);
    }
}
