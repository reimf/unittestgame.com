import { test, expect } from '@playwright/test'
import { Candidate } from '../../src/candidate.js'

test.describe('class Candidate', () => {
    test('compares complexity of simple and complex function', () => {
        const simpleCandidate = new Candidate(['function divide(a, b) {', '  return a / b', '}'])
        const complexCandidate = new Candidate(['function divide(a, b) {', '  if (b === 0) return 0', '  return a / b', '  }'])
        expect(simpleCandidate.compareComplexity(complexCandidate)).toBe(-1)
        expect(complexCandidate.compareComplexity(simpleCandidate)).toBe(+1)
    })

    test('compares complexity of function call', () => {
        const withoutFunctionCallCandidate = new Candidate(['function divide(a, b) {', '  return a', '}'])
        const withFunctionCallCandidate = new Candidate(['function divide(a, b) {', '  return a()', '  }'])
        expect(withoutFunctionCallCandidate.compareComplexity(withFunctionCallCandidate)).toBe(-1)
        expect(withFunctionCallCandidate.compareComplexity(withoutFunctionCallCandidate)).toBe(+1)
    })

    test('compares complexity of string', () => {
        const withoutStringCandidate = new Candidate(['function divide(a, b) {', '  return undefined', '}'])
        const withStringCandidate = new Candidate(['function divide(a, b) {', '  return "undefined"', '  }'])
        expect(withoutStringCandidate.compareComplexity(withStringCandidate)).toBe(-1)
        expect(withStringCandidate.compareComplexity(withoutStringCandidate)).toBe(+1)
    })

    test('compares complexity of class mention', () => {
        const withoutClassCandidate = new Candidate(['function divide(a, b) {', '  return min(a, b)', '}'])
        const withClassCandidate = new Candidate(['function divide(a, b) {', '  return Math.min(a, b)', '  }'])
        expect(withoutClassCandidate.compareComplexity(withClassCandidate)).toBe(-1)
        expect(withClassCandidate.compareComplexity(withoutClassCandidate)).toBe(+1)
    })

    test('computes complexity of integer with zeros at the end', () => {
        const simpleIntegerCandidate = new Candidate(['function divide(a, b) {', '  return 1000', '}'])
        const complexIntegerCandidate = new Candidate(['function divide(a, b) {', '  return 1', '}'])
        expect(simpleIntegerCandidate.compareComplexity(complexIntegerCandidate)).toBe(0)
    })

    test('computes complexity of integer length', () => {
        const shortIntegerCandidate = new Candidate(['function divide(a, b) {', '  return 12', '}'])
        const longIntegerCandidate = new Candidate(['function divide(a, b) {', '  return 102', '}'])
        expect(shortIntegerCandidate.compareComplexity(longIntegerCandidate)).toBe(-1)
        expect(longIntegerCandidate.compareComplexity(shortIntegerCandidate)).toBe(+1)
    })

    test('computes complexity of floating point number', () => {
        const integerCandidate = new Candidate(['function divide(a, b) {', '  return 10056', '}'])
        const floatingPointCandidate = new Candidate(['function divide(a, b) {', '  return 100.56', '}'])
        expect(integerCandidate.compareComplexity(floatingPointCandidate)).toBe(-1)
        expect(floatingPointCandidate.compareComplexity(integerCandidate)).toBe(+1)
    })

    test('computes complexity of variables', () => {
        const constantCandidate = new Candidate(['function divide(a, b) {', '  return 2', '}'])
        const variableCandidate = new Candidate(['function divide(a, b) {', '  return b', '}'])
        expect(constantCandidate.compareComplexity(variableCandidate)).toBe(-1)
        expect(variableCandidate.compareComplexity(constantCandidate)).toBe(+1)
    })

    test('computes complexity of undefined', () => {
        const undefinedCandidate = new Candidate(['function divide(a, b) {', '  return undefined', '}'])
        const variableCandidate = new Candidate(['function divide(a, b) {', '  return true', '}'])
        expect(undefinedCandidate.compareComplexity(variableCandidate)).toBe(-1)
        expect(variableCandidate.compareComplexity(undefinedCandidate)).toBe(+1)
    })

    test('executes function', () => {
        const candidate = new Candidate(['function divide(a, b) {', '  return a / b', '}'])
        expect(candidate.execute([6, 2])).toBe(3)
    })

    test('executes function with syntax error', () => {
        const candidate = new Candidate(['function divide(a, b) {', '  return c', '}'])
        expect(candidate.execute([6, 2])).toBe(undefined)
    })

    test('converts to a string', () => {
        const candidate = new Candidate(['function divide(a, b) {', '  return a / b', '}'])
        expect(candidate.toString()).toBe('function divide(a, b) {\n  return a / b\n}')
    })

    test('to html', () => {
        const candidate = new Candidate(['function divide(a, b) {', '  return a / b', '}'])
        const html = candidate.toHtml()
        expect(html.toString()).toBe('<code><div>function divide(a, b) {</div><div>  return a / b</div><div>}</div></code>')
    })

    test('to html without previous', () => {
        const candidate = new Candidate(['function divide(a, b) {', '', '  return a / b', '}'])
        const html = candidate.toHtmlWithPrevious(undefined)
        expect(html.toString()).toBe(
            '<code>' +
                '<div>function divide(a, b) {</div>' +
                '<div></div>' +
                '<div>  return a / b</div>' +
                '<div>}</div>' +
            '</code>'
        )
    })

    test('to html with previous', () => {
        const candidate = new Candidate(['function divide(a, b) {', '', '', '  if (b === 0) return NaN', '  return a / b', '}'])
        const previousCandidate = new Candidate(['function divide(a, b) {', '', '  if (a === 0) return 0', '', '  return undefined', '}'])
        const html = candidate.toHtmlWithPrevious(previousCandidate)
        expect(html.toString()).toBe(
            '<code>' +
                '<div>function divide(a, b) {</div>' +
                '<div></div>' +
                '<div><span class="comment">// was: if (a === 0) return 0</span></div>' +
                '<div>  if (b === 0) return NaN<span class="comment">// new</span></div>' +
                '<div>  return a / b<span class="comment">// was: return undefined</span></div>' +
                '<div>}</div>' +
            '</code>'
        )
    })

    test('to html without coverage', () => {
        const candidate = new Candidate(['function divide(a, b) {', '', '  return a / b', '}'])
        const html = candidate.toHtmlWithCoverage([])
        expect(html.toString()).toBe(
            '<code>' +
                '<div>function divide(a, b) {</div>' +
                '<div></div>' +
                '<div>  return a / b</div>' +
                '<div>}</div>' +
            '</code>'
        )
    })

    test('to html with coverage', () => {
        const candidate = new Candidate(['function divide(a, b) {', '  if (b === 0) return NaN', '  return a / b', '}'])
        const coveredCandidate = new Candidate(['function divide(a, b) {', '', '  return NaN', '}'])
        const html = candidate.toHtmlWithCoverage([coveredCandidate])
        expect(html.toString()).toBe(
            '<code>' +
                '<div class="covered">function divide(a, b) {</div>' +
                '<div>  if (b === 0) return NaN</div>' +
                '<div>  return a / b</div>' +
                '<div class="covered">}</div>' +
            '</code>'
        )
    })
})
