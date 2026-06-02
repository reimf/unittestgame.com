module.exports = {
    wait: 2000,
    host: 'localhost',
    port: 5520,
    open: 'index.html',
    ignore: [
        '**/node_modules/**', 
        '**/test/**', 
        '**/playwright-report/**', 
        '**/test-result/**'
    ]
}