"use strict";
class Section extends Html {
    constructor(children) {
        super('section');
        this.appendChildren(children);
    }
    show(id) {
        this.id(id).addTo('panels');
    }
    addAsComputer() {
        this.id(`message-${++Section.messageCount}`).addClass('computer').addTo('messages');
    }
    addAsHuman() {
        this.id(`message-${++Section.messageCount}`).addClass('human').addTo('messages');
        this.setFocus();
    }
    replaceLastHuman() {
        this.id(`message-${Section.messageCount}`).addClass('human').addTo('messages');
        this.setFocus();
    }
    setFocus() {
        const firstFocusable = this.element.querySelector('button, input');
        firstFocusable === null || firstFocusable === void 0 ? void 0 : firstFocusable.focus();
    }
}
Section.messageCount = 0;
