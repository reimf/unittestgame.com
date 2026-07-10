export class Injector {
    private readonly parameters: URLSearchParams

    constructor(parameters: URLSearchParams) {
        this.parameters = parameters
    }

    public getOption(key: string, options: readonly string[]): string {
        if (!this.parameters.has(key))
            return options[0]!
        const value = this.parameters.get(key)!
        this.parameters.delete(key)
        if (options.includes(value))
            return value
        throw new Error(`Parameter ${key}=${value}, but ${value} is not one of ${options.join(', ')}`)
    }

    public getAll(key: string): string[] {
        const values = this.parameters.getAll(key)
        this.parameters.delete(key)
        return values
    }

    public checkEmpty(): void {
        const remainingKeys = [...this.parameters.keys()]
        if (remainingKeys.length > 0)
            throw new Error(`Unknown parameters ${remainingKeys.join(', ')}`)
    }
}