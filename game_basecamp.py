from game import Game
from template import Template


class Basecamp(Game):
    def __init__(self):
        super().__init__()
        self.context = 'Basecamp'
        self.menu_template = Template(
            'Menu\n',
            '----\n',
            '[1] Show problem description\n',
            '[2] Show contract\n',
            '[3] Add autotest\n',
            '[4] Show hint for autotest (-{penalty_hint})\n',
            '[5] Submit autotests (-{penalty_bug} if student reports an error)\n',
            '[0] End (-{penalty_end} if student reports an error)\n',
        )
        self.choice_template = Template(
            'Choice',
        )
        self.contract_template = Template(
            'Contract\n',
            '--------\n',
            'We have to make sure students write a function that determines the type of a triangle.',
            'Your task is to write enough autotests for this function,',
            'so that the students get the right feedback.',
            'You will receive a grade for the entire project.',
            'If you write enough autotests, you will get {initial_score}.',
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
            '(You have not written any autotests yet)',
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
            'A autotest that currently fails could be the following.',
            '{failing_unit_test}',
            'Your grade will decrease by {penalty_hint}.',
        )
        self.add_unit_test_template = Template(
            'Add autotest\n',
            '-------------',
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
            'The function written by the external software company indeed did not follow the specification.',
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
        self.no_bug_found_template = Template(
            'No more error reports\n',
            '---------------------\n',
            'Students are no longer reporting errors in CodeGrade.',
            'Thank you!',
        )
        self.end_negative_template = Template(
            'End\n',
            '---\n',
            'There are still wrong functions that pass all your autotests,',
            'so we will give you the minimum grade.',
        )
        self.end_positive_template = Template(
            'End\n',
            '---\n',
            'Congratulations! CodeGrade is completely error-free thanks to your autotests.',
            'We are happy to give you a grade of {score}.',
        )
        self.total_negative_template = Template(
            'Total\n',
            '-----\n',
            'In total, you got a negative grade of {score}.',
            'Too bad!',
            'We hope it goes better next time.',
            'Thanks for playing!',
        )
        self.total_positive_template = Template(
            'Total\n',
            '-----\n',
            'In total, you got a grade of {score}.',
            'Amazing!',
            'We think you will do even better next time.',
            'Thanks for playing!',
        )
        self.invalid_choice_template = Template(
            'Invalid choice\n',
            '--------------\n',
            'You entered an invalid choice "{choice}".',
        )

    def format_score(self, score):
        return f'{round(10 * score)} points'
