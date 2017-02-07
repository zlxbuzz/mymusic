import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpack from 'webpack'
import paths from './path'
import * as config from './webpack.common.config'
import WatchMissingNodeModulesPlugin from './WatchMissingNodeModulesPlugin'

export default function getConfig({name, html = {}, px2rem = {}, framework = 'jquery', isCDN = 'no', vue = {}}) {

  // px2rem
  const px2remConfig = {
    remUnit     : 75,
    remPrecision: 8,
    keepComment:'!no',
    ...px2rem
  };

  return {
    ...{
      dirName      : name,
      devtool      : "#cheap-module-source-map",
      resolveLoader: {
        //所有loader 所需要依赖的包
        // modulesDirectories: [paths.ownNodeModules],
        moduleTemplates   : ['*-loader', '*']
      },
    },
    output   : {
      path      : paths.appDevBuild,
      filename  : `assets/js/${name}/[name].js`,
      publicPath: '/',
      //publicPath: paths.resolve('/fe', pack['namespace'], pack['name']),
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
      new webpack.optimize.CommonsChunkPlugin(`assets/js/common.js`),
      vue.router ? undefined : new ExtractTextPlugin(`assets/css/${name}/[name].css`, {
      }),
      new webpack.HotModuleReplacementPlugin(),
      new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    ].filter(p => !!p)
  }

};
