<template>
  <div class="padding">
    <p class="left">实名通道名</p>
    <p>权重</p>
    <el-form :inline="true" class="demo-form-inline">
      <div class="center">
        <el-form-item>
          <el-select v-model="formInline.id" clearable class="name center">
            <el-option label="亿美" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-button class="prevent" @click="numReduce">-</el-button>
        <input type="text" class="num" v-model='formInline.percentOne'>
        <el-button class="prevent" @click="numAdd">+</el-button>
        <el-button type="primary" class="float " @click="submit(formInline)">提交</el-button>
        <el-progress :text-inside="true" class="center" :stroke-width="20"
                     :percentage="formInline.percentOne"></el-progress>
      </div>
      <div class="center">
        <el-form-item>
          <el-select v-model="form.id" clearable class="name center">
            <el-option label="聚合" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-button class="prevent" @click="numReduceTwo">-</el-button>
        <input type="text" class="num" v-model=form.percent>
        <el-button class="prevent" @click="numAddTwo">+</el-button>
        <el-button type="primary" class="float " @click="submit(form)">提交</el-button>
        <el-progress :text-inside="true" class="center" :stroke-width="20" :percentage="form.percent"></el-progress>
      </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        formInline: {
          id: '1',
          percentOne: 0
        },
        form: {
          id: '2',
          percent: 0
        }
      }
    },
    computed: {
      percentOne () {
        return this.formInline.percentOne
      },
      percent () {
        return this.form.percent
      }
    },
    watch: {
      percentOne (val, old) {
        old = parseInt(old)
        this.formInline.percentOne = watchOptions(val)
        console.log(val, old)
      },
      percent (val, old) {
        old = parseInt(old)
        this.form.percent = watchOptions(val)
      }
    },
    methods: {
      numReduce () {
        if (this.formInline.percentOne >= 10) {
          this.formInline.percentOne -= 10
        }
      },
      numAdd () {
        if (this.formInline.percentOne <= 90) {
          this.formInline.percentOne += 10
        }
      },
      numReduceTwo () {
        if (this.form.percent >= 10) {
          this.form.percent -= 10
        }
      },
      numAddTwo () {
        if (this.form.percent <= 90) {
          this.form.percent += 10
        }
      },
      submit (result) {
        let arr = []
        for (let key in result) {
          arr.push(result[key])
        }
        if (arr[0] === '') {
          alert('请输入身份验证通道名')
          return false
        }
        if (arr[1] >= 100) {
          alert('通道占比不能超过100')
          return false
        }
        this.$ajax.post('serviceConfig/name/nameWay', {'id': arr[0], 'percent': arr[1]})
          .then((res) => {
            console.log(5555)
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
            } else if (res.data.code === 303) {
              this.$message({
                type: 'info',
                message: res.data.msg
              })
            } else {
              this.$message({
                type: 'error',
                message: '提交异常'
              })
            }
          }
          )
          .catch((err) => {
            this.$message({
              type: 'error',
              message: '提交异常' + err
            })
          })
      }
    }
  }
  function watchOptions (val) {
    if (val === '' || parseInt(val) <= 0) {
      val = 0
    } else if (parseInt(val) >= 100) {
      val = 100
    }
    return parseInt(val)
  }
</script>
<style scoped>
  .center {
    height: 60px;
    line-height: 60px;
  }

  .padding {
    padding-top: 100px;
    margin-left: 20%;
    width: 600px;
  }
  .prevent {
    height: 36px;
    padding: 3px 10px;
  }

  .left {
    float: left;
    margin-left: 7px;
    margin-right: 115px;
    width: 100px;
  }

  p {
    font-size: 20px;
    font-weight: 900;
    position: relative;
  }

  .el-progress {
    width: 200px;
    float: right;
  }

  .float {
    float: right;
    margin-top: 13px;
  }

  .el-progress-bar__inner {
    background-color: #13ce66;
  }

  .num {
    width: 50px;
    text-align: center;
    height: 30px;
  }

  button {
    cursor: pointer;
  }

  .name {
    width: 100px;
    height: 20px;
    text-align: center;
    margin-right: 72px;
  }
</style>
