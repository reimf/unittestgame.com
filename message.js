"use strict";
class Message extends Section {
    constructor(children) {
        super(children);
    }
    addAsComputer() {
        this.id(`message-${++Message.messageCount}`);
        this.addClass('computer');
        this.addTo('messages');
        this.scrollIntoView();
    }
    addAsHuman() {
        this.id(`message-${++Message.messageCount}`);
        this.addClass('human');
        this.addTo('messages');
        this.setFocus();
        this.scrollIntoView();
    }
    replaceLastHuman() {
        this.id(`message-${Message.messageCount}`);
        this.addClass('human');
        this.replaceExisting();
        this.setFocus();
        this.scrollIntoView();
    }
    setFocus() {
        const firstFocusable = this.element.querySelector('button, input');
        firstFocusable === null || firstFocusable === void 0 ? void 0 : firstFocusable.focus();
    }
    scrollIntoView() {
        this.element.scrollIntoView();
    }
}
Message.messageCount = 0;
