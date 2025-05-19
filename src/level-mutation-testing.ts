import { Candidate } from './candidate.js'
import { Panel, ComputerMessage } from './frame.js'
import { Level } from './level.js'
import { TestResult } from './test-result.js'
import { UseCase } from './use-case.js'

export class MutationTesting extends Level {
    public name(): string {
        return 'Mutation Testing'
    }

    public showBasicDefinition(): void {
        new Panel('Mutation Testing', [
            'Each mutation of a fully tested function should make at least one unit test fail. ' +
            'Mutations are simplifications of the code, e.g. by replacing "n % 4 === 0" with "n === 4". ' +
            '[Read more](https://en.wikipedia.org/wiki/Mutation_testing)',
        ]).show()
    }

    protected showWelcomeMessage(): void {
        new ComputerMessage(['You read *The Function* and write *Unit Tests* that pass.']).add()
        new ComputerMessage(['After adding a unit test, I show the line coverage of *The Function*.']).add()
        new ComputerMessage(['When you think *The Function* is fully tested, you submit the *Unit Tests*.']).add()
    }

    protected showSpecificationPanel(_specification: string): void {
        // nothing
    }

    protected showCurrentFunctionPanel(_currentCandidate: Candidate, _previousCandidate: Candidate|undefined): void {
        // nothing
    }

    protected showCodeCoveragePanel(perfectCandidate: Candidate, coveredCandidate: Candidate|undefined): void {
        new Panel('The Function', [
            coveredCandidate ? perfectCandidate.toHtmlWithCoverage(coveredCandidate) : perfectCandidate.toHtml()
        ]).show()
    }

    protected showIncorrectUnitTestMessage(): void {
        new ComputerMessage(['I did NOT add the unit test, because it is NOT correct.']).add()
    }

    protected showUselessUnitTestMessage(): void {
        new ComputerMessage(['I added the unit test to the *Unit Tests*, but the line coverage of *The Function* did NOT increase.']).add()
        new ComputerMessage(['Try to write unit tests that cover some code that is not yet covered by other unit tests.']).add()
    }

    protected showUsefulUnitTestMessage(): void {
        new ComputerMessage(['I added the unit test to the *Unit Tests* and I showed the line coverage in *The Function*.']).add()
    }

    protected showBugFoundMessage(currentCandidate: Candidate, _failingTestResult: TestResult, numberOfUnitTestsStillNeeded: number): void {
        new ComputerMessage(['*The Function* is NOT fully tested.']).add()
        new ComputerMessage(['A mutation of *The Function* that is NOT correct, but still passes your unit tests is the following.', currentCandidate.toMutationHtml()]).add()
        new ComputerMessage([`Try to write a unit test that passes *The Function* and fails for this mutation. I think you need at least ${numberOfUnitTestsStillNeeded} more ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit tests'} to fully test *The Function*.`]).add()
    }

    protected showEndMessage(): void {
        new ComputerMessage(['*The Function* is indeed fully tested.']).add()
        new ComputerMessage(['Well done!']).add()
    }

    protected* exampleGuidanceGenerator(useCase: UseCase): Generator<string> {
        yield* useCase.exampleGuidanceGeneratorMutationTesting()
    }

    protected compareComplexity(candidate: Candidate, otherCandidate: Candidate): number {
        return candidate.compareComplexityMutationTesting(otherCandidate)
    }
}
