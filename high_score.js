"use strict";
class HighScore {
    constructor(name, rawScore, formattedScore, playedAt) {
        this.name = name;
        this.rawScore = rawScore;
        this.formattedScore = formattedScore;
        this.playedAt = playedAt;
    }
    save() {
        const oldRawScore = localStorage.getItem(`${this.name}.rawScore`);
        if (!oldRawScore || this.rawScore > oldRawScore) {
            localStorage.setItem(`${this.name}.rawScore`, this.rawScore);
            localStorage.setItem(`${this.name}.formattedScore`, this.formattedScore);
            localStorage.setItem(`${this.name}.playedAt`, this.playedAt);
        }
    }
    toHtml() {
        const div = new Div();
        div.appendText(this.toString());
        return div;
    }
    toString() {
        return `${this.name}: ${this.formattedScore}`;
    }
    static fromLocalStorage(name) {
        const rawScore = localStorage.getItem(`${name}.rawScore`);
        const formattedScore = localStorage.getItem(`${name}.formattedScore`);
        const playedAt = localStorage.getItem(`${name}.playedAt`);
        if (rawScore && formattedScore && playedAt)
            return new HighScore(name, rawScore, formattedScore, playedAt);
        return null;
    }
}
