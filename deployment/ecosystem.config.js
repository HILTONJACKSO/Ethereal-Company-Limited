module.exports = {
  apps: [
    {
      name: 'ethera-frontend',
      script: 'npm',
      args: 'start',
      cwd: './frontend',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
    {
      name: 'ethera-backend',
      script: './venv/bin/gunicorn',
      args: '--workers 3 --bind 127.0.0.1:8000 ethera_backend.wsgi:application',
      cwd: './backend',
      env: {
        DJANGO_SETTINGS_MODULE: 'ethera_backend.settings',
      },
    },
  ],
};
