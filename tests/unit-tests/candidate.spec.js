import { test, expect } from '@playwright/test';
import { Candidate } from '../../src/candidate.js';
test.describe('class Candidate', () => {
    test('compares test-driven development complexity of simple and complex function', () => {
        const simpleCandidate = new Candidate(['function nextYear(year) {', '', '  return year + 1', '}']);
        const complexCandidate = new Candidate(['function nextYear(year) {', '  if (year < 0) return 0', '  return year + 1', '}']);
        expect(simpleCandidate.compareComplexity(complexCandidate)).toBe(-1);
        expect(complexCandidate.compareComplexity(simpleCandidate)).toBe(+1);
    });
    test('compares test-driven development complexity of function call', () => {
        const withoutFunctionCallCandidate = new Candidate(['function nextYear(year) {', '  return nextYear', '}']);
        const withFunctionCallCandidate = new Candidate(['function nextYear(year) {', '  return nextYear()', '}']);
        expect(withoutFunctionCallCandidate.compareComplexity(withFunctionCallCandidate)).toBe(-1);
        expect(withFunctionCallCandidate.compareComplexity(withoutFunctionCallCandidate)).toBe(+1);
    });
    test('compares test-driven development complexity of string', () => {
        const withoutStringCandidate = new Candidate(['function nextYear(year) {', '  return undefined', '}']);
        const withStringCandidate = new Candidate(['function nextYear(year) {', '  return "undefined"', '}']);
        expect(withoutStringCandidate.compareComplexity(withStringCandidate)).toBe(-1);
        expect(withStringCandidate.compareComplexity(withoutStringCandidate)).toBe(+1);
    });
    test('compares test-driven development complexity of class mention', () => {
        const withoutClassCandidate = new Candidate(['function nextYear(year) {', '  return nextYear(year)', '}']);
        const withClassCandidate = new Candidate(['function nextYear(year) {', '  return Math.round(year)', '}']);
        expect(withoutClassCandidate.compareComplexity(withClassCandidate)).toBe(-1);
        expect(withClassCandidate.compareComplexity(withoutClassCandidate)).toBe(+1);
    });
    test('compares test-driven development complexity of integer with zeros at the end', () => {
        const simpleIntegerCandidate = new Candidate(['function nextYear(year) {', '  return 1000', '}']);
        const complexIntegerCandidate = new Candidate(['function nextYear(year) {', '  return 1', '}']);
        expect(simpleIntegerCandidate.compareComplexity(complexIntegerCandidate)).toBe(0);
    });
    test('compares test-driven development complexity of integer length', () => {
        const shortIntegerCandidate = new Candidate(['function nextYear(year) {', '  return 12', '}']);
        const longIntegerCandidate = new Candidate(['function nextYear(year) {', '  return 102', '}']);
        expect(shortIntegerCandidate.compareComplexity(longIntegerCandidate)).toBe(-1);
        expect(longIntegerCandidate.compareComplexity(shortIntegerCandidate)).toBe(+1);
    });
    test('compares test-driven development complexity of floating point number', () => {
        const integerCandidate = new Candidate(['function nextYear(year) {', '  return 10056', '}']);
        const floatingPointCandidate = new Candidate(['function nextYear(year) {', '  return 100.56', '}']);
        expect(integerCandidate.compareComplexity(floatingPointCandidate)).toBe(-1);
        expect(floatingPointCandidate.compareComplexity(integerCandidate)).toBe(+1);
    });
    test('compares test-driven development complexity of variables', () => {
        const constantCandidate = new Candidate(['function nextYear(year) {', '  return 2', '}']);
        const variableCandidate = new Candidate(['function nextYear(year) {', '  return year', '}']);
        expect(constantCandidate.compareComplexity(variableCandidate)).toBe(-1);
        expect(variableCandidate.compareComplexity(constantCandidate)).toBe(+1);
    });
    test('compares test-driven development complexity of undefined', () => {
        const undefinedCandidate = new Candidate(['function nextYear(year) {', '  return undefined', '}']);
        const variableCandidate = new Candidate(['function nextYear(year) {', '  return true', '}']);
        expect(undefinedCandidate.compareComplexity(variableCandidate)).toBe(-1);
        expect(variableCandidate.compareComplexity(undefinedCandidate)).toBe(+1);
    });
    test('compares test-driven development complexity of empty code', () => {
        const emptyCandidate = new Candidate(['']);
        const noCandidate = new Candidate([]);
        expect(noCandidate.compareComplexity(emptyCandidate)).toBe(0);
    });
    test('executes function', () => {
        const candidate = new Candidate(['function nextYear(year) {', '  return year + 1', '}']);
        expect(candidate.execute([2024])).toBe(2025);
    });
    test('executes function with error', () => {
        const candidate = new Candidate(['function nextYear(year) {', '  return year.round(1)', '}']);
        expect(candidate.execute([2024])).toBe(undefined);
    });
    test('converts to a string', () => {
        const candidate = new Candidate(['function nextYear(year) {', '', '  return year', '}']);
        expect(candidate.toString()).toBe('function nextYear(year) {\n  return year\n}');
    });
    test('to html', () => {
        const candidate = new Candidate(['function nextYear(year) {', '  return year', '}']);
        const html = candidate.toHtml();
        expect(html.toString()).toBe('<code class="language-javascript">' +
            '<div>' +
            '<span class="keyword">function</span>' +
            '<span class="whitespace"> </span>' +
            '<span class="function">nextYear</span>' +
            '<span class="punctuation">(</span>' +
            '<span class="variable">year</span>' +
            '<span class="punctuation">)</span>' +
            '<span class="whitespace"> </span>' +
            '<span class="punctuation">{</span>' +
            '</div>' +
            '<div>' +
            '<span class="whitespace">  </span>' +
            '<span class="keyword">return</span>' +
            '<span class="whitespace"> </span>' +
            '<span class="variable">year</span>' +
            '</div>' +
            '<div>' +
            '<span class="punctuation">}</span>' +
            '</div>' +
            '</code>');
    });
    test('to html with previous', () => {
        const candidate = new Candidate(['function nextYear(year) {', '', '', '  if (year < 0) return 0', '  return year + 1', '}']);
        const previousCandidate = new Candidate(['function nextYear(year) {', '', '  if (year === 0) return 0', '', '  return undefined', '}']);
        const html = candidate.toHtmlWithPrevious(previousCandidate);
        expect(html.toString()).toBe('<code class="language-javascript">' +
            '<div>' +
            '<span class="keyword">function</span>' +
            '<span class="whitespace"> </span>' +
            '<span class="function">nextYear</span>' +
            '<span class="punctuation">(</span>' +
            '<span class="variable">year</span>' +
            '<span class="punctuation">)</span>' +
            '<span class="whitespace"> </span>' +
            '<span class="punctuation">{</span>' +
            '</div>' +
            '<div>' +
            '<del class="whitespace">  </del>' +
            '<del class="keyword">if</del>' +
            '<del class="whitespace"> </del>' +
            '<del class="punctuation">(</del>' +
            '<del class="variable">year</del>' +
            '<del class="whitespace"> </del>' +
            '<del class="operator">===</del>' +
            '<del class="whitespace"> </del>' +
            '<del class="number">0</del>' +
            '<del class="punctuation">)</del>' +
            '<del class="whitespace"> </del>' +
            '<del class="keyword">return</del>' +
            '<del class="whitespace"> </del>' +
            '<del class="number">0</del>' +
            '</div>' +
            '<div>' +
            '<ins class="whitespace">  </ins>' +
            '<ins class="keyword">if</ins>' +
            '<ins class="whitespace"> </ins>' +
            '<ins class="punctuation">(</ins>' +
            '<ins class="variable">year</ins>' +
            '<ins class="whitespace"> </ins>' +
            '<ins class="operator">&lt;</ins>' +
            '<ins class="whitespace"> </ins>' +
            '<ins class="number">0</ins>' +
            '<ins class="punctuation">)</ins>' +
            '<ins class="whitespace"> </ins>' +
            '<ins class="keyword">return</ins>' +
            '<ins class="whitespace"> </ins>' +
            '<ins class="number">0</ins>' +
            '</div>' +
            '<div>' +
            '<span class="whitespace">  </span>' +
            '<span class="keyword">return</span>' +
            '<span class="whitespace"> </span>' +
            '<del class="literal">undefined</del>' +
            '<ins class="variable">year</ins>' +
            '<ins class="whitespace"> </ins>' +
            '<ins class="operator">+</ins>' +
            '<ins class="whitespace"> </ins>' +
            '<ins class="number">1</ins>' +
            '</div>' +
            '<div>' +
            '<span class="punctuation">}</span>' +
            '</div>' +
            '</code>');
    });
});
