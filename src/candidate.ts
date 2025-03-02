import { UnitTest } from './unit_test.js'
import { TestResult } from './test_result.js'

export class Candidate {
    private readonly function: Function
    public readonly complexity: number

    public constructor(code: string) {
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

    public toString(): string {
        return this.function.toString()
    }
}
