import { ConversationLanguage, ConversationStrings } from './conversation-language-base.js'
import strings from '../es/translations.json' with { type: 'json' }

export class Spanish extends ConversationLanguage {
    public override readonly id = 'es' as const
    public override readonly name = 'Español'
    protected override readonly strings: ConversationStrings = strings
}
