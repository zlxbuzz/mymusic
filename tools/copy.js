import fse from 'fs-extra'
import paths from './config/path'
import Promise from 'bluebird'

const ncp = Promise.promisify(require('ncp'))
async function copy({
  target = paths.appBuild,
  source = paths.appCommons,
}) {
  await copyLibs(target)
}

export default copy;


async function ensureLib({src, target}) {
  if (!fse.existsSync(target)) {
    await ncp(src, target)
  } else {
  }
}


const copyLibs = async(dist) => {
  fse.ensureDirSync(paths.resolve(dist, 'assets/js/libs'))
  const libs = getLibs(dist);
  return await Promise.all(libs.map(async lib => ensureLib(lib)))
}

const getLibs = dist => {
  //只处理vue
  // return ['react', 'react-dom', 'jquery', 'vue']
  return ['vue']
    .map(lib => ({
      src   : `node_modules/${lib}/dist/`,
      target: `${dist}/assets/js/libs/${lib}/`,
    }))
}
