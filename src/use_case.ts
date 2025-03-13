import { Candidate } from './candidate.js'
import { Random } from './random.js'
import { UnitTest } from './unit_test.js'
import { Variable } from './variable.js'

export abstract class UseCase {
    protected abstract getParameters(): Variable[]
    protected abstract getUnit(): Variable
    protected abstract getCandidateElements(): string[][]
    protected abstract minimalUnitTestGenerator(): Generator<any[]>
    protected abstract hintGenerator(): Generator<any[]>
    public abstract getSpecification(): string

    public readonly name: string = this.constructor.name.replace(/(?<=[a-z])(?=[A-Z])/g, ' ')
    public readonly parameters: Variable[] = this.getParameters()
    public readonly unit: Variable = this.getUnit()
    public readonly candidates: Candidate[] = [...this.generateCandidates(this.getCandidateElements(), [], [])]
    public readonly minimalUnitTests: UnitTest[] = [...this.generateMinimalUnitTests()]
    public readonly perfectCandidates: Candidate[] = this.findPerfectCandidates()
    public readonly perfectCandidate: Candidate = Random.elementFrom(this.perfectCandidates)
    public readonly amputeesOfPerfectCandidate: Candidate[] = this.findamputeesOfPerfectCandidate()
    public readonly hints: UnitTest[] = [...this.generateHints()]

    public constructor() {
        this.checkPerfectCandidates()
        this.checkAllMinimalUnitTestsAreNeeded()
    }

    private *generateCandidates(listOfListOfLines: string[][],
        lines: string[],
        indices: number[]): Generator<Candidate> {
        if (listOfListOfLines.length > 0) {
            const [firstListOfLines, ...remainingListOfListOfLines] = listOfListOfLines
            for (const line of firstListOfLines) {
                const newLine = line === '' && remainingListOfListOfLines.length === 0 ? 'return undefined' : line
                const newLines = [...lines, newLine]
                const newIndex = line === '' ? 0 : firstListOfLines.indexOf(line) + 1
                const newIndices = [...indices, newIndex]
                yield* this.generateCandidates(remainingListOfListOfLines, newLines, newIndices)
            }
        } else
            yield this.createCandidate(lines, indices)

    }

    private createCandidate(lines: string[], indices: number[]): Candidate {
        const parameterList = this.parameters.map(parameter => parameter.name).join(', ')
        const indentedLines = [
            `function ${this.unit.name}(${parameterList}) {`,
            ...lines.filter(line => line !== '').map(line => '  ' + line),
            '}',
        ]
        return new Candidate(indentedLines, indices)
    }

    private findamputeesOfPerfectCandidate(): Candidate[] {
        const perfectIndices = this.perfectCandidate.indices
        return this.candidates.filter(candidate =>
            candidate.indices.every((index, i) => index === 0 || index === perfectIndices[i]))
    }

    private *generateMinimalUnitTests(): Generator<UnitTest> {
        for (const tuple of this.minimalUnitTestGenerator()) {
            const [argumentList, expected] = tuple
            yield new UnitTest(this.parameters, argumentList, this.unit, expected)
        }
    }

    private *generateHints(): Generator<UnitTest> {
        for (const argumentList of this.hintGenerator())
            yield new UnitTest(this.parameters, argumentList, this.unit, this.perfectCandidate.execute(argumentList))

    }

    private findPerfectCandidates(): Candidate[] {
        const perfectCandidates = this.candidates.filter(candidate => candidate.failCount(this.minimalUnitTests) === 0)
        if (perfectCandidates.length === 0)
            throw new Error(`There is no perfect function for use case ${this.name}.`)
        return perfectCandidates
    }

    private checkPerfectCandidates(): void {
        const hintResults = this.perfectCandidates.map(candidate => candidate.failCount(this.hints))
        if (hintResults.some(result => result > 0)) {
            throw new Error(`Not all perfect functions for use case ${this.name} pass all hints.\n` +
                `${this.perfectCandidates.join('\n')}`)
        }
    }

    private checkAllMinimalUnitTestsAreNeeded(): void {
        for (const unitTest of this.minimalUnitTests) {
            const allMinusOneUnitTests = this.minimalUnitTests.filter(otherUnitTest => otherUnitTest !== unitTest)
            const almostPerfectCandidates = this.candidates.filter(candidate => candidate.failCount(allMinusOneUnitTests) === 0)
            if (almostPerfectCandidates.length === this.perfectCandidates.length)
                throw new Error(`Unit test ${unitTest} is not needed.\n${almostPerfectCandidates[0]}`)

        }
    }
}
