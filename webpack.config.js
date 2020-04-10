const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  resolve: {
    alias: {
      react: path.resolve("./node_modules/react"),
      d3: path.resolve("./node_modules/d3"),
      "styled-components": path.resolve("./node_modules/styled-components")
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
};
