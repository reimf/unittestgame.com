import { test, expect } from '@playwright/test'
import { Game } from '../../src/game.js'
import { Locale } from '../../src/locale.js'
import { FixedPicker } from '../../src/picker.js'
import { TemporaryStorage } from '../../src/temporary-storage.js'

test.describe('class Game', () => {
    const game = new Game(new Locale('en'), new FixedPicker(), new TemporaryStorage())

    test('levels returns the correct amount of levels', () => {
        expect(game.levels()).toHaveLength(10)
    })
})
