import { Candidate } from './candidate.js';
import { Random } from './random.js';
import { UnitTest } from './unit_test.js';
export class UseCase {
    constructor() {
        this.parameters = this.getParameters();
        this.unit = this.getUnit();
        this.candidates = [...this.generateCandidates(this.getCandidateElements(), [])];
        this.minimalUnitTests = [...this.generateMinimalUnitTests()];
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
        for (const tuple of this.minimalUnitTestGenerator()) {
            const [argumentList, expected] = tuple;
            yield new UnitTest(this.parameters, argumentList, this.unit, expected);
        }
    }
    *generateHints() {
        for (const argumentList of this.hintGenerator())
            yield new UnitTest(this.parameters, argumentList, this.unit, this.perfectCandidate.execute(argumentList));
    }
    findPerfectCandidates() {
        const perfectCandidates = this.candidates.filter(candidate => candidate.passes(this.minimalUnitTests));
        if (perfectCandidates.length === 0)
            throw new Error(`There is no perfect function for use case ${this.name()}.`);
        return perfectCandidates;
    }
}
