class HighScore {
    constructor(private name: string, private rawScore: string, private formattedScore: string) { }

    public save(): void {
        const oldRawScore = localStorage.getItem(`${this.name}.rawScore`)
        if (!oldRawScore || this.rawScore > oldRawScore) {
            localStorage.setItem(`${this.name}.rawScore`, this.rawScore)
            localStorage.setItem(`${this.name}.formattedScore`, this.formattedScore)
        }
    }

    public toString(): string {
        return `${this.name}: ${this.formattedScore}`
    }

    static fromLocalStorage(name: string): HighScore | null {
        const rawScore = localStorage.getItem(`${name}.rawScore`)
        const formattedScore = localStorage.getItem(`${name}.formattedScore`)
        if (rawScore && formattedScore)
            return new HighScore(name, rawScore, formattedScore)
        return null
    }
}
