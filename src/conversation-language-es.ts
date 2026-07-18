import { ConversationLanguage, ConversationText } from './conversation-language-base.js'

export class Spanish extends ConversationLanguage {
    public override readonly id = 'es' as const
    public override readonly name = 'Español'

    public override welcome(conversationLanguageName: string, programmingLanguageName: string): ConversationText {
        return ConversationLanguage.bless(`¡Hola! Soy un bot de IA que habla ${conversationLanguageName} y escribe código ${programmingLanguageName}. ` +
            'Tu trabajo es guiarme con unit tests.')
    }

    public override unitTestGameTitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame')
    }

    public override slogan(): ConversationText {
        return ConversationLanguage.bless('![Logo de UnitTestGame](apple-touch-icon.png)Aprende el desarrollo guiado por tests escribiendo unit tests que guían a un bot de IA.')
    }

    public override readMoreAboutTDD(): ConversationText {
        return ConversationLanguage.bless('[Más información sobre TDD en Wikipedia](https://es.wikipedia.org/wiki/Desarrollo_guiado_por_pruebas)')
    }

    public override contact(): ConversationText {
        return ConversationLanguage.bless('[Contacto](mailto:contact@unittestgame.com)')
    }

    public override settingsTitle(): ConversationText {
        return ConversationLanguage.bless('Configuración')
    }

    public override changeLanguage(): ConversationText {
        return ConversationLanguage.bless('Idioma')
    }

    public override changeProgrammingLanguage(): ConversationText {
        return ConversationLanguage.bless('Idioma de programación')
    }

    public override invitation(): ConversationText {
        return ConversationLanguage.bless('¿Qué nivel quieres jugar?')
    }

    public override level(levelNumber: number, levelName: string): ConversationText {
        return ConversationLanguage.bless(`Nivel ${levelNumber} - ${levelName}`)
    }

    public override nextLevelButton(levelDescription: string): ConversationText {
        return ConversationLanguage.bless(`Quiero jugar ${levelDescription}`)
    }

    public override allLevels(): ConversationText {
        return ConversationLanguage.bless('He completado todos los niveles')
    }

    public override closeTab(): ConversationText {
        return ConversationLanguage.bless('¡Bien hecho! Has completado todos los niveles. ' +
            'Ahora puedes aplicar TDD a tus propios proyectos.')
    }

    public override unitTestsTitle(): ConversationText {
        return ConversationLanguage.bless('Unit Tests')
    }

    public override addUnitTestButton(): ConversationText {
        return ConversationLanguage.bless('Quiero añadir este unit test')
    }

    public override submitUnitTestsButton(): ConversationText {
        return ConversationLanguage.bless('Quiero enviar los unit tests')
    }

    public override unitTestNotAdded(): ConversationText {
        return ConversationLanguage.bless('No he añadido el unit test, ' +
            'porque no coincide con la *Especificación*.')
    }

    public override tooManyUnitTests(numberOfUnnecessaryUnitTests: number, numberOfRedundantUnitTests: number): ConversationText {
        return ConversationLanguage.bless(`Has probado la *Función Actual* exhaustivamente, ` +
            `pero has escrito ${numberOfUnnecessaryUnitTests} ${numberOfUnnecessaryUnitTests === 1 ? 'unit test' : 'unit tests'} más de lo necesario. ` +
            `${numberOfRedundantUnitTests === 1 ? 'El siguiente' : 'Al menos uno de los siguientes'} puede omitirse.`)
    }

    public override readSpecification(): ConversationText {
        return ConversationLanguage.bless('Primero, lee la *Especificación*. ' +
            'Luego escribe un unit test que la *Función Actual* no supere.')
    }

    public override improveCurrentFunction(): ConversationText {
        return ConversationLanguage.bless('Después de añadir un unit test, ' +
            'mejoraré la *Función Actual* para que todos los *Unit Tests* vuelvan a pasar.')
    }

    public override submitUnitTests(): ConversationText {
        return ConversationLanguage.bless('Envía los *Unit Tests* cuando creas que la *Función Actual* coincide con la *Especificación*.')
    }

    public override specificationTitle(description: string): ConversationText {
        return ConversationLanguage.bless(`Especificación (${description})`)
    }

    public override currentFunctionTitle(): ConversationText {
        return ConversationLanguage.bless('Función Actual')
    }

    public override differenceTitle(): ConversationText {
        return ConversationLanguage.bless('Diferencia')
    }

    public override currentFunctionNotImproved(): ConversationText {
        return ConversationLanguage.bless('He añadido el unit test, ' +
            'pero la *Función Actual* ya lo supera, ' +
            'así que no he mejorado la *Función Actual*. ' +
            'Escribe un unit test que la *Función Actual* no supere.')
    }

    public override hint(): ConversationText {
        return ConversationLanguage.bless('Escribe un unit test que la *Función Actual* no supere.')
    }

    public override currentFunctionImproved(numberOfUnitTests: number): ConversationText {
        return ConversationLanguage.bless(`He añadido el unit test a los *Unit Tests* y mejorado la *Función Actual* ` +
            `para que el nuevo unit test ahora pase${numberOfUnitTests === 1 ? '' : ' también'}.`)
    }

    public override invalidUnitTest(): ConversationText {
        return ConversationLanguage.bless('El siguiente unit test no coincide con la *Especificación*, ' +
            'pero la *Función Actual* lo supera.')
    }

    public override moreUnitTests(numberOfUnitTestsStillNeeded: number): ConversationText {
        return ConversationLanguage.bless(`La *Función Actual* todavía no coincide con la *Especificación*. ` +
            `Necesitas al menos ${numberOfUnitTestsStillNeeded} ${numberOfUnitTestsStillNeeded === 1 ? 'unit test' : 'unit tests'} más, ` +
            `así que escribe un unit test que coincida con la *Especificación* y que la *Función Actual* no supere.`)
    }

    public override currentFunctionCorrect(): ConversationText {
        return ConversationLanguage.bless('¡Bien hecho! La *Función Actual* coincide con la *Especificación*.')
    }

    public override levelOverviewTitle(): ConversationText {
        return ConversationLanguage.bless('Resumen de Niveles')
    }

    public override batteryLevelSpecification(): ConversationText {
        return ConversationLanguage.bless('Un smartphone normalmente funciona en `NORMAL MODE`, ' +
            'pero cuando el nivel de batería es inferior a `20`, ' +
            'funciona en `LOW POWER MODE`.')
    }

    public override wrongAction(): ConversationText {
        return ConversationLanguage.bless('Hmm, eso no es del todo correcto. ' +
            'Inténtalo de nuevo.')
    }

    public override addBatteryLevel20(): ConversationText {
        return ConversationLanguage.bless('La *Especificación* contiene el número `20`. ' +
            'Ese es un buen punto de partida. ' +
            'Cuando el nivel de batería es `20`, la función debe retornar `NORMAL MODE`.')
    }

    public override addBatteryLevel19(): ConversationText {
        return ConversationLanguage.bless('La *Función Actual* ahora siempre retorna `NORMAL MODE`, ' +
            'pero la *Especificación* dice que el nivel de batería `19` debe retornar `LOW POWER MODE`. ' +
            'Añade un unit test para eso.')
    }

    public override submitUnitTestsFirst(): ConversationText {
        return ConversationLanguage.bless('La *Función Actual* ahora puede retornar `NORMAL MODE` o `LOW POWER MODE`. ' +
            'Envía los *Unit Tests* para comprobar si la *Función Actual* coincide con la *Especificación*.')
    }

    public override addBatteryLevel21(): ConversationText {
        return ConversationLanguage.bless('La *Función Actual* ahora retorna `NORMAL MODE` solo para el nivel de batería `20`. ' +
            'La *Especificación* dice que `21` también debe retornar `NORMAL MODE`. ' +
            'Añade un unit test para eso.')
    }

    public override submitUnitTestsSecond(): ConversationText {
        return ConversationLanguage.bless('Envía de nuevo los *Unit Tests* para comprobar si la *Función Actual* coincide con la *Especificación*.')
    }

    public override addBatteryLevel18(): ConversationText {
        return ConversationLanguage.bless('La *Función Actual* ahora retorna `LOW POWER MODE` solo para el nivel de batería `19`. ' +
            'La *Especificación* dice que `18` también debe retornar `LOW POWER MODE`. ' +
            'Añade un unit test para eso.')
    }

    public override submitUnitTestsThird(): ConversationText {
        return ConversationLanguage.bless('Envía de nuevo los *Unit Tests* para comprobar si la *Función Actual* coincide finalmente con la *Especificación*.')
    }

    public override evenOddSpecification(): ConversationText {
        return ConversationLanguage.bless('Retorna `true` si el número es par y `false` en caso contrario.')
    }

    public override fizzBuzzSpecification(): ConversationText {
        return ConversationLanguage.bless('Retorna `FIZZ` si el número es divisible por 3, ' +
            '`BUZZ` si es divisible por 5, ' +
            '`FIZZBUZZ` si es divisible por 3 y por 5, ' +
            'y el número mismo para cualquier otro número.')
    }

    public override floatFormatSpecification(): ConversationText {
        return ConversationLanguage.bless('Retorna `true` si el texto representa un número de punto flotante y `false` en caso contrario. ' +
            'Un número de punto flotante puede comenzar con un signo más o menos. ' +
            'A continuación hay uno o más dígitos. ' +
            'Si a continuación hay un punto, entonces deben seguir uno o más dígitos.')
    }

    public override leapYearSpecification(): ConversationText {
        return ConversationLanguage.bless('Retorna `true` si el año es bisiesto y `false` en caso contrario. ' +
            'Un año es bisiesto si es divisible por 4. ' +
            'La excepción es que los años divisibles por 100 no son bisiestos, a menos que también sean divisibles por 400.')
    }

    public override passwordStrengthSpecification(): ConversationText {
        return ConversationLanguage.bless('Retorna `true` si la contraseña es fuerte y `false` en caso contrario. ' +
            'Una contraseña es fuerte si contiene al menos 5 caracteres, una letra mayúscula, una letra minúscula y un carácter especial (`#` o `@`).')
    }

    public override speedDisplaySpecification(): ConversationText {
        return ConversationLanguage.bless('El sensor de velocidad indica la velocidad en décimas de kilómetros por hora (ej. 131 significa 13.1 km/h). ' +
            'Retorna la velocidad tal como se muestra en la pantalla. ' +
            'Usa un decimal si cabe en la pantalla (ej. 131 → `13.1`). ' +
            'De lo contrario, muestra solo kilómetros enteros, sin el decimal (ej. 876 → `87`). ' +
            'Si el coche no se mueve, retorna `START`. ' +
            'Si la velocidad ya no cabe en la pantalla, retorna `DANGER` (ej. 3000 → `DANGER`).\n' +
            'La pantalla se ve así, donde cada X es una luz LED:\n' +
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
        return ConversationLanguage.bless('Retorna el tipo de triángulo: `EQUILATERAL` (equilátero), `ISOSCELES` (isósceles) o `SCALENE` (escaleno). ' +
            'Un triángulo es equilátero si los tres lados tienen la misma longitud. ' +
            'Un triángulo es isósceles si exactamente dos lados tienen la misma longitud. ' +
            'Un triángulo es escaleno si los tres lados tienen longitudes diferentes.')
    }

    public override votingAgeSpecification(): ConversationText {
        return ConversationLanguage.bless('Retorna `true` si la edad es `18` o más, y `false` en caso contrario.')
    }

    public override reviewSpecification(): ConversationText {
        return ConversationLanguage.bless('Retorna `GOOD` si el precio es inferior a `20` y la calidad es al menos `7`. ' +
            'Retorna `BAD` si el precio es `20` o más y la calidad es inferior a `7`. ' +
            'Retorna `OK` en todos los demás casos.')
    }

    public override or(): ConversationText {
        return ConversationLanguage.bless('o')
    }
}
