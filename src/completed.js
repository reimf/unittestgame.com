export class Completed {
    constructor(key) {
        this.key = key;
    }
    get() {
        return localStorage.getItem(this.key) != null;
    }
    set() {
        localStorage.setItem(this.key, new Date().toUTCString());
    }
}
