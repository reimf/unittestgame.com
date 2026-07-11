import { Candidate } from './candidate.js'
import { Div } from './html.js'
import { ProgrammingLanguage } from './programming-language-base.js'
import { UnitTest } from './unit-test.js'
import { Value } from './variable.js'

export class TestResult<Parameters extends readonly Value[] = readonly Value[], Result extends Value = Value> {
    public readonly unitTest: UnitTest<Parameters, Result>
    private readonly result: Result|undefined
    public readonly passes: boolean

    public constructor(candidate: Candidate<Parameters, Result>, unitTest: UnitTest<Parameters, Result>) {
        this.unitTest = unitTest
        this.result = candidate.execute(unitTest.argumentList)
        this.passes = this.result === unitTest.expected
    }

    public toHtml(programmingLanguage: ProgrammingLanguage): Div {
        return this.unitTest.toHtmlWithResult(this.result, programmingLanguage)
    }
}
