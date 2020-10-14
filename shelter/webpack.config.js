const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {

	resolve: {
		fallback: { "path": require.resolve("path-browserify") }
	},

	devServer: {
    port: 3000
  },

	mode: 'development', //or production default

	entry: {
		index: './src/index.js',
		pets: './src/pets.js'
	},


	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		new HtmlWebpackPlugin({ // подключение html
			filename: "index.html",
			template: path.resolve(__dirname, 'src/index.html'),
			chunks: ["index"]
		}),
		new HtmlWebpackPlugin({
			filename: "pets.html",
			template: path.resolve(__dirname, 'src/pets.html'),
			chunks: ["pets"]
		}),

		new CleanWebpackPlugin()

	],

	module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
			},
			{
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader', 'css-loader', 'sass-loader',
        ],
      },
			{
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
						loader: 'file-loader',
						options: {
							name: 'assets/[contenthash].[ext]',
						},
					},
        ],
      },
    ],
  }
}