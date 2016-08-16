const webpack = require("webpack");
const ROOT = __dirname;
const config = {
  entry: ROOT + "/src/main.js",
  output: {
    path: ROOT + "/",
    filename: "widget.js"
  },
  devtool: "#inline-source-map",
  resolve: {
    root: ROOT + "/src",
    modulesDirectories: ["node_modules", "bower_components"],
    extensions: ["", ".js"]
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /(node_modules|bower_components)/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
          presets: ["es2015", "stage-0", "react"],
          plugins: ["transform-runtime"]
        }
      },
      {
        test: /\.png$/,
        exclude: /(node_modules|bower_components)/,
        loader: "url-loader"
      }
    ]
  },
  eslint: {
    formatter: require("eslint-friendly-formatter"),
    failOnError: true
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  delete config.devtool;
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true
    },
    output: {
      comments: false
    }
  }));
}

module.exports = config;
