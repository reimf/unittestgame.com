import { Div } from "./html"
import { Highlighter, Tokenizer, type TokenTypes } from './highlighter.js'
import { Variable } from './variable.js'

export abstract class ProgrammingLanguage {
    public abstract readonly id: string
    public abstract readonly name: string
    public readonly tokenTypes: TokenTypes

    constructor() {
        this.tokenTypes = this.getTokenTypes()
    }

    protected abstract transpile(javascriptCode: string, parameters?: readonly Variable[], unit?: Variable): string

    protected abstract getTokenTypes(): TokenTypes

    public highlight(currentCode: string, previousCode?: string, parameters?: readonly Variable[], unit?: Variable): Div[] {
        const tokenizer = new Tokenizer(this.tokenTypes)
        const highlighter = new Highlighter()
        const currentLines = this.transpile(currentCode, parameters, unit).split('\n')
        if (previousCode === undefined)
            return currentLines
                .map(line => highlighter.highlightTokens(tokenizer.tokens(line)))
        const previousLines = this.transpile(previousCode, parameters, unit).split('\n')
        const length = Math.max(currentLines.length, previousLines.length)
        const paddedCurrentLines = Array(length - currentLines.length).fill('').concat(currentLines)
        const paddedPreviousLines = Array(length - previousLines.length).fill('').concat(previousLines)
        return paddedCurrentLines
            .map((currentLine, index) => [currentLine, paddedPreviousLines[index]!] as [string, string])
            .filter(([currentLine, previousLine]) => currentLine || previousLine)
            .map(([currentLine, previousLine]) => highlighter.highlightDiff(tokenizer.tokens(currentLine), tokenizer.tokens(previousLine)))
    }
}
