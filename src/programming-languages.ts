import { Csharp } from './programming-language-csharp.js'
import { Java } from './programming-language-java.js'
import { JavaScript } from './programming-language-javascript.js'
import { Python } from './programming-language-python.js'

export const programmingLanguages = [new JavaScript(), new Python(), new Csharp(), new Java()] as const
export type ProgrammingLanguageId = typeof programmingLanguages[number]['id']
