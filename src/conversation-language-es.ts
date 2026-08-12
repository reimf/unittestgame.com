import { ConversationLanguage, ConversationText } from './conversation-language-base.js'

export class Spanish extends ConversationLanguage {
    public override readonly id = 'es' as const
    public override readonly name = 'Español'

    public override welcome(): ConversationText {
        return ConversationLanguage.bless('¡Hola! Soy un bot de IA que escribe código. ' +
            'Tu trabajo es guiarme con unit tests.')
    }

    public override unitTestGameTitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame')
    }

    public override slogan(): ConversationText {
        return ConversationLanguage.bless('![Logo de UnitTestGame](apple-touch-icon.png)Aprende a escribir unit tests que guían a un bot de IA.')
    }

    public override home(): ConversationText {
        return ConversationLanguage.bless('[Inicio](index-es.html)')
    }

    public override settingsTitle(): ConversationText {
        return ConversationLanguage.bless('Configuración')
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

    public override playButton(): ConversationText {
        return ConversationLanguage.bless('Jugar')
    }

    public override retryButton(): ConversationText {
        return ConversationLanguage.bless('Reintentar')
    }

    public override retryLevelButton(levelDescription: string): ConversationText {
        return ConversationLanguage.bless(`Quiero reintentar ${levelDescription}`)
    }

    public override lockedButton(): ConversationText {
        return ConversationLanguage.bless('Bloqueado')
    }

    public override allLevels(): ConversationText {
        return ConversationLanguage.bless('He completado todos los niveles')
    }

    public override closeTab(): ConversationText {
        return ConversationLanguage.bless('¡Bien hecho! Has completado todos los niveles. ' +
            'Ahora puedes escribir unit tests para tus propios proyectos.')
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
            'así que no he mejorado la *Función Actual*.')
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
        return ConversationLanguage.bless('Un smartphone normalmente funciona en `"NORMAL MODE"`, ' +
            'pero cuando el nivel de batería es inferior a `20`, ' +
            'funciona en `"LOW POWER MODE"`.')
    }

    public override wrongAction(): ConversationText {
        return ConversationLanguage.bless('Hmm, eso no es del todo correcto. ' +
            'Inténtalo de nuevo.')
    }

    public override addBatteryLevel20(): ConversationText {
        return ConversationLanguage.bless('La *Especificación* contiene el número `20`. ' +
            'Ese es un buen punto de partida. ' +
            'Cuando el nivel de batería es `20`, la función debe retornar `"NORMAL MODE"`.')
    }

    public override addBatteryLevel19(): ConversationText {
        return ConversationLanguage.bless('La *Función Actual* ahora siempre retorna `"NORMAL MODE"`, ' +
            'pero la *Especificación* dice que el nivel de batería `19` debe retornar `"LOW POWER MODE"`. ' +
            'Añade un unit test para eso.')
    }

    public override submitUnitTestsFirst(): ConversationText {
        return ConversationLanguage.bless('La *Función Actual* ahora puede retornar `"NORMAL MODE"` o `"LOW POWER MODE"`. ' +
            'Envía los *Unit Tests* para comprobar si la *Función Actual* coincide con la *Especificación*.')
    }

    public override addBatteryLevel21(): ConversationText {
        return ConversationLanguage.bless('La *Función Actual* ahora retorna `"NORMAL MODE"` solo para el nivel de batería `20`. ' +
            'La *Especificación* dice que `21` también debe retornar `"NORMAL MODE"`. ' +
            'Añade un unit test para eso.')
    }

    public override submitUnitTestsSecond(): ConversationText {
        return ConversationLanguage.bless('Envía de nuevo los *Unit Tests* para comprobar si la *Función Actual* coincide con la *Especificación*.')
    }

    public override addBatteryLevel18(): ConversationText {
        return ConversationLanguage.bless('La *Función Actual* ahora retorna `"LOW POWER MODE"` solo para el nivel de batería `19`. ' +
            'La *Especificación* dice que `18` también debe retornar `"LOW POWER MODE"`. ' +
            'Añade un unit test para eso.')
    }

    public override submitUnitTestsThird(): ConversationText {
        return ConversationLanguage.bless('Envía de nuevo los *Unit Tests* para comprobar si la *Función Actual* coincide finalmente con la *Especificación*.')
    }

    public override votingAgeSpecification(): ConversationText {
        return ConversationLanguage.bless('Puedes votar si tu edad es `18` o más.')
    }

    public override windScaleSpecification(): ConversationText {
        return ConversationLanguage.bless('Es `"CALM"` si la velocidad del viento es inferior a `20`, ' +
            '`"BREEZE"` si es inferior a `50`, ' +
            '`"GALE"` si es inferior a `90`, ' +
            'y `"STORM"` en cualquier otro caso.')
    }

    public override reviewSpecification(): ConversationText {
        return ConversationLanguage.bless('Tu reseña es `"GOOD"` si el precio es inferior a `20` y la calidad es al menos `7`, ' +
            '`"BAD"` si el precio es `20` o más y la calidad es inferior a `7`, ' +
            'y `"OK"` en caso contrario.')
    }

    public override discountSpecification(): ConversationText {
        return ConversationLanguage.bless('Obtienes `20`% de descuento si el total es al menos `200` y tienes una tarjeta de socio, ' +
            '`10`% si el total es al menos `100` o tienes una tarjeta de socio, ' +
            'y `0`% en caso contrario.')
    }

    public override fizzBuzzSpecification(): ConversationText {
        return ConversationLanguage.bless('Di `"FIZZ"` si el número es divisible por 3, ' +
            '`"BUZZ"` si es divisible por 5, ' +
            '`"FIZZBUZZ"` si es divisible por 3 y por 5, ' +
            'y `"NUMBER"` para cualquier otro número.')
    }

    public override leapYearSpecification(): ConversationText {
        return ConversationLanguage.bless('Retorna `true` si el año es bisiesto y `false` en caso contrario. ' +
            'Un año es bisiesto si es divisible por 4. ' +
            'La excepción es que los años divisibles por 100 no son bisiestos, a menos que también sean divisibles por 400.')
    }

    public override triangleTypeSpecification(): ConversationText {
        return ConversationLanguage.bless('El tipo de triángulo es `"EQUILATERAL"` (equilátero), `"ISOSCELES"` (isósceles) o `"SCALENE"` (escaleno). ' +
            'Un triángulo es equilátero si los tres lados tienen la misma longitud. ' +
            'Un triángulo es isósceles si exactamente dos lados tienen la misma longitud. ' +
            'Un triángulo es escaleno si los tres lados tienen longitudes diferentes.')
    }

    public override speedDisplaySpecification(): ConversationText {
        return ConversationLanguage.bless('El sensor de velocidad indica la velocidad en décimas de kilómetros por hora (ej. 131 significa 13.1 km/h). ' +
            'Muestra en la pantalla `"DECIMAL"` si cabe un decimal (ej. 131 → `"DECIMAL"` porque 13.1 cabe en la pantalla), ' +
            'o `"INTEGER"` en caso contrario (ej. 826 → `"INTEGER"` porque 82.6 no cabe en la pantalla pero 83 sí). ' +
            'Si el coche no se mueve, es `"START"`. ' +
            'Si la velocidad ya no cabe en la pantalla, es `"DANGER"` (ej. 3000 → `"DANGER"`).\n' +
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

    public override parkingFeeSpecification(): ConversationText {
        return ConversationLanguage.bless('La tarifa de aparcamiento es de `0` céntimos si el coche está aparcado menos de media hora, o si el cliente ha comprado el fin de semana. ' +
            'Es de `1000` céntimos si es fin de semana. ' +
            'De lo contrario, es de 5 céntimos por minuto si el cliente no ha comprado, o de 3 céntimos por minuto si el cliente ha comprado.')
    }

    public override or(): ConversationText {
        return ConversationLanguage.bless('o')
    }

    public override parameterLabel(parameterName: string): ConversationText {
        return ConversationLanguage.bless(`Valor del parámetro ${parameterName}`)
    }

    public override returnValueLabel(functionCall: string): ConversationText {
        return ConversationLanguage.bless(`Resultado de ${functionCall}`)
    }
}
