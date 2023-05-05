import path from 'path';
import { getExportData, readDIR } from "./files.js";
import { getHumpStr } from './utils.js';


const handleData = () => {
  const baseObject = {
    en: {},
    zh: {},
  }
  /**
   * 解耦，通过闭包修改数据
   * @param {string} dirPath 文件路径 
   * @param {boolean} isDir 是否是目录
   */
  const handler = async (dirPath, isDir = false) => {
    const isIndex = str => {
      return str.match(/index/)
    }
    // 分割后删除入口文件
    const arr = dirPath.split('.')[0].split(path.sep).splice(1).map(item => {
      return getHumpStr(item)
    })
    // 处理目录
    const handleDir = () => {
      // 处理对象
      const handleObj = (obj, index) => {
        if (!arr[index]) return obj
        const key = arr[index]
        if (isIndex(key)) return handleObj(obj, index + 1)
        obj[key] = obj[key] ? { ...obj[key] } : {}
        return handleObj(obj[key], index + 1)
      }
      for(const key in baseObject) {
        handleObj(baseObject[key], 0)
      }
    }
    
    if (isDir) {
      handleDir()
    } else {
      // 不是index，则需要变成对象
      if (!isIndex(arr[arr.length - 1])) {
        handleDir()
        return
      } 
      const [err, data] = await getExportData(dirPath)
      if (err) return
      const handleSetValue = () => {
        const recursiveObject = (obj, index, type) => {
          if (!arr[index]) {
            for (const key in data.default) {
              obj = data.default[key][type]
            }
            return
          }
          return recursiveObject(obj, index + 1)
        }
        for(const key in baseObject) {
          recursiveObject(baseObject[key], 0, key)
        }
      }
      handleSetValue()
    }
  }

  readDIR('my-data', handler)

  return JSON.parse(JSON.stringify(baseObject))
};

const data = handleData("my-data");
console.log(data, 10086);
