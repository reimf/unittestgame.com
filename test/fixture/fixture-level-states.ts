import { English } from '../../src/conversation-language-en.js'
import { UnitTest } from '../../src/unit-test.js'
import { LeapYear } from '../../src/level-leap-year.js'
import { FixedPicker } from '../../src/picker.js'
import { MapStore } from '../../src/store.js'
import { JavaScript } from '../../src/programming-language-javascript.js'
import fixtureData from './fixture-level-states.json' with { type: 'json' }

type FixtureLevelState = {
    years: number[],
    unitTests: UnitTest<[number], boolean>[],
    simplestPassingCandidates: string[],
    numberOfUnitTestsStillNeeded: number,
}

export class FixtureLevelStates {
    private readonly conversationLanguage = new English()
    private readonly programmingLanguage = new JavaScript()
    public readonly level = new LeapYear(this.conversationLanguage, this.programmingLanguage, new FixedPicker(), new MapStore(), 1)
    public readonly states: FixtureLevelState[]

    public constructor() {
        this.states = this.enrich(fixtureData as FixtureLevelState[])
    }

    private enrich(states: FixtureLevelState[]): FixtureLevelState[] {
        const perfectCandidate = this.level.perfectCandidates[0]!
        const years = states.flatMap(state => state.years)
        const yearUnitTestPairs: [number, UnitTest<[number], boolean>][] = [...new Set(years)].map(year =>
            [year, new UnitTest<[number], boolean>(this.level.parameters, [year], this.level.unit, perfectCandidate.execute([year])!)]
        )
        const unitTestMap = new Map(yearUnitTestPairs)
        for (const state of states)
            state.unitTests = state.years.map(year => unitTestMap.get(year)!)
        return states
    }
}
