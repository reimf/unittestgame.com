export abstract class Picker {
    public elementFrom<T>(list: readonly T[]): T {
        return list[this.integerUnder(list.length)]!
    }

    public abstract integerUnder(x: number): number
}

export class FixedPicker extends Picker {
    public integerUnder(_x: number): number {
        return 0
    }
}

export class RandomPicker extends Picker {
    public integerUnder(x: number): number {
        return Math.floor(Math.random() * x)
    }
}
