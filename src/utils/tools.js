let tools = {
  // 将数组中所需要的两个值相互对应 如:{id:name,id:name...}
  nameRelation: (arr, id, name) => {
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
      obj[arr[i][id]] = arr[i][name]
    }
    return obj
  },
  // 在一一对应的值中 通过k或值找到所需要的值
  k2value: (obj, query) => {
    for (let k in obj) {
      // 通过k查询值
      if (query === k) {
        return obj[k]
        // 通过值查询k
      } else if (query === obj[k]) {
        return k
      }
    }
  }
}
export default tools
