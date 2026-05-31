export class Injector {
    private readonly parameters

    constructor(parameters: URLSearchParams) {
        this.parameters = parameters
    }

    public get(key: string): string | null {
        const result = this.parameters.get(key)
        this.parameters.delete(key)
        return result
    }

    public getAll(key: string): string[] {
        const result = this.parameters.getAll(key)
        this.parameters.delete(key)
        return result
    }

    public keys(): IterableIterator<string> {
        return this.parameters.keys()
    }
}