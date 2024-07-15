import * as path from "path";

import * as HtmlWebpackPlugin from "html-webpack-plugin";
import { colorImporter } from "web-ui/util/colorImporter";
import {
  DefinePlugin,
  type Configuration as WebpackConfiguration,
} from "webpack";
import { type Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const webpackConfig = (
  env: {
    api?: string;
    excess_mode?: "debug" | "production";
  },
  argv: { mode: "development" | "production" },
): Configuration => ({
  context: path.resolve(__dirname, "../src"),
  devServer: {
    historyApiFallback: true,
  },
  entry: path.resolve(__dirname, "../src/index.tsx"),
  module: {
    rules: [
      {
        generator: {
          filename: ({ filename }: { filename: string }) =>
            /[\\/]favicon\.ico$/.test(filename) ? "[name][ext]" : "[hash][ext]",
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
            importers: [colorImporter],
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
    new DefinePlugin({
      "process.env.API": JSON.stringify(env.api ?? "/api"),
      "process.env.DUOLINGO_JWT":
        argv.mode === "development"
          ? JSON.stringify(process.env.DUOLINGO_JWT)
          : undefined,
      "process.env.EXCESS_MODE": JSON.stringify(
        env.excess_mode ??
          (argv.mode === "production" ? "production" : "debug"),
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
});

export default webpackConfig;
