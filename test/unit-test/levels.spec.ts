import { test, expect } from '@playwright/test'
import { Levels } from '../../src/levels.js'
import { English } from '../../src/conversation-language-en.js'
import { FixedPicker } from '../../src/picker.js'
import { MapStore } from '../../src/store.js'
import { JavaScript } from '../../src/programming-language-javascript.js'

test.describe('class Levels', () => {
    const levels = new Levels(new English(), new JavaScript(), new FixedPicker(), new MapStore())

    test('all returns the correct amount of levels', () => {
        expect(levels.all()).toHaveLength(10)
    })
})
