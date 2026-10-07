import { test, expect } from '@playwright/test'
import { JSDOM } from 'jsdom'
import { Div } from '../../src/html.js'
import { JavaScript } from '../../src/programming-language-javascript.js'
import { Python } from '../../src/programming-language-python.js'
import { Ruby } from '../../src/programming-language-ruby.js'

const { document } = new JSDOM('<!DOCTYPE html>').window
global.document = document

const html = (divs: readonly Div[]): string[] => divs.map(div => div.getElement().outerHTML)

test.describe('class ProgrammingLanguage', () => {
    const programmingLanguage = new JavaScript()

    test('highlight with 1 argument', () => {
        const javascript = 'function isFloatFormat(text) {' +
            '    if (!regex.test(text)) return regex' +
            '    if (a < Math.abs(20) && a >= c && b !== c) return true' +
            '    if (num % 2 === 0) return false' +
            '    return regex' +
            '}'
        const highlighted = programmingLanguage.highlight(javascript)
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="keyword">function</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="function">isFloatFormat</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="variable">text</span>' +
                '<span class="punctuation">)</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="punctuation">{</span>' +
                '<span class="whitespace">    </span>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="punctuation">(</span>' +
                '<span class="operator">!</span>' +
                '<span class="variable">regex</span>' +
                '<span class="dot">.</span>' +
                '<span class="function">test</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="variable">text</span>' +
                '<span class="punctuation">)</span>' +
                '<span class="punctuation">)</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">regex</span>' +
                '<span class="whitespace">    </span>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="punctuation">(</span>' +
                '<span class="variable">a</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">&lt;</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="class">Math</span>' +
                '<span class="dot">.</span>' +
                '<span class="function">abs</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="number">20</span>' +
                '<span class="punctuation">)</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">&amp;&amp;</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">a</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">&gt;=</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">c</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">&amp;&amp;</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">b</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">!==</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">c</span>' +
                '<span class="punctuation">)</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">true</span>' +
                '<span class="whitespace">    </span>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="punctuation">(</span>' +
                '<span class="variable">num</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">%</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="number">2</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">===</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="number">0</span>' +
                '<span class="punctuation">)</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">false</span>' +
                '<span class="whitespace">    </span>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">regex</span>' +
                '<span class="punctuation">}</span>' +
            '</div>',
        ])
    })

    test('lines method - inline diff', () => {
        const textFrom = 'if (age > 18) return true'
        const textTo = 'if (age >= 19) return false'
        const highlighted = programmingLanguage.highlight(textTo, textFrom)
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="punctuation">(</span>' +
                '<span class="variable">age</span>' +
                '<span class="whitespace"> </span>' +
                '<del class="operator">&gt;</del>' +
                '<ins class="operator">&gt;=</ins>' +
                '<span class="whitespace"> </span>' +
                '<del class="number">18</del>' +
                '<ins class="number">19</ins>' +
                '<span class="punctuation">)</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<del class="literal">true</del>' +
                '<ins class="literal">false</ins>' +
            '</div>',
        ])
    })
})

test.describe('class Python', () => {
    const python = new Python()

    test('transpiles === with false and true across multiple lines', () => {
        const highlighted = python.highlight('if (age === 17) return false\nreturn true')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">age</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">==</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="number">17</span>' +
                '<span class="punctuation">:</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">False</span>' +
            '</div>',
            '<div>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">True</span>' +
            '</div>',
        ])
    })

    test('transpiles && and !== across multiple lines', () => {
        const highlighted = python.highlight('if (price < 19 && quality >= 6) return "GOOD"\nif (a !== b) return "SCALENE"')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">price</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">&lt;</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="number">19</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">and</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">quality</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">&gt;=</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="number">6</span>' +
                '<span class="punctuation">:</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="string">"GOOD"</span>' +
            '</div>',
            '<div>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">a</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">!=</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">b</span>' +
                '<span class="punctuation">:</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="string">"SCALENE"</span>' +
            '</div>',
        ])
    })

    test('transpiles ||', () => {
        const highlighted = python.highlight('if (a === b || b === c) return "EQUILATERAL"')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">a</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">==</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">b</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">or</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">b</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">==</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">c</span>' +
                '<span class="punctuation">:</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="string">"EQUILATERAL"</span>' +
            '</div>',
        ])
    })

    test('transpiles !', () => {
        const highlighted = python.highlight('if (!ok) return false')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">not</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">ok</span>' +
                '<span class="punctuation">:</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">False</span>' +
            '</div>',
        ])
    })

    test('transpiles function into def and handles the closing curly bracket', () => {
        const highlighted = python.highlight('function isEven(num: number): boolean {\n    if (num % 2 === 0) return true\n    return false\n}')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="keyword">def</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="function">isEven</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="variable">num</span>' +
                '<span class="punctuation">:</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="type">int</span>' +
                '<span class="punctuation">)</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="punctuation">-&gt;</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="type">bool</span>' +
                '<span class="punctuation">:</span>' +
            '</div>',
            '<div>' +
                '<span class="whitespace">    </span>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">num</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">%</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="number">2</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">==</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="number">0</span>' +
                '<span class="punctuation">:</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">True</span>' +
            '</div>',
            '<div>' +
                '<span class="whitespace">    </span>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">False</span>' +
            '</div>',
        ])
    })

    test('highlights a diff when current and previous transpile to a different number of lines', () => {
        const highlighted = python.highlight('return true\nreturn false', 'return true')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<ins class="keyword">return</ins>' +
                '<ins class="whitespace"> </ins>' +
                '<ins class="literal">True</ins>' +
            '</div>',
            '<div>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<del class="literal">True</del>' +
                '<ins class="literal">False</ins>' +
            '</div>',
        ])
    })

    test('highlights a diff when current transpiles to fewer lines than previous', () => {
        const highlighted = python.highlight('return true', 'return true\nreturn false')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<del class="keyword">return</del>' +
                '<del class="whitespace"> </del>' +
                '<del class="literal">True</del>' +
            '</div>',
            '<div>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<del class="literal">False</del>' +
                '<ins class="literal">True</ins>' +
            '</div>',
        ])
    })
})

test.describe('class Ruby', () => {
    const ruby = new Ruby()

    test('transpiles === and !== to == and != across multiple lines', () => {
        const highlighted = ruby.highlight('if (age === 17) return false\nreturn true')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">false</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">age</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">==</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="number">17</span>' +
            '</div>',
            '<div>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">true</span>' +
            '</div>',
        ])
    })

    test('transpiles && and !== across multiple lines', () => {
        const highlighted = ruby.highlight('if (price < 19 && quality >= 6) return "GOOD"\nif (a !== b) return "SCALENE"')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="string">"GOOD"</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">price</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">&lt;</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="number">19</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">&amp;&amp;</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">quality</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">&gt;=</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="number">6</span>' +
            '</div>',
            '<div>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="string">"SCALENE"</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">a</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">!=</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">b</span>' +
            '</div>',
        ])
    })

    test('transpiles ||', () => {
        const highlighted = ruby.highlight('if (a === b || b === c) return "EQUILATERAL"')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="string">"EQUILATERAL"</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">a</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">==</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">b</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">||</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">b</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">==</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">c</span>' +
            '</div>',
        ])
    })

    test('keeps !', () => {
        const highlighted = ruby.highlight('if (!ok) return false')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">false</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">!</span>' +
                '<span class="variable">ok</span>' +
            '</div>',
        ])
    })

    test('transpiles function into def and handles the closing curly bracket', () => {
        const highlighted = ruby.highlight('function isEven(num: number): boolean {\n    if (num % 2 === 0) return true\n    return false\n}')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="keyword">def</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="function">isEven</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="variable">num</span>' +
                '<span class="punctuation">)</span>' +
            '</div>',
            '<div>' +
                '<span class="whitespace">    </span>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">true</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">num</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">%</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="number">2</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">==</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="number">0</span>' +
            '</div>',
            '<div>' +
                '<span class="whitespace">    </span>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">false</span>' +
            '</div>',
            '<div>' +
                '<span class="keyword">end</span>' +
            '</div>',
        ])
    })

    test('highlights a diff when current and previous transpile to a different number of lines', () => {
        const highlighted = ruby.highlight('return true\nreturn false', 'return true')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<ins class="keyword">return</ins>' +
                '<ins class="whitespace"> </ins>' +
                '<ins class="literal">true</ins>' +
            '</div>',
            '<div>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<del class="literal">true</del>' +
                '<ins class="literal">false</ins>' +
            '</div>',
        ])
    })

    test('highlights a diff when current transpiles to fewer lines than previous', () => {
        const highlighted = ruby.highlight('return true', 'return true\nreturn false')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<del class="keyword">return</del>' +
                '<del class="whitespace"> </del>' +
                '<del class="literal">true</del>' +
            '</div>',
            '<div>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<del class="literal">false</del>' +
                '<ins class="literal">true</ins>' +
            '</div>',
        ])
    })
})
