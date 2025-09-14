import { Candidate } from './candidate.js'
import { Panel, ComputerMessage } from './frame.js'
import { Level } from './level-base.js'
import { TestResult } from './test-result.js'
import { Translation } from './translation.js'
import { UseCase } from './use-case-base.js'

export class MutationTesting extends Level {
    protected identifier(): string {
        return 'mutation-testing'
    }
    
    public name(): Translation {
        return this.locale.mutationTesting()
    }

    public showBasicDefinition(): void {
        new Panel('mutation-testing', this.locale.mutationTesting(), [this.locale.definitionMT()]).show()
    }

    protected showWelcomeMessage(): void {
        new ComputerMessage([this.locale.step1MT()]).add()
        new ComputerMessage([this.locale.step2MT()]).add()
        new ComputerMessage([this.locale.step3MT()]).add()
    }

    protected showSpecificationPanel(_specification: Translation): void {
        // nothing
    }

    protected showCurrentFunctionPanel(_currentCandidate: Candidate, _previousCandidate: Candidate|undefined): void {
        // nothing
    }

    protected showCodeCoveragePanel(perfectCandidate: Candidate, coveredCandidate: Candidate|undefined): void {
        new Panel('the-function', this.locale.theFunction(), [
            coveredCandidate ? perfectCandidate.toHtmlWithCoverage(coveredCandidate) : perfectCandidate.toHtml()
        ]).show()
    }

    protected showIncorrectUnitTestMessage(): void {
        new ComputerMessage([this.locale.iDidNotAddTheUnitTest()]).add()
    }

    protected showUselessUnitTestMessage(): void {
        new ComputerMessage([this.locale.iAddedTheUnitTestButTheLineCoverageDidNotIncrease()]).add()
        new ComputerMessage([this.locale.tryToWriteUnitTestsThatFail()]).add()
    }

    protected showUsefulUnitTestMessage(): void {
        new ComputerMessage([this.locale.iAddedTheUnitTestAnd()]).add()
    }

    protected showBugFoundMessage(currentCandidate: Candidate, _failingTestResult: TestResult, numberOfUnitTestsStillNeeded: number): void {
        new ComputerMessage([this.locale.theFunctionIsNotFullyTested()]).add()
        new ComputerMessage([this.locale.aMutationOfTheFunction(), currentCandidate.toMutationHtml()]).add()
        new ComputerMessage([this.locale.tryToWriteAUnitTestThatPasses(numberOfUnitTestsStillNeeded)]).add()
    }

    protected showEndMessage(): void {
        new ComputerMessage([this.locale.theFunctionIsIndeedFullyTested()]).add()
        new ComputerMessage([this.locale.wellDone()]).add()
    }

    protected* exampleValuesGenerator(useCase: UseCase): Generator<string> {
        yield* useCase.exampleValuesGenerator()
    }

    protected* exampleTranslationGenerator(useCase: UseCase): Generator<Translation> {
        yield* useCase.exampleTranslationGeneratorMutationTesting()
    }

    protected compareComplexity(candidate: Candidate, otherCandidate: Candidate): number {
        return candidate.compareComplexityMutationTesting(otherCandidate)
    }
}
