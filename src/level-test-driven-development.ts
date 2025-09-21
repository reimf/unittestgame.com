import { Candidate } from './candidate.js'
import { Panel, ComputerMessage } from './frame.js'
import { Level } from './level-base.js'
import { TestResult } from './test-result.js'
import { UseCase } from './use-case-base.js'

export class TestDrivenDevelopment extends Level {
    public identifier(): string {
        return 'test-driven-development'
    }
    
    public name(): string {
        return this.locale.testDrivenDevelopment()
    }

    protected showWelcomeMessage(): void {
        new ComputerMessage([this.locale.step1TDD()]).add()
        new ComputerMessage([this.locale.step2TDD()]).add()
        new ComputerMessage([this.locale.step3TDD()]).add()
    }

    protected showSpecificationPanel(specification: string): void {
        new Panel('specification', this.locale.specification(), [specification]).show()
    }

    protected showCurrentFunctionPanel(currentCandidate: Candidate, previousCandidate: Candidate|undefined): void {
        new Panel('current-function', this.locale.currentFunction(), [
            previousCandidate ? currentCandidate.toHtmlWithPrevious(previousCandidate) : currentCandidate.toHtml()
        ]).show()
    }

    protected showCodeCoveragePanel(_perfectCandidate: Candidate, _coveredCandidate: Candidate|undefined): void {
        // nothing
    }

    protected showIncorrectUnitTestMessage(): void {
        new ComputerMessage([this.locale.iDidNotAddTheUnitTest()]).add()
    }

    protected showUselessUnitTestMessage(): void {
        new ComputerMessage([this.locale.iAddedTheUnitTestButTheCurrentFunctionAlreadyPassedThisUnitTest()]).add()
        new ComputerMessage([this.locale.tryToWriteUnitTestsThatDoNotPass()]).add()
    }

    protected showUsefulUnitTestMessage(): void {
        new ComputerMessage([this.locale.iAddedTheUnitTestAnd()]).add()
    }

    protected showBugFoundMessage(_currentCandidate: Candidate, failingTestResult: TestResult, numberOfUnitTestsStillNeeded: number): void {
        new ComputerMessage([this.locale.theCurrentFunctionIsNotAccordingToTheSpecification()]).add()
        new ComputerMessage([this.locale.itProducesTheFollowingIncorrectResult(), failingTestResult.toString()]).add()
        new ComputerMessage([this.locale.tryToWriteAUnitTestThatIsAccordingToTheSpecification(numberOfUnitTestsStillNeeded)]).add()
    }

    protected showEndMessage(): void {
        new ComputerMessage([this.locale.theCurrentFunctionIsIndeedAccordingToTheSpecification()]).add()
        new ComputerMessage([this.locale.wellDone()]).add()
    }

    protected* exampleStringGenerator(useCase: UseCase): Generator<string> {
        yield* useCase.exampleStringGeneratorTestDrivenDevelopment()
    }

    protected compareComplexity(candidate: Candidate, otherCandidate: Candidate): number {
        return candidate.compareComplexityTestDrivenDevelopment(otherCandidate)
    }
}
