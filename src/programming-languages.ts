import { Csharp } from './programming-language-csharp.js'
import { Java } from './programming-language-java.js'
import { JavaScript } from './programming-language-javascript.js'
import { Php } from './programming-language-php.js'
import { Python } from './programming-language-python.js'
import { TypeScript } from './programming-language-typescript.js'

export const programmingLanguages = [new JavaScript(), new TypeScript(), new Python(), new Csharp(), new Java(), new Php()] as const
export type ProgrammingLanguageId = typeof programmingLanguages[number]['id']
