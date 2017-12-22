<template>
  <div class="padding">
    <p class="left">短信通道名</p>
    <p>权重</p>
    <el-form :inline="true" class="demo-form-inline">
      <div class="center">
        <el-form-item>
          <el-select v-model="formInline.id" clearable class="name center" disabled>
            <el-option label="大汉三通" value="1"></el-option>
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
          <el-select v-model="form.id" clearable class="name center" disabled>
            <el-option label="云企讯" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-button class="prevent" @click="numReduceTwo">-</el-button>
        <input type="text" class="num" v-model=form.percent>
        <el-button class="prevent" @click="numAddTwo">+</el-button>
        <el-button type="primary" class="float " @click="submit(form)">提交</el-button>
        <el-progress :text-inside="true" class="center" :stroke-width="20" :percentage="form.percent"></el-progress>
      </div>
      <div class="center">
        <el-form-item>
          <el-select v-model="formData.id" clearable class="name center" disabled>
            <el-option label="阿里云" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-button class="prevent" @click="numReduceThree">-</el-button>
        <input type="text" class="num" v-model=formData.percentTwo>
        <el-button class="prevent" @click="numAddThree">+</el-button>
        <el-button type="primary" class="float " @click="submit(formData)">提交</el-button>
        <el-progress :text-inside="true" class="center" :stroke-width="20"
                     :percentage="formData.percentTwo"></el-progress>
      </div>
      <div class="center">
        <el-form-item>
          <el-select v-model="ruleForm.type" clearable placeholder="请求次数" class="name center">
            <el-option v-for="(val,key) in opFlag" v-bind:key=key :label=opFlag[key] :value=key></el-option>
          </el-select>
        </el-form-item>
        <el-button class="prevent" @click="countReduce">-</el-button>
        <input type="text" class="num" v-model=ruleForm.count>
        <el-button class="prevent" @click="countAdd">+</el-button>
        <el-button type="primary" class='sub ' @click="sub">提交</el-button>

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
        },
        formData: {
          id: '3',
          percentTwo: 0
        },
        opFlag: {'d': '一天', 'h': '一小时', 'm': '2分钟'},
        ruleForm: {
          type: '',
          count: 0
        }
      }
    },
    computed: {
      percentOne () {
        return this.formInline.percentOne
      },
      percent () {
        return this.form.percent
      },
      percentTwo () {
        return this.formData.percentTwo
      },
      count () {
        return this.ruleForm.count
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
      },
      percentTwo (val, old) {
        old = parseInt(old)
        this.formData.percentTwo = watchOptions(val)
      },
      count (val, old) {
        old = parseInt(old)
        this.ruleForm.count = watchValue(val)
      }
    },
    created () {
      this.beforeList()
    },
    methods: {
      beforeList () {
        this.$ajax.get('serviceConfig/msg/querySmsPercent')
          .then((res) => {
            if (res.data.code === 200) {
              this.formInline.percentOne = res.data.data[1]
              this.formInline.percent = res.data.data[2]
              this.formInline.percentTwo = res.data.data[3]
//              for (let key in res.data.data){
//              }
            } else {
              this.$message({
                type: 'info',
                message: '获取权重比失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取权重比异常'
            })
          })
      },
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
      numReduceThree () {
        if (this.formData.percentTwo >= 10) {
          this.formData.percentTwo -= 10
        }
      },
      numAddThree () {
        if (this.formData.percentTwo <= 90) {
          this.formData.percentTwo += 10
        }
      },
      submit (result) {
        let arr = []
        for (let key in result) {
          arr.push(result[key])
        }
        if (arr[0] === '') {
          alert('请输入短信通道名')
          return false
        }
        if (arr[1] >= 100) {
          alert('通道占比不能超过100')
          return false
        }
        this.$ajax.post('serviceConfig/msg/message', {'id': arr[0], 'percent': arr[1]})
          .then((res) => {
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
      },
      countReduce () {
        if (this.ruleForm.count >= 10) {
          this.ruleForm.count -= 10
        }
      },
      countAdd () {
        this.ruleForm.count += 10
      },
      sub () {
        if (this.ruleForm.type === '') {
          alert('请选择请求类型')
          return false
        } else {
          this.$ajax.get('serviceConfig/msg/type', {params: this.ruleForm})
            .then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.data.msg
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '修改失败'
                })
              }
            })
            .catch((err) => {
              this.$message({
                type: 'error',
                message: '提交异常' + err
              })
            })
        }
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

  function watchValue (val) {
    if (val === '' || parseInt(val) <= 0) {
      val = 0
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

  .sub {
    background-color: hotpink;
    border-color: hotpink;
  }

  i {
    background-color: #ff4949;
    height: 15px;
    line-height: 15px;
    border-radius: 50%;
    color: #fff;
    display: inline-block;
    font-size: 8px;
    font-weight: 400;
    top: 8px;
    position: absolute;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    text-align: center;
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
