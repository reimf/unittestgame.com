import { Panel, ComputerMessage, HumanMessage } from './frame.js'
import { MutationTesting } from './game_mutation_testing.js'
import { TestDrivenDevelopment } from './game_test_driven_development.js'
import { Game } from './game.js'
import { Button, Paragraph, Anchor } from './html.js'
import { VotingAge } from './level_1_voting_age.js'
import { EvenOdd } from './level_2_even_odd.js'
import { FizzBuzz } from './level_3_fizz_buzz.js'
import { TriangleType } from './level_4_triangle_type.js'
import { LeapYear } from './level_5_leap_year.js'
import { FloatFormat } from './level_6_float_format.js'
import { PasswordStrength } from './level_7_password_strength.js'
import { SpeedDisplay } from './level_8_speed_display.js'
import { Round } from './round.js'

export class Main {
    private readonly games = [
        new TestDrivenDevelopment(),
        new MutationTesting(),
    ]
    private readonly levels = [
        new VotingAge(),
        new EvenOdd(),
        new FizzBuzz(),
        new TriangleType(),
        new LeapYear(),
        new FloatFormat(),
        new PasswordStrength(),
        new SpeedDisplay(),
    ]

    public start(): void {
        this.showAboutPanel()
        this.showIntroductionMessage()
        this.showWelcomeMessage(this.games[0])
    }

    private showAboutPanel(): void {
        const learnParagraph = new Paragraph().appendText('Learn to write effective unit tests.')
        const mailto = new Anchor().href('mailto:feedback@unittestgame.com').appendText('feedback')
        const site = new Anchor().href('https://unittestgame.com').appendText('UnitTestGame.com')
        const feedbackParagraph = new Paragraph().appendText('Please send us ').appendChild(mailto).appendText(' at ').appendChild(site)
        new Panel('About', [
            learnParagraph,
            feedbackParagraph
        ]).show()
    }

    private showIntroductionMessage(): void {
        new ComputerMessage([
            new Paragraph().appendLines([
                'Welcome to UnitTestGame.com!',
                'I am an AI bot specialized in Test-Driven Development and Mutation Testing.',
                'What do you want to improve?',
            ]),
        ]).show()
    }

    private showWelcomeMessage(game: Game): void {
        game.showWelcomeMessage()
        this.continue(game)
    }

    private continue(game: Game): void {
        const rounds = this.levels.map(level => new Round(game, level, () => this.continue(game)))
        this.showHighScoresPanel(rounds)
        this.showNextRound(rounds, this.games.filter(otherGame => otherGame !== game))
    }

    private showHighScoresPanel(rounds: Round[]): void {
        const highScores = rounds
            .filter(round => round.getHighScore(localStorage) > 0)
            .map(round => new Paragraph().appendText(`${round.description}: ${round.getHighScore(localStorage)}%`))
        if (highScores.length > 0)
            new Panel('High Scores',
                highScores
            ).show()
    }

    private showNextRound(rounds: Round[], otherGames: Game[]): void {
        const round = rounds.find(round => round.getHighScore(localStorage) === 0)
        const gameButtons = otherGames.map(game =>
            new Button()
                .onClick(() => this.continue(game))
                .appendText(`I want to improve my ${game.name} skills`)
                .addClass('secondary')
        )
        new HumanMessage([
            round
            ? new Button().onClick(() => this.playRound(round)).appendText(`I want to play ${round.description}`)
            : new Button().onClick(() => window.close()).appendText('Quit UnitTestGame.com'),
            ...gameButtons,
        ]).show()
    }

    private removeAllPanels(): void {
        document.querySelectorAll('#panels > section').forEach(panel => panel.remove())
    }

    private playRound(round: Round): void {
        this.removeAllPanels()
        round.play()
    }
}
