import { AnyLevel } from './level-base.js'
import { Store } from './store.js'
import { BatteryLevel } from './level-battery-level.js'
import { EvenOrOdd } from './level-even-or-odd.js'
import { FizzBuzz } from './level-fizz-buzz.js'
import { FloatFormat } from './level-float-format.js'
import { LeapYear } from './level-leap-year.js'
import { PasswordStrength } from './level-password-strength.js'
import { Review } from './level-review.js'
import { SpeedDisplay } from './level-speed-display.js'
import { TriangleType } from './level-triangle-type.js'
import { VotingAge } from './level-voting-age.js'
import { ConversationLanguage } from './conversation-language-base.js'
import { Picker } from './picker.js'
import { ProgrammingLanguage } from './programming-language-base.js'

export class Game {
    private readonly conversationLanguage: ConversationLanguage
    private readonly programmingLanguage: ProgrammingLanguage
    private readonly picker: Picker
    private readonly store: Store

    public constructor(conversationLanguage: ConversationLanguage, programmingLanguage: ProgrammingLanguage, picker: Picker, store: Store) {
        this.conversationLanguage = conversationLanguage
        this.programmingLanguage = programmingLanguage
        this.picker = picker
        this.store = store
    }

    public levels(): AnyLevel[] {
        const levelClasses = [
            BatteryLevel,
            VotingAge,
            EvenOrOdd,
            Review,
            FizzBuzz,
            LeapYear,
            TriangleType,
            SpeedDisplay,
            FloatFormat,
            PasswordStrength,
        ]
        return levelClasses.map((levelClass, index) => new levelClass(this.conversationLanguage, this.programmingLanguage, this.picker, this.store, index))
    }
}
