import { UseCase } from './use-case-base.js';
import { Random } from './random.js';
import { BooleanVariable, TextVariable } from './variable.js';
export class FloatFormat extends UseCase {
    identifier() {
        return 'float-format';
    }
    name() {
        return 'Float Format';
    }
    specification() {
        return this.locale.returnTrueIfTheTextRepresentsAFloatAndFalseIfItDoesnt();
    }
    getParameters() {
        return [
            new TextVariable('Text', 'text')
        ];
    }
    getUnit() {
        return new BooleanVariable('Represents a float', 'isFloatFormat');
    }
    getCandidateElements() {
        return [
            [
                'let regex = "^"',
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
                'regex += "\\\\.[0-9]+"',
                'regex += "(\\\\.[0-9]+)?"',
                'regex += "(\\\\.[0-9]+)*"',
                'regex += "\\\\.[0-9]*"',
                'regex += "(\\\\.[0-9]*)?"',
                'regex += "(\\\\.[0-9]*)*"',
                '',
            ],
            [
                'regex += "$"',
            ],
            [
                'return new RegExp(regex).test(text)',
                'return true',
                'return false',
                'return undefined',
            ],
        ];
    }
    *minimalUnitTestGenerator() {
        yield [['+12'], true];
        yield [['-12.34'], true];
        yield [['12.34'], true];
        yield [['+-12'], false];
        yield [['12.'], false];
        yield [['.34'], false];
        yield [['12.3.4'], false];
    }
    *hintGenerator() {
        for (let i = 0; i < 100; i++) {
            const integerPart = Random.integerUnder(1000).toString();
            const precision = Random.integerUnder(4);
            const fractionalPart = Random.integerUnder(10 ** precision).toString().padStart(precision, '0');
            const sign = Random.elementFrom(['-', '+', '']);
            const correctFormat = sign + integerPart + '.' + fractionalPart;
            yield [correctFormat];
            const pos = Random.integerUnder(correctFormat.length);
            const substitution = Random.elementFrom(['0', '+', '-', '.']);
            const probablyIncorrectFormat = correctFormat.substring(0, pos) + substitution + correctFormat.substring(pos + 1);
            yield [probablyIncorrectFormat];
        }
    }
}
