import path from 'path'
import fs from 'fs'

var appDirectory = fs.realpathSync(process.cwd())

function resolveOwn(relativePath) {
  return path.resolve(__dirname, relativePath)
}

function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath)
}

export default {
  appSrc          :     resolveApp('src'),
  appCommons      :     resolveApp('commons'),
  appRoot         :     resolveApp(''),
  appDevBuild     :     resolveApp('dist/debug'),
  appBuild        :     resolveApp('dist/release'),
  ownNodeModules  :     resolveOwn('../node_modules'),
  appNodeModules  :     resolveApp('node_modules'),
  appHtmlTemplates:     resolveApp('commons/htmlTemplates'),
  resolve         :     path.resolve
}
