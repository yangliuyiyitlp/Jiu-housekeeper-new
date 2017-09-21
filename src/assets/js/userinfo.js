
// 表单验证
export function checkReg (element, reg) {
    // 获取内容
  var content = element.value
  if (reg.test(content)) {
    element.nextElementSibling.innerHTML = '格式正确'
    element.nextElementSibling.style.color = 'green'
  } else {
    element.nextElementSibling.innerHTML = '格式不正确'
    element.nextElementSibling.style.color = 'red'
  }
}
