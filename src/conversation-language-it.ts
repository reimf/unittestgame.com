import { ConversationLanguage, ConversationStrings } from './conversation-language-base.js'
import strings from '../it/translations.json' with { type: 'json' }

export class Italian extends ConversationLanguage {
    public override readonly id = 'it' as const
    public override readonly name = 'Italiano'
    protected override readonly strings: ConversationStrings = strings
}
