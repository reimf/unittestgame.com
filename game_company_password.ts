class Password extends Game {
    public readonly theme = Company.instance
    public readonly description = 'I want to review a function that determines whether a password is strong enough.'

    public constructor() {
        super()
    }

    protected introductionMessage(): Section {
        return new Section([
            new Paragraph(
                'An online store needs a function to check whether a password is strong enough. ' +
                'Customers must be able to rely on their data being well protected.'
            ),
        ])
    }

    protected specificationPanel(): Section {
        return new Section([
            new Header('Specification'),
            new Paragraph('Rule 1: The password must be at least 5 characters long.'),
            new Paragraph('Rule 2: The password must contain an uppercase letter.'),
            new Paragraph('Rule 3: The password must contain a lowercase letter.'),
            new Paragraph('Rule 4: The password must contain a special character ("#" or "@").'),
        ])
    }


    protected getParameters(): Variable[] {
        return [
            new TextVariable('Wachtwoord', 'password')
        ]
    }

    protected getUnit(): Variable {
        return new CheckboxVariable(
            'Is het wachtwoord sterk?',
            'isStrong'
        )
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'if (password.length < 5) return false',
                'if (password.length <= 5) return false',
                'if (password.length < 8) return false',
                'if (password.length >= 5) return true',
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
            ],
        ]
    }

    protected getMinimalUnitTests(): UnitTest[] {
        return [
            new UnitTest(['A3a6#'], true),
            new UnitTest(['@251Bc'], true),
            new UnitTest(['c@34d52'], false),
            new UnitTest(['1#36D0'], false),
            new UnitTest(['n5EFG'], false),
            new UnitTest(['@9#4@i'], false),
            new UnitTest(['@6jB'], false),
        ]
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
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        for (const upper1 of uppercase) {
            yield [upper1]
            for (const upper2 of uppercase) {
                yield []
                yield [upper1, upper2]
            }
        }
    }

    private *generateLowercase(): Generator<string[]> {
        const lowercase = "abcdefghijklmnopqrstuvwxyz"
        for (const lower1 of lowercase) {
            yield [lower1]
            for (const lower2 of lowercase) {
                yield []
                yield [lower1, lower2]
            }
        }
    }

    private *generateSpecialCharacters(): Generator<string[]> {
        const specialChars = "@#!"
        for (const special1 of specialChars) {
            yield [special1]
            for (const special2 of specialChars) {
                yield []
                yield [special1, special2]
            }
        }
    }

    protected *hintGenerator(): Generator<string[]> {
        const digits = [...this.generateDigits()]
        const uppercase = [...this.generateUppercase()]
        const lowercase = [...this.generateLowercase()]
        const specialChars = [...this.generateSpecialCharacters()]

        for (let i = 0; i < 100; i++) {
            const ds = digits.random()
            const us = uppercase.random()
            const ls = lowercase.random()
            const scs = specialChars.random()

            const chars = [...ds, ...us, ...ls, ...scs]
            this.shuffleArray(chars)

            yield [chars.join("")]

            const pos = Math.floor(Math.random() * chars.length)
            chars[pos] = Math.floor(Math.random() * 10).toString()
            yield [chars.join("")]
        }
    }

    private shuffleArray(array: string[]): void {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const swap = array[i]
            array[i] = array[j]
            array[j] = swap
        }
    }
}
