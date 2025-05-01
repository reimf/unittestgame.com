import { Code, Div, Html, Span } from './html.js'
import { TestResult } from './test_result.js'
import { UnitTest } from './unit_test.js'

export class Candidate {
    private readonly lines: string[]
    private readonly function: Function
    private readonly complexityTestDrivenDevelopment: number
    private readonly complexityMutationTesting: number
    private readonly keywords = [
        'function', 'return', '{', '}',
        'if', '&&', '||', '!',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        '+', '*', '/', '%', '===', '!==', '+=', '=',
        '>', '>=', '<', '<=',
        'true', 'false',
        'let', 'new',
        '_',
    ]

    public constructor(lines: string[]) {
        this.lines = lines.map(line => line.replace(/\\\\/g, '\\'))
        const code = lines.join('\n')
        this.function = new Function('return ' + code)()
        this.complexityTestDrivenDevelopment = this.getComplexityTestDrivenDevelopment(code)
        this.complexityMutationTesting = this.getComplexityMutationTesting(this.lines)
    }

    private zip(candidate: Candidate): string[][] {
        return this.lines.map((line, pos) => [line, candidate.lines[pos]])
    }

    public combine(candidate: Candidate|undefined): Candidate {
        if (!candidate)
            return this
        const lines = this.zip(candidate).map(([line, other]) => line && line.trim() !== 'return undefined' ? line : other)
        return new Candidate(lines)
    }

    private getComplexityTestDrivenDevelopment(code: string): number {
        const functionMatches = code.matchAll(/\bfunction\s+(\w+)\(([^)]*)\)/g)
        const functionNames = [...functionMatches].map(match => match[1])
        const functionRegEx = new RegExp(`\\b${functionNames.join('|')}\\b`, 'g')
        const parameterMatches = code.matchAll(/\bfunction\s+\w+\(([^)]*)\)/g)
        const parameterNames = [...parameterMatches].flatMap(match => match[1].split(/,\s*/))
        const parameterRegEx = new RegExp(`\\b${parameterNames.join('|')}\\b`, 'g')
        const variableMatches = code.matchAll(/\blet\s+(\w*)\b/g)
        const variableNames = [...variableMatches].map(match => match[1])
        const variableRegEx = new RegExp(`\\b${variableNames.join('|')}\\b`, 'g') 
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
            .replace(functionRegEx, ' _ _ ') // each function is 1 point extra
            .replace(parameterRegEx, ' _ _ ') // each parameter is 1 point extra
            .replace(variableRegEx, ' _ _ ') // each variable is 1 point extra
            .replace(/\bnew [A-Z][a-zA-Z]*/g, ' _ _ ') // each created object is 1 point extra
            .replace(/function|return|\{|\}|if|true|false|let/g, ' _ ') // each keyword is 1 point
            .split(/\s+/) // each token is 1 point
            .filter(token => token !== '')
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
        return this.zip(candidate).every(([line, other]) => line === other || line === '' || line.trim() === 'return undefined')
    }

    public compareComplexityTestDrivenDevelopment(candidate: Candidate): number {
        return Math.sign(this.complexityTestDrivenDevelopment - candidate.complexityTestDrivenDevelopment)
    }

    public compareComplexityMutationTesting(candidate: Candidate): number {
        return Math.sign(this.complexityMutationTesting - candidate.complexityMutationTesting)
    }

    public toString(): string {
        return this.lines.join('\n')
    }

    public toHtml(): Html {
        return new Code().appendChildren(this.lines.map(line => new Div().appendText(line)))
    }

    public toHtmlWithPrevious(previousCandidate: Candidate): Html {
        const lines = this.zip(previousCandidate).reduce((divs, [line, other]) => {
            const comment = line === '' && other === '' ? ''
                : line === other ? ''
                : line === '' ? `  // was: ${other.trim()}`
                : other === '' ? ' // new'
                : ` // was: ${other.trim()}`
            const div = new Div()
            if (line !== '')
                div.appendText(line)
            if (comment !== '')
                div.appendChild(new Span().appendText(comment).addClass('comment'))
            return [...divs, div]
        }, [] as Div[])
        return new Code().appendChildren(lines)
    }

    public toHtmlWithCoverage(coveredCandidate: Candidate): Html {
        const lines = this.zip(coveredCandidate).map(([line, other]) => {
            const isNotIndented = !line.startsWith('  ')
            const isUsed = line === other
            return new Div().appendText(line).addClass(isNotIndented || isUsed ? 'covered' : '')
        })
        return new Code().appendChildren(lines)
    }
}
