import { English } from './conversation-language-en.js'
import { Dutch } from './conversation-language-nl.js'
import { German } from './conversation-language-de.js'
import { French } from './conversation-language-fr.js'
import { Spanish } from './conversation-language-es.js'
import { Italian } from './conversation-language-it.js'

export const conversationLanguages = [new English(), new Dutch(), new German(), new French(), new Spanish(), new Italian()] as const
export type ConversationLanguageId = typeof conversationLanguages[number]['id']
