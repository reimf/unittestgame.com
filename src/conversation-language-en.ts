import { ConversationLanguage, ConversationStrings } from './conversation-language-base.js'
import strings from '../en/translations.json' with { type: 'json' }

export class English extends ConversationLanguage {
    public override readonly id = 'en' as const
    public override readonly name = 'English'
    protected override readonly strings: ConversationStrings = strings
}
