// 将时间戳转换成日期格式
export function convertDate2String (convert) {
  let date = new Date(convert)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' : '') + date.getDate() + ' '
  let h = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':'
  let m = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ':'
  let s = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
  return Y + M + D + h + m + s
}
