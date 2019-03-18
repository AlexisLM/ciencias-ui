module.exports = {
    css: {
      loaderOptions: {
      // pass options to sass-loader
        sass: {
          // @/ is an alias to src/
          // so this assumes you have a file named `src/variables.scss`
          data: `
            @import "@/assets/sass/_fciencias_tachyons_sass.scss";
            @import "@/assets/sass/_fciencias_styles.scss";
            `
        }
      }
    }
  }