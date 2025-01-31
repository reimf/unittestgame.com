"use strict";
class Main {
    constructor() {
        this.themes = [
            new Leapyear(),
            new Snelheid(),
        ];
        this.games = [
            ...this.themes,
            new Triangletype(),
            new Kommagetal(),
            new Wachtwoord(),
        ];
    }
    aboutPanel() {
        const link = new Html('a').href('mailto:feedback@unittestgame.com').appendText('feedback@unittestgame.com');
        return new Section([
            new Header('Learn unit testing with UnitTestGame.com'),
            new Paragraph('Please send ').appendChild(link)
        ]);
    }
    welcomeMessage() {
        return new Section([
            new Paragraph('Welcome to UnitTestGame.com! ' +
                'Here you can learn to write the right unit tests. ' +
                'But first, pick a theme and start the game.'),
        ]);
    }
    themeMenuMessage(form) {
        return new Section([
            form.toHtml(),
        ]);
    }
    choosenThemeMessage(theme) {
        return new Section([
            new Paragraph('I like the following theme:'),
            new Paragraph(theme.theme()),
        ]);
    }
    gameMenuMessage(form) {
        return new Section([
            form.toHtml(),
        ]);
    }
    choosenGameMessage(game) {
        return new Section([
            new Paragraph('I want to play the following game:'),
            new Paragraph(game.description()),
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
        this.aboutPanel().show('welcome');
        this.welcomeMessage().addAsComputer();
        this.themeMenu();
    }
    themeMenu() {
        const themeChoices = [...this.themes.map(theme => theme.theme()), 'Quit'];
        this.themeMenuMessage(new Form([new VerticalRadioVariable('Theme', 'theme', themeChoices)], 'Go!', this.themeAnswer.bind(this))).addAsHuman();
    }
    themeAnswer(choice) {
        const theme = this.themes.find(theme => choice === theme.theme());
        if (theme) {
            this.choosenThemeMessage(theme).replaceLastHuman();
            this.gameMenu(theme);
        }
        else if (choice === '0') {
            this.quitMessage().replaceLastHuman();
            this.byeMessage().addAsComputer();
        }
        else {
            this.themeMenu();
        }
    }
    gameMenu(theme) {
        const gamesForThisTheme = this.games.filter(game => game.theme() === theme.theme());
        const gameChoices = [...gamesForThisTheme.map(game => game.description()), 'Quit'];
        this.gameMenuMessage(new Form([new VerticalRadioVariable('Game', 'game', gameChoices)], 'Go!', this.gameAnswer.bind(this))).addAsHuman();
    }
    gameAnswer(choice) {
        const game = this.games.find(game => choice === game.description());
        if (game) {
            this.choosenGameMessage(game).replaceLastHuman();
            game.play();
        }
        else if (choice === '0') {
            this.quitMessage().replaceLastHuman();
            this.byeMessage().addAsComputer();
        }
        else {
            this.themeMenu();
        }
    }
}
