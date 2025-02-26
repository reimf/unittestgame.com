import { Header, Paragraph, Section } from './html.js';
class Frame extends Section {
    constructor(children) {
        super();
        this.appendChildren(children);
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
    constructor(title, children) {
        super([new Header().appendText(title), ...children]);
        this.id(Panel.idFromTitle(title));
    }
    static idFromTitle(title) {
        return title.toLowerCase().replace(/ /g, '-');
    }
    show() {
        if (this.existingElement())
            this.replaceExisting();
        else
            this.addTo('panels');
    }
    static remove(title) {
        var _a;
        (_a = document.querySelector('#' + Panel.idFromTitle(title))) === null || _a === void 0 ? void 0 : _a.remove();
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
        this.scrollIntoView();
    }
    scrollIntoView() {
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
                const message = new HumanMessage([new Paragraph().appendText(event.target.textContent + '.')]);
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
        const focusables = this.element.querySelectorAll('button:enabled, input:enabled');
        if (focusables.length > 0)
            focusables[0].focus();
    }
}
