import Game from './game.js';
import { Paragraph, Panel } from './html.js';
import { CheckboxVariable, TextVariable } from './variable.js';
import UnitTest from './unit_test.js';
export default class Float extends Game {
    constructor() {
        super();
        this.description = 'Float: check the format';
    }
    specificationPanel() {
        return new Panel('Specification', [
            new Paragraph('Return true if the text represents a float and returns false if it doesn\'t. ' +
                'A float may start with a plus or a minus sign. ' +
                'This is followed by one or more digits. ' +
                'If that is followed by a dot, one or more digit must follow.'),
        ]);
    }
    getParameters() {
        return [
            new TextVariable('Text', 'text')
        ];
    }
    getUnit() {
        return new CheckboxVariable('Does it represent a float?', 'isFloat');
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
