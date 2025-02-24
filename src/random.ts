export class Random {
    public static elementFrom<T>(list: T[]): T {
        return list[this.randomInt(list.length)]
    }

    public static randomInt(x: number): number {
        return Math.floor(Math.random() * x)
    }
}