import { ConversationLanguage, ConversationStrings } from './conversation-language-base.js'
import strings from '../de/translations.json' with { type: 'json' }

export class German extends ConversationLanguage {
    public override readonly id = 'de' as const
    public override readonly name = 'Deutsch'
    protected override readonly strings: ConversationStrings = strings
}
