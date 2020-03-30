module.exports = {
    apps: [
        {
            name: 'br',
            script: './.server/index.js',
            exec_mode: 'cluster',
            watch: './dist/node/loadable-stats.json',
            instances: 'max',
            restart_delay: 3000,
            env: {
                NODE_ENV: 'production',
                RUNNER: 'production',
                SERVER: true,
            },
            vizion: false,
            log_date_format: 'DD-MM-YYYY HH:mm:ss',
        },
    ],
};
