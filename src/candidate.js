import { Code, Div, Span } from './html.js';
import { TestResult } from './test-result.js';
export class Candidate {
    constructor(lines) {
        this.lines = lines.map(line => line.replace(/\\\\/g, '\\'));
        const code = lines.join('\n');
        this.function = new Function('return ' + code)();
        this.complexityTestDrivenDevelopment = this.getComplexityTestDrivenDevelopment(code);
        this.complexityMutationTesting = this.getComplexityMutationTesting(this.lines);
    }
    zip(candidate) {
        return this.lines.map((line, pos) => [line, candidate.lines[pos]]);
    }
    combine(candidate) {
        if (!candidate)
            return this;
        const lines = this.zip(candidate).map(([line, other]) => line && line.trim() !== 'return undefined' ? line : other);
        return new Candidate(lines);
    }
    getRegEx(code, regex) {
        const matches = code.matchAll(regex);
        const names = [...matches].flatMap(match => match[1].split(/,\s*/));
        return new RegExp(`\\b(${names.join('|')})\\b`, 'g');
    }
    getComplexityTestDrivenDevelopment(code) {
        const functions = this.getRegEx(code, /\bfunction\s+(\w+)\b/g);
        const parameters = this.getRegEx(code, /\bfunction\s+\w+\((.*?)\)/g);
        const variables = this.getRegEx(code, /\blet\s+(\w+)\b/g);
        const tokens = code
            .replace(/\n/g, ' ') // simplify white space
            .replace(/"[^"]*?"/g, ' _ _ ') // each string is 1 extra point
            .replace(/\(([^(]*?)\)/g, ' _ $1 ') // each function definition/call is 1 extra point
            .replace(/\(([^(]*?)\)/g, ' _ $1 ') // handle nested function calls
            .replace(/,/g, ' ') // each parameter and argument is 1 point
            .replace(/[a-zA-Z]+(?=\.)/g, ' _ ') // each static class mention is 1 point
            .replace(/\.[a-zA-Z]+/g, ' _ _ ') // each method invocation is 1 point extra
            .replace(/(?<=\d)0+ /g, ' ') // 200 is 1 point
            .replace(/(?<=\d)(?=\d)/g, ' ') // 3199 is 4 points, 3200 only 2
            .replace(/(?<=\d)\.(?=\d)/g, ' _ ') // each float is 1 point extra
            .replace(/\d/g, ' _ ') // each digit is 1 point
            .replace(/\/[^/]*\//g, ' _ _ ') // regex is 1 point extra
            .replace(/undefined/g, ' ') // undefined is free
            .replace(/(\+|\*|\/|%|<|>|!|\&\&|\|\|)/g, ' _ ') // each operator is 1 point
            .replace(/=+/g, ' _ ') // each comparison operator is 1 point
            .replace(functions, ' _ _ ') // each function is 1 point extra
            .replace(parameters, ' _ _ ') // each parameter is 1 point extra
            .replace(variables, ' _ _ ') // each variable is 1 point extra
            .replace(/\bnew [A-Z][a-zA-Z]*/g, ' _ _ ') // each created object is 1 point extra
            .replace(/function|return|\{|\}|if|true|false|let/g, ' _ ') // each keyword is 1 point
            .split(/\s+/) // each token is 1 point
            .filter(token => token);
        const unknownTokens = tokens.filter(token => token !== '_');
        if (unknownTokens.length > 0)
            throw new Error(`Unknown tokens: ${unknownTokens.join(', ')}`);
        return tokens.length;
    }
    getComplexityMutationTesting(lines) {
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
    passes(unitTests) {
        return this.failingTestResults(unitTests).length === 0;
    }
    isAmputeeOf(candidate) {
        return this.zip(candidate).every(([line, other]) => !line || line === other || line.trim() === 'return undefined');
    }
    compareComplexityTestDrivenDevelopment(candidate) {
        return Math.sign(this.complexityTestDrivenDevelopment - candidate.complexityTestDrivenDevelopment);
    }
    compareComplexityMutationTesting(candidate) {
        return Math.sign(this.complexityMutationTesting - candidate.complexityMutationTesting);
    }
    toString() {
        return this.lines.filter(line => line).join('\n');
    }
    toHtml() {
        return new Code().appendChildren(this.lines.map(line => new Div().appendText(line)));
    }
    toMutationHtml() {
        return new Code().appendChildren(this.lines.map(line => new Div().appendText(line).addClass('covered')));
    }
    toHtmlWithPrevious(previousCandidate) {
        const lines = this.zip(previousCandidate).reduce((divs, [line, other]) => {
            const comment = !line && !other ? ''
                : line === other ? ''
                    : !line ? `  // was: ${other.trim()}`
                        : !other ? ' // new'
                            : ` // was: ${other.trim()}`;
            const div = new Div();
            if (line)
                div.appendText(line);
            if (comment)
                div.appendChild(new Span().appendText(comment).addClass('comment'));
            return [...divs, div];
        }, []);
        return new Code().appendChildren(lines);
    }
    toHtmlWithCoverage(coveredCandidate) {
        const lines = this.zip(coveredCandidate).map(([line, other]) => {
            const isNotIndented = !line.startsWith('  ');
            const isUsed = line === other;
            return new Div().appendText(line).addClass(isNotIndented || isUsed ? 'covered' : 'notcovered');
        });
        return new Code().appendChildren(lines);
    }
}
