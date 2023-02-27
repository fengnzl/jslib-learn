import { readFileSync } from 'fs'
const fileUrl = new URL('../package.json', import.meta.url)
const pkg = JSON.parse(await readFileSync(fileUrl, 'utf8'))

export const banner = `/*!
* ${pkg.name} ${pkg.version}
* Licensed under MIT
*/
`
