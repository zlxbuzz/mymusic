import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpack from 'webpack'
import paths from './path'
import * as config from './webpack.common.config'
import { getPack } from './package'

export default function getConfig({name, html = {}, px2rem = {}, framework = 'jquery', isCDN = 'no'}) {

  const pack = getPack()
  // const localPublicPath = paths.resolve('/fe', pack['namespace'], pack['name'])

  // px2rem
  const px2remConfig = {
    remUnit     : 75,
    remPrecision: 8,
    //less下无法转义px
    keepComment:'!no',
    ...px2rem
  }

  // const config = require(paths.appRoot + '/package.json');

  return {
    ...{
      dirName      : name,
      devtool      : "#cheap-module-source-map",
      resolveLoader: {
        modulesDirectories: paths.isInFfanScripts ? [paths.ownNodeModules] : [paths.appNodeModules],
        moduleTemplates   : ['*-loader', '*']
      },
    },
    output   : {
      path      : paths.appBuild,
      filename  : `assets/js/${name}/[name]_[chunkhash:4].js`,
      // publicPath: (isCDN === 'yes') ? (config && config.proConfig && config.proConfig['cdn-url'] ? config.proConfig['cdn-url'] : '') : localPublicPath,
      publicPath: "/",
    },
    resolve  : config.resolve,
    externals: config.externals,
    module   : {
      noParse: config.noParse,
      loaders: config.getLoaders(px2remConfig, paths.appSrc, name),
    },
    ...config.getModule(px2remConfig),
    plugins  : [
      new HtmlWebpackPlugin({
        filename: `html/${name}.html`,
        ...html,
        isCDN   : isCDN === 'yes',
        template: html.template || paths.resolve(paths.appHtmlTemplates, `${framework}Tpl.hbs`),
      }),
      new ExtractTextPlugin(`assets/css/${name}/[name]_[contenthash:4].css`),
      new webpack.optimize.OccurenceOrderPlugin(true),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
          warnings : false,
        },
      }),
    ]
  }
}
