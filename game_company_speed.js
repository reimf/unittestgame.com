"use strict";
class Speed extends Game {
    constructor() {
        super();
        this.theme = Company.instance;
        this.description = 'I want to review a function that displays the speed of a car on a small display';
    }
    introductionMessage() {
        return new Message([
            new Paragraph('A Chinese gadget maker needs a function to display the average speed on a small display. ' +
                'Drivers rely on the displayed information to be correct, so there must be no errors.'),
        ]);
    }
    specificationPanel() {
        return new Panel('Specification', [
            new Paragraph('The function receives speed in meters per hour and must display the speed in kilometers per hour.'),
            new Paragraph('+-------------------+\n' +
                '|  X   XXXX   XXXX  |\n' +
                '|  X   X  X   X  X  |\n' +
                '|  X   XXXX   XXXX  |\n' +
                '|  X   X  X   X  X  |\n' +
                '|  X   XXXX X XXXX  |\n' +
                '+-------------------+'),
            new Paragraph('If something is wrong with the speed (for example, if it is negative), ' +
                'then the function must return "ERROR" because the display will start blinking slowly. ' +
                'If possible, show one decimal place, for example, "12.3". ' +
                'Otherwise, round to whole kilometers per hour, such as "49". ' +
                'If the speed no longer fits on the display, ' +
                'then the function must return "DANGER" because the display will start blinking rapidly.'),
        ]);
    }
    getParameters() {
        return [
            new NumberVariable('Speed in meters per hour', 'speed')
        ];
    }
    getUnit() {
        return new TextVariable('Expected display output', 'display');
    }
    getCandidateElements() {
        return [
            [
                'if (speed < 0) return "ERROR"',
                'if (speed <= 0) return "ERROR"',
                '',
            ],
            [
                'if (speed <= 19900) return (speed / 1000).toFixed(1)',
                'if (speed < 19950) return (speed / 1000).toFixed(1)',
                'if (speed <= 19950) return (speed / 1000).toFixed(1)',
                'if (speed < 20000) return (speed / 1000).toFixed(1)',
                '',
            ],
            [
                'if (speed >= 200000) return "DANGER"',
                'if (speed > 199500) return "DANGER"',
                'if (speed >= 199500) return "DANGER"',
                'if (speed > 199000) return "DANGER"',
                '',
            ],
            [
                'return Math.round(speed / 1000).toString()',
                'return (speed / 1000).toFixed() // no decimals',
                'return (speed / 1000).toFixed(1)',
                'return (speed / 1000).toString()',
                'return ""',
            ],
        ];
    }
    getMinimalUnitTests() {
        return [
            new UnitTest([-1], 'ERROR'),
            new UnitTest([0], '0.0'),
            new UnitTest([19950], '19.9'),
            new UnitTest([19951], '20'),
            new UnitTest([199499], '199'),
            new UnitTest([199500], 'DANGER'),
        ];
    }
    *hintGenerator() {
        yield [-1000];
        for (let speed = 0; speed <= 27000; speed += 900)
            yield [speed];
        for (let speed = 30000; speed <= 220000; speed += 10000)
            yield [speed];
    }
}
