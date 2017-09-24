// 弹层组件
Vue.component('model', {
props: ['list', 'isactive'],
template: `<div class="overlay" v-show="isactive">
  <div class="con">
    <h2 class="title">新增 | 修改</h2>
    <div class="content">
      /* 省略 */
    </div>
  </div>
</div>`,
computed: {
modifylist() {
return this.list;
}
},
methods: {
changeActive() {
this.$emit('change'); // 关闭弹层，修改isactive值
},
modify() {
this.$emit('modify', this.modifylist); // 将修改后的数据传递给父组件
}
}
})
