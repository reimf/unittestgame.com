import { Code, Div, Span } from './html.js';
import { TestResult } from './test_result.js';
export class Candidate {
    constructor(lines) {
        this.lines = lines.map(line => line.replace(/\\\\/g, '\\'));
        const code = lines.join('\n');
        this.function = new Function('return ' + code)();
        const chunks = this.getChunks(code);
        const variables = this.getVariables(chunks);
        this.complexityTestDrivenDevelopment = chunks.length + variables.length;
        this.complexityMutationTesting = this.getPreferenceEarlyReturns(this.lines);
    }
    zip(candidate) {
        return this.lines.map((line, pos) => [line, candidate.lines[pos]]);
    }
    combine(candidate) {
        if (!candidate)
            return this;
        const lines = this.zip(candidate).map(([line, other]) => line || other);
        return new Candidate(lines);
    }
    getChunks(code) {
        return code
            .replace(/\n/g, ' ') // simplify white space
            .replace(/"[^"]*?"/g, ' _ _ ') // each string is 1 extra point
            .replace(/\(([^(]*?)\)/g, ' _ $1 ') // each function definition/call is 1 extra point
            .replace(/\(([^(]*?)\)/g, ' _ $1 ') // handle nested function calls
            .replace(/,/g, ' ') // each parameter and argument is 1 point
            .replace(/\.(?=[a-z])/g, ' ') // each class mention is 1 point
            .replace(/(?<=\d)0+ /g, ' ') // 200 is 1 point
            .replace(/(?<=\d)(?=\d)/g, ' ') // 3199 is 4 points, 3200 only 2
            .replace(/(?<=\d)\.(?=\d)/g, ' _ ') // each float is 1 point extra
            .replace(/undefined/g, ' ') // undefined is free
            .split(/\s+/) // each token is 1 point
            .filter(token => token !== '');
    }
    getVariables(chunks) {
        const keywords = [
            'function', 'return', '\\{', '\\}',
            'if', '&&', '\\|\\|',
            '\\d',
            '\\/', '%', '[=!]==', '\\+=', '=', '\\+', '\\*',
            '\\>=?', '\\<=?',
            'true', 'false',
            'new', 'RegExp', 'Math', 'toString', 'toFixed', 'round', 'test', 'length',
            'let', 'undefined',
            '[A-Z]+', '_',
        ];
        const regex = '^' + keywords.join('|') + '$';
        const variables = chunks.filter(chunk => !chunk.match(regex));
        const notYetSeen = variables.filter(variable => !variable.match(/^([a-z]+([A-Z][a-z]+)+|a|age|b|c|display|num|password|regex|speed|text|year)$/));
        if (notYetSeen.length > 0)
            throw new Error(`Unknown tokens: ${notYetSeen.join(', ')}`);
        return variables;
    }
    getPreferenceEarlyReturns(lines) {
        return lines.reduce((subtotal, line, index) => subtotal + (line && line.trim() !== 'return undefined' ? Math.pow(2, index) : 0), 0);
    }
    execute(argumentsList) {
        try {
            return this.function(...argumentsList);
        }
        catch (error) {
            return undefined;
        }
    }
    failingTestResults(unitTests) {
        return unitTests.map(unitTest => new TestResult(this, unitTest)).filter(testResult => !testResult.passes);
    }
    failCount(unitTests) {
        return this.failingTestResults(unitTests).length;
    }
    isAmputeeOf(candidate) {
        return this.zip(candidate).every(([line, other]) => line === other || line === '' || line.trim() === 'return undefined');
    }
    compareComplexityTestDrivenDevelopment(candidate) {
        return Math.sign(this.complexityTestDrivenDevelopment - candidate.complexityTestDrivenDevelopment);
    }
    compareComplexityMutationTesting(candidate) {
        return Math.sign(this.complexityMutationTesting - candidate.complexityMutationTesting);
    }
    toString() {
        return this.lines.join('\n');
    }
    toHtml() {
        return new Code().appendChildren(this.lines.map(line => new Div().appendText(line)));
    }
    toHtmlWithPrevious(previousCandidate) {
        const lines = this.zip(previousCandidate).reduce((divs, [line, other]) => {
            const comment = line === '' && other === '' ? ''
                : line === other ? ''
                    : line === '' ? `  // was: ${other.trim()}`
                        : other === '' ? ' // new'
                            : ` // was: ${other.trim()}`;
            const div = new Div();
            if (line !== '')
                div.appendText(line);
            if (comment !== '')
                div.appendChild(new Span().appendText(comment).addClass('comment'));
            return [...divs, div];
        }, []);
        return new Code().appendChildren(lines);
    }
    toHtmlWithCoverage(coveredCandidate) {
        const lines = this.zip(coveredCandidate).map(([line, other]) => {
            const isNotIndented = !line.startsWith('  ');
            const isUsed = line === other;
            return new Div().appendText(line).addClass(isNotIndented || isUsed ? 'covered' : '');
        });
        return new Code().appendChildren(lines);
    }
}
