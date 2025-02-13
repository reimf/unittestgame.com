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
        const learnParagraph = new Paragraph('Learn Unit Testing with UnitTestGame.com');
        const anchor = new Anchor('mailto:feedback@unittestgame.com');
        anchor.appendText('feedback@unittestgame.com');
        const feedbackParagraph = new Paragraph('Please send us ');
        feedbackParagraph.appendChild(anchor);
        return new Panel('About', [
            learnParagraph,
            feedbackParagraph
        ]);
    }
    highScorePanel() {
        const highScores = this.games.map(game => HighScore.fromLocalStorage(game.constructor.name)).filter(highScore => highScore !== null);
        return new Panel('High Scores', [
            highScores.length === 0
                ? new Paragraph('You have not played a game yet.')
                : new UnorderedList(highScores.map(highScore => new ListItem(new Span(highScore.toString()))))
        ]);
    }
    welcomeMessage() {
        return new ComputerMessage([
            new Paragraph('Welcome to UnitTestGame.com! ' +
                'Here you can learn to write the right unit tests. ' +
                'But first, pick a theme to start the game.'),
        ]);
    }
    start() {
        this.aboutPanel().show('about');
        this.welcomeMessage().show();
        this.highScorePanel().show('high-scores');
        this.themeMenu();
    }
    themeMenu() {
        new HumanMenuMessage(this.themes.map(theme => new Button(theme.description, () => this.gameMenu(theme)))).show();
    }
    gameMenu(theme) {
        const gamesForThisTheme = this.games.filter(game => game.theme === theme);
        new HumanMenuMessage(gamesForThisTheme.map(game => new Button(game.description, () => this.playGame(game)))).show();
    }
    playGame(game) {
        Panel.remove('about');
        Panel.remove('high-scores');
        game.play();
    }
    restart() {
        this.highScorePanel().show('high-scores');
        new HumanMenuMessage([
            new Button('Pick another theme and game', () => this.themeMenu()),
            new Button('Exit UnitTestGame.com', () => window.close()),
        ]).show();
    }
}
Main.instance = new Main();
