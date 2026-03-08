import { Code } from './html.js'
import { TestResult } from './test-result.js'
import { Highlighter } from './highlighter.js'
import { UnitTest } from './unit-test.js'

export class Candidate {
    private readonly lines: string[]
    private readonly nonEmptyLines: string[]
    private readonly function: Function
    private readonly complexity: number

    public constructor(lines: readonly string[]) {
        this.lines = lines.map(line => line.replace(/\\\\/g, '\\'))
        this.nonEmptyLines = lines.filter(line => line)
        const code = lines.join('\n')
        this.function = new Function('return ' + code)()
        this.complexity = this.getComplexity(code)
    }

    private getRegEx(code: string, regex: RegExp): RegExp {
        const matches = code.matchAll(regex)
        const names = [...matches].flatMap(match => match[1]!.split(/,\s*/))
        return new RegExp(`\\b(${names.join('|')})\\b`, 'g')
    }

    private getComplexity(code: string): number {
        const functions = this.getRegEx(code, /\bfunction\s+(\w+)\b/g)
        const parameters = this.getRegEx(code, /\bfunction\s+\w+\((.*?)\)/g)
        const variables = this.getRegEx(code, /\blet\s+(\w+)\b/g)
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
            .filter(token => token)
        const unknownTokens = tokens.filter(token => token !== '_')
        if (unknownTokens.length > 0)
            throw new Error(`Unknown tokens: ${unknownTokens.join(', ')}`)
        return tokens.length
    }

    public execute(argumentsList: readonly any[]): any {
        try {
            return this.function(...argumentsList)
        }
        catch (error) {
            return undefined
        }
    }

    public failingTestResults(unitTests: readonly UnitTest[]): TestResult[] {
        return unitTests.map(unitTest => new TestResult(this, unitTest)).filter(testResult => !testResult.passes)
    }

    public passes(unitTests: readonly UnitTest[]): boolean {
        return this.failingTestResults(unitTests).length === 0
    }

    public compareComplexity(candidate: Candidate): number {
        return Math.sign(this.complexity - candidate.complexity)
    }

    public toString(): string {
        return this.nonEmptyLines.join('\n')
    }

    public toHtml(): Code {
        const divs = this.nonEmptyLines.map(line => new Highlighter(line).highlight())
        return new Code().appendChildren(divs)
    }

    public toHtmlWithPrevious(previousCandidate: Candidate): Code {
        const pairs = this.lines.map((line, index) => [line, previousCandidate.lines[index]!]) as [string, string][]
        const nonEmptyPairs = pairs.filter(([currentLine, previousLine]) => currentLine || previousLine)
        const divs = nonEmptyPairs.map(([currentLine, previousLine]) => new Highlighter(currentLine, previousLine).highlight())
        return new Code().appendChildren(divs)
    }
}
