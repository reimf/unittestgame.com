import * as fs from 'fs'
import * as path from 'path'
import { Locale } from '../../src/locale.js'
import { UnitTest } from '../../src/unit-test.js'
import { LeapYear } from '../../src/level-leap-year.js'

type FixtureLevelState = {
    years: number[],
    unitTests: UnitTest[],
    simplestPassingCandidatesTestDrivenDevelopment: string[],
    numberOfUnitTestsStillNeeded: number,
}

export class FixtureLevelStates {
    private readonly locale = new Locale('en')
    public readonly level = new LeapYear(this.locale, 1)
    public readonly states: FixtureLevelState[]

    public constructor() {
        const pathname = path.resolve(__dirname, 'fixture-level-states.json')
        const text = fs.readFileSync(pathname, 'utf8')
        this.states = this.enrich(JSON.parse(text) as FixtureLevelState[])
    }

    private enrich(states: FixtureLevelState[]): FixtureLevelState[] {
        const perfectCandidate = this.level.perfectCandidates[0]!
        const years = states.flatMap(state => state.years)
        const yearUnitTestPairs: [number, UnitTest][] = [...new Set(years)].map(year =>
            [year, new UnitTest(this.level.parameters, [year], this.level.unit, perfectCandidate.execute([year]))]
        )
        const unitTestMap = new Map(yearUnitTestPairs)
        for (const state of states)
            state.unitTests = state.years.map(year => unitTestMap.get(year)!)
        return states
    }
}
