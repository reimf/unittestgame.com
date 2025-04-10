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
}
