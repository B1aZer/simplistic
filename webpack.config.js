var path = require("path");
module.exports = {
     entry: './app/app.js',
     devtool: 'source-map',
     output: {
         path: path.resolve(__dirname, "build"),
         publicPath: '/build/',
         filename: 'app.bundle.js',
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
         }]
     }
 };
