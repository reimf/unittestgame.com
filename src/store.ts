export abstract class Store {
    public abstract get(key: string): number
    public abstract set(key: string, value: number): void
}

export class LocalStore extends Store {
    public get(key: string): number {
        const value = localStorage.getItem(key)
        if (!value)
            return 0
        return Number(value)
    }

    public set(key: string, value: number): void {
        localStorage.setItem(key, value.toString())
    }
}

export class MapStore extends Store {
    private readonly mapStorage = new Map<string, string>()

    public get(key: string): number {
        const value = this.mapStorage.get(key)
        if (!value)
            return 0
        return Number(value)
    }

    public set(key: string, value: number): void {
        this.mapStorage.set(key, value.toString())
    }
}
