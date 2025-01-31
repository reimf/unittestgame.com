"use strict";
class Kommagetal extends Dutch {
    constructor() {
        super();
    }
    description() {
        return 'Stel met een reguliere expressie vast of een tekst een kommagetal voorstelt';
    }
    introductionMessage(initialScore, penaltyBug) {
        return new Section([
            new Paragraph('Een laboratorium laat een nieuwe functie ontwikkelen door een extern softwarebedrijf. ' +
                'De functie wordt gebruikt om te bekijken of meetwaardes wel correct zijn ingevoerd. ' +
                'De laboranten gaan er daarna verder mee rekenen en er mogen dus geen fouten in zitten. ' +
                'Daarom hebben ze jou ingehuurd om voldoende unit testen te schrijven voor die functie. ' +
                'zodat de functie geen foute resultaten meer kan geven. ' +
                `Voor het hele traject krijg je ${this.formatScore(initialScore)}. ` +
                'In het menu staan bij sommige acties kosten vermeld voor jou. ' +
                'Als een gebruiker bijvoorbeeld een fout constateert in een functie die slaagt voor al jouw unit testen, ' +
                `dan betaal jij een boete van ${this.formatScore(penaltyBug)}.`),
        ]);
    }
    specificationPanel() {
        return new Section([
            new Header('Specificatie'),
            new Paragraph('De functie moet aangeven of een tekst een kommagetal voorstelt en dus True of False teruggeven. ' +
                'Een kommagetal kan beginnen met een plus-teken of een min-teken. ' +
                'Daarna volgen één of meer cijfers. ' +
                'Als er daarna een komma staat, dan moet er minstens één cijfer volgen. '),
        ]);
    }
    getParameters() {
        return [
            new TextVariable('Tekst', 'text')
        ];
    }
    getUnit() {
        return new CheckboxVariable('Is het een kommagetal?', 'isFloat');
    }
    getCandidateElements() {
        return [
            [
                'let regex = ""',
            ],
            [
                'regex += "[+-]?"',
                'regex += "[+-]*"',
                'regex += "[+-]+"',
                'regex += "[+-]"',
                'regex += "[-]?"',
                'regex += "[-]*"',
                'regex += "[-]+"',
                'regex += "[-]"',
                'regex += "[+]?"',
                'regex += "[+]*"',
                'regex += "[+]+"',
                'regex += "[+]"',
                '',
            ],
            [
                'regex += "[0-9]"',
                'regex += "[0-9]*"',
                'regex += "[0-9]+"',
                '',
            ],
            [
                'regex += ",[0-9]+"',
                'regex += "(,[0-9]+)?"',
                'regex += "(,[0-9]+)*"',
                'regex += ",[0-9]*"',
                'regex += "(,[0-9]*)?"',
                'regex += "(,[0-9]*)*"',
                '',
            ],
            [
                'return Boolean(text.match(new RegExp(`^${regex}$`)))',
                'return true',
                'return false',
            ]
        ];
    }
    getSpecialUnitTests() {
        return [
            new UnitTest(['+123'], true),
            new UnitTest(['-123,45'], true),
            new UnitTest(['123,45'], true),
            new UnitTest(['+-123'], false),
            new UnitTest(['123,'], false),
            new UnitTest([',45'], false),
            new UnitTest(['12,3,45'], false),
        ];
    }
    *generalArgumentsGenerator() {
        for (let i = 0; i < 100; i++) {
            const number = Math.random() * 1000;
            const precision = Math.floor(Math.random() * 4);
            const sign = ['-', '+', ''].random();
            const rounded = number.toFixed(precision);
            const text1 = sign + rounded.replace('.', ',');
            yield [text1];
            const pos = Math.floor(Math.random() * text1.length);
            const text2 = text1.substring(0, pos) + ['0', '+', '-', ','].random() + text1.substring(pos + 1);
            yield [text2];
        }
    }
}
