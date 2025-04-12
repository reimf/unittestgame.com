import { Candidate } from './candidate.js'
import { Panel, ComputerMessage } from './frame.js'
import { Methodology } from './methodology.js'
import { TestResult } from './test_result.js'

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

    public showWelcomeMessage(): void {
        new ComputerMessage(['You read *The Function* and write *Unit Tests* that pass.']).add()
        new ComputerMessage(['After adding a unit test, I show the line coverage of *The Function*.']).add()
        new ComputerMessage(['When you think *The Function* is fully tested, you submit the *Unit Tests*.']).add()
    }

    public showPanelsOnMenu(_specification: string, _currentCandidate: Candidate, _previousCandidate: Candidate|undefined, perfectCandidate: Candidate, coveredCandidates: Candidate[]): void {
        this.showCodeCoveragePanel(perfectCandidate, coveredCandidates)
    }

    private showCodeCoveragePanel(perfectCandidate: Candidate, coveredCandidates: Candidate[]): void {
        new Panel('The Function', [perfectCandidate.toHtmlWithCoverage(coveredCandidates)]).show()
    }

    public showIncorrectUnitTestMessage(): void {
        new ComputerMessage(['I did NOT add the unit test, because it is NOT correct.']).add()
    }

    public showUselessUnitTestMessage(): void {
        new ComputerMessage([
            'I added the unit test to the *Unit Tests*, ' +
            'but the line coverage of *The Function* did NOT increase.',
        ]).add()
        new ComputerMessage(['Try to write unit tests that cover some code that is not yet covered by other unit tests.']).add()
    }

    public showUsefulUnitTestMessage(): void {
        new ComputerMessage([
            'I added the unit test to the *Unit Tests* and ' +
            'I showed the increased line coverage in *The Function*.'
        ]).add()
    }

    public showHintMessage(currentCandidate: Candidate, _failingTestResult: TestResult): void {
        new ComputerMessage(['A mutation of *The Function* that is NOT correct, but still passes the *Unit Tests* is the following.', currentCandidate.toHtml()]).add()
    }

    public showNoHintMessage(): void {
        new ComputerMessage(['I can\'t think of a mutation of *The Function* that passes all the *Unit Tests*.']).add()
    }

    public showBugFoundMessage(currentCandidate: Candidate, _failingTestResult: TestResult): void {
        new ComputerMessage(['I checked *The Function*, but it is NOT fully tested.']).add()
        new ComputerMessage(['A mutation of *The Function* that is NOT correct, but still passes your unit tests is the following.', currentCandidate.toHtml()]).add()
    }

    public showEndMessage(): void {
        new ComputerMessage(['I checked *The Function* and it is indeed fully tested.']).add()
    }
}
