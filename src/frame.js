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
    static panelsElement = document.querySelector('#panels');
    constructor(id, title, elements) {
        super(elements);
        this.setId(id).prependChild(new Header().appendText(title));
    }
    static removeAll() {
        this.panelsElement.replaceChildren();
    }
    show() {
        const existingElement = this.existingElement();
        if (existingElement)
            existingElement.replaceWith(this.toNode());
        else
            this.addTo(Panel.panelsElement);
    }
}
export class Message extends Frame {
    static messagesElement = document.querySelector('#messages');
    constructor(elements) {
        super(elements);
    }
    static hideAllButLast() {
        const messages = [...Message.messagesElement.children];
        const messagesButLast = messages.slice(0, messages.length - 1);
        messagesButLast.forEach(message => message.classList.add('hidden'));
    }
    add(extra = () => { }) {
        this.callDelayed(() => {
            const count = Message.messagesElement.childElementCount;
            this.setId(`message-${count}`);
            const node = this.addTo(Message.messagesElement);
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
export class CheckingMessage extends ComputerMessage {
    callback;
    delay;
    finalText;
    constructor(checkingText, finalText, callback, delay) {
        super([new Paragraph().appendMarkdown(checkingText + '...').addClass('checking')]);
        this.finalText = finalText;
        this.callback = callback;
        this.delay = delay;
    }
    add() {
        super.add(() => window.setTimeout(() => {
            this.replaceEnclosingMessageContent(this.existingElement(), this.finalText);
            this.callback();
        }, this.delay));
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
