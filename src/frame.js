import { Header, Paragraph, Section } from './html.js';
class Frame extends Section {
    constructor(children) {
        super();
        this.children(children);
    }
    existingElement() {
        return document.querySelector('#' + this.element.id);
    }
    replaceExisting() {
        this.existingElement().replaceWith(this.element);
    }
    addTo(parentId) {
        document.querySelector('#' + parentId).appendChild(this.element);
    }
}
export class Panel extends Frame {
    constructor(title, children = []) {
        super([new Header().text(title), ...children]);
        const id = title.toLowerCase().replace(/ /g, '-');
        this.id(id);
    }
    show() {
        if (this.existingElement())
            this.replaceExisting();
        else
            this.addTo('panels');
    }
    remove() {
        var _a;
        (_a = document.querySelector('#' + this.element.id)) === null || _a === void 0 ? void 0 : _a.remove();
    }
}
class Message extends Frame {
    constructor(children) {
        super(children);
    }
    show() {
        const count = document.querySelector('#messages').childElementCount;
        this.id(`message-${count}`);
        this.addTo('messages');
        this.element.scrollIntoView();
    }
}
export class ComputerMessage extends Message {
    constructor(children) {
        super(children);
        this.addClass('computer');
    }
}
export class HumanMessage extends Message {
    constructor(children) {
        super(children);
        this.addClass('human');
        this.on('click', event => {
            if (event.target instanceof HTMLButtonElement) {
                const paragraph = new Paragraph().text(event.target.textContent + '.');
                const message = new HumanMessage([paragraph]);
                message.id(this.element.id);
                message.replaceExisting();
            }
        });
    }
    show() {
        super.show();
        this.focusFirst();
    }
    replace() {
        const id = document.querySelector('#messages').lastElementChild.id;
        this.id(id);
        this.replaceExisting();
    }
    focusFirst() {
        const focusables = this.element.querySelectorAll('button, input');
        if (focusables.length > 0) {
            const firstFocusable = focusables[0];
            firstFocusable.focus();
        }
    }
}
