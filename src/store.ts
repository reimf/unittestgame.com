export class Completed {
    private readonly key: string
    private readonly storage: Storage

    constructor(key: string, storage: Storage) {
        this.key = key
        this.storage = storage
    }

    public get(): number {
        const value = this.storage.getItem(this.key)
        if (!value)
            return 0
        return Number(value)
    }

    public set(value: number): void {
        this.storage.setItem(this.key, value.toString())
    }
}
