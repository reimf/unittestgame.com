import { Code, Div, Html, Span } from './html.js'
import { TestResult } from './test_result.js'
import { UnitTest } from './unit_test.js'

export class Candidate {
    private readonly lines: string[]
    private readonly indices: number[]
    private readonly function: Function
    private readonly complexity: number

    public constructor(lines: string[], indices: number[]) {
        this.lines = lines.map(line => line.replace(/\\\\/g, '\\'))
        this.indices = indices
        const code = lines.join('\n')
        this.function = new Function('return ' + code)()
        this.complexity = this.computeComplexity(code)
    }

    private computeComplexity(code: string): number {
        const chunks = code
            .replace(/\n/g, ' ') // simplify white space
            .replace(/\(([^(]*?)\)/g, ' function $1 ') // each function definition/call is 1 extra point
            .replace(/"(.*?)"/g, ' string $1 ') // each string is 1 extra point
            .replace(/\.(?=[a-z])/g, ' ') // each class mention is 1 point
            .replace(/(?<=\d)0+ /g, ' ') // 200 is 1 point
            .replace(/(?<=\d)(?=\d)/g, ' ') // 3199 is 4 points, 3200 only 2
            .replace(/(?<=\d)\.(?=\d)/g, ' dot ') // each float is 1 point extra
            .trim() // remove trailing white space
            .split(/\s+/) // each token is 1 point
        return chunks.length
    }

    public execute(argumentsList: any[]): any {
        try {
            return this.function(...argumentsList)
        }
        catch (error) {
            return undefined
        }
    }

    public testResults(unitTests: UnitTest[]): TestResult[] {
        return unitTests.map(unitTest => new TestResult(this, unitTest))
    }

    public failingTestResults(unitTests: UnitTest[]): TestResult[] {
        return this.testResults(unitTests).filter(testResult => !testResult.passes)
    }

    public failCount(unitTests: UnitTest[]): number {
        return this.failingTestResults(unitTests).length
    }

    public passCount(unitTests: UnitTest[]): number {
        return unitTests.length - this.failCount(unitTests)
    }

    public isAmputeeOf(candidate: Candidate): boolean {
        return this.indices.every((index, pos) => index === 0 || index === candidate.indices[pos])
    }

    public compareComplexity(candidate: Candidate): number {
        return Math.sign(this.complexity - candidate.complexity)
    }

    public toString(): string {
        return this.lines.join('\n')
    }
    
    public toHtml(): Html {
        return new Code().appendChildren(this.lines.map(line => new Div().text(line)))
    }

    public toHtmlWithPrevious(previousCandidate: Candidate|undefined): Html {
        if (!previousCandidate)
            return this.toHtml()
        const firstLine = new Div().text(this.lines[0])
        const bodyLines = this.indices.map((currentIndex, i) => {
            const previousIndex = previousCandidate.indices[i]
            const currentLineNumber = 1 + this.indices.filter((index, j) => j < i && index > 0).length
            const previousLineNumber = 1 + previousCandidate.indices.filter((index, j) => j < i && index > 0).length
            const currentLine = this.lines[currentLineNumber]
            const previousLine = previousCandidate.lines[previousLineNumber].trim()
            const texts = currentIndex === 0 && previousIndex === 0 ? ['', '']
                : currentIndex === previousIndex ? [currentLine, '']
                : currentIndex === 0 ? ['', `// was: ${previousLine}`]
                : previousIndex === 0 ? [currentLine, '// new']
                : [currentLine, `// was: ${previousLine}`]
            return new Div()
                .text(texts[0])
                .addClass('changed', texts[1] !== '')
                .appendChild(new Span().text(texts[1]).addClass('comment'))
        })
        const lastLine = new Div().text(this.lines[this.lines.length - 1])
        return new Code().appendChild(firstLine).appendChildren(bodyLines).appendChild(lastLine)
    }

    public toHtmlWithCoverage(coveredCandidates: Candidate[]): Html {
        if (coveredCandidates.length === 0)
            return this.toHtml()
        return new Code().appendChildren(
            this.lines.map(line => {
                const isNotIndented = !line.startsWith('  ')
                const isUsed = coveredCandidates.some(candidate => candidate.lines.includes(line))
                return new Div().text(line).addClass('covered', isNotIndented || isUsed)
            })
        )
    }
}
