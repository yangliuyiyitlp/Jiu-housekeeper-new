// 根据后台返回的权限 封装成路由import
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function getRouterImport (menus) {
  for (let key in menus) {
    let upperCaseKey = firstUpperCase(key)
    let importDate = 'import' + upperCaseKey + 'from \'@/pages/' + upperCaseKey + '/' + upperCaseKey + '.vue\''
    return importDate
  }
}

// 根据后台返回的权限 封装成路由path
export function getRouterPath1 (menus) {
  if (menus === undefined) {
    return null
  } else {
    let routers = []
    // 拿到每个一级菜单,类型是数组
    for (let key in menus) {
      let router = {}
      router.path = '/' + key
      router.name = key
      router.component = eval(firstUpperCase(key))
      router.children = []
      let firstMenuArr = menus[key]
      if (firstMenuArr instanceof Array && firstMenuArr.length > 0) {
        // 遍历一级菜单数组
        for (let i = 0; i < firstMenuArr.length; i++) {
          let firstMenu = firstMenuArr[i]
          // 遍历一级菜单的每个属性
          for (let firstMenuKey in firstMenu) {
            if (firstMenuKey === 'name') {
              let childRouter = {}
              // 说明没有children
              childRouter.name = firstMenu[firstMenuKey]
              childRouter.path = '/' + firstMenu[firstMenuKey].replace('.', '/')
              childRouter.component = eval(firstUpperCase(dotConvert2Camel(firstMenu[firstMenuKey])))
              router.children.push(childRouter)
              continue
            } else if (firstMenuKey === 'children') {
              let secMenuArr = firstMenu.children
              // 二级菜单数组
              if (secMenuArr instanceof Array && secMenuArr.length > 0) {
                for (let j = 0; j < secMenuArr.length; j++) {
                  let secMenu = secMenuArr[j]
                  if (secMenu.name !== undefined && secMenu.name !== '') {
                    let childRouter = {}
                    childRouter.name = secMenu.name
                    childRouter.path = '/' + secMenu.name.replace('.', '/')
                    childRouter.component = eval(firstUpperCase(dotConvert2Camel(secMenu.name)))
                    router.children.push(childRouter)
                    continue
                  }
                }
              }
            }
          }
        }
      } else {
        // 一级目录对应的不是数组的情况
      }
      routers.push(router)
    }
    console.log(JSON.stringify(routers))
    // let router1 = new Router({
    //   routes: routers
    // })
    // console.log(JSON.stringify(router1))
    return null
  }
}

// 首字母大写方法
function firstUpperCase (s) {
  if (s === undefined) {
    return ''
  }
  return s.replace(/^\S/, function (s) { return s.toUpperCase() })
}

//
// {
//   path: '/user',
//     name: 'User',
//   component: User,
//   children: [
//   {name: 'user.info', path: '/user/info', component: UserInfo},
//   {name: 'user.pwd', path: '/user/pwd', component: UserPwd}
// ]
// }

function dotConvert2Camel (s) {
  if (s === undefined) {
    return ''
  } else {
    let result = ''
    s = s.split('.')
    let length = s.length
    for (let i = 0; i < length; i++) {
      result = result + firstUpperCase(s[i])
    }
    return result
  }
}
