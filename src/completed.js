export class Completed {
    constructor(key) {
        this.key = key;
    }
    get() {
        const value = localStorage.getItem(this.key);
        return value === null ? 0 : Number(value);
    }
    set(value) {
        localStorage.setItem(this.key, value.toString());
    }
}
