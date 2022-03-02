const HtmlWebPackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin           = require('copy-webpack-plugin');
 

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser       = require('terser-webpack-plugin');
// usaamos el paquete isntalado
module.exports = {
        mode: 'production',
     output:{
         clean:true,
         //main.[contenthash].js hashea el archivo js
         filename:'main.[contenthash].js'
     },
    module: {
        rules: [{
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources:false,
                    minimize: false,
                }
                // estp busca un archivo html y con el plugin de abajo lo metemos al dist
 
            },
            {
                // css se aplique a todos los archivos de css
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                  },
            }
        ],
 
    },
    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizer(),
            new Terser(),
        ]
    },
    plugins: [
        // aqui van plugins 
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            // filename: '[name].[fullhash].css',
            // esto para desarrollo el fullhash ya cuando se haga a producción
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' },
                // { from: "other", to: "public" },
            ],
        }),
    ]
}
