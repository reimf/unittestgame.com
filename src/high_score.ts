export class HighScore {
    public constructor(private name: string, private score: number) { }

    public save(storage: Storage): void {
        const oldHighScore = HighScore.fromStorage(storage, this.name)
        if (!oldHighScore || this.score > oldHighScore.score)
            storage.setItem(`${this.name}.score`, `${this.score}`)
    }

    public toString(): string {
        return `${this.name}: ${this.score}%`
    }

    public static fromStorage(storage: Storage, name: string): HighScore | null {
        const score = storage.getItem(`${name}.score`)
        if (!score)
            return null
        return new HighScore(name, Number(score))
    }
}
