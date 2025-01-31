"use strict";
class Main {
    constructor() {
        this.games = [
            new Leapyear(),
            new Triangletype(),
            new Kommagetal(),
            new Snelheid(),
            new Wachtwoord(),
        ];
    }
    aboutMessage() {
        const link = new Html('a').href('mailto:feedback@unittestgame.com').appendText('feedback@unittestgame.com');
        return new Section([
            new Header('Learn unit testing with UnitTestGame.com'),
            new Paragraph('Please send ').appendChild(link)
        ]);
    }
    gameMenuMessage(options, form) {
        return new Section([
            new Paragraph('I want to play the following game:'),
            ...options,
            new Paragraph('[0] Quit'),
            form.toHtml(),
        ]);
    }
    choosenGameMessage(game) {
        return new Section([
            new Paragraph('I want to play the following game:'),
            new Paragraph(`${game.language()} - ${game.description()}`),
        ]);
    }
    quitMessage() {
        return new Section([
            new Paragraph('I want to quit.')
        ]);
    }
    byeMessage() {
        return new Section([
            new Paragraph('Bye!'),
        ]);
    }
    start() {
        this.aboutMessage().showPanel('welcome');
        this.menu();
    }
    menu() {
        const choices = [...this.games.map((_, index) => `${index + 1}`)].concat(['0']);
        this.gameMenuMessage(this.games.map((game, index) => new Paragraph(`[${index + 1}] ${game.language().padEnd(10)} - ${game.description()}`)), new Form([new RadioVariable('Choice', 'choice', choices)], 'Go!', this.answer.bind(this))).addHumanMessage();
    }
    answer(choice) {
        const game = this.games.find((_, index) => choice === `${index + 1}`);
        if (game) {
            this.choosenGameMessage(game).replaceHumanMessage();
            game.play();
        }
        else if (choice === '0') {
            this.quitMessage().replaceHumanMessage();
            this.byeMessage().addComputerMessage();
        }
        else {
            this.menu();
        }
    }
}
