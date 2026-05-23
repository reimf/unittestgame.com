export abstract class Picker {
    public elementFrom<T>(list: readonly T[]): T {
        return list[this.integerUnder(list.length)]!
    }

    public abstract integerUnder(x: number): number
}
