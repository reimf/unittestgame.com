import { Candidate } from './candidate.js';
import { Random } from './random.js';
import { UnitTest } from './unit-test.js';
export class UseCase {
    *exampleGuidanceGeneratorTestDrivenDevelopment() { }
    *exampleGuidanceGeneratorMutationTesting() { }
    parameters = this.getParameters();
    unit = this.getUnit();
    candidates = [...this.generateCandidates(this.getCandidateElements(), [])];
    minimalUnitTests = [...this.generateMinimalUnitTests()];
    subsetsOfMinimalUnitTests = [...this.generateSubsets(this.minimalUnitTests)];
    perfectCandidates = this.findPerfectCandidates();
    perfectCandidate = Random.elementFrom(this.perfectCandidates);
    amputeesOfPerfectCandidate = this.findAmputeesOfPerfectCandidate();
    hints = [...this.generateHints()];
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
