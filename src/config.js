import { Locale } from './locale.js';
import { BatteryLevel } from './level-battery-level.js';
import { EvenOdd } from './level-even-odd.js';
import { FizzBuzz } from './level-fizz-buzz.js';
import { FloatFormat } from './level-float-format.js';
import { LeapYear } from './level-leap-year.js';
import { PasswordStrength } from './level-password-strength.js';
import { Review } from './level-review.js';
import { SpeedDisplay } from './level-speed-display.js';
import { TriangleType } from './level-triangle-type.js';
import { VotingAge } from './level-voting-age.js';
export class Config {
    locale;
    constructor(lng) {
        this.locale = new Locale(lng);
    }
    allLevels() {
        return [
            new BatteryLevel(this.locale, 1),
            new EvenOdd(this.locale, 2),
            new VotingAge(this.locale, 3),
            new Review(this.locale, 4),
            new FizzBuzz(this.locale, 5),
            new TriangleType(this.locale, 6),
            new SpeedDisplay(this.locale, 7),
            new FloatFormat(this.locale, 8),
            new LeapYear(this.locale, 9),
            new PasswordStrength(this.locale, 10),
        ];
    }
}
