"use strict";
class Message extends Section {
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
class ComputerMessage extends Message {
    constructor(children) {
        super(children);
        this.addClass('computer');
    }
}
class HumanMessage extends Message {
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
class HumanMenuMessage extends HumanMessage {
    constructor(buttons) {
        super([
            new Menu(buttons),
        ]);
    }
}
