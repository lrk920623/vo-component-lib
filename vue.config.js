const path = require("path");

module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        packages: path.join(__dirname, "packages")
      }
    }
  },

  // 修改 src 目录 为 examples 目录
  pages: {
    index: {
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },

  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
      .rule("js")
      .include.add(path.resolve(__dirname, "packages"))
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap(options => {
        // 修改它的选项...
        return options;
      });
  }
};
