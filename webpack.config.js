var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


/*
 * Podstawowa konfiguracja webpacka do współpracy z REACT/REDUX oraz ES6
 */

module.exports = {
    // punkt wejściowy aplikacji - na podstawie importów z tego pliku będą budowane dalsze zależności
    entry: './src/main.jsx',

     // plik wynikowy - do niego zostaną dołączone wszystkie wymagane pliki z projektu oraz biblioteki
    output: { path: __dirname, filename: './scripts/bundle.js' },

     // dodatkowe moduły dla webpacka
    module: {
        rules: [
            {
                // loader dla plików z rozszerzeniem .jsx - babel z presetami es2015/react
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                // loader dla plików z rozszerzeniem .jsx - babel z presetami es2015/react
                test: /.json$/,
                loader: 'json-loader'
            },
            {
                // loader dla plików scss
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
		  	fallbackLoader: 'style-loader',
		  	loader: ['css-loader', 'sass-loader']
		})
            },
            {
                // loader dla plików statycznych
                test: /\.(ttf|woff|woff2|eot|jpg|png)$/,
                loader: 'url-loader?limit=30000&name=content/[name]-[hash].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
		filename: './css/bundle.css',
		allChunks: true
	}),
        new webpack.DefinePlugin({
           'process.env': {
               NODE_ENV: JSON.stringify('developement')
           }
       })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    externals: {
        'config': 'config'
    }
}
