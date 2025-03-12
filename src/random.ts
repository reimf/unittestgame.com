export class Random {
    public static elementFrom<T>(list: T[]): T {
        return list[this.integerUnder(list.length)]
    }

    public static integerUnder(x: number): number {
        return Math.floor(Math.random() * x)
    }
}
