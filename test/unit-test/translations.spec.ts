import { test, expect } from '@playwright/test'
import en from '../../en/translations.json' with { type: 'json' }
import nl from '../../nl/translations.json' with { type: 'json' }
import de from '../../de/translations.json' with { type: 'json' }
import fr from '../../fr/translations.json' with { type: 'json' }
import es from '../../es/translations.json' with { type: 'json' }
import it from '../../it/translations.json' with { type: 'json' }

test.describe('locale translations', () => {
    const expectedKeys = Object.keys(en).sort()
    const otherLocales: Record<string, Record<string, string>> = { nl, de, fr, es, it }

    for (const [id, strings] of Object.entries(otherLocales)) {
        test(`${id} has the same keys as English`, () => {
            expect(Object.keys(strings).sort()).toEqual(expectedKeys)
        })
    }
})
