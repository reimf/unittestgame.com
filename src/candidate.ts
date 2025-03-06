import { Code, Div, Html } from './html.js'
import { TestResult } from './test_result.js'
import { UnitTest } from './unit_test.js'

export class Candidate {
    private readonly lines: string[]
    public readonly indices: number[]
    private readonly function: Function
    public readonly complexity: number

    public constructor(lines: string[], indices: number[]) {
        this.lines = lines.map(line => line.replace(/\\\\/g, '\\'))
        this.indices = indices
        const code = lines.join('\n')
        this.function = new Function('return ' + code)()
        this.complexity = this.computeComplexity(code)
    }

    private computeComplexity(code: string): number {
        const chunks = code.
            replace(/,/g, ' '). // each argument is 1 point
            replace(/;/g, ' '). // each statement is 1 point
            replace(/\((.*?)\)/g, ' () $1 '). // each function call is 1 extra point
            replace(/\[(.*?)\]/g, ' [] $1 '). // each array index is 1 extra point
            replace(/\{(.*?)\}/g, ' {} $1 '). // each block of commands is 1 extra point
            replace(/"(.*?)"/g, ' "" $1 '). // each non-empty string is 1 extra point
            replace(/\.(?=[a-z])/g, ' . '). // each method call is 1 point
            replace(/(?<=\d)0+ /g, ' '). // 200 is 1 point
            replace(/(?<=\d)(?=\d)/g, ' '). // 3199 is 4 points, 3200 only 2
            replace(/(?<=\d)\.(?=\d)/g, ' . '). // each float is 1 point extra
            trim().
            split(/\s+/) // each token is 1 point
        return chunks.length
    }

    public execute(argumentsList: any[]): any {
        try {
            return this.function(...argumentsList)
        } catch (error: any) {
            return error.name
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

    public toString(): string {
        return this.function.toString()
    }

    public toHtml(): Html {
        const divs = this.lines.map(line => new Div().appendText(line))
        return new Code().appendChildren(divs)
    }

    public toHtmlWithCoverage(coveredCandidates: Candidate[]): Html {
        if (coveredCandidates.length === 0)
            return this.toHtml()
        const divs = this.lines.map(line => {
            const isNotIndented = !line.startsWith('  ')
            const isUsed = coveredCandidates.some(candidate => candidate.lines.includes(line))
            const div = new Div().appendText(line)
            if (isNotIndented || isUsed)
                div.addClass('covered')
            return div
        })
        return new Code().appendChildren(divs)
    }
}
