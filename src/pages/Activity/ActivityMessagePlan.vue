<template>
  <div class="right">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <!--消息推送计划列表-->
      <el-tab-pane label="消息推送计划列表" name="first" class="padding">

        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="任务描述:">
            <el-input v-model="formInline.description" placeholder="选择推送状态" clearable style="width: 200px"></el-input>
          </el-form-item>

          <el-form-item label="推送状态:">
            <el-select v-model="formInline.pushState" placeholder="选择推送状态" clearable style="width: 130px">
              <el-option
                v-for="(item,index) in pushStateRelation"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
          </el-form-item>

          <!--<el-form-item label="推送城市:">-->
          <!--<el-select v-model="formInline.area.id" placeholder="选择城市" clearable style="width: 130px">-->
          <!--<el-option-->
          <!--v-for="(item,index) in areaRelation"-->
          <!--:key="index"-->
          <!--:label="item"-->
          <!--:value="index">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->

          <el-form-item label="推送日期:">

            <el-date-picker
              style="width: 180px"
              v-model="formInline.beginPushTime"
              type="datetime"
              placeholder="推送开始时间">
            </el-date-picker>
            -
            <el-date-picker
              style="width: 180px"
              v-model="formInline.endPushTime"
              type="datetime"
              placeholder="推送结束时间">
            </el-date-picker>

          </el-form-item>

          <el-form-item v-if="hasPermission('activity/message/plan/view')">
            <el-button type="primary" @click="showForm">查询</el-button>
          </el-form-item>

          <!--<el-form-item>-->
          <!--<el-button type="primary" @click="">导出</el-button>-->
          <!--</el-form-item>-->
        </el-form>

        <!--表格-->
        <el-table
          :data="list"
          empty-text="无匹配任务"
          style="width: 100%"
          border
          stripe>

          <el-table-column
            v-if="false"
            header-align="center"
            align="center"
            prop="id"
            label="ID">
          </el-table-column>

          <el-table-column
            header-align="center"
            prop="pushTitle"
            label="标题"
            width="160">
          </el-table-column>

          <el-table-column
            header-align="center"
            prop="description"
            label="描述"
            width="180">
          </el-table-column>


          <el-table-column
            show-overflow-tooltip
            header-align="center"
            prop="appPushContent"
            label="推送内容"
            width="230">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="area.name"
            label="推送城市"
            width="95">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            prop="activitiesInfo.description"
            label="跳转活动"
            width="200">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            prop="jumpUrl"
            label="外部链接"
            width="200">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="resultDisplayed"
            label="收到"
            width="90">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="resultClicked"
            label="打开"
            width="90">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="resultFeedback"
            label="忽略"
            width="90">
          </el-table-column>

          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            prop="pushTime"
            label="推送时间"
            width="148">
          </el-table-column>

          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            prop="pushName"
            label="推送状态"
            width="95">
          </el-table-column>

          <el-table-column
            fixed="right"
            header-align="center"
            label="操作"
            width="161">
            <template slot-scope="scope" v-if="hasPermission('activity/message/plan/edit')">
              <el-button type="text" size="small" @click="modifyData(scope.row.id,scope.row.area.id)">修改</el-button>
              <el-button type="text" size="small" @click="open2(scope.row.id)">移除</el-button>
              <el-button type="text" size="small" @click="releaseData(scope.row.id)"
                         v-show="+scope.row.pushState===4 ? true: false">任务开始
              </el-button>
              <el-button type="text" size="small" @click="cancelRelease(scope.row.id)"
                         v-show="+scope.row.pushState===0 ? true: false">任务取消
              </el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.pageNum"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>

      </el-tab-pane>

      <!--消息推送计划添加-->
      <el-tab-pane :label="form.id ? '消息推送计划修改' : '消息推送计划添加'" name="second" class="second">

        <el-form ref="form" :rules="rules" :model="form" label-width="120px">

          <el-form-item label="id:" v-if=false>
            <el-input v-model="form.id"></el-input>
          </el-form-item>

          <div class="one">
            <h1>基础内容</h1>

            <el-form-item label="任务描述:" prop="description">
              <el-input v-model="form.description" placeholder="输入任务描述"
                        style="width: 360px"></el-input>
            </el-form-item>

            <el-form-item label="标题:" prop="pushTitle">
              <el-input v-model="form.pushTitle" placeholder="推送内容的标题 例:赳赳单车" style="width:360px"></el-input>
            </el-form-item>

            <el-form-item label="内容:" prop="appPushContent">
              <!--<el-input v-model="form.appPushContent" type="textarea" class='textarea' style="width:430px;height:110px"></el-input>-->
              <el-input v-model="form.appPushContent" type="textarea" class='textarea'></el-input>
            </el-form-item>
          </div>

          <div class="two">
            <h1>目标人群</h1>

            <el-form-item label="推送时间:" prop="pushTime">
              <el-date-picker
                style="width:215px"
                v-model="form.pushTime"
                format="yyyy-MM-dd HH:mm"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="目标人群:" prop="pushTarget">
              <el-radio-group v-model="form.pushTarget">
                <el-radio label=0>全部用户</el-radio>
                <el-radio label=1>部分用户</el-radio>
              </el-radio-group>

              <div v-show="+form.pushTarget===1 ? true:false">

                <el-form-item label="平台:">
                  <el-checkbox-group v-model="form.osList">
                    <el-checkbox label="0" key="0">Android</el-checkbox>
                    <el-checkbox label="1" key="1">iOS</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item label="推送城市:">
                  <!--添加城市可多选-->
                  <el-select v-model="form.cityIds" placeholder="推送城市添加" multiple v-show="!form.id">
                    <el-option
                      v-for="(item,index) in areaRelation"
                      :key="index"
                      :label="item"
                      :value="index">
                    </el-option>
                  </el-select>

                  <!--修改城市时为单选-->
                  <el-select v-model="form.areaId" placeholder="推送城市修改" v-show="form.id">
                    <el-option
                      v-for="(item,index) in areaRelation"
                      :key="index"
                      :label="item"
                      :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>

              </div>

            </el-form-item>

          </div>

          <div class="three">
            <h1>后续行为</h1>

            <el-form-item label="后续动作:" prop="pushIntent">
              <el-radio-group v-model="form.pushIntent">
                <el-radio v-for="(item,index) in pushIntentRelation" :key="index" :label="index">{{item}}</el-radio>
              </el-radio-group>

              <div>
                <el-form-item label="URL:" v-show="(+form.pushIntent===1) ? true:false">
                  <el-input v-model="form.jumpUrl" style="width:460px" placeholder="请填写以http或https开头的地址"></el-input>
                </el-form-item>

                <el-form-item label="跳转至:" v-show="(+form.pushIntent===2) ? true:false">
                  <el-select v-model="form.activitiesInfoId" style="width:360px" placeholder="请选择" clearable>
                    <el-option
                      v-for="(item,index) in activtyRelation"
                      :key="index"
                      :label="item"
                      :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>

            </el-form-item>

          </div>

          <el-form-item>
            <el-button type="primary" @click="resetForm">清空</el-button>
            <el-button type="primary" @click="saveData">保存</el-button>
            <el-button @click="goBack">返回</el-button>
          </el-form-item>

        </el-form>

      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  import Moment from 'moment'
  import Tools from '../../utils/tools.js'
  import baseUrl from '../../utils/baseUrl'
  import qs from 'qs'
  import a from '../../assets/js/getsessionId.js'

  export default {
    data () {
      // 推送时间范围判断
      let pushTimeRule = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择推送时间!'))
          return
        }
        let nowDate = +new Date()
        if (+value < nowDate) {
          callback(new Error('推送时间必须大于当前时间!'))
        } else {
          callback()
        }
      }
      return {
        rules: {
          description: [
            {required: true, message: '请写入推送消息原因', trigger: 'blur'}
            // {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          pushTitle: [
            {required: true, message: '推送内容的标题 例:赳赳单车', trigger: 'blur'},
            {max: 20, message: '长度不大于 20 个字符', trigger: 'blur'}
          ],
          appPushContent: [
            {required: true, message: '请写入推送内容', trigger: 'blur'},
            {max: 100, message: '长度不大于 100 个字符', trigger: 'blur'}
          ],
          pushTime: [
            {required: true, validator: pushTimeRule, trigger: 'blur'}
          ],
          pushTarget: [
            {required: true, message: '请选择推送目标人群', trigger: 'change'}
          ],
          pushIntent: [
            {required: true, message: '请选择推送后续行为', trigger: 'change'}
          ]
        }, // 正则校验规则
        activeName: 'first',
        pushStateRelation: {
          0: '待发送',
          1: '发送中',
          2: '发送结束',
          3: '发送失败',
          4: '未开始',
          5: '结果更新中'
        }, // 0 等待推送 1 推送中 2 推送结束 3 取消推送 4 草稿 5 结果更新中 4的是任务开始,4变为0; 0>3 任务取消;
        areaRelation: {}, // 城市对应关系
        formInline: {
          pushState: '',
          pageNo: '1',
          pageSize: '30',
          area: {
            id: ''
          }
        }, // 查询字符
        form: {
          pushTitle: '赳赳单车',
          cityIds: [], // 推送城市 添加时为多选
          pushTarget: '',
          osList: [],
          activitiesInfoId: '',
          areaId: ''
        }, // 推送计划详情
        list: [], // 获取列表
        activtyRelation: {}, // 生效活动列表
        pagination: {pageSizes: [10, 30, 50, 80, 100], pageSize: 30, total: 0, pageNum: 1},
        pushIntentRelation: {
          0: '打开应用',
          1: '外部链接',
          2: '打开活动、广告、优惠券'
        }, // 后续动作 0： 打开应用 1：外部链接 2：打开活动、广告、优惠券
        adminId: '',
        path: '',
        permissionList: []
      }
    },
    created: function () {
      // 请求按钮权限
      this.adminId = this.$route.query.adminId
      this.path = this.$route.path
      a.sessionId(this.adminId, this.path, this.$router, this.$ajax, this.permissionList)
      this.getCityRelation()
      this.getActivtyList()
    },
    methods: {
      // 获取城市对应关系
      getCityRelation () {
        this.$ajax.get(`${baseUrl.ActivityArea}/electric/userUtilsInterface/interface/getBikeAreaList`)
          .then(res => {
            if (res.data.code === 0) {
              res.data.bikeAreaList.unshift({id: '-1', name: '全国'})
              this.areaRelation = Tools.nameRelation(res.data.bikeAreaList, 'id', 'name')
            }
          })
          .then(() => {
            // 获取城市后 获取列表
            this.showForm()
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 获取生效活动列表
      getActivtyList () {
        this.$ajax.get(`${baseUrl.ActivityArea}/electric/activityUtil/interface/getActivtyList`)
          .then(res => {
            if (res.data.code === 0) {
              // console.log(res.data.list)
              let arr = res.data.list
              this.activtyRelation = Tools.nameRelation(arr, 'id', 'description')
              this.activtyRelations = Tools.nameRelation(arr, 'id', 'description')
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 获取列表
      showForm () {
        // this.formInline.beginUpdateDate ? this.formInline.beginUpdateDate = Moment(this.formInline.beginUpdateDate).format('YYYY-MM-DD HH:mm:ss') : delete this.formInline.beginUpdateDate
        // this.formInline.endUpdateDate ? this.formInline.endUpdateDate = Moment(this.formInline.endUpdateDate).format('YYYY-MM-DD HH:mm:ss') : delete this.formInline.endUpdateDate
        this.formInline.beginPushTime ? this.formInline.beginPushTime = Moment(this.formInline.beginPushTime).format('YYYY-MM-DD HH:mm:ss') : delete this.formInline.beginPushTime
        this.formInline.endPushTime ? this.formInline.endPushTime = Moment(this.formInline.endPushTime).format('YYYY-MM-DD HH:mm:ss') : delete this.formInline.endPushTime
        // console.log(this.formInline)
        this.$ajax.get(`${baseUrl.ActivityMsgPlan}/tpushplan/tPushPlan/list`, {params: this.formInline})
          .then(res => {
            if (res.data.code === 0) {
              this.pagination.total = res.data.page.total
              this.list = res.data.page.result
              // 推荐位
              for (let i = 0; i < this.list.length; i++) {
                this.list[i].pushName = Tools.k2value(this.pushStateRelation, this.list[i].pushState)
                // 没有推送城市 默认为全国
                if (!this.list[i].area || +this.list[i].area.id === -1) {
                  this.list[i].area = {}
                  this.list[i].area.name = '全国'
                  this.list[i].area.id = '-1'
                }
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 修改详情
      modifyData (id, areaId) {
        this.resetForm()
        this.activeName = 'second'
        this.$ajax.get(`${baseUrl.ActivityMsgPlan}/tpushplan/tPushPlan/form`, {params: {id: id}})
          .then(res => {
            if (res.data.code === 0) {
              // this.form = res.data.tPushPlan
              let forms = res.data.tPushPlan
              // console.log(this.form)
              // 判断是否有活动信息
              if (forms.activitiesInfo) {
                forms.activitiesInfoId = forms.activitiesInfo.id
                // 判断当前有效活动中是否包含此活动,若没有,添加
                for (let k in this.activtyRelation) {
                  if (forms.activitiesInfoId !== k) {
                    this.activtyRelation[forms.activitiesInfoId] = forms.activitiesInfo.description
                  }
                }
              } else {
                forms.activitiesInfoId = ''
              }
              // 推送城市
              forms.areaId = areaId
              // os是否存在
              forms.osList = forms.os ? forms.os.split(',') : []
              // 修改时多选框隐藏,且为空
              forms.cityIds = []
              this.form = forms
              console.log(this.form)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 发布消息 状态置换
      releaseData (id) {
        this.$confirm('此操作将发布任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送请求
          this.$ajax.post(`${baseUrl.ActivityMsgPlan}/tpushplan/tPushPlan/save`, {id: id, pushState: '0'})
            .then(res => {
              console.log(res)
              this.showForm()
            })
            .catch(err => {
              console.error(err)
            })
          this.$message({
            type: 'success',
            message: '发布任务成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })
        })
      },
      // 取消发布消息 状态置换
      cancelRelease (id) {
        this.$confirm('此操作将取消任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送请求
          this.$ajax.post(`${baseUrl.ActivityMsgPlan}/tpushplan/tPushPlan/save`, {id: id, pushState: '3'})
            .then(res => {
              console.log(res)
              this.showForm()
            })
            .catch(err => {
              console.error(err)
            })
          this.$message({
            type: 'success',
            message: '任务取消成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      // 保存添加的推送计划
      saveData () {
        this.$refs['form'].validate((valid) => {
            if (valid) {
              // 格式化提交的时间
              console.log('格式化提交的时间')
              this.form.pushTime = Moment(this.form.pushTime).format('YYYY-MM-DD HH:mm')
              // 全国用户和部分用户互斥
              console.log('互斥不能同时提交后续动作')
              // 互斥不能同时提交后续动作
              if (+this.form.pushIntent === 0) {
                this.form.jumpUrl = ''
                this.form.activitiesInfoId = ''
              } else if (+this.form.pushIntent === 1) {
                this.form.activitiesInfoId = ''
              } else if (+this.form.pushIntent === 2) {
                this.form.jumpUrl = ''
              }
              console.log('判断是否添加活动信息')
              // 判断是否添加活动信息
              if (this.form.activitiesInfoId) {
                this.form.activitiesInfo = {}
                this.form.activitiesInfo.id = this.form.activitiesInfoId
              } else {
                this.form.activitiesInfo = null
              }
              // 判断是新增还是修改
              if (this.form.id) {
                // 修改
                console.log('修改')
                this.updateData()
              } else {
                // 新增
                console.log('新增')
                this.newData()
              }
              // os 由列表转换为字符串
              this.form.os = this.form.osList ? this.form.osList.join(',') : ''
              console.log(this.form)
              // let formData = new FormData()
              // let buildModel = (Model)=>{
              //   for (let k in Model) {
              //     if(Model[k] != null){
              //       if(Model[k].constructor == Object){
              //         buildModel(Model[k])
              //       }else{
              //         formData.append(k, Model[k])
              //       }
              //     }
              //   }
              // }
              // buildModel(this.form)

              // 发送保存请求
              this.$ajax.post(`${baseUrl.ActivityMsgPlan}/tpushplan/tPushPlan/save`, this.form)
              // this.$ajax.post(`${baseUrl.ActivityMsgPlan}/tpushplan/tPushPlan/save`, formData, {
              //   headers: {
              //     'Content-Type': 'multipart/form-data'
              //   }
              // })
                .then(res => {
                  console.log(res)
                })
                .then(() => {
                  this.resetForm()
                  this.showForm()
                  this.activeName = 'first'
                })
                .catch(err => {
                  console.error(err)
                })
            }
            else {
              return false
            }
          }
        )
      },
      // 保存为新建时调用此函数
      newData () {
        // 全国用户和部分用户互斥
        // 全国用户是地区默认为全国
        if (+this.form.pushTarget === 0) {
          this.form.osList = ['0', '1']
          this.form.cityIds = ['-1']
        }
        // 添加 推送城市转换为字符串
        this.form.areaIds = this.form.cityIds.join(',')
      },
      // 保存为修改时调用此函数
      updateData () {
        // 修改 推送城市转换
        console.log('推送城市转换')
        console.log(this.form.areaId)
        if (this.form.area) {
          this.form.area.id = this.form.areaId
        } else {
          this.form.area = {}
          this.form.area.id = this.form.areaId
        }
        // 全国用户和部分用户互斥
        // 全国用户是地区默认为全国
        console.log('全国用户和部分用户互斥')
        if (+this.form.pushTarget === 0) {
          this.form.osList = ['0', '1']
          this.form.area.id = '-1'
        }
      },
      // 返回列表页
      goBack () {
        this.activeName = 'first'
        // 并清空当前列表内容 并请求列表
        this.resetForm()
        this.showForm()
      },
      // 清空form 推送计划详情
      resetForm () {
        this.form = {
          pushTitle: '赳赳单车',
          cityIds: [], // 推送城市 添加时为多选
          pushTarget: '',
          osList: [],
          activitiesInfoId: '',
          areaId: ''
        }
      },
      // 点击tab栏事件
      handleClick (tab, event) {
        // console.log(tab.name, event)
        if (tab.name === 'first') {
          this.formInline = {
            pushState: '',
            pageNo: '1',
            pageSize: '30',
            area: {
              id: ''
            }
          }, // 查询字符
            this.showForm()
        }
        // 清空推送计划详情
        this.resetForm()
      },
      // 根据id删除当前行
      deleteData (id) {
        this.$ajax.post(`${baseUrl.ActivityMsgPlan}/tpushplan/tPushPlan/delete/${id}`, qs.stringify({}))
          .then(res => {
            console.log(res)
            // 删除后重新获取列表
            this.showForm()
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 操作前 事先询问是否继续
      open2 (id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteData(id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 改变请求条数功能
      handleSizeChange (val) {
        this.formInline.pageSize = val
        this.showForm()
      },
      // 翻页功能
      handleCurrentChange (val) {
        this.formInline.pageNo = val
        this.showForm()
      },
      hasPermission (data) {
        if (this.permissionList && this.permissionList.length && this.permissionList.includes(data)) {
          return true
        }
        return false
      },
    }
  }
</script>

<style scoped>
  .second .textarea, .second .el-input__inner {
    width: 450px;
  }

  .textarea > textarea {
    height: 110px !important;
  }

  .el-textarea__inner {
    height: 110px !important;
  }
</style>
