const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	plugins: [
		new CleanWebpackPlugin(["dist", "artifact"], {
			verbose: true
		})
	],
	module: {
		rules: [
			{
				test: /\.es6$/,
				exclude: [/node_modules/],
				use: [{
					loader: "babel-loader",
					options: { presets: ["es2015"] }
				}]
			}
		]
	},
	context: path.resolve(__dirname, "./src"),
	entry: {
		index: "./index.es6"
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "[name].js",
		libraryTarget: "umd"
	},
	target: "node",
	externals: [nodeExternals()],
	stats: {
		colors: true,
		modules: false,
		reasons: false
	}
};
