import * as fs from 'fs';
import * as path from 'path';
import { MockUseCase } from '../mocks/mock-use-case';
import { UnitTest } from '../../src/unit-test.js';
export class FixtureLevelStates {
    constructor() {
        this.useCase = new MockUseCase();
        const pathname = path.resolve(__dirname, 'fixture-level-states.json');
        const text = fs.readFileSync(pathname, 'utf8');
        this.states = this.enrich(JSON.parse(text));
    }
    enrich(states) {
        const years = states.flatMap(state => state.years);
        const yearUnitTestPairs = [...new Set(years)].map(year => [year, new UnitTest(this.useCase.parameters, [year], this.useCase.unit, this.useCase.perfectCandidate.execute([year]))]);
        const unitTestMap = new Map(yearUnitTestPairs);
        for (const state of states)
            state.unitTests = state.years.map(year => unitTestMap.get(year));
        return states;
    }
}
