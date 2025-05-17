import { Candidate } from './candidate.js'
import { Random } from './random.js'
import { TestResult } from './test-result.js'
import { UnitTest } from './unit-test.js'
import { UseCase } from './use-case.js'

export abstract class Methodology {
    public abstract name(): string
    public abstract showBasicDefinition(): void
    public abstract showWelcomeMessage(): void
    public abstract showPanelsOnMenu(specification: string, currentCandidate: Candidate, previousCandidate: Candidate|undefined, perfectCandidate: Candidate, coveredCandidates: Candidate|undefined): void
    public abstract showBugFoundMessage(currentCandidate: Candidate, failingTestResult: TestResult, numberOfUnitTestsStillNeeded: number): void
    public abstract showEndMessage(): void
    public abstract showIncorrectUnitTestMessage(): void
    public abstract showUselessUnitTestMessage(): void
    public abstract showUsefulUnitTestMessage(): void
    public abstract exampleGuidanceGenerator(useCase: UseCase): Generator<string>

    protected abstract compareComplexity(_candidate: Candidate, _otherCandidate: Candidate): number

    private findSimplestCandidate(candidates: Candidate[]): Candidate {
        const simplestCandidates = candidates.reduce((simplestCandidatesSoFar: Candidate[], candidate) => {
            if (simplestCandidatesSoFar.length === 0)
                return [candidate]
            const sign = this.compareComplexity(candidate, simplestCandidatesSoFar[0])
            if (sign < 0)
                return [candidate]
            if (sign > 0)
                return simplestCandidatesSoFar
            return [...simplestCandidatesSoFar, candidate]
        }, [])
        return Random.elementFrom(simplestCandidates)
    }

    public findSimplestPassingCandidate(candidates: Candidate[], perfectCandidates: Candidate[], unitTests: UnitTest[]): Candidate {
        const passingCandidates = candidates.filter(candidate => candidate.passes(unitTests))
        const passingImperfectCandidates = passingCandidates.filter(candidate => !perfectCandidates.includes(candidate))
        if (passingImperfectCandidates.length === 0)
            return Random.elementFrom(perfectCandidates)
        return this.findSimplestCandidate(passingImperfectCandidates)
    }

    public findSimplestCoveredCandidate(amputeesOfPerfectCandidate: Candidate[], unitTests: UnitTest[]): Candidate {
        return unitTests.reduce((simplestCoveredCandidateSoFar: Candidate, unitTest: UnitTest) => {
            const passingCandidates = amputeesOfPerfectCandidate.filter(candidate => candidate.passes([unitTest]))
            const simplestPassingCandidate = this.findSimplestCandidate(passingCandidates)
            return simplestPassingCandidate.combine(simplestCoveredCandidateSoFar)
        }, this.findSimplestPassingCandidate(amputeesOfPerfectCandidate, [], []))
    }

    public findFailingTestResult(candidate: Candidate, hints: UnitTest[], minimalUnitTestsList: UnitTest[]): TestResult|undefined {
        for (const unitTests of [hints, minimalUnitTestsList]) {
            const failingUnitTests = candidate.failingTestResults(unitTests)
            if (failingUnitTests.length > 0)
                return Random.elementFrom(failingUnitTests)
        }
        return undefined
    }

    public findNumberOfUnitTestsStillNeeded(unitTests: UnitTest[], subsetsOfMinimalUnitTests: UnitTest[][], candidates: Candidate[], numberOfPerfectCandidates: number): number {
        for (const subsetOfMinimalUnitTests of subsetsOfMinimalUnitTests) {
            const extendedUnitTests = [...unitTests, ...subsetOfMinimalUnitTests]
            const passingCandidates = candidates.filter(candidate => candidate.passes(extendedUnitTests))
            if (passingCandidates.length === numberOfPerfectCandidates)
                return subsetOfMinimalUnitTests.length
        }
        return Infinity
    }
}
