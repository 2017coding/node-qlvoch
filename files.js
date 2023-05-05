import fs from 'fs'
import path from 'path'
import to from './to.js'
const __dirname = path.resolve()

/**
 * 读取目录结构
 * @param {string} dir 入口文件
 * @param {function} cb 回调函数
 */
export function readDIR (dir, cb) {
  const dirInfo = fs.readdirSync(dir)
  dirInfo.forEach(item => {
    const dirPath = path.join(dir, item)
    const dirChildInfo = fs.statSync(dirPath)
    // 当前目录是文件夹
    if (dirChildInfo.isDirectory()) {
      cb(dirPath, true)
      readDIR(dirPath, cb)
    } else {
      cb(dirPath)
    }
  })
}

/**
 * 动态获取esmodule
 * @returns object
 */
export function getExportData (url) {
  return to(import(path.join(__dirname, url)))
}

/**
 * 获取文件内容
 * @param {string} url 文件路径 
 * @returns 
 */
export function getFiles (url, json = false) {
  const str = fs.readFileSync(url, 'utf-8')
  if (!json) return str
}

/**
 * 文件内容转换为json
 */
export function getJsonFs (str) {
  let res = str
  try {
    res = JSON.parse(str)
  } catch (e) {
    res = (new Function("return " + str))()
  }

  return res
}