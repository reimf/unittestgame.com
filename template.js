"use strict";
class Template {
    constructor(items) {
        this.items = items;
    }
    paragraph(lines) {
        const element = document.createElement('p');
        element.innerHTML = lines.join(' ').trim();
        return element;
    }
    *generateHtmlElements(items) {
        const buffer = [];
        for (const item of items.concat([undefined])) {
            if (typeof item === 'string')
                buffer.push(item);
            if (typeof item !== 'string' || item.endsWith('\n')) {
                yield this.paragraph(buffer);
                buffer.length = 0;
            }
            if (Array.isArray(item))
                yield* this.generateHtmlElements(item);
            else if (item instanceof HTMLElement)
                yield item;
            else if (item !== undefined && typeof item !== 'string')
                yield item.toHtmlElement();
        }
    }
    toHtmlElement(id, _class) {
        const section = document.createElement('section');
        section.id = id;
        if (_class)
            section.classList.add(_class);
        const [title, ...body] = this.items;
        const header = document.createElement('header');
        header.innerText = title;
        section.appendChild(header);
        const main = document.createElement('main');
        for (const element of this.generateHtmlElements(body))
            main.appendChild(element);
        section.appendChild(main);
        return section;
    }
    inParent(parentId, sectionId, _class) {
        var _a, _b, _c;
        (_a = document.querySelector('#' + sectionId)) === null || _a === void 0 ? void 0 : _a.remove();
        const section = this.toHtmlElement(sectionId, _class);
        (_b = document.querySelector('#' + parentId)) === null || _b === void 0 ? void 0 : _b.appendChild(section);
        (_c = section.querySelector('input')) === null || _c === void 0 ? void 0 : _c.focus();
    }
    inSidebar(id, _class) {
        this.inParent('sidebar', id, _class);
    }
    newHumanMessage() {
        Template.messageId += 1;
        this.inParent('messages', `message-${Template.messageId}`, 'human');
    }
    newComputerMessage() {
        Template.messageId += 1;
        this.inParent('messages', `message-${Template.messageId}`, 'computer');
    }
    replaceHumanMessage() {
        this.inParent('messages', `message-${Template.messageId}`, 'human');
    }
}
Template.messageId = 0;
