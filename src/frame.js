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
        const existingElement = this.existingElement();
        if (existingElement !== null)
            existingElement.replaceWith(this.toNode());
        else
            this.addTo('panels');
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
            const focusable = document.querySelector('button:not([disabled]), input:not([disabled])');
            if (focusable !== null)
                focusable.focus();
            if (extra !== undefined)
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
