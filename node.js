"use strict";
Object.assign(Node.prototype, {
    appendText(text) {
        this.appendChild(document.createTextNode(text));
    },
    appendChildren(children) {
        for (const child of children)
            this.appendChild(child);
    },
    on(eventType, callback) {
        this.addEventListener(eventType, callback);
    },
    addClass(value) {
        this.classList.add(value);
    }
});
