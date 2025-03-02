import { UnitTest } from './unit_test.js'
import { Variable } from './variable.js'
import { Random } from './random.js'
import { Candidate } from './candidate.js'

export abstract class Level {
    protected abstract getParameters(): Variable[]
    protected abstract getUnit(): Variable
    protected abstract getCandidateElements(): string[][]
    protected abstract minimalUnitTestGenerator(): Generator<any[]>
    protected abstract hintGenerator(): Generator<any[]>
    public abstract showSpecificationPanel(): void

    private readonly index: number
    private readonly name: string = this.constructor.name
    public readonly parameters: Variable[] = this.getParameters()
    public readonly unit: Variable = this.getUnit()
    public readonly candidates: Candidate[] = [...this.generateCandidates(this.getCandidateElements())]
    public readonly minimalUnitTests: UnitTest[] = [...this.generateMinimalUnitTests()]
    public readonly perfectCandidates: Candidate[] = this.findPerfectCandidates()
    public readonly perfectCandidate: Candidate = Random.elementFrom(this.perfectCandidates)
    public readonly hints: UnitTest[] = [...this.generateHints()]

    public constructor(index: number) {
        this.index = index
        this.checkAllMinimalUnitTestsAreNeeded()
    }

    public get description(): string {
        return `Level ${this.index} - ${this.name}`
    }

    public getHighScore(storage: Storage): number {
        return Number(storage.getItem(`${this.name}.score`))
    }

    public saveScore(storage: Storage, score: number): void {
        if (score > this.getHighScore(storage))
            storage.setItem(`${this.name}.score`, `${score}`)
    }

    public findPassingCandidates(unitTests: UnitTest[]): Candidate[] {
        return this.candidates.filter(candidate => candidate.failCount(unitTests) == 0)
    }

    private *generateCandidates(listOfListOfLines: string[][], lines: string[] = []): Generator<Candidate> {
        if (listOfListOfLines.length > 0) {
            const [firstListOfLines, ...remainingListOfListOfLines] = listOfListOfLines
            for (const line of firstListOfLines)
                yield* this.generateCandidates(remainingListOfListOfLines, [...lines, line])
        }
        else
            yield this.createCandidate(lines)
    }

    private createCandidate(lines: string[]): Candidate {
        const parameterList = this.parameters.map((parameter) => parameter.name).join(', ')
        const code = [
            `function ${this.unit.name}(${parameterList}) {`,
                ...lines.filter((line) => line !== '').map((line) => '  ' + line),
            '}',
        ].join('\n')
        return new Candidate(code)
    }

    private *generateMinimalUnitTests(): Generator<UnitTest> {
        for (const tuple of this.minimalUnitTestGenerator())
            yield new UnitTest(this.parameters, tuple[0], this.unit, tuple[1])
    }

    private *generateHints(): Generator<UnitTest> {
        for (const argumentList of this.hintGenerator())
            yield new UnitTest(this.parameters, argumentList, this.unit, this.perfectCandidate.execute(argumentList))
    }

    private findPerfectCandidates(): Candidate[] {
        const perfectCandidates = this.findPassingCandidates(this.minimalUnitTests)
        if (perfectCandidates.length === 0)
            throw new Error(`There is no perfect function for level ${this.name}.`)
        return perfectCandidates
    }

    private checkAllMinimalUnitTestsAreNeeded(): void {
        for (const unitTest of this.minimalUnitTests) {
            const allMinusOneUnitTests = this.minimalUnitTests.filter(otherUnitTest => otherUnitTest !== unitTest)
            const almostPerfectCandidates = this.findPassingCandidates(allMinusOneUnitTests)
            if (almostPerfectCandidates.length === this.perfectCandidates.length) {
                throw new Error(`Unit test ${unitTest} is not needed.\n${almostPerfectCandidates[0]}`)
            }
        }
    }
}
