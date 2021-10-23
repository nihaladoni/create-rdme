const Constants = require('../../CONSTANTS')
const prompts = require('prompts')

const command = {
  name: 'create-rdme',
  alias: 'create',
  run: async toolbox => {
    const {
      template: { generate },
      print: { success },
      filesystem,
      addLicense,
      addContribute
    } = toolbox

    const questions = [
      {
        type: 'text',
        name: 'email',
        message: '👨‍💻 User Email',
        initial: Constants.email
      },
      {
        type: 'text',
        name: 'username',
        message: '👨‍💻 Github username',
        initial: Constants.username
      },
      {
        type: 'text',
        name: 'repoName',
        message: '💻 Repository Name'
      },
      {
        type: 'text',
        name: 'projectName',
        message: '💡 Project Name'
      },
      {
        type: 'text',
        name: 'description',
        message: '📔 Project description'
      },
      {
        type: 'text',
        name: 'liveUrl',
        message: '🏠 Project homepage'
      },
      {
        type: 'confirm',
        name: 'isLogoUrl',
        message: '🎞️ do u have logo Url?',
        initial: false
      },

      {
        type: 'list',
        name: 'stack',
        message: '🧑‍💻  Add Stack (separated by comma (,)',
        initial: [],
        separator: ','
      },
      {
        type: 'text',
        name: 'startCommand',
        message: '🖥️ Enter start command',
        initial: Constants.startCommand
      },

      {
        type: 'text',
        name: 'twitterHandle',
        message: '🐦 Twitter username',
        initial: Constants.twitterHandle
      },
      {
        type: 'text',
        name: 'linkedinUsername',
        message: '🤵 Linkedin username',
        initial: Constants.linkedinUsername
      },
      {
        type: 'text',
        name: 'website',
        message: '🌎 Website',
        initial: Constants.mySite
      }
    ]

    const res = await prompts(questions)

    await generate({
      template: 'readme.js.ejs',
      target: `${filesystem.cwd()}/README.md`,
      props: res
    })

    await addLicense()
    await addContribute()
    success('\n Generated README.md, CONTRIBUTING and LICENSE file in the project root directory')
  }
}

module.exports = command
