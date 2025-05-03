import { Candidate } from './candidate.js'
import { Panel, ComputerMessage } from './frame.js'
import { Methodology } from './methodology.js'
import { TestResult } from './test_result.js'
import { UseCase } from './use_case.js'

export class MutationTesting extends Methodology {
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

    public compareComplexity(candidate: Candidate, otherCandidate: Candidate): number {
        return candidate.compareComplexityMutationTesting(otherCandidate)
    }

    public showWelcomeMessage(): void {
        new ComputerMessage(['You read *The Function* and write *Unit Tests* that pass.']).add()
        new ComputerMessage(['After adding a unit test, I show the line coverage of *The Function*.']).add()
        new ComputerMessage(['When you think *The Function* is fully tested, you submit the *Unit Tests*.']).add()
    }

    public showPanelsOnMenu(_specification: string, _currentCandidate: Candidate, _previousCandidate: Candidate|undefined, perfectCandidate: Candidate, coveredCandidate: Candidate|undefined): void {
        this.showCodeCoveragePanel(perfectCandidate, coveredCandidate)
    }

    private showCodeCoveragePanel(perfectCandidate: Candidate, coveredCandidate: Candidate|undefined): void {
        new Panel('The Function', [
            coveredCandidate ? perfectCandidate.toHtmlWithCoverage(coveredCandidate) : perfectCandidate.toHtml()
        ]).show()
    }

    public showIncorrectUnitTestMessage(): void {
        new ComputerMessage(['I did NOT add the unit test, because it is NOT correct.']).add()
    }

    public showUselessUnitTestMessage(): void {
        new ComputerMessage(['I added the unit test to the *Unit Tests*, but the line coverage of *The Function* did NOT increase.']).add()
        new ComputerMessage(['Try to write unit tests that cover some code that is not yet covered by other unit tests.']).add()
    }

    public showUsefulUnitTestMessage(): void {
        new ComputerMessage(['I added the unit test to the *Unit Tests* and I showed the line coverage in *The Function*.']).add()
    }

    public showBugFoundMessage(currentCandidate: Candidate, _failingTestResult: TestResult, numberOfUnitTestsStillNeeded: number): void {
        new ComputerMessage(['*The Function* is NOT fully tested.']).add()
        new ComputerMessage(['A mutation of *The Function* that is NOT correct, but still passes your unit tests is the following.', currentCandidate.toMutationHtml()]).add()
        new ComputerMessage([`Try to write a unit test that passes *The Function* and fails for this mutation. I think you need at least ${numberOfUnitTestsStillNeeded} more ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit tests'} to fully test *The Function*.`]).add()
    }

    public showEndMessage(): void {
        new ComputerMessage(['*The Function* is indeed fully tested.']).add()
    }

    public* exampleGuidanceGenerator(useCase: UseCase): Generator<string> {
        yield* useCase.exampleGuidanceGeneratorMutationTesting()
    }
}
