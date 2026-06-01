export class Injector {
    private readonly parameters: URLSearchParams

    constructor(parameters: URLSearchParams) {
        this.parameters = parameters
    }

    public getOption(key: string, options: string[]): string {
        if (!this.parameters.has(key))
            return options[options.length - 1]!
        const result = this.parameters.get(key)!
        this.parameters.delete(key)
        if (options.includes(result))
            return result
        throw new Error(`Parameter ${key}=${result}, but ${result} is not one of ${options.join(', ')}`)
    }

    public getAll(key: string): string[] {
        const result = this.parameters.getAll(key)
        this.parameters.delete(key)
        return result
    }

    public checkEmpty(): void {
        const remainingKeys = [...this.parameters.keys()]
        if (remainingKeys.length > 0)
            throw new Error(`Unknown parameters ${remainingKeys.join(', ')}`)
    }
}