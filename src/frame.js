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
    addTo(parent) {
        const node = this.toNode();
        parent.appendChild(node);
        return node;
    }
}
export class Panel extends Frame {
    constructor(id, title, elements) {
        super(elements);
        this.setId(id).prependChild(new Header().appendText(title));
    }
    static getPanelsElement() {
        return document.querySelector('#panels');
    }
    static removeAll() {
        this.getPanelsElement().replaceChildren();
    }
    show() {
        const existingElement = this.existingElement();
        if (existingElement)
            existingElement.replaceWith(this.toNode());
        else
            this.addTo(Panel.getPanelsElement());
    }
}
export class Message extends Frame {
    constructor(elements) {
        super(elements);
    }
    static getMessagesElement() {
        return document.querySelector('#messages');
    }
    static hideAllButLast() {
        const messages = [...Message.getMessagesElement().children];
        const messagesButLast = messages.slice(0, messages.length - 1);
        messagesButLast.forEach(message => message.classList.add('hidden'));
    }
    static addToLast(elements) {
        const lastMessage = Message.getMessagesElement().lastElementChild;
        const lastDiv = lastMessage.querySelector('div');
        elements.forEach(element => lastDiv.appendChild(element.toNode()));
    }
    add(extra = () => { }) {
        this.callDelayed(() => {
            const count = Message.getMessagesElement().childElementCount;
            this.setId(`message-${count}`);
            const node = this.addTo(Message.getMessagesElement());
            node.classList.add('reveal');
            node.scrollIntoView();
            const focusable = document.querySelector('button:not([disabled]), input:not([disabled])');
            if (focusable)
                focusable.focus();
            extra();
        });
    }
}
export class ComputerMessage extends Message {
    constructor(elements) {
        super(elements);
        this.addClass('computer');
    }
}
export class HumanMessage extends Message {
    constructor(children) {
        super(children);
        this.addClass('human');
    }
}
export class QuestionMessage extends HumanMessage {
    constructor(text, callback) {
        super([
            new Button().onClick(callback).appendText(text)
        ]);
    }
}
