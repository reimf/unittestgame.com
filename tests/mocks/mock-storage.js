export class MockStorage {
    constructor() {
        this.storage = new Map();
    }
    get length() {
        return this.storage.size;
    }
    getItem(key) {
        var _a;
        return (_a = this.storage.get(key)) !== null && _a !== void 0 ? _a : null;
    }
    setItem(key, value) {
        this.storage.set(key, value);
        return this;
    }
    removeItem(key) {
        this.storage.delete(key);
        return this;
    }
    key(index) {
        var _a;
        return (_a = Array.from(this.storage.keys())[index]) !== null && _a !== void 0 ? _a : null;
    }
    clear() {
        this.storage.clear();
        return this;
    }
}
