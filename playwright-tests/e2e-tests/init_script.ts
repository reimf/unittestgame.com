// make tests predictable
Math.random = () => 42;

// make tests faster
(window as any).originalSetTimeout = window.setTimeout;
  
window.setTimeout = ((fn: Function, _delay?: number) => {
    fn();
    return 0; // Return a fake timeout ID
  }) as typeof setTimeout;