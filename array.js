"use strict";
Object.assign(Array.prototype, {
    random() {
        return this[Math.floor(Math.random() * this.length)];
    },
});
