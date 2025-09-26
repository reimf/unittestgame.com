export class Completed {
    key;
    constructor(key) {
        this.key = key;
    }
    get() {
        if (typeof localStorage === 'undefined')
            return 0;
        const value = localStorage.getItem(this.key);
        if (!value)
            return 0;
        return Number(value);
    }
    set(value) {
        localStorage.setItem(this.key, value.toString());
    }
}
