import { ConversationLanguage, ConversationStrings } from './conversation-language-base.js'
import strings from '../fr/translations.json' with { type: 'json' }

export class French extends ConversationLanguage {
    public override readonly id = 'fr' as const
    public override readonly name = 'Français'
    protected override readonly strings: ConversationStrings = strings
}
