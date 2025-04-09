export class StoredValue {
    private readonly key: string

    constructor(key: string) {
        this.key = key
    }

    public get(storage: Storage): string {
        return storage.getItem(this.key) || ''
    }

    public set(storage: Storage, value: string = ''): void {
        storage.setItem(this.key, value === '' ? new Date().toUTCString() : value)
    }
}