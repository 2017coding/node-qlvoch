/**
 * 得到首字母大写的字符串
 * @param {string} str 要处理的字符串
 * @returns str
 */
export function getStrFirstToUpperCase (str) {
  if (!str) return
  if (str.length === 1) return str.toUpperCase()
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 得到驼峰字符串
 * @param {string} str 要处理的字符串
 * @param {string} separator 分隔符
 * @param {boolean} firstUpperCase 首字母是否大写
 * @returns str
 */
export function getHumpStr (str, separator = '-', firstUpperCase = false) {
  if (!str) return
  let res 
  try {
    const arr = str.split(separator)
    const nArr = arr.map((item, index) => {
      if (!firstUpperCase && index === 0) return item
      return getStrFirstToUpperCase(item)
    })
    res = nArr.join('')
  } catch (e) {
    console.err('getHumpStr', e)
  }

  return res
}
