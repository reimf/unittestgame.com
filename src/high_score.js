export default class HighScore {
    constructor(name, score, achievement) {
        this.name = name;
        this.score = score;
        this.achievement = achievement;
    }
    save(storage) {
        const oldHighScore = HighScore.fromStorage(storage, this.name);
        if (!oldHighScore || this.score > oldHighScore.score)
            storage.setItem(`${this.name}.highScore`, [this.score, this.achievement].join('|'));
    }
    toString() {
        return `${this.name}: ${this.achievement}`;
    }
    static fromStorage(storage, name) {
        const content = storage.getItem(`${name}.highScore`);
        if (!content)
            return null;
        const [score, achievement] = content.split('|');
        return new HighScore(name, Number(score), achievement);
    }
}
