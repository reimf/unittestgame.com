import { UseCase } from './use_case.js';
import { Random } from './random.js';
import { CheckboxVariable, TextVariable } from './variable.js';
export class PasswordStrength extends UseCase {
    name() {
        return 'Password Strength';
    }
    specification() {
        return ('Return true if the password is strong and return false if the password is not strong. ' +
            'A password is strong if it contains at least 5 characters, ' +
            'an uppercase letter, ' +
            'a lowercase letter and ' +
            'a special character ("#" or "@").');
    }
    getParameters() {
        return [
            new TextVariable('Password', 'password')
        ];
    }
    getUnit() {
        return new CheckboxVariable('Is a strong password', 'isStrongPassword');
    }
    getCandidateElements() {
        return [
            [
                'if (password.length < 4) return false',
                'if (password.length < 5) return false',
                'if (password.length <= 5) return false',
                'if (password.length < 8) return false',
                '',
            ],
            [
                'if (!/[A-Z]/.test(password)) return false',
                '',
            ],
            [
                'if (!/[a-z]/.test(password)) return false',
                '',
            ],
            [
                'if (!/#/.test(password)) return false',
                'if (!/@/.test(password)) return false',
                'if (!/[#@]/.test(password)) return false',
                '',
            ],
            [
                'return true',
                'return false',
                'return undefined',
            ],
        ];
    }
    *minimalUnitTestGenerator() {
        yield [['A3a6#'], true];
        yield [['@251Bz'], true];
        yield [['1#36D0'], false];
        yield [['n5EFG'], false];
        yield [['@9#4@i'], false];
        yield [['@6jB'], false];
    }
    *generateDigits() {
        for (let d1 = 0; d1 < 10; d1++) {
            for (let d2 = d1; d2 < 10; d2++) {
                if (d1 + d2 === 13)
                    yield [d1.toString(), d2.toString()];
                for (let d3 = d2; d3 < 10; d3++) {
                    if (d1 + d2 + d3 === 13)
                        yield [d1.toString(), d2.toString(), d3.toString()];
                    for (let d4 = d3; d4 < 10; d4++) {
                        if (d1 + d2 + d3 + d4 === 13)
                            yield [d1.toString(), d2.toString(), d3.toString(), d4.toString()];
                    }
                }
            }
        }
    }
    *generateUppercase() {
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (const upper1 of uppercase) {
            yield [upper1];
            for (const upper2 of uppercase) {
                yield [];
                yield [upper1, upper2];
            }
        }
    }
    *generateLowercase() {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        for (const lower1 of lowercase) {
            yield [lower1];
            for (const lower2 of lowercase) {
                yield [];
                yield [lower1, lower2];
            }
        }
    }
    *generateSpecialCharacters() {
        const specialChars = '@#!';
        for (const special1 of specialChars) {
            yield [special1];
            for (const special2 of specialChars) {
                yield [];
                yield [special1, special2];
            }
        }
    }
    *hintGenerator() {
        const digits = [...this.generateDigits()];
        const uppercase = [...this.generateUppercase()];
        const lowercase = [...this.generateLowercase()];
        const specialChars = [...this.generateSpecialCharacters()];
        for (let i = 0; i < 100; i++) {
            const ds = Random.elementFrom(digits);
            const us = Random.elementFrom(uppercase);
            const ls = Random.elementFrom(lowercase);
            const scs = Random.elementFrom(specialChars);
            const chars = [...ds, ...us, ...ls, ...scs];
            this.shuffleArray(chars);
            yield [chars.join('')];
            const pos = Random.integerUnder(chars.length);
            chars[pos] = Random.integerUnder(10).toString();
            yield [chars.join('')];
        }
    }
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Random.integerUnder(i + 1);
            const swap = array[i];
            array[i] = array[j];
            array[j] = swap;
        }
    }
}
