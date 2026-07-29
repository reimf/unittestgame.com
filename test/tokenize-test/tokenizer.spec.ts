import { test, expect } from '@playwright/test'
import { JSDOM } from 'jsdom'
import { Levels } from '../../src/levels.js'
import { English } from '../../src/conversation-language-en.js'
import { FixedPicker } from '../../src/picker.js'
import { MapStore } from '../../src/store.js'
import { ProgrammingLanguage } from '../../src/programming-language-base.js'
import { JavaScript } from '../../src/programming-language-javascript.js'
import { TypeScript } from '../../src/programming-language-typescript.js'
import { Csharp } from '../../src/programming-language-csharp.js'
import { Java } from '../../src/programming-language-java.js'
import { Php } from '../../src/programming-language-php.js'
import { Python } from '../../src/programming-language-python.js'

const { document } = new JSDOM('<!DOCTYPE html>').window
global.document = document

const programmingLanguages: ProgrammingLanguage[] = [new JavaScript(), new TypeScript(), new Csharp(), new Java(), new Php(), new Python()]

test.describe('tokenizer', () => {
    for (const programmingLanguage of programmingLanguages) {
        test(`has no error tokens for any code line rendered in ${programmingLanguage.name}`, () => {
            test.setTimeout(120_000)
            const levels = new Levels(new English(), programmingLanguage, new FixedPicker(), new MapStore()).all()
            const renderedHtml: string[] = []
            for (const level of levels) {
                for (const candidate of level.candidates)
                    renderedHtml.push(candidate.toHtml(programmingLanguage).getElement().outerHTML)
                for (const unitTest of [...level.minimalUnitTests, ...level.hints])
                    renderedHtml.push(unitTest.toHtml(programmingLanguage).getElement().outerHTML)
            }
            const errorHtml = renderedHtml.filter(html => html.includes('class="error"'))
            expect(errorHtml).toEqual([])
        })
    }
})
