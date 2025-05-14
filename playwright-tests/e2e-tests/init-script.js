"use strict";
// make tests predictable
Math.random = () => 0;
// make tests faster by skipping timeouts
window.setTimeout = ((callback) => callback());
