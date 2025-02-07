"use strict";
class Section extends Html {
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
