"use strict";
class HighScore {
    constructor(name, rawScore, formattedScore) {
        this.name = name;
        this.rawScore = rawScore;
        this.formattedScore = formattedScore;
    }
    save() {
        const oldRawScore = localStorage.getItem(`${this.name}.rawScore`);
        if (!oldRawScore || this.rawScore > oldRawScore) {
            localStorage.setItem(`${this.name}.rawScore`, this.rawScore);
            localStorage.setItem(`${this.name}.formattedScore`, this.formattedScore);
        }
    }
    toString() {
        return `${this.name}: ${this.formattedScore}`;
    }
    static fromLocalStorage(name) {
        const rawScore = localStorage.getItem(`${name}.rawScore`);
        const formattedScore = localStorage.getItem(`${name}.formattedScore`);
        if (rawScore && formattedScore)
            return new HighScore(name, rawScore, formattedScore);
        return null;
    }
}
