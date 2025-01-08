from game import Game
from template import Template

import game_dutch_driehoeksvorm
import game_dutch_kommagetal
import game_dutch_schrikkeljaar
import game_dutch_snelheid
import game_dutch_wachtwoord


class Main:
    def __init__(self):
        pass

    @staticmethod
    def game_menu():
        TEMPLATE_GAME_MENU = Template('Game', '{games}', '[0] Quit')
        TEMPLATE_INVALID_CHOICE = Template('Invalid choice', 'You have entered invalid choice "{choice}".')
        games = [game() for language in Game.__subclasses__() for game in language.__subclasses__()]
        numbered_games = {str(index + 1): game for index, game in enumerate(games)}
        while True:
            TEMPLATE_GAME_MENU.print(games=[f'[{number}] {game.description}\n' for number, game in numbered_games.items()])
            choice = Template('', 'Choice').input()
            if choice in numbered_games:
                game = numbered_games[choice]
                game.play()
                break
            elif choice == '0':
                break
            else:
                TEMPLATE_INVALID_CHOICE.print(choice=choice)


if __name__ == '__main__':
    Main.game_menu()
