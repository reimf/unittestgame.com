import { ConversationLanguage, ConversationText } from './conversation-language-base.js'

export function parseMarkdown(markdown: ConversationText): Node[] {
    const patterns = [
        /\*(?<italic>.+?)\*/,
        /`(?<code>.+?)`/,
        /!\[(?<alt>.+?)\]\((?<src>.+?)\)/,
        /\[(?<text>.+?)\]\((?<href>.+?)\)/,
        /(?<plain>[^*`![]+|[*`![])/,
    ]
    const pattern = new RegExp(patterns.map(regexp => regexp.source).join('|'), 'g')
    const nodes: Node[] = []

    for (const { groups } of markdown.matchAll(pattern)) {
        const { italic, code, text, href, plain, alt, src } = groups!
        if (italic) {
            const element = document.createElement('i')
            element.append(...parseMarkdown(ConversationLanguage.bless(italic)))
            nodes.push(element)
        } else if (code) {
            const element = document.createElement('code')
            element.append(...parseMarkdown(ConversationLanguage.bless(code)))
            nodes.push(element)
        } else if (alt && src) {
            const element = document.createElement('img')
            element.src = src
            element.alt = alt
            nodes.push(element)
        } else if (text && href) {
            const element = document.createElement('a')
            element.href = href
            element.append(...parseMarkdown(ConversationLanguage.bless(text)))
            nodes.push(element)
        } else if (plain) {
            nodes.push(document.createTextNode(plain))
        }
    }
    return nodes
}
