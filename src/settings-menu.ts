// The settings menu in the nav of the home and game pages.
export function setUpSettingsMenu(): void {
    const themeToggleButton = document.getElementById('theme-toggle') as HTMLButtonElement
    const colorToggleButton = document.getElementById('color-toggle') as HTMLButtonElement

    // The buttons show the current theme, and each switches its own half while keeping the other.
    const showThemeToggles = (): void => {
        const [darkOrLight, colorOrGrayscale] = Theme.get().split('-')
        themeToggleButton.lastElementChild!.textContent = darkOrLight === 'light' ? themeToggleButton.dataset['labelLight']! : themeToggleButton.dataset['labelDark']!
        colorToggleButton.lastElementChild!.textContent = colorOrGrayscale === 'color' ? colorToggleButton.dataset['labelColor']! : colorToggleButton.dataset['labelGrayscale']!
    }

    const switchTheme = (theme: string): void => {
        Theme.set(theme)
        Theme.apply(theme)
        showThemeToggles()
    }

    themeToggleButton.addEventListener('click', () => {
        const [darkOrLight, colorOrGrayscale] = Theme.get().split('-')
        switchTheme(`${darkOrLight === 'light' ? 'dark' : 'light'}-${colorOrGrayscale}`)
    })

    colorToggleButton.addEventListener('click', () => {
        const [darkOrLight, colorOrGrayscale] = Theme.get().split('-')
        switchTheme(`${darkOrLight}-${colorOrGrayscale === 'color' ? 'grayscale' : 'color'}`)
    })

    showThemeToggles()

    // Switching the language keeps the other settings in the URL, such as the programming language of the game.
    document.querySelectorAll<HTMLAnchorElement>('#language-switcher a').forEach(link => link.search = window.location.search)
}
