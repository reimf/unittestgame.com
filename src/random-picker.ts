import { Picker } from "./picker.js"

export class RandomPicker extends Picker {
    public integerUnder(x: number): number {
        return Math.floor(Math.random() * x)
    }
}
