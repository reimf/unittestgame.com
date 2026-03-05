import { UseCase } from './use-case-base.js'
import { Variable, BooleanVariable, IntegerVariable } from './variable.js'

export class VotingAge extends UseCase {
    public identifier(): string {
        return 'voting-age'
    }

    public name(): string {
        return 'Voting Age'
    }

    public specification(): string {
        return this.locale.returnTrueIfTheAgeIs18YearsOrOverAndReturnFalseIfTheAgeIsUnder18()
    }

    protected getParameters(): Variable[] {
        return [
            new IntegerVariable('Age', 'age'),
        ]
    }

    protected getUnit(): Variable {
        return new BooleanVariable('Is allowed to vote', 'isAllowedToVote')
    }

    protected getCandidateElements(): string[][] {
        return [
            [
                'if (age >= 16) return true',
                'if (age >= 17) return true',
                'if (age >= 18) return true',
                'if (age >= 19) return true',
                'if (age >= 20) return true',
                'if (age <= 16) return false',
                'if (age < 17) return false',
                'if (age < 18) return false',
                'if (age < 19) return false',
                'if (age < 20) return false',
                'if (age < 21) return false',
                'if (age === 18) return true',
                'if (age === 17) return false',
                '',
            ],
            [
                'return true',
                'return false',
                'return undefined',
            ],
        ]
    }

    protected* minimalUnitTestGenerator(): Generator<any[]> {
        yield [[16], false]
        yield [[17], false]
        yield [[18], true]
        yield [[19], true]
    }

    protected* hintGenerator(): Generator<any[]> {
        for (let age = 1; age <= 40; age += 1)
            yield [age]
    }

    public override* exampleStringGeneratorMutationTesting(): Generator<string> {
        // play
        yield this.locale.inThisExampleYouOnlyHaveToClickTheGreenButton()
        yield this.locale.meanwhileKeepAnEyeOnTheChangesInTheSidebar()

        // showMenuMessage
        yield this.locale.theFunctionContainsTheNumber18()
        yield this.locale.iWantToAddThisUnitTest()
        yield '18'
        yield 'true'

        // showMenuMessage
        yield this.locale.theFunctionDoesNotAlwaysReturnTrue()
        yield this.locale.iWantToAddThisUnitTest()
        yield '17'
        yield 'false'

        // showMenuMessage
        yield this.locale.allLinesInTheFunctionAreTestedNow()
        yield this.locale.iWantToSubmitTheUnitTests()

        // showMenuMessage
        yield this.locale.thisMutationOnlyReturnsTrueIfTheAgeIsExactly18()
        yield this.locale.iWantToAddThisUnitTest()
        yield '19'
        yield 'true'

        // showMenuMessage
        yield this.locale.submitTheUnitTestsAgainToSeeIfTheFunctionIsFullyTestedNow()
        yield this.locale.iWantToSubmitTheUnitTests()

        // showMenuMessage
        yield this.locale.thisMutationOnlyReturnsFalseIfTheAgeIsExactly17()
        yield this.locale.iWantToAddThisUnitTest()
        yield '16'
        yield 'false'

        // showMenuMessage
        yield this.locale.submitTheUnitTestsAgainToSeeIfTheFunctionIsFinallyFullyTestedNow()
        yield this.locale.iWantToSubmitTheUnitTests()

        // end
        yield this.locale.congratulationsNowYouUnderstandTheBasicsOfMutationTesting()
    }
}
