export default class HighScore {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }
    save(storage) {
        const oldHighScore = HighScore.fromStorage(storage, this.name);
        if (!oldHighScore || this.score > oldHighScore.score)
            storage.setItem(`${this.name}.score`, `${this.score}`);
    }
    toString() {
        return `${this.name}: ${this.score}`;
    }
    static fromStorage(storage, name) {
        const score = storage.getItem(`${name}.score`);
        if (!score)
            return null;
        return new HighScore(name, Number(score));
    }
}
