import { Candidate } from './candidate.js'
import { Panel, ComputerMessage } from './frame.js'
import { Methodology } from './methodology.js'
import { TestResult } from './test_result.js'
import { UseCase } from './use_case.js'

export class TestDrivenDevelopment extends Methodology {
    public name(): string {
        return 'Test-Driven Development'
    }

    public showBasicDefinition(): void {
        new Panel('Test-Driven Development', [
            'Write a unit test that initially fails, then write just enough code to make the unit test pass; repeat until the code is according to the specification. ' +
            '[Read more](https://en.wikipedia.org/wiki/Test-driven_development)',
        ]).show()
    }

    public compareComplexity(candidate: Candidate, otherCandidate: Candidate): number {
        return candidate.compareComplexityTestDrivenDevelopment(otherCandidate)
    }

    public showWelcomeMessage(): void {
        new ComputerMessage(['You read the *Specification* and write *Unit Tests* that fail the *Current Function*.']).add()
        new ComputerMessage(['After adding a unit test I (the AI bot) rewrite the *Current Function* such that it passes the *Unit Tests*.']).add()
        new ComputerMessage(['When you think the *Current Function* is according to the *Specification*, you submit the *Unit Tests*.']).add()
    }

    public showPanelsOnMenu(specification: string, currentCandidate: Candidate, previousCandidate: Candidate|undefined, _perfectCandidate: Candidate, _coveredCandidate: Candidate|undefined): void {
        this.showSpecificationPanel(specification)
        this.showCurrentFunctionPanel(currentCandidate, previousCandidate)
    }

    private showSpecificationPanel(specification: string): void {
        new Panel('Specification', [specification]).show()
    }

    public showCurrentFunctionPanel(currentCandidate: Candidate, previousCandidate: Candidate|undefined): void {
        new Panel('Current Function', [
            previousCandidate ? currentCandidate.toHtmlWithPrevious(previousCandidate) : currentCandidate.toHtml()
        ]).show()
    }

    public showIncorrectUnitTestMessage(): void {
        new ComputerMessage(['I did NOT add the unit test, because it is NOT correct.']).add()
    }

    public showUselessUnitTestMessage(): void {
        new ComputerMessage(['I added the unit test to the *Unit Tests*, but the *Current Function* already passed this unit test, so I did NOT improve the *Current Function*.']).add()
        new ComputerMessage(['Try to write unit tests that fail for the *Current Function*.']).add()
    }

    public showUsefulUnitTestMessage(): void {
        new ComputerMessage(['I added the unit test to the *Unit Tests* and I improved the *Current Function* such that it passes the new unit test.']).add()
    }

    public showBugFoundMessage(_currentCandidate: Candidate, failingTestResult: TestResult): void {
        new ComputerMessage(['The *Current Function* is NOT according to the *Specification*.']).add()
        new ComputerMessage(['It produces the following incorrect result.', failingTestResult.toString()]).add()
    }

    public showEndMessage(): void {
        new ComputerMessage(['The *Current Function* is indeed according to the *Specification*.']).add()
    }

    public* exampleGuidanceGenerator(useCase: UseCase): Generator<string> {
        yield* useCase.exampleGuidanceGeneratorTestDrivenDevelopment()
    }
}
