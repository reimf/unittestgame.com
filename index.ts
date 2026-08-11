import type { ConversationLanguage } from './src/conversation-language-base.js'
import { conversationLanguages } from './src/conversation-languages.js'
import { parseMarkdown } from './src/markdown.js'

type NullaryTextMethod = { [K in keyof ConversationLanguage]: ConversationLanguage[K] extends () => string ? K : never }[keyof ConversationLanguage]

const url = new URL(window.location.href)
const requestedLanguageId = url.searchParams.get('conversation_language')
const conversationLanguage = conversationLanguages.find(language => language.id === requestedLanguageId) ?? conversationLanguages[0]

document.documentElement.lang = conversationLanguage.id

for (const element of document.querySelectorAll<HTMLElement>('[data-i18n]')) {
    const methodName = element.dataset['i18n'] as NullaryTextMethod
    const text = conversationLanguage[methodName]()
    if (element instanceof HTMLMetaElement)
        element.content = text
    else
        element.replaceChildren(...parseMarkdown(text))
}

const languageSwitcher = document.getElementById('language-switcher') as HTMLSelectElement
for (const language of conversationLanguages) {
    const option = document.createElement('option')
    option.value = language.id
    option.textContent = language.name
    option.selected = language.id === conversationLanguage.id
    languageSwitcher.appendChild(option)
}
languageSwitcher.addEventListener('change', () => {
    url.searchParams.set('conversation_language', languageSwitcher.value)
    window.location.href = url.toString()
})

const steps = [
    'message-1',
    'this-is-you',
    'first-unit-test',
    'message-2',
    'this-is-the-ai-bot',
    'first-function',
    'first-verdict',
    'message-3',
    'this-is-you-again',
    'second-unit-test',
    'message-4',
    'this-is-the-ai-bot-again',
    'second-function',
    'second-verdict',
]
const playing = window.setInterval(() => {
    document.getElementById(steps.shift()!)!.classList.add('visible')
    if (steps.length === 0)
        window.clearInterval(playing)
}, 3000)
