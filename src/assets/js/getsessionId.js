import Cookie from 'js-cookie'
import baseUrl from '../../utils/baseUrl'

export default {
  sessionId (username, password, path, router, ajax) {
    if (!Cookie.get('username') || !Cookie.get('sessionId')) {
      console.log(999)
      if (username && password) {
        let data = {'username': username, 'password': password}
        console.log(`${baseUrl.loginUrl}/api/login`)
        console.log(data)
        ajax.post(`${baseUrl.loginUrl}/api/login`, JSON.stringify(data))
          .then(res => {
            console.log(res)
            if (res.data.status === 200 && res.data.sessionId !== '' && res.data.sessionId !== undefined) {
              Cookie.remove('sessionId')
              Cookie.set('username', username)
              Cookie.set('sessionId', res.data.sessionId)
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
    } else if (Cookie.get('username') && Cookie.get('sessionId')) {
      router.push({path: path})
    }
  }
}
