from template import Template

from game_basecamp_leapyear import Leapyear
from game_basecamp_triangletypechecker import Triangletypechecker
from game_dutch_kommagetal import Kommagetal
from game_dutch_snelheid import Snelheid
from game_dutch_wachtwoord import Wachtwoord


class Main:
    def __init__(self):
        self.games = [
            Leapyear(),
            Triangletypechecker(),
            Kommagetal(),
            Snelheid(),
            Wachtwoord(),
        ]

    def test_games(self):
        for game in self.games:
            game.generate_functions_and_unit_tests()

    def game_menu(self):
        TEMPLATE_GAME_MENU = Template('Game\n', '----\n', '{games}', '[0] Quit')
        TEMPLATE_INVALID_CHOICE = Template('Invalid choice', 'You have entered invalid choice "{choice}".')
        numbered_games = {str(index + 1): game for index, game in enumerate(self.games)}
        options = [f'[{number}] {game.context:10s} - {game.description}\n' for number, game in numbered_games.items()]
        while True:
            TEMPLATE_GAME_MENU.print(games=options)
            choice = Template('Choice').input()
            if choice in numbered_games:
                game = numbered_games[choice]
                game.play()
            elif choice == '0':
                break
            else:
                TEMPLATE_INVALID_CHOICE.print(choice=choice)


if __name__ == '__main__':
    main = Main()
    main.test_games()
    main.game_menu()
