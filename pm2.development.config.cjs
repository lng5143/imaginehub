module.exports = {
    apps: [
        {
            name: 'nextjs-app',
            script: 'npm',
            args: 'run dev'
        },
        {
            name: 'payment-worker',
            script: 'node',
            args: 'worker/payment-worker.js'
        }
    ]
}