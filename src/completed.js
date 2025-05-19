export class Completed {
    constructor(key) {
        this.key = key;
    }
    get() {
        const value = localStorage.getItem(this.key);
        return value ? Number(value) : 0;
    }
    set(value) {
        localStorage.setItem(this.key, value.toString());
    }
}
