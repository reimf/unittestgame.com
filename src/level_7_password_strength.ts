import { Panel } from './frame.js'
import { Paragraph } from './html.js'
import { Level } from './level.js'
import { Random } from './random.js'
import { Variable, CheckboxVariable, TextVariable } from './variable.js'

export class PasswordStrength extends Level {
    public showSpecificationPanel(): void {
        new Panel('Specification', [
            new Paragraph().lines([
                'Return true if the password is strong and return false if the password is not strong.',
                'A password is strong if it contains at least 5 characters,',
                'an uppercase letter,',
                'a lowercase letter and',
                'a special character ("#" or "@").',
            ]),
        ]).show()
    }

    public getParameters(): Variable[] {
        return [
            new TextVariable('Password', 'password')
        ]
    }

    public getUnit(): Variable {
        return new CheckboxVariable(
            'Is a strong password',
            'isStrongPassword'
        )
    }

    public getCandidateElements(): string[][] {
        return [
            [
                'if (password.length < 4) return false',
                'if (password.length < 5) return false',
                'if (password.length <= 5) return false',
                'if (password.length < 8) return false',
                'if (password.length >= 5) return true',
                'if (password.length >= 6) return true',
                '',
            ],
            [
                'if (!/[A-Z]/.test(password)) return false',
                'if (/[A-Z]/.test(password)) return true',
                '',
            ],
            [
                'if (!/[a-z]/.test(password)) return false',
                'if (/[a-z]/.test(password)) return true',
                '',
            ],
            [
                'if (!password.includes("#")) return false',
                'if (!password.includes("@")) return false',
                'if (!password.includes("#") && !password.includes("@")) return false',
                'if (password.includes("#")) return true',
                'if (password.includes("@")) return true',
                'if (password.includes("#") || password.includes("@")) return true',
                '',
            ],
            [
                'return true',
                'return false',
                '',
            ],
        ]
    }

    public *minimalUnitTestGenerator(): Generator<any[]> {
        yield [['A3a6#'], true]
        yield [['@251Bc'], true]
        yield [['1#36D0'], false]
        yield [['n5EFG'], false]
        yield [['@9#4@i'], false]
        yield [['@6jB'], false]
    }

    private *generateDigits(): Generator<string[]> {
        for (let d1 = 0; d1 < 10; d1++) {
            for (let d2 = d1; d2 < 10; d2++) {
                if (d1 + d2 === 13) yield [d1.toString(), d2.toString()]
                for (let d3 = d2; d3 < 10; d3++) {
                    if (d1 + d2 + d3 === 13) yield [d1.toString(), d2.toString(), d3.toString()]
                    for (let d4 = d3; d4 < 10; d4++) {
                        if (d1 + d2 + d3 + d4 === 13) yield [d1.toString(), d2.toString(), d3.toString(), d4.toString()]
                    }
                }
            }
        }
    }

    private *generateUppercase(): Generator<string[]> {
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for (const upper1 of uppercase) {
            yield [upper1]
            for (const upper2 of uppercase) {
                yield []
                yield [upper1, upper2]
            }
        }
    }

    private *generateLowercase(): Generator<string[]> {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz'
        for (const lower1 of lowercase) {
            yield [lower1]
            for (const lower2 of lowercase) {
                yield []
                yield [lower1, lower2]
            }
        }
    }

    private *generateSpecialCharacters(): Generator<string[]> {
        const specialChars = '@#!'
        for (const special1 of specialChars) {
            yield [special1]
            for (const special2 of specialChars) {
                yield []
                yield [special1, special2]
            }
        }
    }

    public *hintGenerator(): Generator<string[]> {
        const digits = [...this.generateDigits()]
        const uppercase = [...this.generateUppercase()]
        const lowercase = [...this.generateLowercase()]
        const specialChars = [...this.generateSpecialCharacters()]

        for (let i = 0; i < 100; i++) {
            const ds = Random.elementFrom(digits)
            const us = Random.elementFrom(uppercase)
            const ls = Random.elementFrom(lowercase)
            const scs = Random.elementFrom(specialChars)

            const chars = [...ds, ...us, ...ls, ...scs]
            this.shuffleArray(chars)

            yield [chars.join('')]

            const pos = Random.integerUnder(chars.length)
            chars[pos] = Random.integerUnder(10).toString()
            yield [chars.join('')]
        }
    }

    private shuffleArray(array: string[]): void {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Random.integerUnder(i + 1)
            const swap = array[i]
            array[i] = array[j]
            array[j] = swap
        }
    }
}
