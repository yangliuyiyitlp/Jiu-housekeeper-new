<template>
  <div style="position: relative" v-if="hasPermission('/tag/taglib/view')">
    <el-row :gutter="0">
      <!--树组件-->
      <el-col :span="4">
        <div>

          <!--树的渲染-->
          <tag-tree
            :defaultExpandAll="true"
            :columns="columns"
            :tree-structure="true"
            :requestUrl="requestUrl"
            :data-source="tagTree">
          </tag-tree>

          <div style="position: relative;">
            <div class="description">
              <div>
                <ul class="labelStatus">
                  <li><span></span>定义</li>
                  <li><span></span>已提交</li>
                  <li><span></span>编写</li>
                  <li><span></span>可执行</li>
                </ul>
              </div>
              <div>
                <ul class="labelDisable">
                  <li><span></span>启用中</li>
                  <li><span></span>停用中</li>
                  <li><span></span>草稿</li>
                </ul>
              </div>
            </div>
          </div>

          <!--模态框-->
          <!--tagVisible-->
          <!--单击树组件弹出的模态框-->
          <el-dialog :title="tagVisibleTitle" size="tiny" :visible.sync="tagVisible" class="tagVisible">
            <!--<el-dialog :title="tagVisibleTitle" :visible.sync="tagVisible" class="tagVisible">-->
            <div @click="viewTag" v-if="+form.parentIds===0 ? false : true">查看详情</div>
            <div @click="lowerTag">添加子节点
            </div>
            <div @click="lowerTag"
                 v-if="+form.parentIds===0 ? false : true">添加下方节点
            </div>
            <div
              v-if="(form.labelEnableDisable===1 ? true : false) && +form.parentIds!==0 && hasPermission('/tag/taglib/marketEdit')"
              @click="changeTagStatus('正式启用', 3, 0)"
            >启用
            </div>
            <div
              v-if="(form.labelEnableDisable===0 ? true : false) && +form.parentIds!==0 && hasPermission('/tag/taglib/marketEdit')"
              @click="changeTagStatus('正式停用', 1, 1)"
            >停用
            </div>
          </el-dialog>


        </div>
      </el-col>
      <!--操作部分-->
      <el-col :span="18" :offset="1">

        <div v-show="defineForm.parentId ? true : false">
          <el-tabs v-model="activeName" @tab-click="handleClick">

            <!--定义标签-->
            <el-tab-pane label="定义标签" name="first">
              <el-form ref="defineForm" :model="defineForm" label-width="100px" :rules="rules">

                <el-form-item label="设置执行周期:">
                  <el-select v-model="defineForm.labelPerformCycle"
                             placeholder="设置执行周期"
                             style="width: 135px">
                    <el-option label="一次执行" value="1"></el-option>
                    <el-option label="重复执行" value="2"></el-option>
                  </el-select>

                  <el-time-picker
                    style="width: 150px"
                    v-model="defineForm.actionPoint"
                    placeholder="设置执行时间点">
                  </el-time-picker>

                  <span v-show="defineForm.labelPerformCycle === '2' ? true: false">

                    <el-select v-model="defineForm.executionConditionPeriod"
                               placeholder="周期"
                               style="width: 100px">
                    <el-option label="每日" value="1"></el-option>
                    <el-option label="每周" value="2"></el-option>
                    <el-option label="每月" value="3"></el-option>
                  </el-select>

                    <!--<el-form-item style="display: inline-block" label-width="10px"-->
                    <!--v-show="defineForm.executionConditionPeriod === '2'? true: false">-->
                    <!--<el-input v-model="defineForm.loopWeek" placeholder="输入周几"-->
                    <!--style="width: 110px"></el-input>-->
                    <!--</el-form-item>-->

                     <!--<el-form-item style="display: inline-block" label-width="10px"-->
                                   <!--v-show="defineForm.executionConditionPeriod === '3'? true: false">-->
                      <!--<el-input v-model="defineForm.loopDay" placeholder="输入每月几号"-->
                                <!--style="width: 110px"></el-input>-->
                    <!--</el-form-item>-->

                     <el-select v-model="defineForm.loopWeek" style="width: 100px" placeholder="请选择" v-show="defineForm.executionConditionPeriod === '2'? true: false">
                      <el-option
                        v-for="item in weeks"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                     </el-option>
                     </el-select>

                       <el-select v-model="defineForm.executionConditionPeriod" style="width: 100px" placeholder="请选择" v-show="defineForm.executionConditionPeriod === '3'? true: false">
                      <el-option
                        v-for="item in months"
                        :key="item"
                        :label="item"
                        :value="item">
                     </el-option>
                     </el-select>
                  </span>
                </el-form-item>

                <el-form-item label="id:" v-if="0">
                  <el-input v-model="defineForm.id"></el-input>
                </el-form-item>

                <el-form-item label="parentId:" v-if="0">
                  <el-input v-model="defineForm.parentId"></el-input>
                </el-form-item>

                <el-form-item label="parentIds:" v-if="0">
                  <el-input v-model="defineForm.parentIds"></el-input>
                </el-form-item>
               <!--编写状态 圆圈颜色-->
                <el-form-item label="labelEnableDisable:" v-if="0">
                  <el-input v-model="defineForm.labelEnableDisable"></el-input>
                </el-form-item>
                <!--提交状态 字体颜色-->
                <el-form-item label="labelStatus:" v-if="0">
                  <el-input v-model="defineForm.labelStatus"></el-input>
                </el-form-item>

                <el-form-item label="父标签:">
                  {{defineForm.parentName}}
                </el-form-item>

                <el-form-item label="标签名称:" prop="name">
                  <el-input v-model="defineForm.name" @change="marketChange"
                            style="width: 500px"></el-input>
                </el-form-item>

                <el-form-item label="规则说明:" prop="labelDescription">
                  <el-input v-model="defineForm.labelDescription" type="textarea" @change="marketChange"
                            style="width: 500px" autosize></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="danger" @click="saveTag"
                             v-if="hasPermission('/tag/taglib/marketEdit') && (+defineForm.labelEnableDisable === 2) && (defineForm.labelStatus === null)">
                    保存
                  </el-button>
                  <el-button type="danger" @click="submitTag"
                             v-if="hasPermission('/tag/taglib/marketEdit') && (+defineForm.labelEnableDisable === 2) && ((''+defineForm.labelStatus) === '0')">
                    提交
                  </el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <!--SQL编写-->
            <el-tab-pane label="SQL编写" name="second">
              <el-form ref="SQLForm" :model="SQLForm" label-width="100px">

                <el-form-item label="id:" v-if="0">
                  <el-input v-model="SQLForm.id"></el-input>
                </el-form-item>

                <el-form-item label="labelEnableDisable:" v-if="0">
                  <el-input v-model="SQLForm.labelEnableDisable"></el-input>
                </el-form-item>

                <el-form-item label="labelStatus:" v-if="0">
                  <el-input v-model="SQLForm.labelStatus"></el-input>
                </el-form-item>

                <el-form-item label="提交人:">
                  {{SQLForm.marketExecutor}}
                </el-form-item>

                <el-form-item label="SQL代码:">
                  <el-input v-model="SQLForm.labelSql" type="textarea" @change="itChange"
                            style="width: 500px" autosize></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="danger" @click="operateSQL('保存SQL编写',2,2,'SQL编写已保存')"
                             v-if="hasPermission('/tag/taglib/itEdit') && (+SQLForm.labelEnableDisable === 2) && (+SQLForm.labelStatus === 1)">
                    保存
                  </el-button>
                  <el-button type="danger" @click="operateSQL('正式启动此标签',3,0,'此标签已启用')"
                             v-if="hasPermission('/tag/taglib/itEdit') && (+SQLForm.labelEnableDisable === 2) && (+SQLForm.labelStatus === 2)">
                    完成
                  </el-button>
                  <el-button type="danger" @click="operateSQL('解锁标签状态',0,2,'此标签已解锁')"
                             v-if="hasPermission('/tag/taglib/itEdit') && (+SQLForm.labelEnableDisable !== 0) && (+SQLForm.labelStatus !== 3)">
                    解锁
                  </el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <!--预览结果-->
            <el-tab-pane label="预览结果" name="third">
              <h3>选择预览内容</h3>
              <template>
                <el-radio class="radio" v-model="radio" label="1">执行人</el-radio>
                <el-radio class="radio" v-model="radio" label="2">执行时间</el-radio>
              </template>
                <button class="thirdQuery" @click="thirdQuery">查询</button>
              <br><br>
              <el-table
                :data="resultData"
                border
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="用户"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="用户id"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="手机号">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="执行人">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="执行时间">
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!--查看日志-->
            <el-tab-pane label="查看日志" name="fourth">
              <el-table
                :data="logData"
                border
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="日期"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址">
                </el-table-column>
              </el-table>
            </el-tab-pane>

          </el-tabs>
        </div>

      </el-col>

    </el-row>
  </div>
</template>

<script>
  import baseUrl from '../../utils/baseUrl'
  // arr2tree引入
  import arr2tree from '../../utils/arr2tree.js'
  import Moment from 'moment'
  import TagTree from '../../components/commons/Ztree/TagTree.vue'
  import bus from '@/assets/js/eventBus.js'
  import a from '../../assets/js/getsessionId.js'

  export default {
    name: 'tag-lib',
    components: {
      TagTree
    },
    mounted () {
      // 编辑按钮
      bus.$on('handleEdit', (data) => {
        // console.log('Edit', data)
        this.selectTag(data)
      })
    },
    data () {
      return {
        // 所需要展示的条目
        columns: [
          {
            text: '栏目名称',
            dataIndex: 'name'
          }
        ],
        radio:'1',
        // 增删改查请求地址
        requestUrl: '',
        userId: '',
        activeName: 'first',
        tagList: [],
        tagTree: [], // 标签库树组件
        defaultProps: {
          children: 'children',
          label: 'name'
        }, // 标签库树组件默认渲染字段
        tagVisible: false, // 单击树组件模态框
        tagVisibleTitle: '',
        form: {}, // 点击标签树组件时 标签信息
        tagForm: {}, // 单个标签所有详情
        weeks: [{value: 0, label: '周一'}, {value: 1, label: '周二'}, {value: 2, label: '周三'}, {
          value: 3, label: '周四'}, {value: 4, label: '周五'}, {value: 5, label: '周六'}, {value: 6, label: '周日'}],
        months: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        defineForm: {
          labelPerformCycle: '1'
        }, // 定义表单
        SQLForm: {},
        resultData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ],
        logData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ],
        rules: {
          name: {required: true, message: '请输入标签名称', trigger: 'blur'},
          labelDescription: {required: true, message: '请输入规则说明', trigger: 'blur'}
        },
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
      this.setResponseHead()
      this.getTagList()
    },
    methods: {
      // 获取标签库树组件
      getTagList () {
        this.$ajax.get(`${baseUrl.TagLib}/get`)
          .then(res => {
            if (res.data.code === 200) {
              // console.log(res.data.data)
              this.tagTree = arr2tree.getTree(res.data.data, '0')
              this.tagList = res.data.data
              // console.log(this.tagTree)
            }
          })
          .catch(err => {
            // console.log('getCityRelation报错')
            console.error(err)
          })
      },
      // 点击树组件时事件 弹出模态框
      selectTag (data) {
        // console.log(data)
        if (+data.parentIds === 0) {

        }
        this.tagVisibleTitle = `当前标签库为"${data.name}",操作如下:`
        this.form = data
        this.tagVisible = true // 单击树组件模态框
        console.log(this.form)
      },
      // 查看详情
      viewTag () {
        this.tagVisible = false
        console.log(this.form.id)
        // 通过id获取所有详情
        this.$ajax.get(`${baseUrl.TagLib}/detail`, {params: {id: this.form.id}})
          .then(res => {
            if (res.data.code === 200) {
              this.tagForm = res.data.data
              console.log(this.tagForm)
              this.getForms(this.tagForm)
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 将全部标签信息,分放对应的表单中
      getForms (form) {
        if (!form.parentName) {
          for (let i = 0; i < this.tagList.length; i++) {
            if (this.tagList[i].id === this.form.parentId) {
              form.parentName = this.tagList[i].name
            }
          }
        }
        if (+form.executionConditionPeriod === 2) {
          // console.log('输入周几')
          form.loopWeek = form.executionConditionDay
          form.loopDay = ''
        }
        if (form.executionConditionPeriod === 3) {
          // console.log('输入每月几号')
          form.loopDay = form.executionConditionDay
          form.loopWeek = ''
        }
        let timeArr = form.executionConditionPoint.split(':')
        form.actionPoint = new Date(2018, 2, 27, timeArr[0], timeArr[1], timeArr[2])
        console.log(form)
        // 定义标签表单赋值
        this.defineForm = {
          parentId: form.parentId,
          parentIds: form.parentIds,
          name: form.name,
          parentName: form.parentName,
          labelPerformCycle: '' + form.labelPerformCycle,
          executionConditionPeriod: '' + form.executionConditionPeriod,
          actionPoint: form.actionPoint,
          loopWeek: form.loopWeek,
          loopDay: form.loopDay,
          labelDescription: form.labelDescription,
          id: form.id,
          labelStatus: form.labelStatus,
          labelEnableDisable: form.labelEnableDisable,
        }
        console.log('定义表单', this.defineForm)
        // sql表单赋值
        this.SQLForm = {
          id: form.id,
          labelSql: form.labelSql,
          marketExecutor: form.marketExecutor,
          labelStatus: form.labelStatus,
          labelEnableDisable: form.labelEnableDisable,
        }
      },
      // 添加子标签
      lowerTag () {
        console.log('添加子标签')
        this.tagVisible = false
        this.activeName = 'first'
        console.log(this.form)
        this.defineForm = {
          name: '',
          labelDescription: '',
          parentId: this.form.id,
          parentIds: this.form.parentIds + ',' + this.form.id,
          labelPerformCycle: '1',
          labelEnableDisable: '2',
          labelStatus: null
        }
        for (let i = 0; i < this.tagList.length; i++) {
          if (this.tagList[i].id === this.defineForm.parentId) {
            this.defineForm.parentName = this.tagList[i].name
          }
        }
        console.log(this.defineForm)
      },
      // todo 市场人员操作部分
      // 启动 停用标签
      changeTagStatus (message, labelStatus, labelEnableDisable) {
        console.log('changeTagStatus-form', this.form)
        this.$confirm('此操作将' + message + '标签状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送请求
          this.$ajax.post(`${baseUrl.TagLib}/content/change`, {
            marketExecutor: this.userId,
            labelStatus: labelStatus,
            labelEnableDisable: labelEnableDisable,
            id: this.form.id
          })
            .then(res => {
              console.log(res)
              if (res.data.code === 200) {
                console.log(res.data.data)
                this.$message({
                  message: '恭喜，' + message + '成功!',
                  type: 'success'
                })
                this.getTagList() // 刷新树组件
                this.tagVisible = false // 隐藏模态框
              }
            })
            .catch(err => {
              console.log(err)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消相关操作'
          })
          this.tagVisible = false // 隐藏模态框
        })
      },
      //预览查询
      thirdQuery(){},
      // 保存
      saveTag () {
        // 时间点
        if (this.defineForm.actionPoint) {
          this.defineForm.executionConditionPoint = Moment(this.defineForm.actionPoint).format('HH:mm:ss')
        } else {
          this.$message.error('请选择执行时间点!')
          return
        }
        // 执行周期
        console.log(this.defineForm.labelPerformCycle)
        if (+this.defineForm.labelPerformCycle === 2 && !this.defineForm.executionConditionPeriod) {
          this.$message.error('请选择循环周期类型!')
          return
        }
        // 标签名称
        if (!this.defineForm.name) {
          this.$message.error('请填写标签名称!')
          return
        }
        // 标签规则说明
        if (!this.defineForm.labelDescription) {
          this.$message.error('请填写标签规则说明!')
          return
        }
        // 区分每周或每月
        if (+this.defineForm.executionConditionPeriod === 2) {
          if (this.defineForm.loopWeek) {
            this.defineForm.executionConditionDay = this.defineForm.loopWeek
          } else {
            this.$message.error('请输入每周周几!')
            return
          }
        }
        if (+this.defineForm.executionConditionPeriod === 3) {
          if (this.defineForm.loopDay) {
            this.defineForm.executionConditionDay = this.defineForm.loopDay
          } else {
            this.$message.error('请输入每月几号!')
            return
          }

        }
        // 点击保存时的 标签状态
        this.defineForm.labelStatus = 0
        this.defineForm.labelEnableDisable = 2
        console.log(this.defineForm)
        this.$confirm('此操作将保存标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送请求
          this.$ajax.post(`${baseUrl.TagLib}/save`, this.defineForm)
            .then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: '恭喜，保存成功!',
                  type: 'success'
                })
                // 重新渲染树组件
                this.getTagList()
                console.log('保存后返回表单', res.data.data)
                for (let i = 0; i < this.tagList.length; i++) {
                  console.log(this.tagList[i].id)
                  if (this.tagList[i].id === res.data.data.parentId) {
                    console.log('same', this.tagList[i].id)
                    res.data.data.parentName = this.tagList[i].name
                  }
                }
                this.getForms(res.data.data)
              }
            })
            .catch(err => {
              console.log(err)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          })
        })
      },
      // 提交 定义标签
      submitTag () {
        this.$confirm('此操作将提交标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送请求
          this.$ajax.post(`${baseUrl.TagLib}/content/change`, {
            id: this.defineForm.id,
            labelStatus: 1,
            labelEnableDisable: 2,
            marketExecutor: this.userId
          })
            .then(res => {
              if (res.data.code === 200) {
                console.log(res.data.data)
                this.$message({
                  message: '恭喜，提交成功!',
                  type: 'success'
                })
                // 重新渲染树组件
                this.getTagList()
                console.log('提交成功后返回表单', res.data.data)
                for (let i = 0; i < this.tagList.length; i++) {
                  console.log(this.tagList[i].id)
                  if (this.tagList[i].id === res.data.data.parentId) {
                    console.log('same', this.tagList[i].id)
                    res.data.data.parentName = this.tagList[i].name
                  }
                }
                this.getForms(res.data.data)
              }
            })
            .catch(err => {
              console.log(err)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          })
        })
      },
      // 输入框发生变化
      marketChange () {
        if (this.hasPermission('/tag/taglib/marketEdit')) {
          this.defineForm.labelStatus = null
        }
      },
      // todo 技术人员操作部分
      operateSQL (title, labelStatus, labelEnableDisable, message) {
        // SQL代码
        if (!this.SQLForm.labelSql) {
          this.$message.error('请填写SQL代码!')
          return
        }
        this.$confirm('此操作将' + title + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送请求
          console.log(this.SQLForm)
          this.$ajax.post(`${baseUrl.TagLib}/content/change`, {
            technologyExecutor: this.userId,
            labelStatus: labelStatus,
            labelEnableDisable: labelEnableDisable,
            labelSql: this.SQLForm.labelSql,
            id: this.SQLForm.id
          })
            .then(res => {
              if (res.data.code === 200) {
                // console.log(res.data.data)
                this.$message({
                  message: '恭喜，' + message + '成功!',
                  type: 'success'
                })
                console.log('sql返回表单', res.data.data)
                for (let i = 0; i < this.tagList.length; i++) {
                  if (this.tagList[i].id === res.data.data.parentId) {
                    res.data.data.parentName = this.tagList[i].name
                  }
                }
                this.getForms(res.data.data)
              }
            })
            .then(() => {
              // 刷新标签树
              this.getTagList()
            })
            .catch(err => {
              console.log(err)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消相关操作'
          })
        })
      },
      // 输入框发生变化
      itChange () {
        if (this.hasPermission('/tag/taglib/marketEdit')) {
          this.SQLForm.labelEnableDisable = 2
          this.SQLForm.labelStatus = 1
        }
      },
      handleClick () {
        console.log('tag被点击')
      },
      // 将userId放入响应头
      setResponseHead () {
        let arr = location.href.split('?')[1].split('&')
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].indexOf('adminId') !== -1) {
            this.$ajax.defaults.headers.userId = arr[i].split('=')[1]
            document.cookie = `username=${arr[i].split('=')[1]}; path=/`
            this.userId = arr[i].split('=')[1]
          }
        }
      },
      hasPermission (data) {
        if (this.permissionList && this.permissionList.length && this.permissionList.includes(data)) {
          return true
        }
        return false
      }
    }
  }
</script>

<style scoped>
  .tagVisible div {
    padding: 10px;
    font-size: 16px;
  }

  .tagVisible div:hover {
    background-color: #ccc;
  }
.thirdQuery{
  margin-left:20px;
  color:#fff;
  width:100px;
  height:30px;
  border:1px solid #20a0ff;
  background-color: #20a0ff;
  border-radius: 20px;
}
  .labelStatus, .labelDisable {
    list-style: none;
    height: 30px;
    padding: 0;
    margin: 0;
  }

  .labelStatus li, .labelDisable li {
    float: left;
    font-size: 14px;
    margin-left: 5px;
  }

  .labelStatus span {
    margin-right: 3px;
    width: 14px;
    height: 14px;
    display: inline-block;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }

  .labelStatus li:nth-child(1) span {
    background-color: #FFAE00;
  }

  .labelStatus li:nth-child(2) span {
    background-color: #DB5050;
  }

  .labelStatus li:nth-child(3) span {
    background-color: #289AFF;
  }

  .labelStatus li:nth-child(4) span {
    background-color: #6BB300;
  }

  .labelStatus li:nth-child(1) {
    color: #FFAE00;
  }

  .labelStatus li:nth-child(2) {
    color: #DB5050;
  }

  .labelStatus li:nth-child(3) {
    color: #289AFF;
  }

  .labelStatus li:nth-child(4) {
    color: #6BB300;
  }

  .labelDisable span {
    width: 8px;
    height: 8px;
    display: inline-block;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    /*border: 1px solid #DB5050;*/
    margin-right: 3px;
  }

  .labelDisable li:nth-child(1) span {
    background-color: #DB5050;
  }

  .labelDisable li:nth-child(2) span {
    background-color: #6BB300;
  }

  .labelDisable li:nth-child(3) span {
    background-color: #FFAE00;
  }

  .description {
    position: absolute;
    top: 20px;
    left: 10px;
  }
</style>
