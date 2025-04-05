import { Div, Html, Header, Paragraph, Section } from './html.js';
import { Random } from './random.js';
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
        this.prependChild(new Header().appendText(title));
        const id = title.toLowerCase().replace(/[^a-z0-9-]/g, ' ').trim().replace(/ +/g, '-');
        this.setId(id);
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
    add() {
        const count = document.querySelector('#messages').childElementCount;
        this.setId(`message-${count}`);
        const node = this.addTo('messages');
        node.scrollIntoView();
    }
}
export class ComputerMessage extends Message {
    constructor(elements) {
        super(elements);
        this.addClass('computer');
    }
    appendProcessing() {
        this.children[0].children[0].addClass('processing');
        return this;
    }
    static removeLast() {
        const id = document.querySelector('#messages').lastElementChild.id;
        const lastComputerMessage = new ComputerMessage([]);
        lastComputerMessage.setId(id);
        lastComputerMessage.removeExisting();
    }
}
export class HumanMessage extends Message {
    constructor(children) {
        super(children);
        this.addClass('human');
        this.onClick(event => {
            if (event.target instanceof HTMLButtonElement) {
                const text = event.target.title || event.target.textContent;
                const message = new HumanMessage([text + '.']);
                message.setId(this.getId());
                message.replaceExisting();
            }
        });
    }
    add() {
        super.add();
        this.focusFirst();
    }
    replace() {
        const id = document.querySelector('#messages').lastElementChild.id;
        this.setId(id);
        this.replaceExisting();
    }
    focusFirst() {
        setTimeout(() => {
            const focusable = document.querySelector('button, input');
            if (focusable)
                focusable.focus();
        }, Random.integerFromRange(500));
    }
}
