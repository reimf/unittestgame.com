class HighScore {
    constructor(private name: string, private rawScore: string, private formattedScore: string, private playedAt: string) { }

    public save(): void {
        const oldRawScore = localStorage.getItem(`${this.name}.rawScore`)
        if (!oldRawScore || this.rawScore > oldRawScore) {
            localStorage.setItem(`${this.name}.rawScore`, this.rawScore)
            localStorage.setItem(`${this.name}.formattedScore`, this.formattedScore)
            localStorage.setItem(`${this.name}.playedAt`, this.playedAt)
        }
    }

    public toHtml(): Html {
        const div = new Div()
        div.appendText(this.toString())
        return div
    }

    public toString(): string {
        return `${this.name}: ${this.formattedScore}`
    }

    static fromLocalStorage(name: string): HighScore | null{
        const rawScore = localStorage.getItem(`${name}.rawScore`)
        const formattedScore = localStorage.getItem(`${name}.formattedScore`)
        const playedAt = localStorage.getItem(`${name}.playedAt`)
        if (rawScore && formattedScore && playedAt)
            return new HighScore(name, rawScore, formattedScore, playedAt)
        return null
    }
}
