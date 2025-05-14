import { Candidate } from './candidate.js'
import { UnitTest } from './unit-test.js'

export class TestResult {
    public readonly unitTest: UnitTest
    private readonly result: any
    public readonly passes: boolean

    public constructor(candidate: Candidate, unitTest: UnitTest) {
        this.unitTest = unitTest
        this.result = candidate.execute(unitTest.argumentList)
        this.passes = this.result === unitTest.expected
    }

    public toString(): string {
        return this.unitTest.toStringWithResult(this.result)
    }
}
