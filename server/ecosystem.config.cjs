module.exports = {
  apps: [{
    name: 'raphael-backend',
    script: './src/server.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 6388
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    // Back off instead of restarting in a tight loop when startup fails
    // (e.g. a broken migration), and give up after repeated crashes.
    min_uptime: '10s',
    max_restarts: 10,
    exp_backoff_restart_delay: 1000,
    watch: false,
    max_memory_restart: '500M',
    kill_timeout: 5000,
    wait_ready: true,
    listen_timeout: 10000
  }]
};
