// const Constants = require('../../CONSTANTS')
const store = require('data-store')({ path: process.cwd() + '/userData.json' })
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
        message: '📬 User Email',
        initial: store.get('email') || ''
      },
      {
        type: 'text',
        name: 'githubUsername',
        message: '😸 Github username',
        initial: store.get('githubUsername') || ''
      },
      {
        type: 'text',
        name: 'repoName',
        message: '📂 Repository Name'
      },
      {
        type: 'text',
        name: 'projectName',
        message: '💡 Project Name'
      },
      {
        type: 'text',
        name: 'description',
        message: '💬 Project description'
      },
      {
        type: 'text',
        name: 'liveUrl',
        message: '🏠 Project homepage'
      },
      {
        type: 'confirm',
        name: 'isAddLogo',
        message: '🏠 Do u want to add a Logo? '
      },

      {
        type: prev => (prev ? 'text' : null),
        name: 'logoUrl',
        message: '🌀 Enter logo URL (or relative path)',
        initial: ''
      },

      {
        type: 'list',
        name: 'stack',
        message: '🗒️  Add Stack (separated by comma (,)',
        initial: [],
        separator: ','
      },
      {
        type: 'text',
        name: 'startCommand',
        message: '🖥️  Enter start command',
        initial: store.get('startCommand') || ''
      },

      {
        type: 'text',
        name: 'twitterHandle',
        message: '🐦 Twitter username',
        initial: store.get('twitterHandle') || ''
      },
      {
        type: 'text',
        name: 'linkedinUsername',
        message: '💼 Linkedin username',
        initial: store.get('linkedinUsername') || ''
      },
      {
        type: 'text',
        name: 'website',
        message: '🌎 Website',
        initial: store.get('website') || ''
      }
    ]

    const response = await prompts(questions)

    await generate({
      template: 'readme.js.ejs',
      target: `${filesystem.cwd()}/README.md`,
      props: response
    })

    await addLicense()
    await addContribute()

    // Add value of name (questions[0].name) variable for persisting storage here.
    const staticValues = [
      'email',
      'githubUsername',
      'startCommand',
      'twitterHandle',
      'linkedinUsername',
      'website'
    ]

    // Filtering the response object to remove redundancy values for storage
    const resultArr = Object.entries(response)
    let filteredRes = resultArr.filter(([k, v]) => staticValues.includes(k))
    const finalObj = Object.fromEntries(filteredRes)

    store.set(finalObj)

    success(
      '\n Generated README.md, CONTRIBUTING and LICENSE file in the project root directory'
    )
  }
}

module.exports = command
