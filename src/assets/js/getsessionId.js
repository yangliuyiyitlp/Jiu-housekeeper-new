import Cookie from 'js-cookie'
import baseUrl from '../../utils/baseUrl'

// export default {
//   sessionId (adminId, path, router, ajax, permissionList) {
//     if (adminId && path) {
//       let url = window.location.origin + '/' + window.location.hash
//       if (url.indexOf('?') !== -1) {
//         url = url.split('?')[0]
//       }
//       Cookie.remove('adminId')
//       Cookie.set('adminId', adminId)
//       Cookie.set('path', path)
//       let data = {'path': url}
//       console.log(22, url)
//       ajax.get(`${baseUrl.loginUrl}/sys/test`, {params: data, timeout: 3000})
//         .then(res => {
//           if (res.data.code === 200) {
//             console.log(33, res.data.data)
//             for (let i = 0; i < res.data.data.length; i++) {
//               if (res.data.data[i].permission !== '' && res.data.data[i].permission !== undefined) {
//                 permissionList.push(res.data.data[i].permission)
//                 console.log(permissionList)
//               }
//             }
//             router.push({path: path})
//           } else {
//             alert('页面跳转失败')
//           }
//         })
//         .catch(() => {
//           alert('页面跳转异常')
//         })
//     } else {
//       router.push('/404')
//     }
//   }
// }
export default {
  sessionId (adminId, path, router, ajax, permissionList) {
    if (adminId && path) {
      let url = window.location.origin + '/' + window.location.hash
      if (url.indexOf('?') !== -1) {
        url = url.split('?')[0]
      }
      Cookie.remove('adminId')
      Cookie.set('adminId', adminId)
      Cookie.set('path', path)
      let data = {'href': url}
      console.log(22, url)
      ajax.post(`${baseUrl.loginUrl}`, data)
        .then(res => {
          if (res.data.code === 0) {
            console.log(33, res.data.data)
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].permission !== '' && res.data.data[i].permission !== undefined) {
                permissionList.push(res.data.data[i].permission)
                console.log(permissionList)
              }
            }
            router.push({path: path})
          } else {
            alert('页面跳转失败')
          }
        })
        .catch(() => {
          alert('页面跳转异常')
        })
    } else {
      router.push('/404')
    }
  }
}
