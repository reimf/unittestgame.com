// Loaded as a blocking script in the head, so the theme is applied before the first paint.
// A theme is stored as '(light|dark)-(color|grayscale)'.
class Theme {
    private static default(): string {
        const darkOrLight = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        const colorOrGrayscale = 'color'
        return `${darkOrLight}-${colorOrGrayscale}`
    }

    public static current(): string {
        const storedTheme = localStorage.getItem('theme') ?? ''
        return /^(light|dark)-(color|grayscale)$/.test(storedTheme) ? storedTheme : Theme.default()
    }

    public static applyCurrent(): void {
        const [darkOrLight, colorOrGrayscale] = Theme.current().split('-')
        document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-color', 'theme-grayscale')
        document.documentElement.classList.add(`theme-${darkOrLight}`, `theme-${colorOrGrayscale}`)
    }
}

Theme.applyCurrent()
