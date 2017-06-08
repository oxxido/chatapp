
var webpack = require('webpack'),
path = require('path'),
ExtractTextPlugin = require('extract-text-webpack-plugin'),
HtmlWebpackPlugin = require('html-webpack-plugin')
CopyWebpackPlugin = require('copy-webpack-plugin');

const productionMode = (process.env.NODE_ENV==='production');

module.exports = {
    entry: {
        app: './src/app/app.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                }),
            },
            {
                test: /\.html$/,
                //loader: "html",
                loader: `ngtemplate-loader?requireAngular&relativeTo=${path.resolve(__dirname, './src')}/!html-loader`,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
                loader: 'file',
            }
            //{ test: /[\/]angular\.js$/, loader: "exports?angular" }
        ]
    },
    devtool: "#inline-source-map",
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('styles.css'),
        new webpack.LoaderOptionsPlugin({
          minimize: productionMode,
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.ejs'
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'src/images/'),
                to: 'images/',
            },
            {
                from: path.join(__dirname, 'src/fonts/'),
                to: 'fonts/',
            },
        ]),
    ]
};
