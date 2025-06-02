import { Candidate } from './candidate.js'
import { Random } from './random.js'
import { UnitTest } from './unit-test.js'
import { Variable } from './variable.js'

export abstract class UseCase {
    public abstract name(): string
    public abstract specification(): string
    protected abstract getParameters(): Variable[]
    protected abstract getUnit(): Variable
    protected abstract getCandidateElements(): string[][]
    protected abstract minimalUnitTestGenerator(): Generator<any[]>
    protected abstract hintGenerator(): Generator<any[]>

    public* exampleGuidanceGeneratorTestDrivenDevelopment(): Generator<string> { }
    public* exampleGuidanceGeneratorMutationTesting(): Generator<string> { }

    public readonly parameters: Variable[] = this.getParameters()
    public readonly unit: Variable = this.getUnit()
    public readonly candidates: Candidate[] = [...this.generateCandidates(this.getCandidateElements(), [])]
    public readonly minimalUnitTests: UnitTest[] = [...this.generateMinimalUnitTests()]
    public readonly subsetsOfMinimalUnitTests: UnitTest[][] = [...this.generateSubsets(this.minimalUnitTests)]
    public readonly perfectCandidates: Candidate[] = this.findPerfectCandidates()
    public readonly perfectCandidate: Candidate = Random.elementFrom(this.perfectCandidates)
    public readonly amputeesOfPerfectCandidate: Candidate[] = this.findAmputeesOfPerfectCandidate()
    public readonly hints: UnitTest[] = [...this.generateHints()]

    private *generateCandidates(listOfListOfLines: string[][], lines: string[]): Generator<Candidate> {
        if (listOfListOfLines.length > 0) {
            const [firstListOfLines, ...remainingListOfListOfLines] = listOfListOfLines
            for (const line of firstListOfLines)
                yield* this.generateCandidates(remainingListOfListOfLines, [...lines, line])
        }
        else
            yield this.createCandidate(lines)
    }

    private createCandidate(lines: string[]): Candidate {
        const parameterList = this.parameters.map(parameter => parameter.name).join(', ')
        const indentedLines = [
            `function ${this.unit.name}(${parameterList}) {`,
                ...lines.map(line => line ? '  ' + line : ''),
            '}',
        ]
        return new Candidate(indentedLines)
    }

    private findAmputeesOfPerfectCandidate(): Candidate[] {
        return this.candidates.filter(candidate => candidate.isAmputeeOf(this.perfectCandidate))
    }

    private *generateMinimalUnitTests(): Generator<UnitTest> {
        for (const [argumentList, expected] of this.minimalUnitTestGenerator()) {
            yield new UnitTest(this.parameters, argumentList, this.unit, expected)
        }
    }

    private* generateSubsets(unitTests: UnitTest[]): Generator<UnitTest[]> {
        const n = unitTests.length
        const total = 1 << n
        for (let size = 0; size <= n; size++) {
            for (let mask = 0; mask < total; mask++) {
                const subset = unitTests.filter((_, i) => mask & (1 << i))
                if (subset.length === size)
                    yield subset
            }
        }
    }

    private *generateHints(): Generator<UnitTest> {
        for (const argumentList of this.hintGenerator())
            yield new UnitTest(this.parameters, argumentList, this.unit, this.perfectCandidate.execute(argumentList))
    }

    private findPerfectCandidates(): Candidate[] {
        return this.candidates.filter(candidate => candidate.passes(this.minimalUnitTests))
    }
}
