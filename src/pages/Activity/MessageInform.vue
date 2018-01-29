<template>
  <el-row>
    <el-col :span="12">
      <el-form :rules="rules" :model="form" label-width="120px">

        <h1 style="margin-bottom: 40px;margin-top: 20px">当前消息状态:{{status}}</h1>

        <el-form-item label="推送id:" v-if="false">
          <el-input v-model="form.id" style="width: 360px"></el-input>
        </el-form-item>

        <el-form-item label="推送应用:">
          <el-select v-model="form.pushApplication" placeholder="请选择推送消息的应用" @change="changePushApp">
            <el-option
              v-for="(item,index) in appRelation"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="任务描述:" prop="taskDescription">
          <el-input v-model="form.taskDescription" placeholder="推送消息的原因"
                    @change="changeTaskDescription"
                    :disabled='isDisabled'
                    style="width: 360px">
          </el-input>
        </el-form-item>

        <el-form-item label="任务标题:" prop="promptTitle">
          <el-input v-model="form.promptTitle" placeholder="推送消息的标题,app展示见右图"
                    @change="changePromptTitle"
                    :disabled='isDisabled'
                    style="width: 360px">
          </el-input>
        </el-form-item>

        <el-form-item label="内容:" prop="promptContent">
          <el-input v-model="form.promptContent" autosize
                    placeholder="推送消息的内容,app展示见右图" type="textarea"
                    @change="changePromptContent"
                    :disabled='isDisabled'
                    class='textarea'>
          </el-input>
        </el-form-item>

        <el-form-item label="推送城市:">
          <el-select v-model="form.cityId" placeholder="推送城市添加" multiple
                     :disabled='isDisabledCity'
                     style="width: 360px">
            <el-option
              v-for="(item,index) in areaRelation"
              :key="index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            v-show="releaseBtn && hasPermission('activity/message/inform/edit')"
            type="success" @click="releaseMsg" class="btn1">发布
          </el-button>
          <el-button
            v-show="saveBtn && hasPermission('activity/message/inform/edit')" type="primary" @click="saveMsg"
            class="btn">保存
          </el-button>
          <el-button
            v-show="stopBtn && hasPermission('activity/message/inform/edit')" type="danger" @click="stopMsg" class="btn">停用
          </el-button>
        </el-form-item>

      </el-form>
    </el-col>
    <el-col :span="12">
      <div id="img">
        <img src="../../assets/images/pushmsg.png" alt="">
        <div class="title">{{form.promptTitle}}</div>
        <div>{{form.promptContent}}</div>
      </div>
    </el-col>
  </el-row>


</template>

<script>
  import baseUrl from '../../utils/baseUrl'
  import Tools from '../../../static/js/tools.js'
  import a from '../../assets/js/getsessionId.js'

  export default {
    name: 'message-inform',
    data () {
      return {
        rules: {
          taskDescription: [
            {required: true, message: '请写入推送消息原因', trigger: 'blur'}
          ],
          promptTitle: [
            {required: true, message: '请写入推送标题', trigger: 'blur'},
            {max: 6, message: '长度不大于 6 个字符', trigger: 'blur'}
          ],
          promptContent: [
            {required: true, message: '请写入推送内容', trigger: 'blur'}
            // {max: 40, message: '长度不大于 40 个字符', trigger: 'blur'}
          ]
        }, // 正则校验规则
        status: '请新建信息', // 信息初始化状态
        isDisabled: true, // 是否禁止输入
        isDisabledCity: true, // 是否禁止选择推送城市
        form: {
          pushApplication: '1', // 推送的应用,默认选择赳赳单车'1'
          taskDescription: '', // 消息提示描述
          promptTitle: '', // 消息标题
          promptContent: '', // 消息内容
          cityId: ['-1'],
          cityNo: '-1',
          delFlagName: '',
          delFlag: '' // 当前消息的状态
        }, // 推送计划详情
        areaRelation: {}, // 城市对应关系
        appRelation: {
          1: '赳赳单车',
          2: '赳猎人',
          3: '赳管家',
          4: '赳赳开锁',
        },
        delFlagRelation: {
          0: '发布中',
          1: '待发布',
          2: '停用中'
        },
        releaseBtn: false, // 发布按钮显示问题
        saveBtn: false, // 保存按钮显示问题
        stopBtn: false, // 停用按钮显示问题
        adminId: '',
        path: '',
        permissionList: []
      }
    },
    created () {
      // 请求按钮权限
      this.adminId = this.$route.query.adminId
      this.path = this.$route.path
      a.sessionId(this.adminId, this.path, this.$router, this.$ajax, this.permissionList)
      this.getCityRelation()
      this.setResponseHead()
    },
    methods: {
      // 获取城市对应关系
      getCityRelation () {
        this.$ajax.get(`${baseUrl.ActivityArea}/electric/userUtilsInterface/interface/getBikeAreaList`)
          .then(res => {
            if (res.data.code === 0) {
              let bikeAreaList = res.data.bikeAreaList
              bikeAreaList.unshift({id: '-1', name: '全国'})
              let relation = Tools.nameRelation(bikeAreaList, 'id', 'name')
              this.areaRelation = relation
            }
          })
          .then(() => {
            this.searchMsg()
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 根据应用查询详情
      searchMsg () {
        this.$ajax.get(`${baseUrl.MessageInform}/get`, {params: {pushApplication: this.form.pushApplication}})
          .then(res => {
            if (res.data.code === 200) {
              let form = res.data.data
              if (form) {
                if (form.delFlag) {
                  this.releaseBtn = (+form.delFlag === 1) ? true : false
                  this.saveBtn = (+form.delFlag !== 0 && +form.delFlag !== 1) ? true : false
                  this.stopBtn = (+form.delFlag === 0) ? true : false
                }
                this.status = Tools.k2value(this.delFlagRelation, form.delFlag)
                this.isDisabled = (+form.delFlag === 0) ? true : false
                this.isDisabledCity = (+form.delFlag === 0 || +form.delFlag === 1) ? true : false
                form.cityId = []
                if (form.cityNo) {
                  form.cityId = form.cityNo.split(',')
                }
                this.form = form
                console.log(this.form)
              } else {
                // 若数据库中无信息,新建内容
                this.status = '请新建信息' // 信息初始化状态
                this.form = {
                  pushApplication: this.form.pushApplication,
                  taskDescription: '', // 消息提示描述
                  promptTitle: '', // 消息标题
                  promptContent: '', // 消息内容
                  cityId: ['-1'],
                  cityNo: '-1'
                }
                this.releaseBtn = false
                this.saveBtn = true
                this.stopBtn = false
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 保存
      saveMsg () {
        this.$confirm('此操作将保存发布信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送请求
          this.form.delFlag = '1'
          // 推送城市的转换
          if (this.form.cityId) {
            this.form.cityNo = this.form.cityId.join(',')
            // 如果包含全国,只传-1即可
            if (this.form.cityNo.indexOf('-1') !== -1) {
              this.form.cityNo = '-1'
            }
          } else {
            this.form.cityNo = '-1'
          }
          console.log(this.form)
          this.$ajax.post(`${baseUrl.MessageInform}/save`, this.form)
            .then(res => {
              console.log(res)
              this.searchMsg()
            })
            .catch(err => {
              console.log(err)
            })
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          })
        })
      },
      // 发布
      releaseMsg () {
        this.$confirm('此操作将发布任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送请求
          console.log('releaseMsg')
          this.form.delFlag = '0'
          this.$ajax.post(`${baseUrl.MessageInform}/save`, this.form)
            .then(res => {
              console.log(res)
              this.searchMsg()
            })
            .catch(err => {
              console.log(err)
            })
          this.$message({
            type: 'success',
            message: '发布成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })
        })
      },
      // 停用
      stopMsg () {
        this.$confirm('此操作将停用发布, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送请求
          console.log('stopMsg')
          this.form.delFlag = '2'
          this.$ajax.post(`${baseUrl.MessageInform}/save`, this.form)
            .then(res => {
              console.log('stopMsg')
              console.log(res)
              this.searchMsg()
            })
            .catch(err => {
              console.log(err)
            })
          this.$message({
            type: 'success',
            message: '停用发布成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消停用'
          })
        })
      },
      // 选择不同的推送应用进行查询
      changePushApp (val) {
        this.searchMsg(val)
      },
      // 观察任务描述变化
      changeTaskDescription () {
        if (+this.form.delFlag === 1) {
          this.releaseBtn = false
          this.saveBtn = true
          this.isDisabledCity = false
        }
      },
      // 观察标题变化
      changePromptTitle () {
        if (+this.form.delFlag === 1) {
          this.releaseBtn = false
          this.saveBtn = true
          this.isDisabledCity = false
        }
      },
      // 观察内容变化
      changePromptContent () {
        if (+this.form.delFlag === 1) {
          this.releaseBtn = false
          this.saveBtn = true
          this.isDisabledCity = false
        }
      },
      // 将userId放入响应头
      setResponseHead () {
        let arr = location.href.split('?')[1].split('&')
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].indexOf('adminId') !== -1) {
            this.$ajax.defaults.headers.userId = arr[i].split('=')[1]
            document.cookie = `username=${arr[i].split('=')[1]}; path=/`
          }
        }
      },
      hasPermission (data) {
        if (this.permissionList && this.permissionList.length && this.permissionList.includes(data)) {
          return true
        }
        return false
      },
    },
    watch: {
      // form: function (val, old) {
      //   this.$nextTick(() => {
      //     console.log((val, old))
      //   })
      // }
    }
  }
</script>

<style scoped>
  h1 {
    display: inline-block;
    /*margin-bottom: 60px;*/
  }

  .btn {
    margin-top: 50px;
    height: 70px;
    width: 150px;
    font-size: 40px;
  }

  .btn1 {
    height: 70px;
    width: 150px;
    font-size: 40px;
  }

  span {
    margin-left: 20px;
    color: red;
  }

  .textarea, .second .el-input__inner {
    width: 338px;
  }

  #img {
    width: 375px;
    position: relative;
  }

  #img img {
    width: 100%;
    display: block;
  }

  #img div {
    position: absolute;
    width: 60%;
    height: 8%;
    top: 54%;
    left: 20%;
    font-size: 14px;
    color: #4f4d4d;
    overflow-y: auto;
  }

  #img > .title {
    position: absolute;
    width: 60%;
    height: 5%;
    top: 48%;
    left: 20%;
    font-size: 22px;
    background-color: #fff;
    text-align: center;
    font-weight: 700;
  }
</style>
