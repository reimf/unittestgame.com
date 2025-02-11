class HighScore {
    public constructor(private name: string, private score: number, private achievement: string) { }

    public save(): void {
        const oldScore = Number(localStorage.getItem(`${this.name}.score`))
        if (!oldScore || this.score > oldScore) {
            localStorage.setItem(`${this.name}.score`, this.score.toString())
            localStorage.setItem(`${this.name}.achievement`, this.achievement)
        }
    }

    public toString(): string {
        return `${this.name}: ${this.achievement}`
    }

    public static fromLocalStorage(name: string): HighScore | null {
        const score = Number(localStorage.getItem(`${name}.score`))
        const achievement = localStorage.getItem(`${name}.achievement`)
        if (score && achievement)
            return new HighScore(name, score, achievement)
        return null
    }
}
