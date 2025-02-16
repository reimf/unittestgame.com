import { UnitTest } from './unit_test.js'
import { TestResult } from './test_result.js'

export class Candidate {
    private readonly function: Function
    public readonly complexity: number

    public constructor(private code: string) {
        this.function = new Function('return ' + code)()
        this.complexity = this.computeComplexity(code)
    }

    private computeComplexity(code: string): number {
        const chunks = code.
            replace(/,/g, ' ').
            replace(/;/g, ' ').
            replace(/\((.*?)\)/g, ' () $1 ').
            replace(/\[(.*?)\]/g, ' [] $1 ').
            replace(/\{(.*?)\}/g, ' {} $1 ').
            trim().
            split(/\s+/)
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
}
