import { Code, Div, Html, Span } from './html.js'
import { TestResult } from './test_result.js'
import { UnitTest } from './unit_test.js'

export class Candidate {
    private readonly lines: string[]
    private readonly function: Function
    private readonly complexity: number

    public constructor(lines: string[]) {
        this.lines = lines.map(line => line.replace(/\\\\/g, '\\'))
        const code = lines.join('\n')
        this.function = new Function('return ' + code)()
        this.complexity = this.computeComplexity()
    }

    private getChunks(code: string): string[] {
        return code
            .replace(/\n/g, ' ') // simplify white space
            .replace(/"[^"]*?"/g, ' string string ') // each string is 1 extra point
            .replace(/\(([^(]*?)\)/g, ' function $1 ') // each function definition/call is 1 extra point
            .replace(/\(([^(]*?)\)/g, ' function $1 ') // handle nested function calls
            .replace(/,/g, ' ') // each class mention is 1 point
            .replace(/\.(?=[a-z])/g, ' ') // each class mention is 1 point
            .replace(/(?<=\d)0+ /g, ' ') // 200 is 1 point
            .replace(/(?<=\d)(?=\d)/g, ' ') // 3199 is 4 points, 3200 only 2
            .replace(/(?<=\d)\.(?=\d)/g, ' dot ') // each float is 1 point extra
            .replace(/undefined/g, ' ') // undefined is free
            .trim() // remove trailing white space
            .split(/\s+/) // each token is 1 point
            .filter(token => token.length > 0)
    }

    private getVariables(chunks: string[]): string[] {
        const keywords: string[] = [
            'function', 'return', '\\{', '\\}',
            'if', '&&', '\\|\\|',
            '\\d',
            '\\/', '%', '[=!]==', '\\+=', '=', '\\+', '\\*',
            '\\>=?', '\\<=?',
            'true', 'false',
            'new', 'RegExp', 'Math', 'dot', 'toString', 'toFixed', 'round', 'test', 'length',
            'let', 'undefined', 'string',
            '[A-Z]+',
        ]
        const regex = '^' + keywords.join('|') + '$'
        return chunks.filter(chunk => !chunk.match(regex))
    }

    private getPreferenceEarlyReturns(lines: string[]): number {
        return lines.reduce((subtotal, line, index) => subtotal + (line ? index : 0), 0)
    }

    private computeComplexity(): number {
        const code = this.lines.join('\n')
        const chunks = this.getChunks(code)
        const variables = this.getVariables(chunks)
        const notYetSeen = variables.filter(variable => !variable.match(/^([a-z]+([A-Z][a-z]+)+|a|age|b|c|display|num|password|regex|speed|text|year)$/))
        if (notYetSeen.length > 0)
            throw new Error(`Unknown tokens: ${notYetSeen.join(', ')}`)
        const preference = this.getPreferenceEarlyReturns(this.lines)
        return chunks.length + variables.length + preference
    }

    public execute(argumentsList: any[]): any {
        try {
            return this.function(...argumentsList)
        }
        catch (error) {
            return undefined
        }
    }

    public testResults(unitTests: UnitTest[]): TestResult[] {
        return unitTests.map(unitTest => new TestResult(this, unitTest))
    }

    public failingTestResults(unitTests: UnitTest[]): TestResult[] {
        return this.testResults(unitTests).filter(testResult => !testResult.passes)
    }

    public failCount(unitTests: UnitTest[]): number {
        return this.failingTestResults(unitTests).length
    }

    public passCount(unitTests: UnitTest[]): number {
        return unitTests.length - this.failCount(unitTests)
    }

    public isAmputeeOf(candidate: Candidate): boolean {
        return this.lines.every((line, pos) => line === candidate.lines[pos] || line === '' || line.trim() === 'return undefined')
    }

    public compareComplexity(candidate: Candidate): number {
        return Math.sign(this.complexity - candidate.complexity)
    }

    public toString(): string {
        return this.lines.join('\n')
    }

    public toHtml(): Html {
        return new Code().appendChildren(this.lines.map(line => new Div().appendText(line)))
    }

    public toHtmlWithPrevious(previousCandidates: Candidate[]): Html {
        if (previousCandidates.length === 0)
            return this.toHtml()
        const previousCandidate = previousCandidates[previousCandidates.length - 1]
        const lines = this.lines.reduce((lines, currentLine, pos) => {
            const previousLine = previousCandidate.lines[pos]
            const comment = currentLine === '' && previousLine === '' ? ''
                : currentLine === previousLine ? ''
                : currentLine === '' ? `  // was: ${previousLine.trim()}`
                : previousLine === '' ? ' // new'
                : ` // was: ${previousLine.trim()}`
            const div = new Div()
            if (currentLine !== '')
                div.appendText(currentLine)
            if (comment !== '')
                div.appendChild(new Span().appendText(comment).addClass('comment'))
            return [...lines, div]
        }, [] as Div[])
        return new Code().appendChildren(lines)
    }

    public toHtmlWithCoverage(coveredCandidates: Candidate[]): Html {
        if (coveredCandidates.length === 0)
            return this.toHtml()
        const lines = this.lines.map((line, pos) => {
            const isNotIndented = !line.startsWith('  ')
            const isUsed = coveredCandidates.some(candidate => candidate.lines[pos] === line)
            return new Div().appendText(line).addClass(isNotIndented || isUsed ? 'covered' : '')
        })
        return new Code().appendChildren(lines)
    }
}
