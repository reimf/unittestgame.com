"use strict";
class Snelheid extends Dutch {
    constructor() {
        super();
    }
    description() {
        return 'Laat de snelheid van een auto zien';
    }
    introductionTemplate() {
        return new Template([
            'Introductie\n',
            'Een Chinese gadgetmaker laat een nieuwe functie ontwikkelen door een extern softwarebedrijf.',
            'De gadget laat de gemiddelde snelheid zien op een klein display.\n',
            '+-------------------+\n',
            '|  X   XXXX   XXXX  |\n',
            '|  X   X  X   X  X  |\n',
            '|  X   XXXX   XXXX  |\n',
            '|  X   X  X   X  X  |\n',
            '|  X   XXXX X XXXX  |\n',
            '+-------------------+\n',
            'Gebruikers rekenen erop dat de getoonde informatie correct is en er mogen dus geen fouten in zitten.',
            'Daarom hebben ze jou ingehuurd om unit testen te schrijven voor die functie.',
        ]);
    }
    specificationTemplate() {
        return new Template([
            'Specificatie\n',
            'De functie ontvangt de snelheid in meter per uur en moet de snelheid weergeven in kilometer per uur.\n',
            '+-------------------+\n',
            '|  X   XXXX   XXXX  |\n',
            '|  X   X  X   X  X  |\n',
            '|  X   XXXX   XXXX  |\n',
            '|  X   X  X   X  X  |\n',
            '|  X   XXXX X XXXX  |\n',
            '+-------------------+\n',
            'Als er iets mis is met de snelheid (negatief bijvoorbeeld),',
            'dan moet de functie "ERROR" teruggeven, want dan gaat het display langzaam knipperen.',
            'Als het mogelijk is, laat dan 1 decimaal zien, bijvoorbeeld "12.3".',
            'Rond anders af op hele kilometers per uur, dus bijvoorbeeld "49".',
            'Als de snelheid niet meer op het display past,',
            'dan moet de functie "DANGER" teruggeven, want dan gaat het display snel knipperen.',
        ]);
    }
    getParameters() {
        return [
            new NumberVariable('Snelheid in meter per uur', 'speed')
        ];
    }
    getUnit() {
        return new StringVariable('Verwachte weergave op het display', 'display');
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
                'return (speed / 1000).toFixed(1)',
                'return (speed / 1000).toString()',
                'return ""',
            ],
        ];
    }
    getSpecialUnitTests() {
        return [
            new UnitTest([-1], 'ERROR'),
            new UnitTest([0], '0.0'),
            new UnitTest([19950], '19.9'),
            new UnitTest([19951], '20'),
            new UnitTest([199499], '199'),
            new UnitTest([199500], 'DANGER'),
        ];
    }
    *generalArgumentsGenerator() {
        yield [-1000];
        for (let speed = 0; speed <= 27000; speed += 900)
            yield [speed];
        for (let speed = 30000; speed <= 220000; speed += 10000)
            yield [speed];
    }
}
