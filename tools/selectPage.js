import inquirer from 'inquirer';
import fse from 'fs-extra'
import paths from './config/path'

export function getPages() {
  return fse.readdirSync(paths.appSrc)
}

async function selectPage() {

  let pages = getPages();
  pages.reverse().push(new inquirer.Separator())
  pages = pages.filter(function (v) {
    return v !== '_commons'
  })

  return new Promise(resolve=> {
    inquirer.prompt(
      [{
        type     : 'checkbox',
        name     : 'pages',
        message  : 'What\'s pages will you choose? [CTRL-C to Exit]',
        paginated: true,
        choices  : pages,
        validate: function (answer) {
          if (answer.length <1) {
            return 'You must choose at least one source directory.';
          }
          return true;
        }
      },
        {
          type   : 'list',
          name   : 'isCDN',
          message: 'Will you upload static files to CDN? [CTRL-C to Exit]',
          choices: ['no', 'yes']
        }]
    ).then(function (answer) {
      resolve(answer)
    })
  })
}


export default selectPage
