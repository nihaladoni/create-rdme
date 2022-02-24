module.exports = toolbox => {
  toolbox.addContribute = async () => {
    const {
      template: { generate },
      filesystem
    } = toolbox

    await generate({
      template: 'contribute.js.ejs',
      target: `${filesystem.cwd()}/CONTRIBUTING.md`
    })
  }
}
