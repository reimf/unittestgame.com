// make tests predictable
Math.random = () => 0

// make tests faster
window.setTimeout = ((fn: Function, _delay?: number) => fn()) as typeof setTimeout
