import { UnitTest } from './unit_test.js';
import { Random } from './random.js';
import { Candidate } from './candidate.js';
export class Level {
    constructor(index) {
        this.name = this.constructor.name.replace(/(?=[A-Z])/g, ' ').trim();
        this.parameters = this.getParameters();
        this.unit = this.getUnit();
        this.candidates = [...this.generateCandidates(this.getCandidateElements(), [], [])];
        this.minimalUnitTests = [...this.generateMinimalUnitTests()];
        this.perfectCandidates = this.findPerfectCandidates();
        this.perfectCandidate = Random.elementFrom(this.perfectCandidates);
        this.descendantsOfPerfectCandidate = this.findDescendantsOfPerfectCandidate();
        this.hints = [...this.generateHints()];
        this.index = index;
        this.checkPerfectCandidates();
        this.checkAllMinimalUnitTestsAreNeeded();
    }
    findPassingCandidates(unitTests) {
        return this.candidates.filter(candidate => candidate.failCount(unitTests) == 0);
    }
    *generateCandidates(listOfListOfLines, lines, indices) {
        if (listOfListOfLines.length > 0) {
            const [firstListOfLines, ...remainingListOfListOfLines] = listOfListOfLines;
            for (const line of firstListOfLines) {
                const newLines = [...lines, line];
                const newIndices = [...indices, line === '' ? 0 : firstListOfLines.indexOf(line) + 1];
                yield* this.generateCandidates(remainingListOfListOfLines, newLines, newIndices);
            }
        }
        else
            yield this.createCandidate(lines, indices);
    }
    createCandidate(lines, indices) {
        const parameterList = this.parameters.map((parameter) => parameter.name).join(', ');
        const indentedLines = [
            `function ${this.unit.name}(${parameterList}) {`,
            ...lines.filter(line => line !== '').map(line => '  ' + line),
            '}',
        ];
        return new Candidate(indentedLines, indices);
    }
    findDescendantsOfPerfectCandidate() {
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
        const perfectCandidates = this.findPassingCandidates(this.minimalUnitTests);
        if (perfectCandidates.length === 0)
            throw new Error(`There is no perfect function for level ${this.name}.`);
        return perfectCandidates;
    }
    checkPerfectCandidates() {
        const hintResults = this.perfectCandidates.map(candidate => candidate.failCount(this.hints));
        if (hintResults.some(result => result > 0))
            throw new Error(`Not all perfect functions for level ${this.name} pass all hints.\n${this.perfectCandidates.join('\n')}`);
    }
    checkAllMinimalUnitTestsAreNeeded() {
        for (const unitTest of this.minimalUnitTests) {
            const allMinusOneUnitTests = this.minimalUnitTests.filter(otherUnitTest => otherUnitTest !== unitTest);
            const almostPerfectCandidates = this.findPassingCandidates(allMinusOneUnitTests);
            if (almostPerfectCandidates.length === this.perfectCandidates.length) {
                throw new Error(`Unit test ${unitTest} is not needed.\n${almostPerfectCandidates[0]}`);
            }
        }
    }
}
