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
        return ConversationLanguage.bless('[Inicio](/)')
    }

    public override settingsTitle(): ConversationText {
        return ConversationLanguage.bless('Configuración')
    }

    public override changeLanguage(): ConversationText {
        return ConversationLanguage.bless('Idioma de conversación')
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

    public override indexMetaDescription(): ConversationText {
        return ConversationLanguage.bless('Aprende a escribir unit tests efectivos con un juego interactivo en el que tienes que trabajar con un bot de IA hostil.')
    }

    public override indexPageTitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame.com: Supera al bot de IA que juega en tu contra')
    }

    public override navHowItWorks(): ConversationText {
        return ConversationLanguage.bless('Cómo funciona')
    }

    public override navLevels(): ConversationText {
        return ConversationLanguage.bless('Niveles')
    }

    public override navWhyItWorks(): ConversationText {
        return ConversationLanguage.bless('Por qué funciona')
    }

    public override navPlayNow(): ConversationText {
        return ConversationLanguage.bless('[Jugar ahora](game?conversation_language=es)')
    }

    public override heroTitleLine1Start(): ConversationText {
        return ConversationLanguage.bless('El código pasa')
    }

    public override heroTitleLine1Gradient(): ConversationText {
        return ConversationLanguage.bless('tus unit tests.')
    }

    public override heroTitleLine2Start(): ConversationText {
        return ConversationLanguage.bless('Pero ¿hace lo que')
    }

    public override heroTitleLine2Gradient(): ConversationText {
        return ConversationLanguage.bless('realmente quieres?')
    }

    public override heroSubtitle(): ConversationText {
        return ConversationLanguage.bless('UnitTestGame te empareja con un bot de IA hostil. ' +
            'Escribe código correcto que satisface tus unit tests. ' +
            'Y nada más. ' +
            'Tu trabajo: escribir unit tests hasta que el programa sea correcto.')
    }

    public override heroCtaPrimary(): ConversationText {
        return ConversationLanguage.bless('[Juega gratis en tu navegador →](game?conversation_language=es)')
    }

    public override heroCtaSecondary(): ConversationText {
        return ConversationLanguage.bless('Ver cómo funciona')
    }

    public override humanWantsToAddUnitTest(): ConversationText {
        return ConversationLanguage.bless('Quiero añadir este unit test.')
    }

    public override heroCommentThisIsYou(): ConversationText {
        return ConversationLanguage.bless('este eres tú ↑')
    }

    public override heroCommentFirstUnitTest(): ConversationText {
        return ConversationLanguage.bless('con tu primer unit test')
    }

    public override heroCommentThisIsTheAiBot(): ConversationText {
        return ConversationLanguage.bless('↑ este es el bot de IA')
    }

    public override heroCommentFirstFunctionPasses(): ConversationText {
        return ConversationLanguage.bless('su primera función pasa tu unit test')
    }

    public override heroCommentFirstVerdict(): ConversationText {
        return ConversationLanguage.bless('pero no generaliza 👎')
    }

    public override heroCommentThisIsYouAgain(): ConversationText {
        return ConversationLanguage.bless('este eres tú otra vez ↑')
    }

    public override heroCommentSecondUnitTest(): ConversationText {
        return ConversationLanguage.bless('ahora con tu segundo unit test')
    }

    public override heroCommentThisIsTheAiBotAgain(): ConversationText {
        return ConversationLanguage.bless('↑ este es el bot de IA otra vez')
    }

    public override heroCommentSecondFunctionPasses(): ConversationText {
        return ConversationLanguage.bless('su segunda función pasa ambos unit tests')
    }

    public override heroCommentSecondVerdict(): ConversationText {
        return ConversationLanguage.bless('y ahora sí generaliza 👍')
    }

    public override howItWorksTitle(): ConversationText {
        return ConversationLanguage.bless('Aprende unit tests por instinto')
    }

    public override howItWorksSubtitle(): ConversationText {
        return ConversationLanguage.bless('Sin vídeos. ' +
            'Sin cuestionarios. ' +
            'Solo un bot de IA que explota cada agujero en tus unit tests.')
    }

    public override howItWorksStep1Title(): ConversationText {
        return ConversationLanguage.bless('Lee la spec')
    }

    public override howItWorksStep1Desc(): ConversationText {
        return ConversationLanguage.bless('Descubre qué se supone que hace la función, ' +
            'en términos simples de entrada → salida.')
    }

    public override howItWorksStep2Title(): ConversationText {
        return ConversationLanguage.bless('Míralo hacer trampa')
    }

    public override howItWorksStep2Desc(): ConversationText {
        return ConversationLanguage.bless('El bot de IA escribe código correcto ' +
            'que satisface exactamente lo que probaste.')
    }

    public override howItWorksStep3Title(): ConversationText {
        return ConversationLanguage.bless('Detecta el hueco')
    }

    public override howItWorksStep3Desc(): ConversationText {
        return ConversationLanguage.bless('Detecta el caso límite que esquivó, ' +
            'y añade un unit test que lo exponga.')
    }

    public override howItWorksStep4Title(): ConversationText {
        return ConversationLanguage.bless('Sigue hasta que sea correcto')
    }

    public override howItWorksStep4Desc(): ConversationText {
        return ConversationLanguage.bless('Repite hasta que no quede otra manera. ' +
            '¡Nivel completado!')
    }

    public override whyItWorksTitle(): ConversationText {
        return ConversationLanguage.bless('Para desarrolladores que quieren prevenir errores')
    }

    public override whyItWorksSubtitle(): ConversationText {
        return ConversationLanguage.bless('Se juega como un juego. ' +
            'Se convierte en un hábito. ' +
            'Cambia tu forma de probar.')
    }

    public override whyItWorksItem1Title(): ConversationText {
        return ConversationLanguage.bless('Un rival a la altura')
    }

    public override whyItWorksItem1Desc(): ConversationText {
        return ConversationLanguage.bless('El bot de IA juega en tu contra. ' +
            'Cada movimiento es una lección sobre tu punto ciego.')
    }

    public override whyItWorksItem2Title(): ConversationText {
        return ConversationLanguage.bless('Dificultad creciente')
    }

    public override whyItWorksItem2Desc(): ConversationText {
        return ConversationLanguage.bless('Empieza con niveles de batería. ' +
            'Termina desenredando pantallas de velocidad y tarifas de aparcamiento.')
    }

    public override whyItWorksItem3Title(): ConversationText {
        return ConversationLanguage.bless('Progresión real')
    }

    public override whyItWorksItem3Desc(): ConversationText {
        return ConversationLanguage.bless('Un marcador registra lo que has desbloqueado, ' +
            'para que siempre sepas qué sigue.')
    }

    public override whyItWorksItem4Title(): ConversationText {
        return ConversationLanguage.bless('Seis idiomas')
    }

    public override languagesList(): ConversationText {
        return ConversationLanguage.bless('En español por supuesto, pero también en ' +
            '[inglés](index), [neerlandés](index?conversation_language=nl), [alemán](index?conversation_language=de), ' +
            '[francés](index?conversation_language=fr) o [italiano](index?conversation_language=it).')
    }

    public override whyItWorksItem5Title(): ConversationText {
        return ConversationLanguage.bless('Siete lenguajes de programación')
    }

    public override programmingLanguagesList(): ConversationText {
        return ConversationLanguage.bless('Deja que el bot de IA escriba programas en ' +
            '[JavaScript](game?conversation_language=es&programming_language=javascript), [TypeScript](game?conversation_language=es&programming_language=typescript), ' +
            '[Python](game?conversation_language=es&programming_language=python), [Java](game?conversation_language=es&programming_language=java), ' +
            '[C#](game?conversation_language=es&programming_language=csharp), [PHP](game?conversation_language=es&programming_language=php) ' +
            'o [Ruby](game?conversation_language=es&programming_language=ruby).')
    }

    public override whyItWorksItem6Title(): ConversationText {
        return ConversationLanguage.bless('Sin instalación alguna')
    }

    public override whyItWorksItem6Desc(): ConversationText {
        return ConversationLanguage.bless('Funciona completamente en el navegador. ' +
            'Sin cuenta, sin instalación, sin dependencias.')
    }

    public override levelsTitle(): ConversationText {
        return ConversationLanguage.bless('Diez niveles, diez formas de que te superen')
    }

    public override levelsSubtitle(): ConversationText {
        return ConversationLanguage.bless('Cada uno parece simple. ' +
            'Hasta que el bot de IA encuentra algo que olvidaste probar.')
    }

    public override levelsDifficultyEasy(): ConversationText {
        return ConversationLanguage.bless('fácil')
    }

    public override levelsDifficultyMedium(): ConversationText {
        return ConversationLanguage.bless('medio')
    }

    public override levelsDifficultyHard(): ConversationText {
        return ConversationLanguage.bless('difícil')
    }

    public override levelBlurb0(): ConversationText {
        return ConversationLanguage.bless('El bot de IA te lo muestra primero. Luego te toca a ti.')
    }

    public override levelBlurb1(): ConversationText {
        return ConversationLanguage.bless('¿Puedes votar? Dos resultados posibles.')
    }

    public override levelBlurb2(): ConversationText {
        return ConversationLanguage.bless('Tres umbrales entre la calma y la tormenta.')
    }

    public override levelBlurb3(): ConversationText {
        return ConversationLanguage.bless('Precio y calidad, enfrentados.')
    }

    public override levelBlurb4(): ConversationText {
        return ConversationLanguage.bless('Un carrito lleno, una tarjeta de socio, o ambos a la vez.')
    }

    public override levelBlurb5(): ConversationText {
        return ConversationLanguage.bless('Todos conocen FizzBuzz. El bot no.')
    }

    public override levelBlurb6(): ConversationText {
        return ConversationLanguage.bless('Una excepción a la excepción de la regla.')
    }

    public override levelBlurb7(): ConversationText {
        return ConversationLanguage.bless('Cada lado cambia el veredicto.')
    }

    public override levelBlurb8(): ConversationText {
        return ConversationLanguage.bless('La pantalla física tiene límites. Encuéntralos todos.')
    }

    public override levelBlurb9(): ConversationText {
        return ConversationLanguage.bless('Gratis, tarifa plana, o por minuto. ¿Y ahora qué?')
    }

    public override faqTitle(): ConversationText {
        return ConversationLanguage.bless('Preguntas frecuentes')
    }

    public override faqSubtitle(): ConversationText {
        return ConversationLanguage.bless('Sin discurso de ventas. Solo respuestas.')
    }

    public override faqQuestion1(): ConversationText {
        return ConversationLanguage.bless('¿Es realmente gratis?')
    }

    public override faqAnswer1(): ConversationText {
        return ConversationLanguage.bless('Sí. Sin anuncios, sin rastreo, sin muro de pago. Solo un juego gratuito.')
    }

    public override faqQuestion2(): ConversationText {
        return ConversationLanguage.bless('¿Qué lenguajes de programación son compatibles?')
    }

    public override faqQuestion3(): ConversationText {
        return ConversationLanguage.bless('¿Qué idiomas son compatibles?')
    }

    public override faqQuestion4(): ConversationText {
        return ConversationLanguage.bless('¿Necesito instalar algo?')
    }

    public override faqAnswer4(): ConversationText {
        return ConversationLanguage.bless('No. Funciona completamente en tu navegador. Sin bibliotecas externas.')
    }

    public override faqQuestion5(): ConversationText {
        return ConversationLanguage.bless('¿Necesito una cuenta?')
    }

    public override faqAnswer5(): ConversationText {
        return ConversationLanguage.bless('No. Solo puedes jugar de forma anónima.')
    }

    public override faqQuestion6(): ConversationText {
        return ConversationLanguage.bless('¿Qué información se almacena?')
    }

    public override faqAnswer6(): ConversationText {
        return ConversationLanguage.bless('Tu progreso se guarda en tu navegador. Nunca sale de tu ordenador.')
    }

    public override faqQuestion7(): ConversationText {
        return ConversationLanguage.bless('¿Es de código abierto?')
    }

    public override faqAnswer7(): ConversationText {
        return ConversationLanguage.bless('Sí. El código fuente está disponible en GitHub.')
    }

    public override faqQuestion8(): ConversationText {
        return ConversationLanguage.bless('¿Quién hizo esto?')
    }

    public override faqAnswer8(): ConversationText {
        return ConversationLanguage.bless('Este juego lo creó un profesor de informática. Por amor a la programación y las pruebas.')
    }

    public override ctaTitle(): ConversationText {
        return ConversationLanguage.bless('El bot de IA te espera. No te dejes engañar.')
    }

    public override ctaSubtitle(): ConversationText {
        return ConversationLanguage.bless('Haz clic en el botón, sigue las instrucciones, y mira con qué intenta salirse con la suya el bot de IA.')
    }

    public override ctaButton(): ConversationText {
        return ConversationLanguage.bless('[Juega a UnitTestGame gratis →](game?conversation_language=es)')
    }

    public override footerContact(): ConversationText {
        return ConversationLanguage.bless('Contacto')
    }
}
