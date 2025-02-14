export class Html {
    constructor(tagName) {
        this.element = document.createElement(tagName);
    }
    id(id) {
        this.element.id = id;
    }
    addClass(value) {
        this.element.classList.add(value);
    }
    appendText(value) {
        this.element.appendChild(document.createTextNode(value));
    }
    appendChild(value) {
        this.element.appendChild(value.element);
    }
    appendChildren(values) {
        for (const value of values)
            this.element.appendChild(value.element);
    }
    on(eventType, callback) {
        this.element.addEventListener(eventType, callback);
    }
}
export class Span extends Html {
    constructor(text) {
        super('span');
        this.appendText(text);
    }
}
export class Anchor extends Html {
    constructor(href) {
        super('a');
        this.anchor = this.element;
        this.href(href);
    }
    href(value) {
        this.anchor.href = value;
    }
}
export class Input extends Html {
    constructor(type) {
        super('input');
        this.input = this.element;
        this.type(type);
    }
    type(value) {
        this.input.type = value;
    }
    name(value) {
        this.input.name = value;
    }
    value(value) {
        this.input.value = value;
    }
    autocomplete(value) {
        this.input.autocomplete = value ? 'on' : 'off';
    }
}
export class Form extends Html {
    constructor(inputs, submitButtonText, callbackSubmit, cancelButtonText, callbackCancel) {
        super('form');
        this.callbackSubmit = callbackSubmit;
        const submitButton = new Input('submit');
        submitButton.value(submitButtonText);
        const cancelButton = new Button(cancelButtonText, () => callbackCancel());
        const buttonBlock = new Div();
        buttonBlock.appendChild(submitButton);
        buttonBlock.appendChild(cancelButton);
        this.appendChildren(inputs);
        this.appendChild(buttonBlock);
        this.on('submit', () => this.callbackSubmit());
    }
}
export class Header extends Html {
    constructor(text) {
        super('header');
        this.appendText(text);
    }
}
export class Paragraph extends Html {
    constructor(text) {
        super('p');
        this.appendText(text);
    }
}
export class UnorderedList extends Html {
    constructor(listItems) {
        super('ul');
        this.appendChildren(listItems);
    }
}
export class ListItem extends Html {
    constructor(child) {
        super('li');
        this.appendChild(child);
    }
}
export class Menu extends Html {
    constructor(buttons) {
        super('menu');
        this.appendChildren(buttons.map(button => new ListItem(button)));
    }
}
export class Button extends Html {
    constructor(text, callback) {
        super('button');
        this.appendText(text);
        this.on('click', event => {
            new HumanMessage([new Paragraph(this.element.textContent + '.')]).replace();
            callback(event);
        });
    }
}
export class Label extends Html {
    constructor() {
        super('label');
    }
}
export class Div extends Html {
    constructor() {
        super('div');
    }
}
export class Code extends Html {
    constructor(text) {
        super('code');
        this.appendText(text);
    }
}
export class Section extends Html {
    constructor(children) {
        super('section');
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
export class Panel extends Section {
    constructor(header, children) {
        super([new Header(header), ...children]);
    }
    show(id) {
        this.id(id);
        if (this.existingElement())
            this.replaceExisting();
        else
            this.addTo('panels');
    }
    static remove(id) {
        var _a;
        (_a = document.querySelector('#' + id)) === null || _a === void 0 ? void 0 : _a.remove();
    }
}
export class Message extends Section {
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
    }
    show() {
        super.show();
        this.setFocus();
    }
    replace() {
        const lastMessage = document.querySelector('#messages').lastElementChild;
        this.id(lastMessage.id);
        this.replaceExisting();
        this.setFocus();
        this.scrollIntoView();
    }
    setFocus() {
        const firstFocusable = this.element.querySelector('button, input');
        firstFocusable === null || firstFocusable === void 0 ? void 0 : firstFocusable.focus();
    }
}
export class HumanMenuMessage extends HumanMessage {
    constructor(buttons) {
        super([
            new Menu(buttons),
        ]);
    }
}
