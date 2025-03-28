"use strict";
// make tests predictable
Math.random = () => 42;
// make tests faster
window.originalSetTimeout = window.setTimeout;
window.setTimeout = ((fn, _delay) => {
    fn();
    return 0; // Return a fake timeout ID
});
