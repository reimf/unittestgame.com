export class StoredValue {
    constructor(key) {
        this.key = key;
    }
    get(storage) {
        return storage.getItem(this.key) || '';
    }
    set(storage, value = '') {
        storage.setItem(this.key, value === '' ? new Date().toUTCString() : value);
    }
}
