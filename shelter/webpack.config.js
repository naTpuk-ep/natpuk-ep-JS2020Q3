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
		main: './src/index.js'
	},


	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		new HtmlWebpackPlugin({ // подключение html
			template: path.resolve(__dirname, 'src/index.html')
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