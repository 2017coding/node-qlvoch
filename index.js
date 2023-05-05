import path from 'path';
import { inspect } from 'util';
import { getExportData, getFiles, getJsonFs, readDIR } from "./files.js";
import { getHumpStr } from './utils.js';

const handleData = (root) => {
  const baseArr = []

  const isIndex = str => {
    return str?.match('index')
  }

  // 超简单之定义一个数据结构就好了呀...
  const handler = async (dirPath, isDir) => {
    const arr = dirPath.split('.')[0].split(path.sep).map(item => {
      return getHumpStr(item)
    })

    // 如果目录是多层index会影响树状结构
    const findFid = (arr, index) => {
      if (isIndex(arr[arr.length - index])) {
        return findFid(arr, index + 1)
      }
      return arr[arr.length - index]
    }

    const item = {
      id: arr[arr.length - 1],
      pid: findFid(arr, 2),
      isDir,
      data: {}
    }

    if (!isDir) {
      // 1. 通过动态import 但是获取到的是异步的
      // const [err, res] = await getExportData(dirPath)
      // if (err) return
      // 2. 通过node api
      const readFs = () => {
        const str = getFiles(dirPath).replace(/export\s+default|;\s+$/g, '')
        return getJsonFs(str)
      }
      const res = readFs()
      const key = Object.keys(res)[0]
      const data = res[key]
      item.data = {
        key: key,
        zh: data.zh,
        en: data.en
      }
    }
    baseArr.push(item)
  }

  // 读取文件的过程中收集文件依赖关系
  readDIR(root, handler)

  const handleArr = () => {
    const ZH = 'zh'
    const EN = 'en'
    const zhObj = {}
    const enObj = {}

    // 生成对象
    const generateObj = (obj, item, type) => {
      if (item.isDir) {
        if (isIndex(item.id)) return
        obj[item.id] = { ...obj[item.id] }
      } else {
        if (isIndex(item.id)) {
          obj[item.data.key] = item.data[type]
        } else {
          obj[item.id] = {
            [item.data.key]: item.data[type]
          }
        }
      }
    }

    baseArr.forEach(item => {
      if (item.pid === getHumpStr(root)) {
        generateObj(zhObj, item, ZH)
        generateObj(enObj, item, EN)
      }
    })
    
    // 递归对象
    const traversalObj = (obj, type) => {
      if (typeof obj !== 'object') return
      Object.keys(obj).forEach(key => {
        baseArr.forEach(childItem => {
          if (childItem.pid === key) {
            generateObj(obj[key], childItem, type)
          }
        })
        traversalObj(obj[key], type)
      })
    }

    traversalObj(zhObj, ZH)
    traversalObj(enObj, EN)

    return {
      zh: zhObj,
      en: enObj
    }
  }

  return handleArr()
}

const data = handleData("my-data");


console.log(inspect(data, { depth: null }));



