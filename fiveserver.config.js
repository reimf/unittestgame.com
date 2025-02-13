module.exports = {
    wait: 2000,
    host: 'localhost',
    open: 'index.html',
    watch: './*.js',
    ignore: [/tests/, /test-results/, /playwright-report/, /node_modules/, /git/],
    logLevel: 3,
    remoteLogs: 'magenta'
}