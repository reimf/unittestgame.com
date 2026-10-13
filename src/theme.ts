// Loaded as a blocking script in the head, so a stored theme is applied before the first paint.
{
    const theme = localStorage.getItem('theme')
    if (theme)
        document.documentElement.dataset['theme'] = theme
}
