from game_dutch_driehoeksvorm import Driehoeksvorm
from game_dutch_kommagetal import Kommagetal
from game_dutch_schrikkeljaar import Schrikkeljaar
from game_dutch_snelheid import Snelheid
from game_dutch_wachtwoord import Wachtwoord
from template import Template


class Main:
    def __init__(self):
        pass

    @staticmethod
    def game_menu():
        TEMPLATE_GAME_MENU = Template('Game', '{games}', '[0] Quit')
        TEMPLATE_INVALID_CHOICE = Template('Invalid choice', 'You have entered invalid choice "{choice}".')
        games = [Driehoeksvorm(), Kommagetal(), Schrikkeljaar(), Snelheid(), Wachtwoord()]
        games.sort(key=lambda game: (game.lang, game.description))
        while True:
            TEMPLATE_GAME_MENU.print(games=[f'[{index + 1}] {game.description}\n' for index, game in enumerate(games)])
            choice = Template('', 'Choice').input()
            if game := ([None] + [game for index, game in enumerate(games) if str(index + 1) == choice]).pop():
                game.play()
                break
            elif choice == '0':
                break
            else:
                TEMPLATE_INVALID_CHOICE.print(choice=choice)


if __name__ == '__main__':
    Main.game_menu()
