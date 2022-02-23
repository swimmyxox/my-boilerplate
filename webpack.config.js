const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
  mode: "development",
  output : {
    path    : path.resolve(__dirname, 'dist'),
    filename: './bundle.js'
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: "css/main.css", ignoreOrder: true }),
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
      minify: false,
    }),
  ],
  resolveLoader: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: "expanded",
              },
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "pug-loader",
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
};
