const prompts = require('prompts')
// const Constants = require('../../CONSTANTS')

module.exports = toolbox => {
  toolbox.addLicense = async () => {
    const {
      template: { generate },
      filesystem
    } = toolbox

    await generate({
      template: 'license.js.ejs',
      target: `${filesystem.cwd()}/LICENSE`
    })
  }
}
