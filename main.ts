class Main {
    public static readonly instance = new Main()
    private games = [
        new VotingAge(),
        new Evenodd(),
        new LeapYear(),
        new Triangle(),
        new Speed(),
        new Float(),
        new Password(),
    ]
    private themes = this.games.map(game => game.theme).filter((theme, index, themes) => themes.indexOf(theme) === index)

    private constructor() { }

    private aboutPanel(): Panel {
        const anchor = new Anchor('mailto:feedback@unittestgame.com')
        anchor.appendText('feedback@unittestgame.com')
        const paragraph = new Paragraph('Please send ')
        paragraph.appendChild(anchor)
        return new Panel('Learn Unit Testing with UnitTestGame.com', [
            paragraph
        ])
    }

    private HighScorePanel(): Panel {
        const highScores = this.games.map(game => HighScore.fromLocalStorage(game.constructor.name)).filter(highScore => highScore !== null)
        return new Panel('High Scores', [
            highScores.length === 0
            ? new Paragraph('You have not played a game yet.')
            : new UnorderedList(highScores.map(highScore => new ListItem(new Span(highScore.toString()))))
        ])
    }

    private welcomeMessage(): Message {
        return new Message([
            new Paragraph(
                'Welcome to UnitTestGame.com! ' +
                'Here you can learn to write the right unit tests. ' +
                'But first, pick a theme to start the game.'
            ),
        ])
    }

    private menuMessage(buttons: Button[]): Message {
        return new Message([
            new Menu(buttons),
        ])
    }

    public start(): void {
        this.aboutPanel().show('specification')
        this.welcomeMessage().addAsComputer()
        this.HighScorePanel().show('high-scores')
        this.themeMenu()
    }

    private themeMenu(): void {
        this.menuMessage(
            this.themes.map(theme => new Button(theme.description, () => this.gameMenu(theme)))
        ).addAsHuman()
    }

    private gameMenu(theme: Theme): void {
        const gamesForThisTheme = this.games.filter(game => game.theme === theme)
        this.menuMessage(
            gamesForThisTheme.map(game => new Button(game.description, () => this.playGame(game))),
        ).addAsHuman()
    }

    private playGame(game: Game): void {
        Panel.remove('high-scores')
        game.play()
    }

    public restart(): void {
        this.HighScorePanel().show('high-scores')
        this.menuMessage([
            new Button('Pick another theme and game', () => this.themeMenu()),
            new Button('Exit UnitTestGame.com', () => window.close()),
        ]).addAsHuman()
    }
}
