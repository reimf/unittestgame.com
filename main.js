"use strict";
class Main {
    constructor() {
        this.games = [
            new Votingage(),
            new Evenodd(),
            new Leapyear(),
            new Triangle(),
            new Speed(),
            new Float(),
            new Password(),
        ];
        this.themes = this.games.map(game => game.theme).filter((theme, index, themes) => themes.indexOf(theme) === index);
    }
    aboutPanel() {
        const anchor = new Anchor('mailto:feedback@unittestgame.com').appendText('feedback@unittestgame.com');
        return new Section([
            new Header('Learn Unit Testing with UnitTestGame.com'),
            new Paragraph('Please send ').appendChild(anchor)
        ]);
    }
    welcomeMessage() {
        return new Section([
            new Paragraph('Welcome to UnitTestGame.com! ' +
                'Here you can learn to write the right unit tests. ' +
                'But first, pick a theme to start the game.'),
        ]);
    }
    themeMenuMessage(buttons) {
        return new Section([
            ...buttons,
        ]);
    }
    choosenThemeMessage(theme) {
        return new Section([
            new Paragraph(theme.description),
        ]);
    }
    gameMenuMessage(buttons) {
        return new Section([
            ...buttons,
        ]);
    }
    choosenGameMessage(game) {
        return new Section([
            new Paragraph(game.description),
        ]);
    }
    anotherThemeMessage() {
        return new Section([
            new Paragraph('I want another theme.')
        ]);
    }
    start() {
        this.aboutPanel().show('specification');
        this.welcomeMessage().addAsComputer();
        this.themeMenu();
    }
    themeMenu() {
        this.themeMenuMessage(this.themes.map(theme => new Button(theme.description, () => this.themeAnswer(theme)))).addAsHuman();
    }
    themeAnswer(theme) {
        this.choosenThemeMessage(theme).replaceLastHuman();
        this.gameMenu(theme);
    }
    gameMenu(theme) {
        const gamesForThisTheme = this.games.filter(game => game.theme === theme);
        const anotherThemeButton = new Button('I want another theme.', () => this.anotherTheme());
        this.gameMenuMessage([...gamesForThisTheme.map(game => new Button(game.description, () => this.gameAnswer(game))), anotherThemeButton]).addAsHuman();
    }
    gameAnswer(game) {
        this.choosenGameMessage(game).replaceLastHuman();
        game.play();
    }
    anotherTheme() {
        this.anotherThemeMessage().replaceLastHuman();
        this.themeMenu();
    }
    restart() {
        this.themeMenu();
    }
}
Main.instance = new Main();
