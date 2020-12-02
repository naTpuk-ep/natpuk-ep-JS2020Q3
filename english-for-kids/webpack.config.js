const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

	devServer: {
		port: 4000,
		open: {
			app: [
				'chrome', '--user-data-dir=c:/user_data_dirs/webpack-dev-server-window',
				'--disable-extensions-except=c:/Users/patrick/AppData/Local/Google/Chrome/User Data/Default/Extensions/eimadpbcbfnmbkopoojfekhnkhdbieeh/4.9.25_0,c:/Users/patrick/AppData/Local/Google/Chrome/User Data/Default/Extensions/dkaagdgjmgdmbnecmcefdhjekcoceebi/2.0.3.2_0,c:/Users/patrick/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.10.0_0',
				'--window-size=710,735', '--window-position=670,0', '--auto-open-devtools-for-tabs', /*'--content-shell-hide-toolbar','--hide-scrollbars',*/  '--new-window'
			],
		},
  },

	mode: 'development',

	entry: {
		index: './src/index.js'
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},

	plugins: [
		new HtmlWebpackPlugin({
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
        test: /\.(png|jpe?g|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					name: 'assets/img/[name].[ext]',
				},
			},
			{
        test: /\.(ico)$/i,
				loader: 'file-loader',
				options: {
					name: 'assets/[name].[ext]',
				},
			},
			{
        test: /\.(mp3|ico)$/i,
				loader: 'file-loader',
				options: {
					name: 'assets/audio/[name].[ext]',
				},
      }
    ],
  }
}