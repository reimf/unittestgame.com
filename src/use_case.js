import { Candidate } from './candidate.js';
import { Random } from './random.js';
import { UnitTest } from './unit_test.js';
export class UseCase {
    constructor() {
        this.name = this.constructor.name.replace(/(?<=[a-z])(?=[A-Z])/g, ' ');
        this.parameters = this.getParameters();
        this.unit = this.getUnit();
        this.candidates = [...this.generateCandidates(this.getCandidateElements(), [], [])];
        this.minimalUnitTests = [...this.generateMinimalUnitTests()];
        this.perfectCandidates = this.findPerfectCandidates();
        this.perfectCandidate = Random.elementFrom(this.perfectCandidates);
        this.amputeesOfPerfectCandidate = this.findamputeesOfPerfectCandidate();
        this.hints = [...this.generateHints()];
        this.checkPerfectCandidates();
        this.checkAllMinimalUnitTestsAreNeeded();
    }
    *generateCandidates(listOfListOfLines, lines, indices) {
        if (listOfListOfLines.length > 0) {
            const [firstListOfLines, ...remainingListOfListOfLines] = listOfListOfLines;
            for (const line of firstListOfLines) {
                const newLine = line === '' && remainingListOfListOfLines.length === 0 ? 'return undefined' : line;
                const newLines = [...lines, newLine];
                const newIndex = line === '' ? 0 : firstListOfLines.indexOf(line) + 1;
                const newIndices = [...indices, newIndex];
                yield* this.generateCandidates(remainingListOfListOfLines, newLines, newIndices);
            }
        }
        else
            yield this.createCandidate(lines, indices);
    }
    createCandidate(lines, indices) {
        const parameterList = this.parameters.map(parameter => parameter.name).join(', ');
        const indentedLines = [
            `function ${this.unit.name}(${parameterList}) {`,
            ...lines.filter(line => line !== '').map(line => '  ' + line),
            '}',
        ];
        return new Candidate(indentedLines, indices);
    }
    findamputeesOfPerfectCandidate() {
        const perfectIndices = this.perfectCandidate.indices;
        return this.candidates.filter(candidate => candidate.indices.every((index, i) => index === 0 || index === perfectIndices[i]));
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
        const perfectCandidates = this.candidates.filter(candidate => candidate.failCount(this.minimalUnitTests) === 0);
        if (perfectCandidates.length === 0)
            throw new Error(`There is no perfect function for use case ${this.name}.`);
        return perfectCandidates;
    }
    checkPerfectCandidates() {
        const hintResults = this.perfectCandidates.map(candidate => candidate.failCount(this.hints));
        if (hintResults.some(result => result > 0)) {
            throw new Error(`Not all perfect functions for use case ${this.name} pass all hints.\n` +
                `${this.perfectCandidates.join('\n')}`);
        }
    }
    checkAllMinimalUnitTestsAreNeeded() {
        for (const unitTest of this.minimalUnitTests) {
            const allMinusOneUnitTests = this.minimalUnitTests.filter(otherUnitTest => otherUnitTest !== unitTest);
            const almostPerfectCandidates = this.candidates.filter(candidate => candidate.failCount(allMinusOneUnitTests) === 0);
            if (almostPerfectCandidates.length === this.perfectCandidates.length)
                throw new Error(`Unit test ${unitTest} is not needed.\n${almostPerfectCandidates[0]}`);
        }
    }
}
