// Loaded as a blocking script in the head, so the theme is applied before the first paint.
// A theme is stored as '(light|dark)-(color|grayscale)'.
function getCurrentTheme(): string {
    const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-color' : 'light-color'
    const storedTheme = localStorage.getItem('theme') ?? ''
    return /^(light|dark)-(color|grayscale)$/.test(storedTheme) ? storedTheme : defaultTheme
}

function applyTheme(theme: string): void {
    const [darkOrLight, colorOrGrayscale] = theme.split('-')
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-color', 'theme-grayscale')
    document.documentElement.classList.add(`theme-${darkOrLight}`, `theme-${colorOrGrayscale}`)
}

applyTheme(getCurrentTheme())
