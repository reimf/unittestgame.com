import { ConversationLanguage, ConversationStrings } from './conversation-language-base.js'
import strings from '../nl/translations.json' with { type: 'json' }

export class Dutch extends ConversationLanguage {
    public override readonly id = 'nl' as const
    public override readonly name = 'Nederlands'
    protected override readonly strings: ConversationStrings = strings
}
