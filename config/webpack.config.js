"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const colorImporter_1 = require("web-ui/util/colorImporter");
const webpack_1 = require("webpack");
const webpackConfig = (env, argv) => {
  var _a, _b;
  return {
    context: path.resolve(__dirname, "../src"),
    devServer: {
      historyApiFallback: true,
    },
    entry: path.resolve(__dirname, "../src/index.tsx"),
    module: {
      rules: [
        {
          generator: {
            filename: ({ filename }) =>
              /[\\/]favicon\.ico$/.test(filename)
                ? "[name][ext]"
                : "[hash][ext]",
          },
          test: /\.(gif|ico|jpg|mp3|otf|png|svg|woff2?)$/,
          type: "asset/resource",
        },
        {
          loader: "style-loader",
          test: /\.s?css$/,
        },
        {
          loader: "css-loader",
          test: /\.css$/,
        },
        {
          // This check is permissive by design, as the web-ui library
          // may be symlinked when using the local development build.
          include: p => p.includes("web-ui"),
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: {
              localIdentName: "web-ui__[name]--[local]",
            },
          },
          test: /\.scss$/,
        },
        {
          include: p => !p.includes("web-ui"),
          loader: "css-loader",
          options: {
            importLoaders: 1,
            modules: {
              localIdentName: "[path][name]--[local]",
            },
          },
          test: /\.scss$/,
        },
        {
          loader: "sass-loader",
          options: {
            // We need to use the modern JS API to be able to use the
            // new AsyncCompiler with shared resources support.
            api: "modern-compiler",
            implementation: "sass-embedded",
            sassOptions: {
              importers: [colorImporter_1.colorImporter],
              loadPaths: [
                path.resolve(__dirname, "../src"),
                path.resolve(__dirname, "../node_modules"),
              ],
            },
            // We aren't using this and disabling it improves compilation speed.
            webpackImporter: false,
          },
          test: /\.scss$/,
        },
        {
          loader: "ts-loader",
          test: /\.tsx?$/,
        },
      ],
    },
    output: {
      filename: "[name].[contenthash].js",
      publicPath: "/",
    },
    plugins: [
      new webpack_1.DefinePlugin({
        "process.env.API": JSON.stringify(
          (_a = env.api) !== null && _a !== void 0 ? _a : "/api"
        ),
        "process.env.DUOLINGO_JWT":
          argv.mode === "development"
            ? JSON.stringify(process.env.DUOLINGO_JWT)
            : undefined,
        "process.env.EXCESS_MODE": JSON.stringify(
          (_b = env.excess_mode) !== null && _b !== void 0
            ? _b
            : argv.mode === "production"
              ? "production"
              : "debug"
        ),
      }),
      new HtmlWebpackPlugin({ template: "index.html" }),
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      modules: [
        path.resolve(__dirname, "../src"),
        path.resolve(__dirname, "../node_modules"),
      ],
    },
  };
};
exports.default = webpackConfig;
