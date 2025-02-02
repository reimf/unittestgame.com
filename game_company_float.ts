class Float extends Game {
    readonly theme = Company.instance

    public constructor() {
        super()
    }

    public description(): string {
        return 'I want to review a function that uses a regular expression to determine whether a text represents a float.'
    }
    
    protected introductionMessage(): Section {
        return new Section([
            new Paragraph(
                'A laboratory needs a function to check whether measured values have been entered correctly. ' +
                'The lab technicians will perform ciritcal calculations with these numbers, so there must be no errors.'
            ),
        ])
    }
    
    protected specificationPanel(): Section {
        return new Section([
            new Header('Specification'),
            new Paragraph(
                'The function must determine whether a text represents a float and returns true or false accordingly. ' +
                'A float may start with a plus sign or a minus sign. ' +
                'This is followed by one or more digits. ' +
                'If there is a dot, at least one digit must follow. '
            ),
        ])
    }    

    protected getParameters(): Variable[] {
        return [
            new TextVariable('Tekst', 'text')
        ]
    }

    protected getUnit(): Variable {
        return new CheckboxVariable(
            'Is het een kommagetal?',
            'isFloat'
        )
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'let regex = ""',
            ],
            [
                'regex += "[+-]?"',
                'regex += "[+-]*"',
                'regex += "[+-]+"',
                'regex += "[+-]"',
                'regex += "[-]?"',
                'regex += "[-]*"',
                'regex += "[-]+"',
                'regex += "[-]"',
                'regex += "[+]?"',
                'regex += "[+]*"',
                'regex += "[+]+"',
                'regex += "[+]"',
                '',
            ],
            [
                'regex += "[0-9]"',
                'regex += "[0-9]*"',
                'regex += "[0-9]+"',
                '',
            ],
            [
                'regex += "\\.[0-9]+"',
                'regex += "(\\.[0-9]+)?"',
                'regex += "(\\.[0-9]+)*"',
                'regex += "\\.[0-9]*"',
                'regex += "(\\.[0-9]*)?"',
                'regex += "(\\.[0-9]*)*"',
                '',
            ],
            [
                'return new RegExp(`^${regex}$`).test(text)',
                'return true',
                'return false',
            ]
        ]
    }

    protected getSpecialUnitTests(): UnitTest[] {
        return [
            new UnitTest(['+123'], true),
            new UnitTest(['-123.45'], true),
            new UnitTest(['123.45'], true),
            new UnitTest(['+-123'], false),
            new UnitTest(['123.'], false),
            new UnitTest(['.45'], false),
            new UnitTest(['12.3.45'], false),
        ]
    }

    protected *generalArgumentsGenerator(): Generator<any[]> {
        for (let i = 0; i < 100; i++) {
            const number = Math.random() * 1000
            const precision = Math.floor(Math.random() * 4)
            const sign = ['-', '+', ''].random()
            const rounded = number.toFixed(precision)
            const text1 = sign + rounded
            yield [text1]

            const pos = Math.floor(Math.random() * text1.length)
            const text2 = text1.substring(0, pos) + ['0', '+', '-', '.'].random() + text1.substring(pos + 1)
            yield [text2]
        }
    }
}
