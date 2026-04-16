import { access, copyFile, cp, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'

const distDir = path.resolve('dist')
const siteDir = path.resolve('_site')
const distIndex = path.join(distDir, 'index.html')
const siteIndex = path.join(siteDir, 'index.html')
const site404 = path.join(siteDir, '404.html')
const cnameSource = path.resolve('CNAME')
const cnameTarget = path.join(siteDir, 'CNAME')

async function exists(filePath) {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

if (!(await exists(distIndex))) {
  throw new Error('dist/index.html introuvable. Exécute `npm run build` avant `npm run prepare:pages`.')
}

await rm(siteDir, { recursive: true, force: true })
await mkdir(siteDir, { recursive: true })
await cp(distDir, siteDir, { recursive: true })

if (await exists(cnameSource)) {
  await copyFile(cnameSource, cnameTarget)
} else {
  console.warn('CNAME introuvable à la racine, copie ignorée.')
}

await copyFile(siteIndex, site404)
