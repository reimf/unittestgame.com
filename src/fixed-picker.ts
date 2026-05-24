import { Picker } from "./picker.js"

export class FixedPicker extends Picker {
    public integerUnder(_x: number): number {
        return 0
    }
}
