const prompts = require('prompts')
const Constants = require('../../CONSTANTS')

module.exports = toolbox => {
  toolbox.addLicense = async () => {
    const {
      template: { generate },
      print: { success },
      filesystem
    } = toolbox

    const response = await prompts({
      type: 'text',
      name: 'fullName',
      message: '👨‍💻 Full Name',
      initial: Constants.fullName
    })

    await generate({
      template: 'license.js.ejs',
      target: `${filesystem.cwd()}/LICENSE`,
      props: response
    })

  }
}
