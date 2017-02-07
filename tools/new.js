import paths from './config/path'
import fse from 'fs-extra'

async function newPage(argv) {
 try {
   const pageName = process.argv[3];
   if (!pageName) {
     return console.log('You must enter pageName like '.cyan, '[ npm run new 161001_main ]'.yellow)
   }

   const pageDir = paths.resolve(paths.appSrc, pageName)

   if (fse.existsSync(pageDir)) {
     return console.log(`-- ${pageDir} is exist! --`.cyan)
   }


   fse.ensureDirSync(pageDir)
   //固定为vue
   fse.copySync(paths.resolve(paths.appCommons, 'boilerplate', 'vue', 'default'), pageDir)

   console.log("\n-------------")
   console.log('-- Done! Please start page as follow command:\n')
   console.log(`npm run start ${pageName}`)
   console.log("-------------\n")
 } catch (e) {
   console.log(`-- new page error --`)
   console.log(e)
 }

}

export default newPage
