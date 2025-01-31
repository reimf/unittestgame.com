"use strict";
class Wachtwoord extends Dutch {
    constructor() {
        super();
    }
    description() {
        return 'Bepaal of een wachtwoord voldoende sterk is';
    }
    introductionMessage(initialScore, penaltyBug) {
        return new Section([
            new Paragraph('Een webshop laat een nieuwe functie ontwikkelen door een extern softwarebedrijf. ' +
                'De functie wordt gebruikt om te controleren of een wachtwoord sterk genoeg is. ' +
                'Gebruikers moeten erop kunnen rekenen dat hun gegevens goed beschermd zijn. ' +
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
            new Paragraph('Regel 1: Het wachtwoord bestaat uit minstens 5 karakters.'),
            new Paragraph('Regel 2: Het wachtwoord bevat een hoofdletter.'),
            new Paragraph('Regel 3: Het wachtwoord bevat een speciaal teken ("#" of "@").'),
            new Paragraph('Regel 4: De cijfers in het wachtwoord tellen op tot 13.'),
        ]);
    }
    getParameters() {
        return [
            new TextVariable('Wachtwoord', 'password')
        ];
    }
    getUnit() {
        return new CheckboxVariable('Is het wachtwoord sterk?', 'isStrong');
    }
    getCandidateElements() {
        return [
            [
                'if (password.length < 5) return false',
                'if (password.length <= 5) return false',
                'if (password.length < 8) return false',
                'if (password.length >= 5) return true',
                '',
            ],
            [
                'if (!/[A-Z]/.test(password)) return false',
                'if (/[A-Z]/.test(password)) return true',
                '',
            ],
            [
                'if (!/[#@]/.test(password)) return false',
                'if (!password.includes("#")) return false',
                'if (!password.includes("@")) return false',
                'if (!["#", "@"].includes(password[0])) return false',
                'if (!["#", "@"].includes(password[password.length - 1])) return false',
                'if (["#", "@"].includes(password[0])) return true',
                'if (["#", "@"].includes(password[password.length - 1])) return true',
                '',
            ],
            [
                'if (password.split("").reduce((sum, char) => sum + (parseInt(char) || 0), 0) !== 13) return false',
                'if (password.split("").reduce((sum, char) => sum + (parseInt(char) || 0), 0) > 13) return false',
                'if (password.split("").reduce((sum, char) => sum + (parseInt(char) || 0), 0) < 13) return false',
                'if (password.split("").reduce((sum, char) => sum + (parseInt(char) || 0), 0) === 13) return true',
                '',
            ],
            [
                'return true',
                'return false',
            ],
        ];
    }
    getSpecialUnitTests() {
        return [
            new UnitTest(['A346#'], true),
            new UnitTest(['@2551B'], true),
            new UnitTest(['@34D52'], false),
            new UnitTest(['1#236D0'], false),
            new UnitTest(['85EFG'], false),
            new UnitTest(['@9#4@'], false),
            new UnitTest(['@67B'], false),
        ];
    }
    *generateDigits() {
        for (let d1 = 0; d1 < 10; d1++) {
            for (let d2 = d1; d2 < 10; d2++) {
                if (d1 + d2 === 13)
                    yield [d1.toString(), d2.toString()];
                for (let d3 = d2; d3 < 10; d3++) {
                    if (d1 + d2 + d3 === 13)
                        yield [d1.toString(), d2.toString(), d3.toString()];
                    for (let d4 = d3; d4 < 10; d4++) {
                        if (d1 + d2 + d3 + d4 === 13)
                            yield [d1.toString(), d2.toString(), d3.toString(), d4.toString()];
                    }
                }
            }
        }
    }
    *generateLetters() {
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (const u1 of uppercase) {
            yield [u1];
            for (const u2 of uppercase) {
                yield [];
                yield [u1, u2];
            }
        }
    }
    *generateSpecialCharacters() {
        const specialChars = "@#!";
        for (const s1 of specialChars) {
            yield [s1];
            for (const s2 of specialChars) {
                yield [];
                yield [s1, s2];
            }
        }
    }
    *generalArgumentsGenerator() {
        const digits = [...this.generateDigits()];
        const letters = [...this.generateLetters()];
        const specialChars = [...this.generateSpecialCharacters()];
        for (let i = 0; i < 100; i++) {
            const ds = digits.random();
            const us = letters.random();
            const scs = specialChars.random();
            const chars = [...ds, ...us, ...scs];
            this.shuffleArray(chars);
            yield [chars.join("")];
            const pos = Math.floor(Math.random() * chars.length);
            chars[pos] = Math.floor(Math.random() * 10).toString();
            yield [chars.join("")];
        }
    }
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const swap = array[i];
            array[i] = array[j];
            array[j] = swap;
        }
    }
}
