export class Completed {
    private readonly key: string

    constructor(key: string) {
        this.key = key
    }

    public get(): number {
        const value = localStorage.getItem(this.key)
        return value === null ? 0 : Number(value)
    }

    public set(value: number): void {
        localStorage.setItem(this.key, value.toString())
    }
}
