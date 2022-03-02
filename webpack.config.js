const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
 
// usaamos el paquete isntalado
module.exports = {
    mode: 'development',
    // mode: 'production',
     output:{
         clean:true,
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
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ],
 
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
            filename: '[name].css',
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
