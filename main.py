from template import Template

from game_dutch_driehoeksvorm import Driehoeksvorm
from game_dutch_kommagetal import Kommagetal
from game_dutch_schrikkeljaar import Schrikkeljaar
from game_dutch_snelheid import Snelheid
from game_dutch_wachtwoord import Wachtwoord


class Main:
    def __init__(self):
        pass

    @staticmethod
    def game_menu():
        TEMPLATE_GAME_MENU = Template('Game', '{games}', '[0] Quit')
        TEMPLATE_INVALID_CHOICE = Template('Invalid choice', 'You have entered invalid choice "{choice}".')
        games = [
            Driehoeksvorm(),
            Kommagetal(),
            Schrikkeljaar(),
            Snelheid(),
            Wachtwoord(),
        ]
        numbered_games = {str(index + 1): game for index, game in enumerate(games)}
        options = [f'[{number}] {game.description}\n' for number, game in numbered_games.items()]
        while True:
            TEMPLATE_GAME_MENU.print(games=options)
            choice = Template('', 'Choice').input()
            if choice in numbered_games:
                game = numbered_games[choice]
                game.play()
            elif choice == '0':
                break
            else:
                TEMPLATE_INVALID_CHOICE.print(choice=choice)


if __name__ == '__main__':
    Main.game_menu()
