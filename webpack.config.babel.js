import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SaveFilePlugin from 'webpack-save-file-plugin';
import HtmlWebpackPugPlugin from 'html-webpack-pug-plugin';
import WebappWebpackPlugin from 'webapp-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
// eslint-disable-next-line no-unused-vars
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const { NODE_ENV } = process.env;
const __PROD__ = NODE_ENV === 'production';
const __STAGE__ = NODE_ENV === 'stage';
const __DEV__ = NODE_ENV === 'development';
let __LOCAL__ = false;

if (!__PROD__ && !__STAGE__ && !__DEV__) {
  __LOCAL__ = true;
}

export default () => {
  const config = {
    mode: __PROD__ || __STAGE__ ? 'production' : 'development',
    devtool: __LOCAL__ ? 'inline-source-map' : '',
    entry: {},
    watch: __LOCAL__,
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: `http://localhost:4000/`,
    },
    module: {
      strictThisContextOnImports: true,
      rules: [
        {
          use: [{ loader: 'babel-loader' }],
          test: /\.jsx?$/iu,
          exclude: /node_modules/iu,
        },
        {
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                hash: 'sha512',
                digest: 'hex',
                name: '[name]-[hash].[ext]',
              },
            },
          ],
          test: /\.(png|gif|jpe?g|webp|woff2?|ttf|eot|otf|mp4|webm|wav|mp3|m4a|aac|3gp|og[av])(\?.*)?$/iu,
          exclude: /node_modules/iu,
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        __PROD__,
        __STAGE__,
        __DEV__,
        __LOCAL__,
      }),
    ],
  };

  config.target = 'web';
  config.entry.main = './private/app/entry.js';
  config.output = {
    ...config.output,
    crossOriginLoading: 'use-credentials',
    path: path.resolve(process.cwd(), './public/app/'),
  };
  config.optimization = {
    ...config.optimization,
    runtimeChunk: true,
  };
  config.plugins = [
    ...config.plugins,
    new HtmlWebpackPlugin({
      filename: '../views/index.pug',
      template: './private/server/templates/index.pug',
      filetype: 'pug',
      chunksSortMode: 'none',
      inject: true,
      cache: true,
      xhtml: true,
      prefetch: ['**/*.*'],
      preload: ['**/*.*'],
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: false,
        html5: true,
        ignoreCustomComments: [],
        // eslint-disable-next-line require-unicode-regexp
        ignoreCustomFragments: [/<%=?.*?%>/i],
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new WebappWebpackPlugin({
      logo: './private/app/assets/favicon.png',
      prefix: 'favicons/',
      inject: true,
      cache: true,
      favicons: {
        /* eslint-disable camelcase */
        appName: 'ReignDesign - Test',
        appDescription: 'ReignDesign - Test',
        background: 'transparent',
        theme_color: 'transparent',
        orientation: 'portrait',
        start_url: '/',
        /* eslint-enable camelcase */
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          favicons: true,
          firefox: true,
          twitter: true,
        },
      },
    }),
    new ScriptExtHtmlWebpackPlugin({ defaultAttribute: 'defer' }),
    new HtmlWebpackPugPlugin(),
    // new BundleAnalyzerPlugin(),
  ];
  if (__LOCAL__) {
    config.entry = [
      `webpack-dev-server/client?${config.output.publicPath}`,
      config.entry.main,
    ];
    config.plugins = [
      ...config.plugins,
      new SaveFilePlugin({
        debugAssets: false,
        output: './private/server/views/',
        files: [{ asset: /.pug/iu }],
      }),
      new webpack.HotModuleReplacementPlugin(),
    ];
    config.devServer = {
      port: 4000,
      host: '0.0.0.0',
      hot: true,
      noInfo: false,
      compress: true,
      disableHostCheck: true,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': '*',
      },
      contentBase: path.join(__dirname, 'public/app'),
    };
  }

  return config;
};
