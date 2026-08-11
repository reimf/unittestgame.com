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
        return ConversationLanguage.bless('![Logo de UnitTestGame](apple-touch-icon.png)Apprends à écrire des unit tests qui guident un bot IA.')
    }

    public override home(): ConversationText {
        return ConversationLanguage.bless('[Accueil](/)')
    }

    public override settingsTitle(): ConversationText {
        return ConversationLanguage.bless('Paramètres')
    }

    public override changeLanguage(): ConversationText {
        return ConversationLanguage.bless('Langue de conversation')
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

    public override playButton(): ConversationText {
        return ConversationLanguage.bless('Jouer')
    }

    public override retryButton(): ConversationText {
        return ConversationLanguage.bless('Réessayer')
    }

    public override retryLevelButton(levelDescription: string): ConversationText {
        return ConversationLanguage.bless(`Je veux réessayer ${levelDescription}`)
    }

    public override lockedButton(): ConversationText {
        return ConversationLanguage.bless('Verrouillé')
    }

    public override allLevels(): ConversationText {
        return ConversationLanguage.bless('J\'ai terminé tous les niveaux')
    }

    public override closeTab(): ConversationText {
        return ConversationLanguage.bless('Bravo! Tu as terminé tous les niveaux. ' +
            'Tu peux maintenant écrire des unit tests pour tes propres projets.')
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
            'donc je n\'ai pas amélioré la *Fonction Actuelle*.')
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
        return ConversationLanguage.bless('Un smartphone fonctionne normalement en `"NORMAL MODE"`, ' +
            'mais lorsque le niveau de batterie est inférieur à `20`, ' +
            'il fonctionne en `"LOW POWER MODE"`.')
    }

    public override wrongAction(): ConversationText {
        return ConversationLanguage.bless('Hmm, ce n\'est pas tout à fait correct. ' +
            'Réessaie.')
    }

    public override addBatteryLevel20(): ConversationText {
        return ConversationLanguage.bless('La *Spécification* contient le nombre `20`. ' +
            'C\'est un bon point de départ. ' +
            'Quand le niveau de batterie est `20`, la fonction doit retourner `"NORMAL MODE"`.')
    }

    public override addBatteryLevel19(): ConversationText {
        return ConversationLanguage.bless('La *Fonction Actuelle* retourne maintenant toujours `"NORMAL MODE"`, ' +
            'mais la *Spécification* dit que le niveau de batterie `19` doit retourner `"LOW POWER MODE"`. ' +
            'Ajoute un unit test pour cela.')
    }

    public override submitUnitTestsFirst(): ConversationText {
        return ConversationLanguage.bless('La *Fonction Actuelle* peut maintenant retourner soit `"NORMAL MODE"` soit `"LOW POWER MODE"`. ' +
            'Soumets les *Unit Tests* pour vérifier si la *Fonction Actuelle* correspond à la *Spécification*.')
    }

    public override addBatteryLevel21(): ConversationText {
        return ConversationLanguage.bless('La *Fonction Actuelle* retourne maintenant `"NORMAL MODE"` uniquement pour le niveau de batterie `20`. ' +
            'La *Spécification* dit que `21` doit aussi retourner `"NORMAL MODE"`. ' +
            'Ajoute un unit test pour cela.')
    }

    public override submitUnitTestsSecond(): ConversationText {
        return ConversationLanguage.bless('Soumets à nouveau les *Unit Tests* pour vérifier si la *Fonction Actuelle* correspond à la *Spécification*.')
    }

    public override addBatteryLevel18(): ConversationText {
        return ConversationLanguage.bless('La *Fonction Actuelle* retourne maintenant `"LOW POWER MODE"` uniquement pour le niveau de batterie `19`. ' +
            'La *Spécification* dit que `18` doit aussi retourner `"LOW POWER MODE"`. ' +
            'Ajoute un unit test pour cela.')
    }

    public override submitUnitTestsThird(): ConversationText {
        return ConversationLanguage.bless('Soumets à nouveau les *Unit Tests* pour vérifier si la *Fonction Actuelle* correspond enfin à la *Spécification*.')
    }

    public override votingAgeSpecification(): ConversationText {
        return ConversationLanguage.bless('Tu peux voter si ton âge est `18` ou plus.')
    }

    public override windScaleSpecification(): ConversationText {
        return ConversationLanguage.bless('C\'est `"CALM"` si la vitesse du vent est inférieure à `20`, ' +
            '`"BREEZE"` si elle est inférieure à `50`, ' +
            '`"GALE"` si elle est inférieure à `90`, ' +
            'et `"STORM"` dans tous les autres cas.')
    }

    public override reviewSpecification(): ConversationText {
        return ConversationLanguage.bless('Ton avis est `"GOOD"` si le prix est inférieur à `20` et la qualité est au moins `7`, ' +
            '`"BAD"` si le prix est `20` ou plus et la qualité est inférieure à `7`, ' +
            'et `"OK"` sinon.')
    }

    public override discountSpecification(): ConversationText {
        return ConversationLanguage.bless('Tu obtiens `20`% de réduction si le total est au moins `200` et que tu as une carte de membre, ' +
            '`10`% si le total est au moins `100` ou que tu as une carte de membre, ' +
            'et `0`% sinon.')
    }

    public override fizzBuzzSpecification(): ConversationText {
        return ConversationLanguage.bless('Dis `"FIZZ"` si le nombre est divisible par 3, ' +
            '`"BUZZ"` s\'il est divisible par 5, ' +
            '`"FIZZBUZZ"` s\'il est divisible par 3 et par 5, ' +
            'et `"NUMBER"` pour tout autre nombre.')
    }

    public override leapYearSpecification(): ConversationText {
        return ConversationLanguage.bless('Retourne `true` si l\'année est une année bissextile et `false` sinon. ' +
            'Une année est une année bissextile si elle est divisible par 4. ' +
            'L\'exception est que les années divisibles par 100 ne sont pas des années bissextiles, sauf si elles sont aussi divisibles par 400.')
    }

    public override triangleTypeSpecification(): ConversationText {
        return ConversationLanguage.bless('Le type du triangle est `"EQUILATERAL"` (équilatéral), `"ISOSCELES"` (isocèle) ou `"SCALENE"` (scalène). ' +
            'Un triangle est équilatéral si les trois côtés ont la même longueur. ' +
            'Un triangle est isocèle si exactement deux côtés ont la même longueur. ' +
            'Un triangle est scalène si les trois côtés ont des longueurs différentes.')
    }

    public override speedDisplaySpecification(): ConversationText {
        return ConversationLanguage.bless('Le capteur de vitesse indique la vitesse en dixièmes de kilomètres par heure (ex. 131 signifie 13.1 km/h). ' +
            'Affiche `"DECIMAL"` sur l\'écran si une décimale y tient (ex. 131 → `"DECIMAL"` car 13.1 tient sur l\'écran), ' +
            'ou `"INTEGER"` sinon (ex. 826 → `"INTEGER"` car 82.6 ne tient pas sur l\'écran mais 83 oui). ' +
            'Si la voiture ne bouge pas, c\'est `"START"`. ' +
            'Si la vitesse ne tient plus sur l\'écran, c\'est `"DANGER"` (ex. 3000 → `"DANGER"`).\n' +
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

    public override parkingFeeSpecification(): ConversationText {
        return ConversationLanguage.bless('Le tarif de stationnement est de `0` centime si la voiture est garée moins d\'une demi-heure, ou si le client a fait des achats le week-end. ' +
            'Il est de `1000` centimes si c\'est le week-end. ' +
            'Sinon, il est de 5 centimes par minute si le client n\'a pas fait d\'achats, ou de 3 centimes par minute si le client a fait des achats.')
    }

    public override or(): ConversationText {
        return ConversationLanguage.bless('ou')
    }

    public override parameterLabel(parameterName: string): ConversationText {
        return ConversationLanguage.bless(`Valeur du paramètre ${parameterName}`)
    }

    public override returnValueLabel(functionCall: string): ConversationText {
        return ConversationLanguage.bless(`Résultat de ${functionCall}`)
    }

    public override indexMetaDescription(): ConversationText {
        return ConversationLanguage.bless('Apprends à écrire des unit tests efficaces avec un jeu interactif où tu collabores avec un bot IA malicieusement obéissant pour améliorer tes compétences en unit tests.')
    }

    public override indexPageTitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame.com : Déjoue le bot IA qui triche exprès')
    }

    public override navHowItWorks(): ConversationText {
        return ConversationLanguage.bless('Comment ça marche')
    }

    public override navLevels(): ConversationText {
        return ConversationLanguage.bless('Niveaux')
    }

    public override navWhyItWorks(): ConversationText {
        return ConversationLanguage.bless('Pourquoi ça marche')
    }

    public override navPlayNow(): ConversationText {
        return ConversationLanguage.bless('Jouer maintenant')
    }

    public override heroTitleLine1Start(): ConversationText {
        return ConversationLanguage.bless('Le code passe')
    }

    public override heroTitleLine1Gradient(): ConversationText {
        return ConversationLanguage.bless('tes unit tests.')
    }

    public override heroTitleLine2Start(): ConversationText {
        return ConversationLanguage.bless('Mais fait-il ce que')
    }

    public override heroTitleLine2Gradient(): ConversationText {
        return ConversationLanguage.bless('tu veux vraiment ?')
    }

    public override heroSubtitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame t\'associe à un bot IA malicieusement obéissant. ' +
            'Il écrit le code le plus paresseux qui satisfait tes unit tests. ' +
            'Et rien de plus. ' +
            'Ta mission : écrire des unit tests jusqu\'à ce que le programme soit juste.')
    }

    public override heroCtaPrimary(): ConversationText {
        return ConversationLanguage.bless('Joue gratuitement dans ton navigateur →')
    }

    public override heroCtaSecondary(): ConversationText {
        return ConversationLanguage.bless('Voir comment ça marche')
    }

    public override humanWantsToAddUnitTest(): ConversationText {
        return ConversationLanguage.bless('Je veux ajouter ce unit test.')
    }

    public override heroCommentThisIsYou(): ConversationText {
        return ConversationLanguage.bless('c\'est toi ↑')
    }

    public override heroCommentFirstUnitTest(): ConversationText {
        return ConversationLanguage.bless('avec ton premier unit test')
    }

    public override heroCommentThisIsTheAiBot(): ConversationText {
        return ConversationLanguage.bless('↑ voici le bot IA')
    }

    public override heroCommentFirstFunctionPasses(): ConversationText {
        return ConversationLanguage.bless('sa première fonction passe ton unit test')
    }

    public override heroCommentFirstVerdict(): ConversationText {
        return ConversationLanguage.bless('mais elle ne généralise pas 👎')
    }

    public override heroCommentThisIsYouAgain(): ConversationText {
        return ConversationLanguage.bless('c\'est encore toi ↑')
    }

    public override heroCommentSecondUnitTest(): ConversationText {
        return ConversationLanguage.bless('maintenant avec ton deuxième unit test')
    }

    public override heroCommentThisIsTheAiBotAgain(): ConversationText {
        return ConversationLanguage.bless('↑ voici encore le bot IA')
    }

    public override heroCommentSecondFunctionPasses(): ConversationText {
        return ConversationLanguage.bless('sa deuxième fonction passe les deux unit tests')
    }

    public override heroCommentSecondVerdict(): ConversationText {
        return ConversationLanguage.bless('et maintenant elle généralise 👍')
    }

    public override howItWorksTitle(): ConversationText {
        return ConversationLanguage.bless('Apprends les unit tests à l\'instinct')
    }

    public override howItWorksSubtitle(): ConversationText {
        return ConversationLanguage.bless('Pas de cours. ' +
            'Pas de quiz. ' +
            'Juste un bot IA qui exploite chaque faille dans tes unit tests.')
    }

    public override howItWorksStep1Title(): ConversationText {
        return ConversationLanguage.bless('Lis la spec')
    }

    public override howItWorksStep1Desc(): ConversationText {
        return ConversationLanguage.bless('Découvre ce que la fonction est censée faire, ' +
            'en termes simples d\'entrée → sortie.')
    }

    public override howItWorksStep2Title(): ConversationText {
        return ConversationLanguage.bless('Regarde-le tricher')
    }

    public override howItWorksStep2Desc(): ConversationText {
        return ConversationLanguage.bless('Le bot IA livre le code le plus paresseux ' +
            'qui satisfait exactement ce que tu as testé.')
    }

    public override howItWorksStep3Title(): ConversationText {
        return ConversationLanguage.bless('Repère la faille')
    }

    public override howItWorksStep3Desc(): ConversationText {
        return ConversationLanguage.bless('Repère le cas limite qu\'il a évité, ' +
            'et ajoute un unit test qui l\'expose.')
    }

    public override howItWorksStep4Title(): ConversationText {
        return ConversationLanguage.bless('Renforce jusqu\'à ce que ça tienne')
    }

    public override howItWorksStep4Desc(): ConversationText {
        return ConversationLanguage.bless('Répète jusqu\'à ce qu\'il n\'y ait plus de raccourci possible. ' +
            'Niveau terminé !')
    }

    public override whyItWorksTitle(): ConversationText {
        return ConversationLanguage.bless('Pour les développeurs qui veulent prévenir les bugs')
    }

    public override whyItWorksSubtitle(): ConversationText {
        return ConversationLanguage.bless('Ça se joue comme un jeu. ' +
            'Ça s\'installe comme une habitude. ' +
            'Ça change ta façon de tester.')
    }

    public override whyItWorksItem1Title(): ConversationText {
        return ConversationLanguage.bless('Un adversaire à ta hauteur')
    }

    public override whyItWorksItem1Desc(): ConversationText {
        return ConversationLanguage.bless('Le bot IA est malicieusement obéissant. ' +
            'Chaque coup est une leçon sur ton angle mort.')
    }

    public override whyItWorksItem2Title(): ConversationText {
        return ConversationLanguage.bless('Difficulté croissante')
    }

    public override whyItWorksItem2Desc(): ConversationText {
        return ConversationLanguage.bless('Commence avec les niveaux de batterie. ' +
            'Termine en démêlant les affichages de vitesse et les frais de stationnement.')
    }

    public override whyItWorksItem3Title(): ConversationText {
        return ConversationLanguage.bless('Une vraie progression')
    }

    public override whyItWorksItem3Desc(): ConversationText {
        return ConversationLanguage.bless('Un tableau des niveaux suit ce que tu as débloqué, ' +
            'pour que tu saches toujours ce qui vient ensuite.')
    }

    public override whyItWorksItem4Title(): ConversationText {
        return ConversationLanguage.bless('Six langues de conversation')
    }

    public override whyItWorksItem4Desc(): ConversationText {
        return ConversationLanguage.bless('Converse en anglais, néerlandais, allemand, ' +
            'français, espagnol ou italien.')
    }

    public override whyItWorksItem5Title(): ConversationText {
        return ConversationLanguage.bless('Sept langages de programmation')
    }

    public override whyItWorksItem5Desc(): ConversationText {
        return ConversationLanguage.bless('Laisse le bot IA écrire des programmes en ' +
            'JavaScript, TypeScript, Python, Java, C#, PHP ou Ruby.')
    }

    public override whyItWorksItem6Title(): ConversationText {
        return ConversationLanguage.bless('Aucune installation')
    }

    public override whyItWorksItem6Desc(): ConversationText {
        return ConversationLanguage.bless('Fonctionne entièrement dans le navigateur. ' +
            'Pas de compte, pas d\'installation, pas de dépendances à gérer.')
    }

    public override levelsTitle(): ConversationText {
        return ConversationLanguage.bless('Dix niveaux, dix façons de se faire déjouer')
    }

    public override levelsSubtitle(): ConversationText {
        return ConversationLanguage.bless('Chacun semble simple. ' +
            'Jusqu\'à ce que le bot IA trouve une autre plage que tu as oublié de tester.')
    }

    public override levelsDifficultyEasy(): ConversationText {
        return ConversationLanguage.bless('facile')
    }

    public override levelsDifficultyMedium(): ConversationText {
        return ConversationLanguage.bless('moyen')
    }

    public override levelsDifficultyHard(): ConversationText {
        return ConversationLanguage.bless('difficile')
    }

    public override levelBlurb0(): ConversationText {
        return ConversationLanguage.bless('Le bot IA te montre d\'abord. Ensuite, c\'est ton tour.')
    }

    public override levelBlurb1(): ConversationText {
        return ConversationLanguage.bless('Un anniversaire. Deux résultats possibles.')
    }

    public override levelBlurb2(): ConversationText {
        return ConversationLanguage.bless('Trois seuils entre le calme et la tempête.')
    }

    public override levelBlurb3(): ConversationText {
        return ConversationLanguage.bless('Prix et qualité, l\'un contre l\'autre.')
    }

    public override levelBlurb4(): ConversationText {
        return ConversationLanguage.bless('Un panier plein, une carte de membre, ou les deux à la fois.')
    }

    public override levelBlurb5(): ConversationText {
        return ConversationLanguage.bless('Tout le monde connaît FizzBuzz. Pas le bot.')
    }

    public override levelBlurb6(): ConversationText {
        return ConversationLanguage.bless('Une exception à l\'exception de la règle.')
    }

    public override levelBlurb7(): ConversationText {
        return ConversationLanguage.bless('Chaque longueur de côté change le verdict.')
    }

    public override levelBlurb8(): ConversationText {
        return ConversationLanguage.bless('L\'affichage physique a des limites. Trouve-les toutes.')
    }

    public override levelBlurb9(): ConversationText {
        return ConversationLanguage.bless('Gratuit, forfaitaire, ou à la minute. Et maintenant ?')
    }

    public override faqTitle(): ConversationText {
        return ConversationLanguage.bless('Questions fréquentes')
    }

    public override faqSubtitle(): ConversationText {
        return ConversationLanguage.bless('Pas de discours commercial. Juste des réponses.')
    }

    public override faqQuestion1(): ConversationText {
        return ConversationLanguage.bless('Est-ce vraiment gratuit ?')
    }

    public override faqAnswer1(): ConversationText {
        return ConversationLanguage.bless('Oui. Pas de publicités, pas de tracking, pas de paywall. Juste un jeu gratuit.')
    }

    public override faqQuestion2(): ConversationText {
        return ConversationLanguage.bless('Quels langages de programmation sont pris en charge ?')
    }

    public override faqAnswer2(): ConversationText {
        return ConversationLanguage.bless('JavaScript, TypeScript, Python, Java, C#, PHP et Ruby.')
    }

    public override faqQuestion3(): ConversationText {
        return ConversationLanguage.bless('Quelles langues de conversation sont prises en charge ?')
    }

    public override faqAnswer3(): ConversationText {
        return ConversationLanguage.bless('Anglais, néerlandais, allemand, français, espagnol et italien.')
    }

    public override faqQuestion4(): ConversationText {
        return ConversationLanguage.bless('Dois-je installer quelque chose ?')
    }

    public override faqAnswer4(): ConversationText {
        return ConversationLanguage.bless('Non. Il fonctionne entièrement dans ton navigateur. Sans bibliothèques externes.')
    }

    public override faqQuestion5(): ConversationText {
        return ConversationLanguage.bless('Ai-je besoin d\'un compte ?')
    }

    public override faqAnswer5(): ConversationText {
        return ConversationLanguage.bless('Non. Tu ne peux jouer qu\'anonymement.')
    }

    public override faqQuestion6(): ConversationText {
        return ConversationLanguage.bless('Quelles informations sont stockées ?')
    }

    public override faqAnswer6(): ConversationText {
        return ConversationLanguage.bless('Ta progression est enregistrée dans ton navigateur. Elle ne quitte jamais ton ordinateur.')
    }

    public override faqQuestion7(): ConversationText {
        return ConversationLanguage.bless('Est-ce open source ?')
    }

    public override faqAnswer7(): ConversationText {
        return ConversationLanguage.bless('Oui. Le code source est disponible sur GitHub.')
    }

    public override faqQuestion8(): ConversationText {
        return ConversationLanguage.bless('Qui a créé ça ?')
    }

    public override faqAnswer8(): ConversationText {
        return ConversationLanguage.bless('Ce jeu est créé par un professeur d\'informatique. Par amour de la programmation et des tests.')
    }

    public override ctaTitle(): ConversationText {
        return ConversationLanguage.bless('Le bot IA t\'attend. Ne te fais pas avoir.')
    }

    public override ctaSubtitle(): ConversationText {
        return ConversationLanguage.bless('Clique sur le bouton, suis les instructions, et regarde ce que le bot IA essaie de te faire.')
    }

    public override ctaButton(): ConversationText {
        return ConversationLanguage.bless('Joue à UnitTestGame gratuitement →')
    }

    public override footerContact(): ConversationText {
        return ConversationLanguage.bless('Contact')
    }
}
