const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
    fallback: {
      "path": false,
      "crypto": false,
      "stream": false,
      "fs": false,
    },
    extensions: ['.js', '.wasm']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.wasm$/,
        type: 'webassembly/async',
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    })
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
    allowedHosts: 'all', // Ensure all hosts are allowed if needed
  },

  devtool: 'source-map',

  mode: 'development',

  experiments: {
    asyncWebAssembly: true,
    // syncWebAssembly: false // Disable synchronous WebAssembly loading if not needed
  },
};

