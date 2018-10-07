const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");

module.exports = {
  module: {
    rules: [
      // typescript loader for parsing tsx files.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      // loaders for scss, css and postcss.
      {
        test: /\.scss$/,
        issuer: {
          exclude: /\.less$/
        },
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.scss$/,
        issuer: /\.less$/,
        use: {
          loader: "./sassVarsToLess.js"
        }
      },
      // file loader for resolving images
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "json"]
  },
  entry: {
    app: "./src/index.tsx"
  },
  plugins: [
    // Extract all css in a file and include in the html head.
    new MiniCssExtractPlugin({
      filename: "style.[hash].css"
    }),
    // remove the dist folder while building a new version
    new CleanWebpackPlugin(["dist"]),
    // Use the html template for adding in dist folder.
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    // use consistent hashes for caching and versioning.
    new WebpackMd5Hash()
  ],
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist")
  }
};
