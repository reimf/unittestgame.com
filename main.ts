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

    private HighScorePanel(highScores: HighScore[]): Panel {
        return new Panel('High Scores', [
            new UnorderedList(
                highScores.map(highScore => new ListItem(highScore.toHtml()))
            ),
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

    private themeMenuMessage(buttons: Button[]): Message {
        return new Message([
            new Menu(buttons),
        ])
    }

    private gameMenuMessage(buttons: Html[]): Message {
        return new Message([
            new Menu(buttons),
        ])
    }

    public start(): void {
        this.aboutPanel().show('specification')
        const highScores = this.games.map(game => HighScore.fromLocalStorage(game.constructor.name)).filter(highScore => highScore !== null)
        this.HighScorePanel(highScores).show('high-scores')
        this.welcomeMessage().addAsComputer()
        this.themeMenu()
    }

    private themeMenu(): void {
        this.themeMenuMessage(
            this.themes.map(theme => new Button(theme.description, () => this.gameMenu(theme)))
        ).addAsHuman()
    }

    private gameMenu(theme: Theme): void {
        const gamesForThisTheme = this.games.filter(game => game.theme === theme)
        this.gameMenuMessage(
            gamesForThisTheme.map(game => new Button(game.description, () => game.play())),
        ).addAsHuman()
    }
}
