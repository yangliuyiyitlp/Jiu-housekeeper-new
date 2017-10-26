let arr2tree = {
  getTree: (data, root, idTxt, pidTxt, pushTxt) => {
    idTxt = idTxt || 'id'
    pidTxt = pidTxt || 'parentId'
    pushTxt = pushTxt || 'children'
    // 递归方法
    function getNode (id) {
      let node = []
      for (let i = 0; i < data.length; i++) {
        if (data[i][pidTxt] === id) {
          data[i][pushTxt] = getNode(data[i][idTxt])
          node.push(data[i])
        }
      }
      if (node.length === 0) {
        return
      } else {
        return node
      }
    }

    // 使用根节点
    return getNode(root)
  }
}
export default arr2tree
