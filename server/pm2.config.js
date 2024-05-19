module.exports = {
  apps: [
    {
      name: "backend",
      script: "index.js",
      args: "start",
      cwd: "/root/CSFairTrade-/server",
      env: {
        NODE_ENV: "production",
        DOTENV_CONFIG_PATH: "/root/CSFairTrade-/server/.env.production",
      },
      instances: "max",
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 5,
      min_uptime: 5000,
    },
  ],
};
