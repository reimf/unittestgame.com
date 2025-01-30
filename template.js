"use strict";
class Template {
    constructor(elements) {
        this.elements = elements;
    }
    toHtml(id, className) {
        return new Html('section').id(id).className(className).appendChildren(this.elements);
    }
    inParent(parentId, sectionId, className) {
        var _a, _b, _c;
        (_a = document.querySelector('#' + sectionId)) === null || _a === void 0 ? void 0 : _a.remove();
        const section = this.toHtml(sectionId, className).toHTMLElement();
        (_b = document.querySelector('#' + parentId)) === null || _b === void 0 ? void 0 : _b.appendChild(section);
        (_c = section.querySelector('input')) === null || _c === void 0 ? void 0 : _c.focus();
    }
    inSidebar(id, className) {
        this.inParent('sidebar', id, className);
    }
    newComputerMessage() {
        Template.messageId += 1;
        this.inParent('messages', `message-${Template.messageId}`, 'computer');
    }
    newHumanMessage() {
        Template.messageId += 1;
        this.inParent('messages', `message-${Template.messageId}`, 'human');
    }
    replaceLastHumanMessage() {
        this.inParent('messages', `message-${Template.messageId}`, 'human');
    }
}
Template.messageId = 0;
