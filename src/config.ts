import { Level } from './level-base.js'
import { Locale } from './locale.js'
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

export class Config {
    public readonly locale: Locale

    public constructor(lng: string) {
        this.locale = new Locale(lng)
    }

    public allLevels(): Level[] {
        const levelClasses = [BatteryLevel, VotingAge, EvenOrOdd, Review, FizzBuzz, LeapYear, TriangleType, SpeedDisplay, FloatFormat, PasswordStrength]
        return levelClasses.map((levelClass, index) => new levelClass(this.locale, index + 1))
    }
}
