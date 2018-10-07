const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");

const config = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 3000,
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist/index.html"),
    proxy: {}
  }
};

module.exports = merge(baseConfig, config);
