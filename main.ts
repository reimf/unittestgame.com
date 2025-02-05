class Main {
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
    private quitButton = new Button('I want to quit.').on('click', () => this.end())

    private aboutPanel(): Section {
        const anchor = new Anchor().href('mailto:feedback@unittestgame.com').appendText('feedback@unittestgame.com')
        return new Section([
            new Header('Learn Unit Testing with UnitTestGame.com'),
            new Paragraph('Please send ').appendChild(anchor)
        ])
    }

    private welcomeMessage(): Section {
        return new Section([
            new Paragraph(
                'Welcome to UnitTestGame.com! ' +
                'Here you can learn to write the right unit tests. ' +
                'But first, pick a theme to start the game.'
            ),
        ])
    }

    private themeMenuMessage(buttons: Html[]): Section {
        return new Section([
            ...buttons,
            this.quitButton,
        ])
    }

    private choosenThemeMessage(theme: Theme): Section {
        return new Section([
            new Paragraph(theme.description),
        ])
    }

    private gameMenuMessage(buttons: Html[]): Section {
        return new Section([
            ...buttons,
            this.quitButton,
        ])
    }

    private choosenGameMessage(game: Game): Section {
        return new Section([
            new Paragraph(game.description),
        ])
    }

    private quitMessage(): Section {
        return new Section([
            new Paragraph('I want to quit.')
        ])
    }

    private byeMessage(): Section {
        return new Section([
            new Paragraph('Bye!'),
        ])
    }

    public start(): void {
        this.aboutPanel().show('specification')
        this.welcomeMessage().addAsComputer()
        this.themeMenu()
    }

    private themeMenu(): void {
        this.themeMenuMessage(
            this.themes.map(theme => new Button(theme.description).on('click', () => this.themeAnswer(theme)))
        ).addAsHuman()
    }

    private themeAnswer(theme: Theme): void {
        this.choosenThemeMessage(theme).replaceLastHuman()
        this.gameMenu(theme)
    }

    private gameMenu(theme: Theme): void {
        const gamesForThisTheme = this.games.filter(game => game.theme === theme)
        this.gameMenuMessage(
            gamesForThisTheme.map(game => new Button(game.description).on('click', () => this.gameAnswer(game)))
        ).addAsHuman()
    }

    private gameAnswer(game: Game): void {
        this.choosenGameMessage(game).replaceLastHuman()
        game.play()
    }

    private end(): void {
        this.quitMessage().replaceLastHuman()
        this.byeMessage().addAsComputer()
    }
}
