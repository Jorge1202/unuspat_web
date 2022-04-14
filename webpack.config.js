const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    // ... Configuración de empaquetado
    entry: './src/index.js',
    performance: {
        hints:false,
        maxAssetSize: 30000000, // tipo entero (en bytes)
        maxEntrypointSize: 50000000, // tipo entero (en bytes)
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js') || assetFilename.endsWith('.mp4');
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx'],
        alias:{
            '@img': path.resolve(__dirname, 'src/assets/media/'),
        }
    },
    module: {
        // ... Lista de reglas respecto a los loaders	
        rules: [
            {
                test: /\.js$|jsx/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|mp4)$/i, 
                loader: 'file-loader',
                options: {
                  name: 'public/assets/img/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        //... Configuración de plugins
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3005,
        historyApiFallback: true,
    }
}