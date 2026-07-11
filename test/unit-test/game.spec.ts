import { test, expect } from '@playwright/test'
import { Game } from '../../src/game.js'
import { Locale } from '../../src/locale.js'
import { FixedPicker } from '../../src/picker.js'
import { MapStore } from '../../src/store.js'
import { JavaScript } from '../../src/programming-language-javascript.js'

test.describe('class Game', () => {
    const game = new Game(new Locale('en'), new JavaScript(), new FixedPicker(), new MapStore())

    test('levels returns the correct amount of levels', () => {
        expect(game.levels()).toHaveLength(10)
    })
})
