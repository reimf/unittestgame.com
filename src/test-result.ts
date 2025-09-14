import { Candidate } from './candidate.js'
import { Translation } from './translation.js'
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

    public toTranslation(): Translation {
        return this.unitTest.toTranslationWithResult(this.result)
    }
}
