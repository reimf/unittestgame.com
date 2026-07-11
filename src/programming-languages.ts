import { Csharp } from './programming-language-csharp.js'
import { JavaScript } from './programming-language-javascript.js'
import { Python } from './programming-language-python.js'

export const programmingLanguages = [new JavaScript(), new Python(), new Csharp()] as const
export type ProgrammingLanguageId = typeof programmingLanguages[number]['id']
