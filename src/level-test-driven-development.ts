import { Candidate } from './candidate.js'
import { Panel, ComputerMessage } from './frame.js'
import { Level } from './level-base.js'
import { TestResult } from './test-result.js'
import { UseCase } from './use-case-base.js'

export class TestDrivenDevelopment extends Level {
    public name(): string {
        return 'Test-Driven Development'
    }

    public showBasicDefinition(): void {
        new Panel('Test-Driven Development', [
            'Write a unit test that initially fails, then write just enough code to make the unit test pass. ' +
            'Repeat until the code is according to the specification. ' +
            '[Read more](https://en.wikipedia.org/wiki/Test-driven_development)',
        ]).show()
    }

    protected showWelcomeMessage(): void {
        new ComputerMessage(['You read the *Specification* and write *Unit Tests* that fail the *Current Function*.']).add()
        new ComputerMessage(['After adding a unit test I (the AI bot) rewrite the *Current Function* such that it passes the *Unit Tests*.']).add()
        new ComputerMessage(['When you think the *Current Function* is according to the *Specification*, you submit the *Unit Tests*.']).add()
    }

    protected showSpecificationPanel(specification: string): void {
        new Panel('Specification', [specification]).show()
    }

    protected showCurrentFunctionPanel(currentCandidate: Candidate, previousCandidate: Candidate|undefined): void {
        new Panel('Current Function', [
            previousCandidate ? currentCandidate.toHtmlWithPrevious(previousCandidate) : currentCandidate.toHtml()
        ]).show()
    }

    protected showCodeCoveragePanel(_perfectCandidate: Candidate, _coveredCandidate: Candidate|undefined): void {
        // nothing
    }

    protected showIncorrectUnitTestMessage(): void {
        new ComputerMessage(['I did NOT add the unit test, because it is NOT correct.']).add()
    }

    protected showUselessUnitTestMessage(): void {
        new ComputerMessage(['I added the unit test to the *Unit Tests*, but the *Current Function* already passed this unit test, so I did NOT improve the *Current Function*.']).add()
        new ComputerMessage(['Try to write unit tests that fail for the *Current Function*.']).add()
    }

    protected showUsefulUnitTestMessage(): void {
        new ComputerMessage(['I added the unit test to the *Unit Tests* and I improved the *Current Function* such that it passes the new unit test.']).add()
    }

    protected showBugFoundMessage(_currentCandidate: Candidate, failingTestResult: TestResult, numberOfUnitTestsStillNeeded: number): void {
        new ComputerMessage(['The *Current Function* is NOT according to the *Specification*.']).add()
        new ComputerMessage(['It produces the following incorrect result.', failingTestResult.toString()]).add()
        new ComputerMessage([`Try to write a unit test that is according to the *Specification* and fails for the *Current Function*. I think you need at least ${numberOfUnitTestsStillNeeded} more ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit tests'} to make the *Current Function* according to the *Specification*.`]).add()
    }

    protected showEndMessage(): void {
        new ComputerMessage(['The *Current Function* is indeed according to the *Specification*.']).add()
        new ComputerMessage(['Well done!']).add()
    }

    protected* exampleGuidanceGenerator(useCase: UseCase): Generator<string> {
        yield* useCase.exampleGuidanceGeneratorTestDrivenDevelopment()
    }

    protected compareComplexity(candidate: Candidate, otherCandidate: Candidate): number {
        return candidate.compareComplexityTestDrivenDevelopment(otherCandidate)
    }
}
