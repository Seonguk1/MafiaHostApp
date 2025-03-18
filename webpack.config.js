const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/", // URL 리로딩 오류 방지
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"), // 정적 파일 경로 추가
    },
    historyApiFallback: true, // React Router 사용할 때 필요
    compress: true,
    port: 8080,
    hot: true,
  },
  resolve: {
    alias: {
      "react-native$": "react-native-web",
    },
    extensions: [".web.js", ".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
