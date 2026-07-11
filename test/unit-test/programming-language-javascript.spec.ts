import { test, expect } from '@playwright/test'
import { JSDOM } from 'jsdom'
import { Div } from '../../src/html.js'
import { JavaScript } from '../../src/programming-language-javascript.js'
import { Python } from '../../src/programming-language-python.js'

const { document } = new JSDOM('<!DOCTYPE html>').window
global.document = document

const html = (divs: readonly Div[]): string[] => divs.map(div => div.getElement().outerHTML)

test.describe('class ProgrammingLanguage', () => {
    const programmingLanguage = new JavaScript()

    test('highlight with 1 argument', () => {
        const javascript = 'function isFloatFormat(text) {' +
            '  let regex = new RegExp("/#@/").test(text)' +
            '  if (!/[#@]/.test(text)) regex += speed.toFixed(1)' +
            '  if (a < Math.abs(20.0) && a >= c && b !== c) return true' +
            '  if (num % 2 === 0) return false' +
            '  return undefined' +
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
                '<span class="whitespace">  </span>' +
                '<span class="keyword">let</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">regex</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">=</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">new</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="class">RegExp</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="string">"/#@/"</span>' +
                '<span class="punctuation">)</span>' +
                '<span class="dot">.</span>' +
                '<span class="function">test</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="variable">text</span>' +
                '<span class="punctuation">)</span>' +
                '<span class="whitespace">  </span>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="punctuation">(</span>' +
                '<span class="operator">!</span>' +
                '<span class="regexp">/[#@]/</span>' +
                '<span class="dot">.</span>' +
                '<span class="function">test</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="variable">text</span>' +
                '<span class="punctuation">)</span>' +
                '<span class="punctuation">)</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">regex</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">+=</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">speed</span>' +
                '<span class="dot">.</span>' +
                '<span class="function">toFixed</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="number">1</span>' +
                '<span class="punctuation">)</span>' +
                '<span class="whitespace">  </span>' +
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
                '<span class="number">20.0</span>' +
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
                '<span class="whitespace">  </span>' +
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
                '<span class="whitespace">  </span>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">undefined</span>' +
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
        const highlighted = python.highlight('if (price < 19 && quality >= 6) return "Good"\nif (a !== b) return "scalene"')
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
                '<span class="keyword">and</span>' +
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
                '<span class="string">"Good"</span>' +
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
                '<span class="string">"scalene"</span>' +
            '</div>',
        ])
    })

    test('transpiles ||', () => {
        const highlighted = python.highlight('if (a === b || b === c) return "equilateral"')
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
                '<span class="keyword">or</span>' +
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
                '<span class="string">"equilateral"</span>' +
            '</div>',
        ])
    })

    test('transpiles !', () => {
        const highlighted = python.highlight('if (!ok) return false')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">not</span>' +
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

    test('transpiles toFixed(n) to format(x, \'.nf\')', () => {
        const highlighted = python.highlight('if (speed < 19.9) return speed.toFixed(1)')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">speed</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">&lt;</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="number">19.9</span>' +
                '<span class="punctuation">:</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="function">format</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="variable">speed</span>' +
                '<span class="punctuation">,</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="string">\'.1f\'</span>' +
                '<span class="punctuation">)</span>' +
            '</div>',
        ])
    })

    test('transpiles toFixed() to format(x, \'.0f\')', () => {
        const highlighted = python.highlight('return speed.toFixed()')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="function">format</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="variable">speed</span>' +
                '<span class="punctuation">,</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="string">\'.0f\'</span>' +
                '<span class="punctuation">)</span>' +
            '</div>',
        ])
    })

    test('transpiles toString() to str(x)', () => {
        const highlighted = python.highlight('return speed.toString()')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="function">str</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="variable">speed</span>' +
                '<span class="punctuation">)</span>' +
            '</div>',
        ])
    })

    test('transpiles new RegExp(...).test(...) to re.search(...) and inserts only 1 import re line', () => {
        const highlighted = python.highlight('if (new RegExp(a).test(b)) return true\nreturn new RegExp(regex).test(text)')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="variable">import</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">re</span>' +
            '</div>',
            '<div>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">re</span>' +
                '<span class="dot">.</span>' +
                '<span class="function">search</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="variable">a</span>' +
                '<span class="punctuation">,</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">b</span>' +
                '<span class="punctuation">)</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">is</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">not</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">None</span>' +
                '<span class="punctuation">:</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">True</span>' +
            '</div>',
            '<div>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">re</span>' +
                '<span class="dot">.</span>' +
                '<span class="function">search</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="variable">regex</span>' +
                '<span class="punctuation">,</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">text</span>' +
                '<span class="punctuation">)</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">is</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">not</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">None</span>' +
            '</div>',
        ])
    })

    test('transpiles ! and a regexp literal to re.search', () => {
        const highlighted = python.highlight('if (!/[#@]/.test(password)) return false')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="variable">import</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">re</span>' +
            '</div>',
            '<div>' +
                '<span class="keyword">if</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">not</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">re</span>' +
                '<span class="dot">.</span>' +
                '<span class="function">search</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="string">\'[#@]\'</span>' +
                '<span class="punctuation">,</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="variable">password</span>' +
                '<span class="punctuation">)</span>' +
                '<span class="punctuation">:</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">False</span>' +
            '</div>',
        ])
    })

    test('transpiles undefined', () => {
        const highlighted = python.highlight('return undefined')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="literal">None</span>' +
            '</div>',
        ])
    })

    test('transpiles let', () => {
        const highlighted = python.highlight('let regex = "^"')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="variable">regex</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="operator">=</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="string">"^"</span>' +
            '</div>',
        ])
    })

    test('transpiles function into def and handles the closing curly bracket', () => {
        const highlighted = python.highlight('function isEven(num) {\n  if (num % 2 === 0) return true\n  return false\n}')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<span class="keyword">def</span>' +
                '<span class="whitespace"> </span>' +
                '<span class="function">isEven</span>' +
                '<span class="punctuation">(</span>' +
                '<span class="variable">num</span>' +
                '<span class="punctuation">)</span>' +
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
        const highlighted = python.highlight('return new RegExp(regex).test(text)', 'return true')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<ins class="variable">import</ins>' +
                '<ins class="whitespace"> </ins>' +
                '<ins class="variable">re</ins>' +
            '</div>',
            '<div>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<del class="literal">True</del>' +
                '<ins class="variable">re</ins>' +
                '<ins class="dot">.</ins>' +
                '<ins class="function">search</ins>' +
                '<ins class="punctuation">(</ins>' +
                '<ins class="variable">regex</ins>' +
                '<ins class="punctuation">,</ins>' +
                '<ins class="whitespace"> </ins>' +
                '<ins class="variable">text</ins>' +
                '<ins class="punctuation">)</ins>' +
                '<ins class="whitespace"> </ins>' +
                '<ins class="keyword">is</ins>' +
                '<ins class="whitespace"> </ins>' +
                '<ins class="keyword">not</ins>' +
                '<ins class="whitespace"> </ins>' +
                '<ins class="literal">None</ins>' +
            '</div>',
        ])
    })

    test('highlights a diff when current transpiles to fewer lines than previous', () => {
        const highlighted = python.highlight('return true', 'return new RegExp(regex).test(text)')
        expect(html(highlighted)).toEqual([
            '<div>' +
                '<del class="variable">import</del>' +
                '<del class="whitespace"> </del>' +
                '<del class="variable">re</del>' +
            '</div>',
            '<div>' +
                '<span class="keyword">return</span>' +
                '<span class="whitespace"> </span>' +
                '<del class="variable">re</del>' +
                '<del class="dot">.</del>' +
                '<del class="function">search</del>' +
                '<del class="punctuation">(</del>' +
                '<del class="variable">regex</del>' +
                '<del class="punctuation">,</del>' +
                '<del class="whitespace"> </del>' +
                '<del class="variable">text</del>' +
                '<del class="punctuation">)</del>' +
                '<del class="whitespace"> </del>' +
                '<del class="keyword">is</del>' +
                '<del class="whitespace"> </del>' +
                '<del class="keyword">not</del>' +
                '<del class="whitespace"> </del>' +
                '<del class="literal">None</del>' +
                '<ins class="literal">True</ins>' +
            '</div>',
        ])
    })
})
