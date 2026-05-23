import { Picker } from '../../src/picker.js'

export class MockPicker extends Picker {
    public integerUnder(_x: number): number {
        return 0
    }
}
