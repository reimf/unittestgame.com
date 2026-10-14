// Loaded as a blocking script in the head, so the theme is applied before the first paint.
// A theme is stored as '(light|dark)-(color|grayscale)'.
class Theme {
    private static default(): string {
        const darkOrLight = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        const colorOrGrayscale = 'color'
        return `${darkOrLight}-${colorOrGrayscale}`
    }

    public static get(): string {
        return localStorage.getItem('theme') ?? Theme.default()
    }

    public static set(theme: string): void {
        localStorage.setItem('theme', theme)
    }

    public static apply(theme: string): void {
        const [darkOrLight, colorOrGrayscale] = theme.split('-')
        document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-color', 'theme-grayscale')
        document.documentElement.classList.add(`theme-${darkOrLight}`, `theme-${colorOrGrayscale}`)
    }
}

Theme.apply(Theme.get())
