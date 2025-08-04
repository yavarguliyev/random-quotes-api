module.exports = {
  apps: [
    {
      name: 'random-quotes-api-dev',
      script: 'tsx',
      args: 'watch src/index.ts',
      cwd: './',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        HOST: 'localhost'
      },
      env_file: '.env',
      watch: ['src'],
      ignore_watch: ['node_modules', '*.log', 'dist'],
      delay: 1000,
      restartable: 'rs',
      verbose: true,
      instances: 4,
      exec_mode: 'fork',
      time: true
    },
  ],
};