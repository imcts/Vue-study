import path from 'path'

export default {
  target: 'web',
  entry: './src/App.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@css': path.resolve(__dirname, 'static/css')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0'],
            plugins: ['transform-runtime']
          }
        }
      }, {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '/'),
    compress: true,
    port: 3000,
    proxy: {
      '*': {
        bypass: function (req, res, proxyOptions) {
          const url = req.url
          if (!/.css|.js/.test(url)) {
            return '/'
          }
        }
      }
    }
  }
}
