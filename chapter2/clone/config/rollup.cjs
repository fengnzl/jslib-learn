const pkg = require('../package.json')
const banner = `/*!
* ${pkg.name} ${pkg.version}
* Licensed under MIT
*/
`
module.exports = {
  banner,
}
