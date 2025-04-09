module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
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
