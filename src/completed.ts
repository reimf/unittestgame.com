export class Completed {
    private readonly key: string

    constructor(key: string) {
        this.key = key
    }

    public get(): number {
        if (typeof localStorage === 'undefined')
            return 0
        const value = localStorage.getItem(this.key)
        if (!value)
            return 0
        return Number(value)
    }

    public set(value: number): void {
        localStorage.setItem(this.key, value.toString())
    }
}
