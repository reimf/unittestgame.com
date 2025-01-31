class Main {
    private games = [
        new Leapyear(),
        new Triangletype(),
        new Kommagetal(),
        new Snelheid(),
        new Wachtwoord(),
    ]

    private aboutMessage(): Section {
        const link = new Html('a').href('mailto:feedback@unittestgame.com').appendText('feedback@unittestgame.com')
        return new Section([
            new Header('Learn unit testing with UnitTestGame.com'),
            new Paragraph('Please send ').appendChild(link)
        ])
    }

    private gameMenuMessage(options: Html[], form: Form): Section {
        return new Section([
            new Paragraph('I want to play the following game:'),
            ...options,
            new Paragraph('[0] Quit'),
            form.toHtml(),
        ])
    }

    private choosenGameMessage(game: Game): Section {
        return new Section([
            new Paragraph('I want to play the following game:'),
            new Paragraph(`${game.language()} - ${game.description()}`),
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
        this.aboutMessage().showPanel('welcome')
        this.menu()
    }

    private menu(): void {
        const choices = [...this.games.map((_, index) => `${index + 1}`)].concat(['0'])
        this.gameMenuMessage(
            this.games.map((game, index) => new Paragraph(`[${index + 1}] ${game.language().padEnd(10)} - ${game.description()}`)),
            new Form([new RadioVariable('Choice', 'choice', choices)], 'Go!', this.answer.bind(this))
        ).addHumanMessage()
    }

    private answer(choice: string): void {
        const game = this.games.find((_, index) => choice === `${index + 1}`)
        if (game) {
            this.choosenGameMessage(game).replaceHumanMessage()
            game.play()
        }
        else if (choice === '0') {
            this.quitMessage().replaceHumanMessage()
            this.byeMessage().addComputerMessage()
        }
        else {
            this.menu()
        }
    }
}
