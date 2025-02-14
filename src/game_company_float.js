import Game from './game.js';
import Company from './theme_company.js';
import { Paragraph, Panel, ComputerMessage } from './html.js';
import { CheckboxVariable, TextVariable } from './variable.js';
import UnitTest from './unit_test.js';
export default class Float extends Game {
    constructor() {
        super();
        this.theme = Company.instance;
        this.description = 'I want to review a function that uses a regular expression to determine whether a text represents a float';
    }
    introductionMessage() {
        return new ComputerMessage([
            new Paragraph('A laboratory needs a function to check whether measured values have been entered correctly. ' +
                'The lab technicians will perform ciritcal calculations with these numbers, so there must be no errors.'),
        ]);
    }
    specificationPanel() {
        return new Panel('Specification', [
            new Paragraph('The function must determine whether a text represents a float and returns true or false accordingly. ' +
                'A float may start with a plus sign or a minus sign. ' +
                'This is followed by one or more digits. ' +
                'If there is a dot, at least one digit must follow.'),
        ]);
    }
    getParameters() {
        return [
            new TextVariable('Tekst', 'text')
        ];
    }
    getUnit() {
        return new CheckboxVariable('Is het een kommagetal?', 'isFloat');
    }
    getCandidateElements() {
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
        ];
    }
    getMinimalUnitTests() {
        return [
            new UnitTest(['+123'], true),
            new UnitTest(['-123.45'], true),
            new UnitTest(['123.45'], true),
            new UnitTest(['+-123'], false),
            new UnitTest(['123.'], false),
            new UnitTest(['.45'], false),
            new UnitTest(['12.3.45'], false),
        ];
    }
    *hintGenerator() {
        for (let i = 0; i < 100; i++) {
            const number = Math.random() * 1000;
            const precision = this.randomInt(4);
            const sign = this.randomElementFrom(['-', '+', '']);
            const rounded = number.toFixed(precision);
            const text1 = sign + rounded;
            yield [text1];
            const pos = this.randomInt(text1.length);
            const text2 = text1.substring(0, pos) + this.randomElementFrom(['0', '+', '-', '.']) + text1.substring(pos + 1);
            yield [text2];
        }
    }
}
