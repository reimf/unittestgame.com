import { test, expect } from '@playwright/test';
import { Highlighter } from '../../src/highlighter.js';
test.describe('class Highlighter', () => {
    test('highlight method', () => {
        const javascript = 'function isFloatFormat(text) {' +
            '  let regex = new RegExp("/#@/").test(text + "abc")' +
            '  if (!/[#@]/.test(text)) regex += speed.toFixed(1)' +
            '  if (a < Math.abs(20.0) && a >= c && b !== c) return true' +
            '  if (num % 2 === 0) return false' +
            '  return undefined' +
            '}';
        const html = Highlighter.highlight(javascript).toString();
        expect(html).toBe('<div>' +
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
            '<span class="bullet">.</span>' +
            '<span class="function">test</span>' +
            '<span class="punctuation">(</span>' +
            '<span class="variable">text</span>' +
            '<span class="whitespace"> </span>' +
            '<span class="operator">+</span>' +
            '<span class="whitespace"> </span>' +
            '<span class="string">"abc"</span>' +
            '<span class="punctuation">)</span>' +
            '<span class="whitespace">  </span>' +
            '<span class="keyword">if</span>' +
            '<span class="whitespace"> </span>' +
            '<span class="punctuation">(</span>' +
            '<span class="operator">!</span>' +
            '<span class="regexp">/[#@]/</span>' +
            '<span class="bullet">.</span>' +
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
            '<span class="bullet">.</span>' +
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
            '<span class="bullet">.</span>' +
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
            '</div>');
    });
});
