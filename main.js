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
    aboutTemplate() {
        const link = new Html('a').href('mailto:feedback@unittestgame.com').appendText('feedback@unittestgame.com');
        return new Template([
            new Header('Learn unit testing with UnitTestGame.com'),
            new Paragraph('Please send ').appendChild(link)
        ]);
    }
    gameMenuTemplate(options, form) {
        return new Template([
            new Paragraph('I want to play the following game:'),
            ...options,
            new Paragraph('[0] Quit'),
            form.toHtml(),
        ]);
    }
    choosenGameTemplate(game) {
        return new Template([
            new Paragraph(`I want to play ${game.language()} - ${game.description()}.`),
        ]);
    }
    quitTemplate() {
        return new Template([
            new Paragraph('I want to quit.')
        ]);
    }
    byeTemplate() {
        return new Template([
            new Paragraph('Bye!'),
        ]);
    }
    start() {
        this.aboutTemplate().inSidebar('welcome');
        this.menu();
    }
    menu() {
        const choices = [...this.games.map((_, index) => `${index + 1}`)].concat(['0']);
        this.gameMenuTemplate(this.games.map((game, index) => new Paragraph(`[${index + 1}] ${game.language().padEnd(10)} - ${game.description()}`)), new Form([new RadioVariable('Choice', 'choice', choices)], this.answer.bind(this))).newHumanMessage();
    }
    answer(choice) {
        const game = this.games.find((_, index) => choice === `${index + 1}`);
        if (game) {
            this.choosenGameTemplate(game).replaceLastHumanMessage();
            game.play();
        }
        else if (choice === '0') {
            this.quitTemplate().replaceLastHumanMessage();
            this.byeTemplate().newComputerMessage();
        }
        else {
            this.menu();
        }
    }
}
