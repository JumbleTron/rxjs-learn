const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

// Znajdujemy wszystkie katalogi lekcji
const lessonsDirectories = fs.readdirSync('./src/lessons').filter(
  file => fs.statSync(path.join('./src/lessons', file)).isDirectory()
);

module.exports = {
  entry: {
    main: './src/index.ts',
    ...Object.fromEntries(
      lessonsDirectories.map(lessonDir => [
        `lesson${lessonDir}`,
        `./src/lessons/${lessonDir}/index.ts`
      ])
    )
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main'],
      filename: 'index.html'
    }),
    ...lessonsDirectories.map(lessonDir => 
      new HtmlWebpackPlugin({
        template: `./src/lessons/${lessonDir}/index.html`,
        chunks: [`lesson${lessonDir}`],
        filename: `lessons/${lessonDir}/index.html`
      })
    )
  ]
}; 