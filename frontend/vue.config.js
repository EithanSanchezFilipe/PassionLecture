module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://localhost:443',
        changeOrigin: true,
        secure: false, // accepte le certificat auto-signé
        pathRewrite: { '^/api': '/api' },
      },
    },
    https: {
      key: require('fs').readFileSync('privkey.key'),
      cert: require('fs').readFileSync('cerificate.crt'),
    },
  },
}
