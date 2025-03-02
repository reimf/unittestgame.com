import { UnitTest } from './unit_test.js';
import { Random } from './random.js';
import { Candidate } from './candidate.js';
export class Level {
    constructor(index) {
        this.name = this.constructor.name;
        this.parameters = this.getParameters();
        this.unit = this.getUnit();
        this.candidates = [...this.generateCandidates(this.getCandidateElements())];
        this.minimalUnitTests = [...this.generateMinimalUnitTests()];
        this.perfectCandidates = this.findPerfectCandidates();
        this.perfectCandidate = Random.elementFrom(this.perfectCandidates);
        this.hints = [...this.generateHints()];
        this.index = index;
        this.checkAllMinimalUnitTestsAreNeeded();
    }
    get description() {
        return `Level ${this.index} - ${this.name}`;
    }
    getHighScore(storage) {
        return Number(storage.getItem(`${this.name}.score`));
    }
    saveScore(storage, score) {
        if (score > this.getHighScore(storage))
            storage.setItem(`${this.name}.score`, `${score}`);
    }
    findPassingCandidates(unitTests) {
        return this.candidates.filter(candidate => candidate.failCount(unitTests) == 0);
    }
    *generateCandidates(listOfListOfLines, lines = []) {
        if (listOfListOfLines.length > 0) {
            const [firstListOfLines, ...remainingListOfListOfLines] = listOfListOfLines;
            for (const line of firstListOfLines)
                yield* this.generateCandidates(remainingListOfListOfLines, [...lines, line]);
        }
        else
            yield this.createCandidate(lines);
    }
    createCandidate(lines) {
        const parameterList = this.parameters.map((parameter) => parameter.name).join(', ');
        const code = [
            `function ${this.unit.name}(${parameterList}) {`,
            ...lines.filter((line) => line !== '').map((line) => '  ' + line),
            '}',
        ].join('\n');
        return new Candidate(code);
    }
    *generateMinimalUnitTests() {
        for (const tuple of this.minimalUnitTestGenerator())
            yield new UnitTest(this.parameters, tuple[0], this.unit, tuple[1]);
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
