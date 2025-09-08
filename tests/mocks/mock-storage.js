export class MockStorage {
    storage = new Map();
    get length() {
        return this.storage.size;
    }
    getItem(key) {
        return this.storage.get(key) ?? null;
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
        return Array.from(this.storage.keys())[index] ?? null;
    }
    clear() {
        this.storage.clear();
        return this;
    }
}
