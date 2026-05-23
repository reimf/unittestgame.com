export class MockStorage {
    private readonly storage = new Map<string, string>()

    get length(): number {
        return this.storage.size
    }

    getItem(key: string): string|null {
        return this.storage.get(key) ?? null
    }

    setItem(key: string, value: string): this {
        this.storage.set(key, value)
        return this
    }

    removeItem(key: string): this {
        this.storage.delete(key)
        return this
    }

    key(index: number): string|null {
        return Array.from(this.storage.keys())[index] ?? null
    }

    clear(): this {
        this.storage.clear()
        return this
    }
}
