// const path = require("path");
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // includePaths: [
        //   path.resolve(__dirname, "./node_modules/compass-mixins/lib")
        // ],
        prependData: `
        @import '@/assets/scss/_variables.scss';
        @import '@/assets/scss/_mixins.scss';
        @import '@/assets/scss/_extends.scss';
        `
      }
    }
  }
};
