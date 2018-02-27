<template>
  <div>
    <el-row :gutter="30">
      <!--树组件-->
      <el-col :span="4">
        <div style="background-color: #46be8a;height: 400px;">
          树组件
        </div>
      </el-col>
      <!--操作部分-->
      <el-col :span="20">
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <!--定义标签-->
            <el-tab-pane label="定义标签" name="first">
              <el-form ref="defineForm" :model="defineForm" label-width="100px">

                <el-form-item label="设置执行条件:">
                  <el-select v-model="defineForm.region"
                             placeholder="设置执行条件"
                             style="width: 135px">
                    <el-option label="重复" value="0"></el-option>
                    <el-option label="不重复" value="1"></el-option>
                  </el-select>

                  <el-time-picker
                    style="width: 150px"
                    v-model="defineForm.time"
                    placeholder="设置执行时间点">
                  </el-time-picker>

                  <el-select v-model="defineForm.region1"
                             placeholder="周期"
                             style="width: 100px">
                    <el-option label="每日" value="0"></el-option>
                    <el-option label="每周" value="1"></el-option>
                    <el-option label="每月" value="2"></el-option>
                  </el-select>

                  <el-select v-model="defineForm.region2"
                             placeholder="日期"
                             style="width: 100px">
                    <el-option label="1" value="0"></el-option>
                    <el-option label="2" value="1"></el-option>
                    <el-option label="3" value="2"></el-option>
                    <el-option label="4" value="3"></el-option>
                    <el-option label="5" value="4"></el-option>
                    <el-option label="6" value="5"></el-option>
                    <el-option label="7" value="6"></el-option>
                    <el-option label="8" value="7"></el-option>
                    <el-option label="9" value="8"></el-option>
                    <el-option label="10" value="9"></el-option>
                    <el-option label="11" value="10"></el-option>
                  </el-select>

                </el-form-item>

                <el-form-item label="父标签:">
                  <el-input v-model="defineForm.name"
                            style="width: 500px"
                            disabled></el-input>
                </el-form-item>

                <el-form-item label="标签名称:">
                  <el-input v-model="defineForm.name"
                            style="width: 500px"></el-input>
                </el-form-item>

                <el-form-item label="规则说明:">
                  <el-input v-model="defineForm.name" type="textarea"
                            style="width: 500px" autosize></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="danger" @click="">保存</el-button>
                  <el-button type="danger">提交</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="SQL编写" name="second">
              <el-form ref="SQLForm" :model="SQLForm" label-width="100px">

                <el-form-item label="提交人:">
                  <el-input v-model="SQLForm.name"
                            style="width: 500px"
                            disabled></el-input>
                </el-form-item>

                <el-form-item label="SQL代码:">
                  <el-input v-model="SQLForm.name" type="textarea"
                            style="width: 500px" autosize></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="danger" @click="">保存</el-button>
                  <el-button type="danger">提交</el-button>
                  <el-button type="danger">解锁</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <el-tab-pane label="预览结果" name="third">
              <el-table
                :data="resultData"
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

  export default {
    name: 'tag-lib',
    data () {
      return {
        activeName: 'first',
        defineForm: {}, // 定义表单
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
        ]
      }
    },
    created () {
      this.getTagList()
    },
    methods: {
      // 获取城市对应关系
      getTagList () {
        this.$ajax.get(`${baseUrl.TagLib}/get`)
          .then(res => {
            if (res.data.code === 200) {
              console.log(res.data.data)
            }
          })
          .catch(err => {
            // console.log('getCityRelation报错')
            console.error(err)
          })
      },
      handleClick () {
        console.log('tag被点击')
      },
    }
  }
</script>

<style scoped>

</style>
