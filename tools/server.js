import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import getip from './lib/ip.js'
import paths from './config/path'
import { getEntry } from './lib/validEntry'
import getConfig from './config/webpack.hot.config'

import portfinder from 'portfinder'


async function getWatchConfig(config) {
  const entries = await getEntry(config.name)
  return {...{entry: entries}, ...getConfig(config)}
}


async function server(options) {

  portfinder.getPort( async (err,port)=>{
    if(err){
      return;
    }
    let config = await getWatchConfig(options)
    let myIp = getip()

    const sourceDir = config.dirName

    for (var key in config.entry) {
      config.entry[key].unshift(
        require.resolve("webpack-dev-server/client") + `?http://${myIp}:${port}/`,
        require.resolve("webpack/hot/dev-server"))
    }

      webpack(Object.assign({watch:true}, config),function(err,stats){
          if (err) {
            return console.log(err)
          }
          console.log(stats.toString({
            colors      : true,
            children    : false,
            // https://github.com/webpack/webpack/issues/1191#issuecomment-180922894
            hash        : false,
            version     : false,
            timings     : false,
            assets      : false,
            chunks      : false,
            modules     : false,
            reasons     : false,
            source      : false,
            errors      : true,
            errorDetails: false,
            warnings    : false,
            publicPath  : false
          }))
        })
      let compiler = webpack(Object.assign({}, config));
    var server = new WebpackDevServer(compiler, {
      contentBase   : paths.appDevBuild,
      clientLogLevel: 'none',
      quiet         : false,
      hot           : true,
      noInfo        : false,
      proxy         : {
        '/v1/*'        : {
          target      : "http://tingapi.ting.baidu.com/", //special proxy domain example
          changeOrigin: true,
          secure      : false
        },
      }
    }).listen(port, '0.0.0.0', function (err) {
      if (err) console.log(err)

      console.log("\n-------------\n")
      console.log(`http://${myIp}:${port}/html/${sourceDir}.html`)
    })
  });
}

export default server
