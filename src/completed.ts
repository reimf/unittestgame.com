export class Completed {
    private readonly key: string

    constructor(key: string) {
        this.key = key
    }

    public get(): boolean {
        return localStorage.getItem(this.key) != null
    }

    public set(): void {
        localStorage.setItem(this.key, new Date().toUTCString())
    }

    public recent(): boolean {
        const previous = localStorage.getItem(this.key)
        if (previous == null)
            return false
        const now = new Date()
        const previousDate = new Date(previous)
        return now.getTime() - previousDate.getTime() < 10 * 1000
    }
}
