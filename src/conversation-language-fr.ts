import { ConversationLanguage, ConversationText } from './conversation-language-base.js'

export class French extends ConversationLanguage {
    public override readonly id = 'fr' as const
    public override readonly name = 'Français'

    public override welcome(): ConversationText {
        return ConversationLanguage.bless('Bonjour! Je suis un bot IA qui écrit du code. ' +
            'Ton rôle est de me guider avec des unit tests.')
    }

    public override unitTestGameTitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame')
    }

    public override slogan(): ConversationText {
        return ConversationLanguage.bless('![Logo de UnitTestGame](apple-touch-icon.png)Apprends le Test-Driven Development en écrivant des unit tests qui guident un bot IA.')
    }

    public override links(): ConversationText {
        return ConversationLanguage.bless('[En savoir plus sur TDD sur Wikipédia](https://fr.wikipedia.org/wiki/Test_driven_development)\n' +
            '[Contact](mailto:contact@unittestgame.com)\n')
    }

    public override settingsTitle(): ConversationText {
        return ConversationLanguage.bless('Paramètres')
    }

    public override changeLanguage(): ConversationText {
        return ConversationLanguage.bless('Langue')
    }

    public override changeProgrammingLanguage(): ConversationText {
        return ConversationLanguage.bless('Langage de programmation')
    }

    public override invitation(): ConversationText {
        return ConversationLanguage.bless('Quel niveau veux-tu jouer ?')
    }

    public override level(levelNumber: number, levelName: string): ConversationText {
        return ConversationLanguage.bless(`Niveau ${levelNumber} - ${levelName}`)
    }

    public override nextLevelButton(levelDescription: string): ConversationText {
        return ConversationLanguage.bless(`Je veux jouer ${levelDescription}`)
    }

    public override allLevels(): ConversationText {
        return ConversationLanguage.bless('J\'ai terminé tous les niveaux')
    }

    public override closeTab(): ConversationText {
        return ConversationLanguage.bless('Bravo! Tu as terminé tous les niveaux. ' +
            'Tu peux maintenant appliquer le TDD à tes propres projets.')
    }

    public override unitTestsTitle(): ConversationText {
        return ConversationLanguage.bless('Unit Tests')
    }

    public override addUnitTestButton(): ConversationText {
        return ConversationLanguage.bless('Je veux ajouter ce unit test')
    }

    public override submitUnitTestsButton(): ConversationText {
        return ConversationLanguage.bless('Je veux soumettre les unit tests')
    }

    public override unitTestNotAdded(): ConversationText {
        return ConversationLanguage.bless('Je n\'ai pas ajouté le unit test, ' +
            'car il ne correspond pas à la *Spécification*.')
    }

    public override tooManyUnitTests(numberOfUnnecessaryUnitTests: number, numberOfRedundantUnitTests: number): ConversationText {
        return ConversationLanguage.bless(`Tu as testé la *Fonction Actuelle* de manière approfondie, ` +
            `mais tu as écrit ${numberOfUnnecessaryUnitTests} ${numberOfUnnecessaryUnitTests === 1 ? 'unit test' : 'unit tests'} de plus que nécessaire. ` +
            `${numberOfRedundantUnitTests === 1 ? 'Le suivant' : 'Au moins un des suivants'} peut être omis.`)
    }

    public override readSpecification(): ConversationText {
        return ConversationLanguage.bless('Lis d\'abord la *Spécification*. ' +
            'Écris ensuite un unit test que la *Fonction Actuelle* ne réussit pas.')
    }

    public override improveCurrentFunction(): ConversationText {
        return ConversationLanguage.bless('Après avoir ajouté un unit test, ' +
            'j\'améliorerai la *Fonction Actuelle* pour que tous les *Unit Tests* réussissent à nouveau.')
    }

    public override submitUnitTests(): ConversationText {
        return ConversationLanguage.bless('Soumets les *Unit Tests* quand tu penses que la *Fonction Actuelle* correspond à la *Spécification*.')
    }

    public override specificationTitle(description: string): ConversationText {
        return ConversationLanguage.bless(`Spécification (${description})`)
    }

    public override currentFunctionTitle(): ConversationText {
        return ConversationLanguage.bless('Fonction Actuelle')
    }

    public override differenceTitle(): ConversationText {
        return ConversationLanguage.bless('Différence')
    }

    public override currentFunctionNotImproved(): ConversationText {
        return ConversationLanguage.bless('J\'ai ajouté le unit test, ' +
            'mais la *Fonction Actuelle* le réussit déjà, ' +
            'donc je n\'ai pas amélioré la *Fonction Actuelle*. ' +
            'Écris un unit test que la *Fonction Actuelle* ne réussit pas.')
    }

    public override hint(): ConversationText {
        return ConversationLanguage.bless('Écris un unit test que la *Fonction Actuelle* ne réussit pas.')
    }

    public override currentFunctionImproved(numberOfUnitTests: number): ConversationText {
        return ConversationLanguage.bless(`J'ai ajouté le unit test aux *Unit Tests* et amélioré la *Fonction Actuelle* ` +
            `pour que le nouveau unit test réussisse maintenant${numberOfUnitTests === 1 ? '' : ' aussi'}.`)
    }

    public override invalidUnitTest(): ConversationText {
        return ConversationLanguage.bless('Le unit test suivant ne correspond pas à la *Spécification*, ' +
            'mais la *Fonction Actuelle* le réussit.')
    }

    public override moreUnitTests(numberOfUnitTestsStillNeeded: number): ConversationText {
        return ConversationLanguage.bless(`La *Fonction Actuelle* ne correspond pas encore à la *Spécification*. ` +
            `Tu as besoin d'au moins ${numberOfUnitTestsStillNeeded} ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit tests'} supplémentaire${numberOfUnitTestsStillNeeded === 1 ? '' : 's'}, ` +
            `donc écris un unit test qui correspond à la *Spécification* et que la *Fonction Actuelle* ne réussit pas.`)
    }

    public override currentFunctionCorrect(): ConversationText {
        return ConversationLanguage.bless('Bravo! La *Fonction Actuelle* correspond à la *Spécification*.')
    }

    public override levelOverviewTitle(): ConversationText {
        return ConversationLanguage.bless('Aperçu des Niveaux')
    }

    public override batteryLevelSpecification(): ConversationText {
        return ConversationLanguage.bless('Un smartphone fonctionne normalement en `NORMAL MODE`, ' +
            'mais lorsque le niveau de batterie est inférieur à `20`, ' +
            'il fonctionne en `LOW POWER MODE`.')
    }

    public override wrongAction(): ConversationText {
        return ConversationLanguage.bless('Hmm, ce n\'est pas tout à fait correct. ' +
            'Réessaie.')
    }

    public override addBatteryLevel20(): ConversationText {
        return ConversationLanguage.bless('La *Spécification* contient le nombre `20`. ' +
            'C\'est un bon point de départ. ' +
            'Quand le niveau de batterie est `20`, la fonction doit retourner `NORMAL MODE`.')
    }

    public override addBatteryLevel19(): ConversationText {
        return ConversationLanguage.bless('La *Fonction Actuelle* retourne maintenant toujours `NORMAL MODE`, ' +
            'mais la *Spécification* dit que le niveau de batterie `19` doit retourner `LOW POWER MODE`. ' +
            'Ajoute un unit test pour cela.')
    }

    public override submitUnitTestsFirst(): ConversationText {
        return ConversationLanguage.bless('La *Fonction Actuelle* peut maintenant retourner soit `NORMAL MODE` soit `LOW POWER MODE`. ' +
            'Soumets les *Unit Tests* pour vérifier si la *Fonction Actuelle* correspond à la *Spécification*.')
    }

    public override addBatteryLevel21(): ConversationText {
        return ConversationLanguage.bless('La *Fonction Actuelle* retourne maintenant `NORMAL MODE` uniquement pour le niveau de batterie `20`. ' +
            'La *Spécification* dit que `21` doit aussi retourner `NORMAL MODE`. ' +
            'Ajoute un unit test pour cela.')
    }

    public override submitUnitTestsSecond(): ConversationText {
        return ConversationLanguage.bless('Soumets à nouveau les *Unit Tests* pour vérifier si la *Fonction Actuelle* correspond à la *Spécification*.')
    }

    public override addBatteryLevel18(): ConversationText {
        return ConversationLanguage.bless('La *Fonction Actuelle* retourne maintenant `LOW POWER MODE` uniquement pour le niveau de batterie `19`. ' +
            'La *Spécification* dit que `18` doit aussi retourner `LOW POWER MODE`. ' +
            'Ajoute un unit test pour cela.')
    }

    public override submitUnitTestsThird(): ConversationText {
        return ConversationLanguage.bless('Soumets à nouveau les *Unit Tests* pour vérifier si la *Fonction Actuelle* correspond enfin à la *Spécification*.')
    }

    public override evenOddSpecification(): ConversationText {
        return ConversationLanguage.bless('Retourne `true` si le nombre est pair et `false` sinon.')
    }

    public override fizzBuzzSpecification(): ConversationText {
        return ConversationLanguage.bless('Retourne `FIZZ` si le nombre est divisible par 3, ' +
            '`BUZZ` s\'il est divisible par 5, ' +
            '`FIZZBUZZ` s\'il est divisible par 3 et par 5, ' +
            'et le nombre lui-même pour tout autre nombre.')
    }

    public override floatFormatSpecification(): ConversationText {
        return ConversationLanguage.bless('Retourne `true` si le texte représente un nombre à virgule flottante et `false` sinon. ' +
            'Un nombre à virgule flottante peut commencer par un signe plus ou moins. ' +
            'Cela est suivi d\'un ou plusieurs chiffres. ' +
            'Si cela est suivi d\'un point, alors un ou plusieurs chiffres doivent suivre.')
    }

    public override leapYearSpecification(): ConversationText {
        return ConversationLanguage.bless('Retourne `true` si l\'année est une année bissextile et `false` sinon. ' +
            'Une année est une année bissextile si elle est divisible par 4. ' +
            'L\'exception est que les années divisibles par 100 ne sont pas des années bissextiles, sauf si elles sont aussi divisibles par 400.')
    }

    public override passwordStrengthSpecification(): ConversationText {
        return ConversationLanguage.bless('Retourne `true` si le mot de passe est fort et `false` sinon. ' +
            'Un mot de passe est fort s\'il contient au moins 5 caractères, une lettre majuscule, une lettre minuscule et un caractère spécial (`#` ou `@`).')
    }

    public override speedDisplaySpecification(): ConversationText {
        return ConversationLanguage.bless('Le capteur de vitesse indique la vitesse en dixièmes de kilomètres par heure (ex. 131 signifie 13.1 km/h). ' +
            'Retourne la vitesse telle qu\'affichée sur l\'écran. ' +
            'Utilise une décimale si elle tient sur l\'écran (ex. 131 → `13.1`). ' +
            'Sinon, affiche uniquement les kilomètres entiers, sans la décimale (ex. 876 → `87`). ' +
            'Si la voiture ne bouge pas, retourne `START`. ' +
            'Si la vitesse ne tient plus sur l\'écran, retourne `DANGER` (ex. 3000 → `DANGER`).\n' +
            'L\'écran ressemble à ceci, où chaque X est une LED :\n' +
            '+-------------------+\n' +
            '|  X   XXXX   XXXX  |\n' +
            '|  X   X  X   X  X  |\n' +
            '|  X   XXXX   XXXX  |\n' +
            '|  X   X  X   X  X  |\n' +
            '|  X   XXXX X XXXX  |\n' +
            '|                   |\n' +
            '| X START  DANGER X |\n' +
            '+-------------------+')
    }

    public override triangleTypeSpecification(): ConversationText {
        return ConversationLanguage.bless('Retourne le type du triangle : `EQUILATERAL` (équilatéral), `ISOSCELES` (isocèle) ou `SCALENE` (scalène). ' +
            'Un triangle est équilatéral si les trois côtés ont la même longueur. ' +
            'Un triangle est isocèle si exactement deux côtés ont la même longueur. ' +
            'Un triangle est scalène si les trois côtés ont des longueurs différentes.')
    }

    public override votingAgeSpecification(): ConversationText {
        return ConversationLanguage.bless('Retourne `true` si l\'âge est `18` ou plus, et `false` sinon.')
    }

    public override reviewSpecification(): ConversationText {
        return ConversationLanguage.bless('Retourne `GOOD` si le prix est inférieur à `20` et la qualité est au moins `7`. ' +
            'Retourne `BAD` si le prix est `20` ou plus et la qualité est inférieure à `7`. ' +
            'Retourne `OK` dans tous les autres cas.')
    }

    public override or(): ConversationText {
        return ConversationLanguage.bless('ou')
    }
}
