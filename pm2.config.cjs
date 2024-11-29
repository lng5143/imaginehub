module.exports = {
    apps: [
        {
            name: 'nextjs-app',
            script: 'npm',
            args: 'run start',
            error_file: '/app/logs/app/error.log',
            out_file: '/app/logs/app/out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
            merge_logs: true,
            max_size: '10M',
            retain: '30',
            env: {
                NODE_ENV: 'production'
            }
        },
        {
            name: 'payment-worker',
            script: 'node',
            args: '/worker/payment-worker.js',
            error_file: '/app/logs/worker/error.log',
            out_file: '/app/logs/worker/out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
            merge_logs: true,
            max_size: '10M',
            retain: '30',
            env: {
                NODE_ENV: 'production'
            }
        }
    ]
}