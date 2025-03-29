import { Italic, Div, Html, Header, Paragraph, Section } from './html.js';
class Frame extends Section {
    constructor(elements) {
        super();
        const children = elements.map(element => element instanceof Html ? element : new Paragraph().markdown(element));
        this.appendChild(new Div().appendChildren(children));
    }
    existingElement() {
        return document.querySelector('#' + this.element.id);
    }
    replaceExisting() {
        this.existingElement().replaceWith(this.element);
    }
    removeExisting() {
        this.existingElement().remove();
    }
    addTo(parentId) {
        document.querySelector('#' + parentId).appendChild(this.element);
    }
}
export class Panel extends Frame {
    constructor(title, elements) {
        super(elements);
        this.prependChild(new Header().text(title));
        this.id(title);
    }
    static appendProcessingTo(title) {
        const header = document.querySelector(`#${Html.getIdFromTitle(title)} > header`);
        if (header)
            new Html(header).appendSpinner();
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
        (_a = document.querySelector('#' + this.element.id)) === null || _a === void 0 ? void 0 : _a.remove();
    }
}
class Message extends Frame {
    constructor(elements) {
        super(elements);
    }
    add() {
        const count = document.querySelector('#messages').childElementCount;
        this.id(`message-${count}`);
        this.addTo('messages');
        this.element.scrollIntoView();
    }
}
export class ComputerMessage extends Message {
    constructor(elements) {
        super(elements);
        this.addClass('computer');
    }
    appendProcessing() {
        const paragraph = new Html(this.element.querySelector('p'));
        const italic = new Italic().appendSpinner();
        paragraph.appendChild(italic);
        return this;
    }
    static removeLast() {
        const id = document.querySelector('#messages').lastElementChild.id;
        const lastComputerMessage = new ComputerMessage([]);
        lastComputerMessage.id(id);
        lastComputerMessage.removeExisting();
    }
}
export class HumanMessage extends Message {
    constructor(children) {
        super(children);
        this.addClass('human');
        this.on('click', event => {
            if (event.target instanceof HTMLButtonElement) {
                const text = event.target.title || event.target.textContent;
                const message = new HumanMessage([text + '.']);
                message.id(this.element.id);
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
