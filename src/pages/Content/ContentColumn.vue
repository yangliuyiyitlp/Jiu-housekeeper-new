<template>
  <div>

    <h1>不用写</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    created () {
      this.query()
    },
    methods: {
      // 请求数据
      query () {
        this.$ajax.get('cms/category/interface/list')
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>

</style>
