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
        const levelClasses = [BatteryLevel, EvenOdd, VotingAge, Review, FizzBuzz, LeapYear, TriangleType, SpeedDisplay, FloatFormat, PasswordStrength];
        return levelClasses.map((levelClass, index) => new levelClass(this.locale, index + 1));
    }
}
