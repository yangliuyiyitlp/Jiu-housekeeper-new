// 利用mixin直接混合到每个页面。利用mixin之前请确保你的方法是唯一的
// const hasPermission = {
//  //eslint-disable-next-line
//   install (Vue, options) {
//     Vue.mixin({
//       methods: {
//         hasPermission (data) {
//           let permissionList = this.$route.meta.permission
//           if (permissionList && permissionList.length && permissionList.includes(data)) {
//             return true
//           }
//           return false
//         }
//       }
//     })
//   }
// }

// export default hasPermission

function hasPermission (data) {
  let permissionList = this.$route.meta.permission
  if (permissionList && permissionList.length && permissionList.includes(data)) {
    return true
  }
  return false
}
export default hasPermission
