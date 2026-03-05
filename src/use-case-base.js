import { Candidate } from './candidate.js';
import { UnitTest } from './unit-test.js';
export class UseCase {
    *exampleStringGeneratorTestDrivenDevelopment() { }
    *exampleStringGeneratorMutationTesting() { }
    locale;
    parameters = this.getParameters();
    unit = this.getUnit();
    candidates = [...this.generateCandidates(this.getCandidateElements(), [])];
    minimalUnitTests = [...this.generateMinimalUnitTests()];
    subsetsOfMinimalUnitTests = [...this.generateSubsets(this.minimalUnitTests)];
    perfectCandidates = this.findPerfectCandidates();
    hints = [...this.generateHints()];
    constructor(locale) {
        this.locale = locale;
    }
    *generateCandidates(listOfListOfLines, lines) {
        if (listOfListOfLines.length > 0) {
            const [firstListOfLines, ...remainingListOfListOfLines] = listOfListOfLines;
            if (firstListOfLines)
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
    findAmputeesOf(perfectCandidate) {
        return this.candidates.filter(candidate => candidate.isAmputeeOf(perfectCandidate));
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
        const perfectCandidate = this.perfectCandidates[0];
        for (const argumentList of this.hintGenerator())
            yield new UnitTest(this.parameters, argumentList, this.unit, perfectCandidate.execute(argumentList));
    }
    findPerfectCandidates() {
        return this.candidates.filter(candidate => candidate.passes(this.minimalUnitTests));
    }
}
