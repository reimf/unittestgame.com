export class Random {
    public static elementFrom(list: any[]): any {
        if (list.length === 0)
            return undefined
        return list[this.randomInt(list.length)]
    }

    public static randomInt(x: number): number {
        return Math.floor(Math.random() * x)
    }
}