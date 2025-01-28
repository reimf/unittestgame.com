from game import Game
from template import Template
from variable import Variable
from form import Form


class Basecamp(Game):
    def __init__(self):
        super().__init__()
        self.context = 'Basecamp'
        self.menu_template = Template(
            'Menu\n',
            '----\n',
            '[1] Show contract\n',
            '[2] Show problem description\n',
            '[3] Add autotest\n',
            '[4] Show hint for autotest (-{penalty_hint})\n',
            '[5] Submit autotests (-{penalty_bug} if student reports an error)\n',
            '[0] End (-{penalty_end} if student reports an error)\n',
            Form(
                Variable(label='Choice', datatype='str', name='choice'),
            )
        )
        self.contract_template = Template(
            'Contract\n',
            '--------\n',
            'We have to make sure students write functions that are correct.',
            'Your task is to write enough autotests for these functions,',
            'so that students get the right feedback.',
            'You will receive a grade when you are done writing autotests.',
            'If you have written enough autotests, you will get {initial_score}.',
            'The menu specifies for some actions how much your grade will decrease.',
            'For example, if a student finds an error in a function that passes all your autotests,',
            'your grade will decrease by {penalty_bug}.',
        )
        self.score_template = Template(
            'Grade so far\n',
            '------------\n',
            '{score}',
        )
        self.no_unit_tests_template = Template(
            'Autotests\n',
            '---------\n',
            'You have not written any autotest yet.',
        )
        self.unit_tests_template = Template(
            'Autotests\n',
            '---------\n',
            '{unit_tests}',
        )
        self.current_function_template = Template(
            'Current function\n',
            '----------------\n',
            '{worst_passing_function}',
        )
        self.hint_unit_test_template = Template(
            'Hint for autotest\n',
            '-----------------\n',
            'An autotest that currently fails could be the following.',
            '{failing_unit_test}',
            'Your grade will decrease by {penalty_hint}.',
        )
        self.add_unit_test_template = Template(
            'Add autotest\n',
            '------------\n',
            '{form}'
        )
        self.useless_unit_test_template = Template(
            'Autotest added\n',
            '--------------\n',
            'We have added this autotest.',
            'Your autotest seems very similar to a previous autotest.',
            'Therefore, we think this autotest is not very useful.',
        )
        self.useful_unit_test_template = Template(
            'Autotest added\n',
            '--------------\n',
            'We have added this autotest.',
            'There were students who\'s function did not follow the specification.',
            'They improved the function, and it should now be better.',
        )
        self.incorrect_unit_test_template = Template(
            'Autotest NOT added\n',
            '------------------\n',
            'We compared your autotest with the specification.',
            'Your autotest turns out to be incorrect.',
            'So we did not add the autotest to our code.',
        )
        self.hand_in_unit_tests_template = Template(
            'Submit autotests\n',
            '----------------\n',
            'Thank you!',
            'We have deployed the latest version of the function to production.',
        )
        self.bug_found_template = Template(
            'Student error report\n',
            '--------------------\n',
            'A student has reported an error in CodeGrade.',
            'Their function passed all autotests, but it produced the following incorrect result.',
            '{test_result}',
            'Your grade will decrease by {penalty_bug} point.',
        )
        self.end_with_bug_template = Template(
            'End\n',
            '---\n',
            'There are still clearly wrong functions that pass all your autotests,',
            'so we will give you the minimum grade.',
            'Too bad!',
            'We think you will do better next time!',
            'Thanks for playing!',
        )
        self.end_perfect_template = Template(
            'End\n',
            '---\n',
            'Congratulations!',
            'CodeGrade is completely error-free thanks to your autotests.',
            'Your final grade is a perfect {score}.',
            'Amazing!',
            'Thanks for playing!',
        )
        self.end_positive_template = Template(
            'End\n',
            '---\n',
            'Congratulations!',
            'CodeGrade is completely error-free thanks to your autotests.',
            'Your final grade is {score}.',
            'Well done!',
            'We think you will do even better next time.',
            'Thanks for playing!',
        )
        self.end_negative_template = Template(
            'End\n',
            '---\n',
            'Congratulations!',
            'CodeGrade is completely error-free thanks to your autotests.',
            'Your final grade is {score}.',
            'Too bad!',
            'We think you will do better next time!',
            'Thanks for playing!',
        )
        self.invalid_choice_template = Template(
            'Invalid choice\n',
            '--------------\n',
            'You entered an invalid choice "{choice}".',
        )

    def format_score(self, score):
        return f'{round(score / 10)} points'
