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
    recent() {
        const previous = localStorage.getItem(this.key);
        if (previous == null)
            return false;
        const now = new Date();
        const previousDate = new Date(previous);
        return now.getTime() - previousDate.getTime() < 10 * 1000;
    }
}
