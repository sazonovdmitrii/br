module.exports = {
    apps: [
        {
            name: process.env.PROJECT_NAME,
            script: './serverBabel/index.js',
            exec_mode: 'cluster',
            watch: './dist/node/loadable-stats.json',
            instances: 'max',
            restart_delay: 3000,
            env: {
                NODE_ENV: 'development',
                RUNNER: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
                RUNNER: 'production',
                SERVER: true,
            },
            vizion: false,
            log_date_format: 'DD-MM-YYYY HH:mm:ss',
        },
    ],
};
