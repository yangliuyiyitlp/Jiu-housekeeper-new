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

// 获取当前时间，格式YYYY-MM-DD
export function CurentTime () {
  let date = new Date()
  let seperator1 = '-'
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  let currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
}

// 获取当前时间 时分秒
export function getNowFormatDate () {
  let now = new Date()

  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let day = now.getDate()

  let hh = now.getHours()
  let mm = now.getMinutes()
  let ss = now.getSeconds()

  let clock = year + '-'

  if (month < 10) {
    clock += '0'
  }
  clock += month + '-'
  if (day < 10) {
    clock += '0'
  }
  clock += day + ' '

  if (hh < 10) {
    clock += '0'
  }
  clock += hh + ':'
  if (mm < 10) {
    clock += '0'
  }
  clock += mm + ':'

  if (ss < 10) {
    clock += '0'
  }
  clock += ss
  return clock
}
