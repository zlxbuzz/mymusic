import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'
import  paths from './path'


export const externals = {
  jquery     : 'jQuery',
  react      : 'React',
  'react-dom': 'ReactDOM',
  vue        : 'Vue',
}

export const noParse = [
  'jquery',
  'react',
  'react-dom',
  'vue',
]

export const resolve = {
  extensions: ['', '.html', '.js', '.json', '.less', '.css'],
  alias     : {
    "normalize.css": paths.resolve(paths.appCommons, 'libs', 'normalize.css'),
    "base.less"    : paths.resolve(paths.appCommons, 'css', 'base.less'),
  }
}

export function getLoaders(px2remConfig, includePath, name) {
  return [
    {
      test   : /\.(vue)$/,
      include: includePath,
      loader : "vue",
      query  : {
        presets       : [require('./babel-presets')],
        cacheDirectory: true,
      }
    },
    {
      test   : /\.(js|jsx)$/,
      include: includePath,
      loader : "babel",
      query  : {
        presets       : [require('./babel-presets')],
        cacheDirectory: true,
      }
    },
    {
      test  : /\.(png|jpg|gif|jpeg)$/,
      loader: "url",
      query : {
        name : `assets/img/${name}/${name}_[hash:8].[ext]`,
        limit: 8192
      }
    },
    {
      test  : /\.(handlebars|hbs)$/,
      loader: "handlebars",
      query : {
        inlineRequires: '\/images\/'
      }
    },
    {
      test  : /\.(html)$/,
      loader: "html"
    },
    {
      test  : /\.(ttf|eot|svg)$/,
      loader: "url?limit=100000"
    },
    {
      test  : /\.less$/,
      loader: ExtractTextPlugin.extract("style", ["css", "postcss", "less"])
    },
    {
      test  : /\.css$/,
      loader: ExtractTextPlugin.extract("style", ["css", "postcss"])
    }
  ]

}

export function getModule(px2remConfig) {
  return {
    vue: {
      loaders: {
        css : ExtractTextPlugin.extract("vue-style", ["css", "postcss"]),
        less: ExtractTextPlugin.extract("vue-style", ["css", "postcss", "less"]),
        js: `babel?presets[]=${require.resolve('babel-preset-latest')}&plugins[]=${require.resolve('babel-plugin-transform-runtime')}&comments=false'`
      },
      postcss: function () {
        return [
            require('postcss-bem')({
                  'shortcuts': {
                    'component': 'b',
                    'modifier': 'm',
                    'descendent': 'e'
                  },
            }),
            require('autoprefixer'),
            require('postcss-px2rem')(px2remConfig)
          ];
      },
    },
  }
}

