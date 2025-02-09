"use strict";
class Main {
    constructor() {
        this.games = [
            new VotingAge(),
            new Evenodd(),
            new LeapYear(),
            new Triangle(),
            new Speed(),
            new Float(),
            new Password(),
        ];
        this.themes = this.games.map(game => game.theme).filter((theme, index, themes) => themes.indexOf(theme) === index);
    }
    aboutPanel() {
        const anchor = new Anchor('mailto:feedback@unittestgame.com');
        anchor.appendText('feedback@unittestgame.com');
        const paragraph = new Paragraph('Please send ');
        paragraph.appendChild(anchor);
        return new Panel('Learn Unit Testing with UnitTestGame.com', [
            paragraph
        ]);
    }
    HighScorePanel() {
        const highScores = this.games.map(game => HighScore.fromLocalStorage(game.constructor.name)).filter(highScore => highScore !== null);
        return new Panel('High Scores', [
            new UnorderedList(highScores.map(highScore => new ListItem(new Span(highScore.toString())))),
        ]);
    }
    welcomeMessage() {
        return new Message([
            new Paragraph('Welcome to UnitTestGame.com! ' +
                'Here you can learn to write the right unit tests. ' +
                'But first, pick a theme to start the game.'),
        ]);
    }
    menuMessage(buttons) {
        return new Message([
            new Menu(buttons),
        ]);
    }
    start() {
        this.aboutPanel().show('specification');
        this.welcomeMessage().addAsComputer();
        this.HighScorePanel().show('high-scores');
        this.themeMenu();
    }
    themeMenu() {
        this.menuMessage(this.themes.map(theme => new Button(theme.description, () => this.gameMenu(theme)))).addAsHuman();
    }
    gameMenu(theme) {
        const gamesForThisTheme = this.games.filter(game => game.theme === theme);
        this.menuMessage(gamesForThisTheme.map(game => new Button(game.description, () => this.playGame(game)))).addAsHuman();
    }
    playGame(game) {
        Panel.remove('high-scores');
        game.play();
    }
    restart() {
        this.HighScorePanel().show('high-scores');
        this.menuMessage([
            new Button('Pick another theme and game', () => this.themeMenu()),
            new Button('Exit UnitTestGame.com', () => window.close()),
        ]).addAsHuman();
    }
}
Main.instance = new Main();
