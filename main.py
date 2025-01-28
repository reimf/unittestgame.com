from template import Template
from variable import Variable
from form import Form

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
        self.numbered_games = {str(index + 1): game for index, game in enumerate(self.games)}
        self.game_menu_template = Template(
            'Welcome to UnitTestGame\n',
            '-----------------------\n',
            '{games}', '[0] Quit',
            Form(
                Variable(label='Choice', datatype='str', name='choice'),
            )
        )
        self.invalid_choice_template = Template(
            'Invalid choice\n',
            '--------------\n',
            'You have entered invalid choice "{choice}".',
        )
        self.bye_template = Template(
            'Bye!\n',
            '----\n',
            'See you later!'
        )

    def game_menu(self):
        options = [f'[{number}] {game.context:10s} - {game.description}\n' for number, game in self.numbered_games.items()]
        self.game_menu_template.show(
            id='menu',
            callback=lambda values: self.reply(**values),
            games=options
        )

    def reply(self, choice):
        if choice in self.numbered_games:
            game = self.numbered_games[choice]
            game.play()
        elif choice == '0':
            self.bye_template.show(id='last-reply')
        else:
            self.invalid_choice_template.show(id='last-reply', choice=choice)


if __name__ == '__main__':
    main = Main()
    main.game_menu()
