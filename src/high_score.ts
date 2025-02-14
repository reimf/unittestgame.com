export default class HighScore {
    public constructor(private name: string, private score: number, private achievement: string) { }

    public save(storage: Storage): void {
        const oldHighScore = HighScore.fromStorage(storage, this.name)
        if (!oldHighScore || this.score > oldHighScore.score)
            storage.setItem(`${this.name}.highScore`, [this.score, this.achievement].join('|'))
    }

    public toString(): string {
        return `${this.name}: ${this.achievement}`
    }

    public static fromStorage(storage: Storage, name: string): HighScore | null{
        const content = storage.getItem(`${name}.highScore`)
        if (!content)
            return null
        const [score, achievement] = content.split('|')
        return new HighScore(name, Number(score), achievement)
    }
}
