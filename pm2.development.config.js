module.exports = {
    apps: [
        {
            name: 'nextjs-app',
            script: 'npm',
            args: 'run dev',
            // env_development: {
            //     NODE_ENV: "development",
            //     PORT: 3000
            // },
            // env_production: {
            //     NODE_ENV: "production",
            //     PORT: 3000
            // }
        },
        {
            name: 'payment-worker',
            script: 'node',
            args: 'worker/payment-worker.js',
            // env_production: {
            //     NODE_ENV: "production"
            // },
            // env_development: {
            //     NODE_ENV: "development"
            // }
        }
    ]
}