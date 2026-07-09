import { Locale } from '../../src/locale.js'
import { UnitTest } from '../../src/unit-test.js'
import { LeapYear } from '../../src/level-leap-year.js'
import { FixedPicker } from '../../src/picker.js'
import { MapStore } from '../../src/store.js'
import { JavaScript } from '../../src/programming-language.js'
import fixtureData from './fixture-level-states.json' with { type: 'json' }

type FixtureLevelState = {
    years: number[],
    unitTests: UnitTest[],
    simplestPassingCandidates: string[],
    numberOfUnitTestsStillNeeded: number,
}

export class FixtureLevelStates {
    private readonly locale = new Locale('en')
    private readonly programmingLanguage = new JavaScript()
    public readonly level = new LeapYear(this.locale, this.programmingLanguage, new FixedPicker(), new MapStore(), 1)
    public readonly states: FixtureLevelState[]

    public constructor() {
        this.states = this.enrich(fixtureData as FixtureLevelState[])
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
