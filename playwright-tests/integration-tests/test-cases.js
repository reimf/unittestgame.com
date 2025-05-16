import * as fs from 'fs';
import * as path from 'path';
import { LeapYear } from '../../src/use-case-leap-year.js';
import { UnitTest } from '../../src/unit-test.js';
export class TestCases {
    constructor() {
        this.useCase = new LeapYear();
        const unitTestMap = new Map([2024, 2025, 2200, 2300, 2400].map(year => {
            const unitTest = new UnitTest(this.useCase.parameters, [year], this.useCase.unit, this.useCase.perfectCandidate.execute([year]));
            return [year, unitTest];
        }));
        const pathname = path.resolve(__dirname, 'test-cases.json');
        const text = fs.readFileSync(pathname, 'utf8');
        this.all = JSON.parse(text);
        for (const testCase of this.all)
            testCase.unitTests = testCase.years.map(year => unitTestMap.get(year));
    }
}
