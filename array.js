"use strict";
Object.assign(Array.prototype, {
    randomElement() {
        return this[Math.randomInt(this.length)];
    },
});
