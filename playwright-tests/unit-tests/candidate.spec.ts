import { test, expect } from '@playwright/test'
import { Candidate } from '../../src/candidate.js'

test.describe('class Candidate', () => {
    test('compares test-driven development complexity of simple and complex function', () => {
        const simpleCandidate = new Candidate(['function nextYear(year) {', '', '  return year + 1', '}'])
        const complexCandidate = new Candidate(['function nextYear(year) {', '  if (year < 0) return 0', '  return year + 1', '}'])
        expect(simpleCandidate.compareComplexityTestDrivenDevelopment(complexCandidate)).toBe(-1)
        expect(complexCandidate.compareComplexityTestDrivenDevelopment(simpleCandidate)).toBe(+1)
    })

    test('compares test-driven development complexity of function call', () => {
        const withoutFunctionCallCandidate = new Candidate(['function nextYear(year) {', '  return round', '}'])
        const withFunctionCallCandidate = new Candidate(['function nextYear(year) {', '  return round()', '}'])
        expect(withoutFunctionCallCandidate.compareComplexityTestDrivenDevelopment(withFunctionCallCandidate)).toBe(-1)
        expect(withFunctionCallCandidate.compareComplexityTestDrivenDevelopment(withoutFunctionCallCandidate)).toBe(+1)
    })

    test('compares test-driven development complexity of string', () => {
        const withoutStringCandidate = new Candidate(['function nextYear(year) {', '  return undefined', '}'])
        const withStringCandidate = new Candidate(['function nextYear(year) {', '  return "undefined"', '}'])
        expect(withoutStringCandidate.compareComplexityTestDrivenDevelopment(withStringCandidate)).toBe(-1)
        expect(withStringCandidate.compareComplexityTestDrivenDevelopment(withoutStringCandidate)).toBe(+1)
    })

    test('compares test-driven development complexity of class mention', () => {
        const withoutClassCandidate = new Candidate(['function nextYear(year) {', '  return round(year)', '}'])
        const withClassCandidate = new Candidate(['function nextYear(year) {', '  return Math.round(year)', '}'])
        expect(withoutClassCandidate.compareComplexityTestDrivenDevelopment(withClassCandidate)).toBe(-1)
        expect(withClassCandidate.compareComplexityTestDrivenDevelopment(withoutClassCandidate)).toBe(+1)
    })

    test('compares test-driven development complexity of integer with zeros at the end', () => {
        const simpleIntegerCandidate = new Candidate(['function nextYear(year) {', '  return 1000', '}'])
        const complexIntegerCandidate = new Candidate(['function nextYear(year) {', '  return 1', '}'])
        expect(simpleIntegerCandidate.compareComplexityTestDrivenDevelopment(complexIntegerCandidate)).toBe(0)
    })

    test('compares test-driven development complexity of integer length', () => {
        const shortIntegerCandidate = new Candidate(['function nextYear(year) {', '  return 12', '}'])
        const longIntegerCandidate = new Candidate(['function nextYear(year) {', '  return 102', '}'])
        expect(shortIntegerCandidate.compareComplexityTestDrivenDevelopment(longIntegerCandidate)).toBe(-1)
        expect(longIntegerCandidate.compareComplexityTestDrivenDevelopment(shortIntegerCandidate)).toBe(+1)
    })

    test('compares test-driven development complexity of floating point number', () => {
        const integerCandidate = new Candidate(['function nextYear(year) {', '  return 10056', '}'])
        const floatingPointCandidate = new Candidate(['function nextYear(year) {', '  return 100.56', '}'])
        expect(integerCandidate.compareComplexityTestDrivenDevelopment(floatingPointCandidate)).toBe(-1)
        expect(floatingPointCandidate.compareComplexityTestDrivenDevelopment(integerCandidate)).toBe(+1)
    })

    test('compares test-driven development complexity of variables', () => {
        const constantCandidate = new Candidate(['function nextYear(year) {', '  return 2', '}'])
        const variableCandidate = new Candidate(['function nextYear(year) {', '  return year', '}'])
        expect(constantCandidate.compareComplexityTestDrivenDevelopment(variableCandidate)).toBe(-1)
        expect(variableCandidate.compareComplexityTestDrivenDevelopment(constantCandidate)).toBe(+1)
    })

    test('compares test-driven development complexity of undefined', () => {
        const undefinedCandidate = new Candidate(['function nextYear(year) {', '  return undefined', '}'])
        const variableCandidate = new Candidate(['function nextYear(year) {', '  return true', '}'])
        expect(undefinedCandidate.compareComplexityTestDrivenDevelopment(variableCandidate)).toBe(-1)
        expect(variableCandidate.compareComplexityTestDrivenDevelopment(undefinedCandidate)).toBe(+1)
    })

    test('compares test-driven development complexity of empty code', () => {
        const emptyCandidate = new Candidate([''])
        const noCandidate = new Candidate([])
        expect(noCandidate.compareComplexityTestDrivenDevelopment(emptyCandidate)).toBe(0)
    })

    test('compares mutation testing of prefering early returns', () => {
        const earlyReturnCandidate = new Candidate(['function nextYear(year) {', '  return year + 1', '', '}'])
        const lateReturnCandidate = new Candidate(['function nextYear(year) {', '', '  return year + 1', '}'])
        expect(earlyReturnCandidate.compareComplexityMutationTesting(lateReturnCandidate)).toBe(-1)
        expect(lateReturnCandidate.compareComplexityMutationTesting(earlyReturnCandidate)).toBe(+1)
    })

    test('is amputee of', () => {
        const fullCandidate = new Candidate(['function nextYear(year) {', '  year = 2024', '  return year + 1', '}'])
        const amputatedCandidate = new Candidate(['function nextYear(year) {', '', '  return undefined', '}'])
        expect(amputatedCandidate.isAmputeeOf(fullCandidate)).toBe(true)
    })

    test('is not amputee of', () => {
        const fullCandidate = new Candidate(['function nextYear(year) {', '  return year', '}'])
        const amputatedCandidate = new Candidate(['function nextYear(year) {', '  return 1', '}'])
        expect(amputatedCandidate.isAmputeeOf(fullCandidate)).toBe(false)
    })

    test('executes function', () => {
        const candidate = new Candidate(['function nextYear(year) {', '  return year + 1', '}'])
        expect(candidate.execute([2024])).toBe(2025)
    })

    test('executes function with syntax error', () => {
        const candidate = new Candidate(['function nextYear(year) {', '  return c', '}'])
        expect(candidate.execute([2024])).toBe(undefined)
    })

    test('converts to a string', () => {
        const candidate = new Candidate(['function nextYear(year) {', '  return year', '}'])
        expect(candidate.toString()).toBe('function nextYear(year) {\n  return year\n}')
    })

    test('to html', () => {
        const candidate = new Candidate(['function nextYear(year) {', '  return year', '}'])
        const html = candidate.toHtml()
        expect(html.toString()).toBe('<code><div>function nextYear(year) {</div><div>  return year</div><div>}</div></code>')
    })

    test('to html with previous', () => {
        const candidate = new Candidate(['function nextYear(year) {', '', '', '  if (year < 0) return 0', '  return year + 1', '}'])
        const previousCandidate = new Candidate(['function nextYear(year) {', '', '  if (year === 0) return 0', '', '  return undefined', '}'])
        const html = candidate.toHtmlWithPrevious(previousCandidate)
        expect(html.toString()).toBe(
            '<code>' +
                '<div>function nextYear(year) {</div>' +
                '<div></div>' +
                '<div><span class="comment">  // was: if (year === 0) return 0</span></div>' +
                '<div>  if (year < 0) return 0<span class="comment"> // new</span></div>' +
                '<div>  return year + 1<span class="comment"> // was: return undefined</span></div>' +
                '<div>}</div>' +
            '</code>'
        )
    })

    test('to html with coverage', () => {
        const candidate = new Candidate(['function nextYear(year) {', '  if (year < 0) return 0', '  return year', '}'])
        const coveredCandidate = new Candidate(['function nextYear(year) {', '', '  return 0', '}'])
        const html = candidate.toHtmlWithCoverage(coveredCandidate)
        expect(html.toString()).toBe(
            '<code>' +
                '<div class="covered">function nextYear(year) {</div>' +
                '<div>  if (year < 0) return 0</div>' +
                '<div>  return year</div>' +
                '<div class="covered">}</div>' +
            '</code>'
        )
    })
})
