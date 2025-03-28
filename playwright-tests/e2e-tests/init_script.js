"use strict";
// make tests predictable
Math.random = () => 0;
// make tests faster
window.setTimeout = ((fn, _delay) => fn());
