import { Candidate } from './candidate.js';
import { Random } from './random.js';
import { UnitTest } from './unit_test.js';
export class UseCase {
    constructor() {
        this.parameters = this.getParameters();
        this.unit = this.getUnit();
        this.candidates = [...this.generateCandidates(this.getCandidateElements(), [])];
        this.minimalUnitTests = [...this.generateMinimalUnitTests()];
        this.subsetsOfMinimalUnitTests = [...this.generateSubsets(this.minimalUnitTests)];
        this.perfectCandidates = this.findPerfectCandidates();
        this.perfectCandidate = Random.elementFrom(this.perfectCandidates);
        this.amputeesOfPerfectCandidate = this.findAmputeesOfPerfectCandidate();
        this.hints = [...this.generateHints()];
    }
    *exampleGuidanceGeneratorTestDrivenDevelopment() { }
    *exampleGuidanceGeneratorMutationTesting() { }
    *generateCandidates(listOfListOfLines, lines) {
        if (listOfListOfLines.length > 0) {
            const [firstListOfLines, ...remainingListOfListOfLines] = listOfListOfLines;
            for (const line of firstListOfLines)
                yield* this.generateCandidates(remainingListOfListOfLines, [...lines, line]);
        }
        else
            yield this.createCandidate(lines);
    }
    createCandidate(lines) {
        const parameterList = this.parameters.map(parameter => parameter.name).join(', ');
        const indentedLines = [
            `function ${this.unit.name}(${parameterList}) {`,
            ...lines.map(line => line ? '  ' + line : ''),
            '}',
        ];
        return new Candidate(indentedLines);
    }
    findAmputeesOfPerfectCandidate() {
        return this.candidates.filter(candidate => candidate.isAmputeeOf(this.perfectCandidate));
    }
    *generateMinimalUnitTests() {
        for (const [argumentList, expected] of this.minimalUnitTestGenerator()) {
            yield new UnitTest(this.parameters, argumentList, this.unit, expected);
        }
    }
    *generateSubsets(unitTests) {
        const n = unitTests.length;
        const total = 1 << n;
        for (let size = 0; size <= n; size++) {
            for (let mask = 0; mask < total; mask++) {
                const subset = unitTests.filter((_, i) => mask & (1 << i));
                if (subset.length === size)
                    yield subset;
            }
        }
    }
    *generateHints() {
        for (const argumentList of this.hintGenerator())
            yield new UnitTest(this.parameters, argumentList, this.unit, this.perfectCandidate.execute(argumentList));
    }
    findPerfectCandidates() {
        return this.candidates.filter(candidate => candidate.passes(this.minimalUnitTests));
    }
}
