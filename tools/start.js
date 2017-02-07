import run from './run'
import paths from './config/path'
import fse from 'fs-extra'
import { getPageConfig } from './lib/validEntry'
import copy from './copy'
import server from './server'

export default async function start() {
  try {
    const pageName = process.argv[3];


    if (!pageName) {
      return console.error('-- pageName is empty! --')
    }

    const pageDir = paths.resolve(paths.appSrc, pageName)
    if (!fse.existsSync(pageDir)) {
      return console.log(`-- ${pageDir} is not exist! --`)
    }

    const config = await getPageConfig(pageName)
    //将目录复制到dist下面的debug
    await run(copy, {target: paths.appDevBuild})
    //启动服务器，可以是nginx或者node
    await run(server, config)
  } catch (e) {
    console.log(e)
  }
}
