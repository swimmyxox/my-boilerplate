const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  output: {
    chunkFilename: "[name]-[contenthash].js",
    filename: "[name]-[contenthash].js",
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: "css/main.css", ignoreOrder: true }),
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
      minify: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        loader: "babel-loader",
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
