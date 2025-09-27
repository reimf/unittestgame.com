import { Code, Html } from './html.js'
import { TestResult } from './test-result.js'
import { UnitTest } from './unit-test.js'

export class Candidate {
    private readonly lines: string[]
    private readonly function: Function
    private readonly complexityTestDrivenDevelopment: number
    private readonly complexityMutationTesting: number

    public constructor(lines: string[]) {
        this.lines = lines.map(line => line.replace(/\\\\/g, '\\'))
        const code = lines.join('\n')
        this.function = new Function('return ' + code)()
        this.complexityTestDrivenDevelopment = this.getComplexityTestDrivenDevelopment(code)
        this.complexityMutationTesting = this.getComplexityMutationTesting(this.lines)
    }

    private zip(candidate: Candidate): string[][] {
        const indexes = [...this.lines.keys()]
        return indexes.map(index => [this.lines[index], candidate.lines[index]])
    }

    public combine(candidate: Candidate|undefined): Candidate {
        if (!candidate)
            return this
        const lines = this.zip(candidate).map(([line, other]) => line && line.trim() !== 'return undefined' ? line : other)
        return new Candidate(lines)
    }

    private getRegEx(code: string, regex: RegExp): RegExp {
        const matches = code.matchAll(regex)
        const names = [...matches].flatMap(match => match[1].split(/,\s*/))
        return new RegExp(`\\b(${names.join('|')})\\b`, 'g')
    }

    private getComplexityTestDrivenDevelopment(code: string): number {
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

    private getComplexityMutationTesting(lines: string[]): number {
        return lines.reduce((subtotal, line, index) => subtotal + (line && line.trim() !== 'return undefined' ? Math.pow(2, index) : 0), 0)
    }

    public execute(argumentsList: any[]): any {
        try {
            return this.function(...argumentsList)
        }
        catch (error) {
            return undefined
        }
    }

    public failingTestResults(unitTests: UnitTest[]): TestResult[] {
        return unitTests.map(unitTest => new TestResult(this, unitTest)).filter(testResult => !testResult.passes)
    }

    public passes(unitTests: UnitTest[]): boolean {
        return this.failingTestResults(unitTests).length === 0
    }

    public isAmputeeOf(candidate: Candidate): boolean {
        return this.zip(candidate).every(([line, other]) => !line || line === other || line.trim() === 'return undefined')
    }

    public compareComplexityTestDrivenDevelopment(candidate: Candidate): number {
        return Math.sign(this.complexityTestDrivenDevelopment - candidate.complexityTestDrivenDevelopment)
    }

    public compareComplexityMutationTesting(candidate: Candidate): number {
        return Math.sign(this.complexityMutationTesting - candidate.complexityMutationTesting)
    }

    public toCodeBlock(lines: string[]): Html {
        return new Code().appendText(lines.filter(line => line).join('\n'))
    }

    public toHtml(): Html {
        return this.toCodeBlock(this.lines)
    }

    public toMutationHtml(): Html {
        const linesWithComments = this.lines.map(line => line + '// covered')
        return this.toCodeBlock(linesWithComments)
    }

    public toHtmlWithPrevious(previousCandidate: Candidate): Html {
        const linesWithComments = this.zip(previousCandidate).map(([line, other]) => {
            if (!line && !other)
                return ''
            if (line === other)
                return line + '// unchanged'
            if (!line)
                return other + '// deleted'
            if (!other)
                return line + '// inserted'
            return other + '// deleted' + '\n' + line + '// inserted'
        })
        return this.toCodeBlock(linesWithComments)
    }

    public toHtmlWithCoverage(coveredCandidate: Candidate): Html {
        const linesWithComments = this.zip(coveredCandidate).map(([line, other]) => {
            if (!line.startsWith('  ') || line === other)
                return line + '// covered'
            return line + '// notcovered'
        })
        return this.toCodeBlock(linesWithComments)
    }
}
