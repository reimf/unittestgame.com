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
        const mail = document.createElement('a');
        mail.href = 'mailto:feedback@unittestgame.com';
        mail.innerText = 'feedback(at)unittestgame(dot)com';
        return new Template([
            'Learn unit testing with UnitTestGame.com\n',
            mail
        ]);
    }
    gameMenuTemplate(options, form) {
        return new Template([
            'Welcome to UnitTestGame\n',
            ...options,
            '[0] Quit',
            form
        ]);
    }
    choosenGameTemplate(game) {
        return new Template([
            'Choosen game\n',
            `I want to play ${game.language()} - ${game.description()}.\n`,
        ]);
    }
    quitTemplate() {
        return new Template([
            'Quit\n',
            'I want to quit.'
        ]);
    }
    byeTemplate() {
        return new Template([
            'Bye!\n',
            'See you later!'
        ]);
    }
    start() {
        this.aboutTemplate().inSidebar('welcome');
        this.menu();
    }
    menu() {
        const choices = [...this.games.map((_, index) => `${index + 1}`)].concat(['0']);
        this.gameMenuTemplate(this.games.map((game, index) => `[${index + 1}] ${game.language().padEnd(10)} - ${game.description()}\n`), new Form([new RadioVariable('Choice', 'choice', choices)], this.answer.bind(this))).newHumanMessage();
    }
    answer(choice) {
        const game = this.games.find((_, index) => choice === `${index + 1}`);
        if (game) {
            this.choosenGameTemplate(game).replaceHumanMessage();
            game.play();
        }
        else if (choice === '0') {
            this.quitTemplate().replaceHumanMessage();
            this.byeTemplate().newComputerMessage();
        }
        else {
            this.menu();
        }
    }
}
