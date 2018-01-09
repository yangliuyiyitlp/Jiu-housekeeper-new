import Cookie from 'js-cookie'
import baseUrl from '../../utils/baseUrl'

// export default {
//   sessionId (username, password, path, router, ajax) {
//     if (!Cookie.get('username') || !Cookie.get('sessionId')) {
//       console.log(999)
//       if (username && password) {
//         let data = {'username': username, 'password': password}
//         console.log(`${baseUrl.loginUrl}/api/login`)
//         console.log(data)
//         ajax.post(`${baseUrl.loginUrl}/api/login`, JSON.stringify(data))
//           .then(res => {
//             console.log(res)
//             if (res.data.status === 200 && res.data.sessionId !== '' && res.data.sessionId !== undefined) {
//               Cookie.remove('sessionId')
//               Cookie.set('username', username)
//               Cookie.set('sessionId', res.data.sessionId)
//               router.push({path: path})
//             } else {
//               alert('页面跳转失败')
//             }
//           })
//           .catch(() => {
//             alert('页面跳转异常')
//           })
//       } else {
//         router.push('/404')
//       }
//     } else if (Cookie.get('username') && Cookie.get('sessionId')) {
//       router.push({path: path})
//     }
//   }
// }
export default {
  sessionId (adminId, path, router, ajax, permissionList) {
    if (adminId && path) {
      Cookie.remove('adminId')
      Cookie.set('adminId', adminId)
      Cookie.set('path', path)
      let url = window.location.origin + window.location.pathname
      console.log(url)
      let data = {'path': url}
      ajax.get(`${baseUrl.loginUrl}/sys/test`, {params: data})
        .then(res => {
          console.log(res)
          if (res.data.code === 200) {
            console.log(33, res.data.data)
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].permission !== '' && res.data.data[i].permission !== undefined) {
                permissionList.push(res.data.data[i].permission)
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
