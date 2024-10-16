module.exports = {
    apps: [
        {
            name: 'nextjs-app',
            script: 'npm',
            args: 'run start:app',
            env: {
                NODE_ENV: 'production'
            }
        },
        {
            name: 'payment-worker',
            script: 'node',
            args: 'worker/payment-worker.js',
            env: {
                NODE_ENV: 'production'
            }
        }
    ]
}