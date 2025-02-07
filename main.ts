class Main {
    public static readonly instance = new Main()
    private games = [
        new Votingage(),
        new Evenodd(),
        new Leapyear(),
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
