const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: {
    main: __dirname + "/js/main.mjs",
    css: __dirname + "/js/css.mjs",
  },
  output: {
    path: __dirname + "/js",
    filename: "[name].bundle.mjs",
    library: {
      type: "module",
    },
  },
  module: {
    // Bundle styles into main.css
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), "..."],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/all-out.css",
    }),
  ],
  experiments: {
    outputModule: true,
  },
};
module.exports = config;
