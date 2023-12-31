require("dotenv").config();
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: process.env.MODE,
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  devServer: {
    port: process.env.PORT,
    static: {
      directory: path.join(__dirname, "dist"),
    }
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.DefinePlugin({
      "process.env": {
        API_URL: JSON.stringify(process.env.API_URL),
        API_KEY: JSON.stringify(process.env.API_KEY)
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: "babel-loader",
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
