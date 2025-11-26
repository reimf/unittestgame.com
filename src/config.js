import { MutationTesting } from './level-mutation-testing.js';
import { TestDrivenDevelopment } from './level-test-driven-development.js';
import { Locale } from './locale.js';
import { BatteryLevel } from './use-case-battery-level.js';
import { EvenOdd } from './use-case-even-odd.js';
import { FizzBuzz } from './use-case-fizz-buzz.js';
import { FloatFormat } from './use-case-float-format.js';
import { LeapYear } from './use-case-leap-year.js';
import { PasswordStrength } from './use-case-password-strength.js';
import { Review } from './use-case-review.js';
import { SpeedDisplay } from './use-case-speed-display.js';
import { TriangleType } from './use-case-triangle-type.js';
import { VotingAge } from './use-case-voting-age.js';
export class Config {
    locale;
    constructor(lng) {
        this.locale = new Locale(lng);
    }
    allLevels() {
        const batteryLevel = new BatteryLevel(this.locale);
        const votingAge = new VotingAge(this.locale);
        const evenOdd = new EvenOdd(this.locale);
        const fizzBuzz = new FizzBuzz(this.locale);
        const review = new Review(this.locale);
        const triangleType = new TriangleType(this.locale);
        const leapYear = new LeapYear(this.locale);
        const floatFormat = new FloatFormat(this.locale);
        const passwordStrength = new PasswordStrength(this.locale);
        const speedDisplay = new SpeedDisplay(this.locale);
        return [
            new TestDrivenDevelopment(this.locale, batteryLevel, 1),
            new TestDrivenDevelopment(this.locale, votingAge, 2),
            new MutationTesting(this.locale, batteryLevel, 3),
            new MutationTesting(this.locale, evenOdd, 4),
            new TestDrivenDevelopment(this.locale, fizzBuzz, 5),
            new MutationTesting(this.locale, triangleType, 6),
            new TestDrivenDevelopment(this.locale, review, 7),
            new MutationTesting(this.locale, votingAge, 8),
            new TestDrivenDevelopment(this.locale, evenOdd, 9),
            new MutationTesting(this.locale, review, 10),
            new TestDrivenDevelopment(this.locale, triangleType, 11),
            new MutationTesting(this.locale, fizzBuzz, 12),
            new TestDrivenDevelopment(this.locale, leapYear, 13),
            new MutationTesting(this.locale, passwordStrength, 14),
            new TestDrivenDevelopment(this.locale, speedDisplay, 15),
            new MutationTesting(this.locale, floatFormat, 16),
            new TestDrivenDevelopment(this.locale, passwordStrength, 17),
            new MutationTesting(this.locale, leapYear, 18),
            new TestDrivenDevelopment(this.locale, floatFormat, 19),
            new MutationTesting(this.locale, speedDisplay, 20),
        ];
    }
}
