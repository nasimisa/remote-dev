module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "./src/assets/sass/main.scss";`
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
