export default class HighScore {
    constructor(name, score, achievement) {
        this.name = name;
        this.score = score;
        this.achievement = achievement;
    }
    save() {
        const oldScore = Number(localStorage.getItem(`${this.name}.score`));
        if (!oldScore || this.score > oldScore) {
            localStorage.setItem(`${this.name}.score`, this.score.toString());
            localStorage.setItem(`${this.name}.achievement`, this.achievement);
        }
    }
    toString() {
        return `${this.name}: ${this.achievement}`;
    }
    static fromLocalStorage(name) {
        const score = Number(localStorage.getItem(`${name}.score`));
        const achievement = localStorage.getItem(`${name}.achievement`);
        if (score && achievement)
            return new HighScore(name, score, achievement);
        return null;
    }
}
