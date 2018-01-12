<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="广告内容信息" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="状态：">
            <el-select v-model="formInline.showRule" clearable>
              <el-option v-for="(val,key) in opFlag" v-bind:key=key :label=opFlag[key] :value=key></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投放时间：">
            <el-date-picker
              v-model="formInline.beginTime"
              @change="onBeginTimeChange"
              type="datetime">
            </el-date-picker>
            -
            <el-date-picker
              v-model="formInline.endTime"
              @change="onEndTimeChange"
              type="datetime">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="位置：">
            <el-select v-model="formInline.showRule" clearable>
              <el-option v-for="(val,key) in opFlag" v-bind:key=key :label=opFlag[key] :value=key></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="hasPermission('view')">
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
          <el-form-item v-if="hasPermission('advert/content/create')">
            <el-button type="primary" @click="addNewRecord">新增</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @cell-click="more">
          <el-table-column
            prop="id"
            label="广告ID"
            v-if="0">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            label="广告标题"
            prop="id">
            <template slot-scope="scope">
              <span v-bind:class="{active: true}">{{ scope.row.id}}</span>
            </template>
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="showRule"
            label="状态">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="autoDisplayTimes"
            label="形式">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="updateDate"
            label="位置">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="updateDate"
            label="时间">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="updateDate"
            label="展示数">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="updateDate"
            label="点击数">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="updateDate"
            label="点击率">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="updateDate"
            label="操作人">
          </el-table-column>
          <el-table-column
            v-if='updateDelete'
            header-align="center"
            align="center"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-button v-if="hasPermission('advert/content/pause')" @click="modifyRecord(scope.row.id)" type="text"
                         size="small">暂停
              </el-button>
              <el-button v-if="hasPermission('advert/content/update')" @click="deleteRecord(scope.row.id)" type="text"
                         size="small">修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="title" name="second" v-if="create">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
          <el-form-item label="广告标题：">
            <el-input v-model="ruleForm.autoDisplayTimes" class="width"></el-input>
          </el-form-item>
          <el-form-item label="投放时间：">
            <el-date-picker
              v-model="formInline.beginTime"
              @change="onBeginTimeChange"
              type="datetime">
            </el-date-picker>
            至
            <el-date-picker
              v-model="formInline.endTime"
              @change="onEndTimeChange"
              type="datetime">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="广告类型：" prop="roleId">
            <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="{role, index} in roles" :key="index">{{role}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="广告位置：" prop="roleId">
            <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="{role, index} in roles" :key="index">{{role}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="广告图片：" prop="showRule">
            <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
              <el-radio-button label="top">top</el-radio-button>
              <el-radio-button label="right">right</el-radio-button>
              <el-radio-button label="bottom">bottom</el-radio-button>
              <el-radio-button label="left">left</el-radio-button>
            </el-radio-group>
            <div>
              <el-input v-model="ruleForm.iconUrl" v-show='false'></el-input>
              <img width="100%" :src="ruleForm.iconUrl" alt="图标图片">
              <el-upload
                :disabled="!update"
                ref="loadFile"
                list-type="picture-card"
                action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
                :data="Token"
                :on-remove="removeImgPath"
                :on-success="successImgPath"
                :before-upload="beforeUploadImgPath">
                <el-button :disabled="!update" type="primary" @click="clearUploadedImgPath">上传图片
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-upload>
            </div>
            <div>
              <el-input v-model="ruleForm.iconUrl" v-show='false'></el-input>
              <img width="100%" :src="ruleForm.iconUrl" alt="图标图片">
              <el-upload
                :disabled="!update"
                ref="upload"
                list-type="picture-card"
                action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
                :data="Token"
                :on-remove="removeImgPath"
                :on-success="successImgPath"
                :before-upload="beforeUploadImgPath">
                <el-button :disabled="!update" type="primary" @click="clearUploadedImgPath">上传图片
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
              </el-upload>
            </div>
          </el-form-item>

          <el-form-item label="地区：" prop="showRule">
            <input ref='keySearch' type='text' placeholder="输入关键字进行过滤" class='keySearch' v-model="filterText">
            <el-tree
              :data="selectSection"
              show-checkbox
              default-expand-all
              node-key="id"
              ref="tree"
              class="treeWidth"
              accordion
              :filter-node-method="filterNode"
              @node-click="handleNode"
              :props="defaultProps">
            </el-tree>
          </el-form-item>

          <el-form-item label="投放平台：" prop="roleId">
            <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="{role, index} in roles" :key="index">{{role}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="投放版本：" prop="roleId">
            <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="{role, index} in roles" :key="index">{{role}}
              </el-checkbox>
            </el-checkbox-group>
            <br>
            <label>新增版本号：</label>
            <el-input v-model="ruleForm.autoDisplayTimes" class="width"></el-input>
            <button>确定</button>
          </el-form-item>

          <el-form-item label="投放形式：" prop="roleId">
            <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="{role, index} in roles" :key="index">{{role}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="落地页地址：">
            <el-input v-model="ruleForm.autoDisplayTimes" class="width"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button v-if="update" type="primary" @click="submitForm('ruleForm')">{{tip}}</el-button>
            <el-button v-if='update' @click="resetForm('ruleForm')">重置</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Cookie from 'js-cookie'
  import a from '../../assets/js/getsessionId.js'
  import baseUrl from '../../utils/baseUrl'

  export default {
    data () {
      return {
        selectSection: [],
        filterText: '',
        filterId: '',
        activeName2: 'first',
        update: true,
        create: true,
        value6: '',
        title: '广告内容新增',
        opFlag: {0: '都不显示', 1: '围栏外显示', 2: '围栏内显示', 3: '都显示'},
        showFlag: '',
        tip: '立即创建',
        updateDelete: '',
        Token: {},
        Token1: {},
        tableData: [],
        checkedRoles: [],
        roles: ['假的', '假的', '假的', '假的'],
        tabPosition: 'top',
        formInline: {},
        ruleForm: {},
        rules: {
          showRule: [
            {required: true, message: '请选择显示规则', trigger: 'blur'}
          ]
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        adminId: '',
        path: '',
        permissionList: ['advert/content/create', 'advert/content/update', 'advert/content/pause']
      }
    },
    created () {
      // 请求按钮权限
      this.adminId = this.$route.query.adminId
      this.path = this.$route.path
      a.sessionId(this.adminId, this.path, this.$router, this.$ajax, this.permissionList)
      this.query()
      this.selectCity()
      if (this.hasPermission('advert/content/create')) {
        this.create = true
      } else {
        this.create = false
      }
      if (this.hasPermission('advert/content/update') || this.hasPermission('advert/content/delete')) {
        this.updateDelete = true
      } else {
        this.updateDelete = false
      }
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
    },
    methods: {
      filterNode (value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      handleNode (data) {
        this.filterText = data.name // 弹框树模型点击输入值
        this.filterId = data.id // 弹框树模型点击输入值
      },
      selectCity () {
        this.selectSection = [{
          'id': '1',
          'parentId': '0',
          'parentIds': '0,',
          'name': '上海市总公司',
          'sort': 10,
          'areaId': '1',
          'code': '100000',
          'type': '1',
          'grade': '1',
          'address': '',
          'zipCode': '',
          'master': '',
          'phone': '',
          'fax': '',
          'email': '',
          'useable': '1',
          'primaryPerson': '',
          'deputyPerson': '',
          'createBy': '1',
          'createDate': 1369584000000,
          'updateBy': '1',
          'updateDate': 1496764800000,
          'remarks': '',
          'delFlag': '0',
          'children': [{
            'id': '33',
            'parentId': '1',
            'parentIds': '0,1,',
            'name': '上海分公司',
            'sort': 30,
            'areaId': '13',
            'code': '100000009',
            'type': '1',
            'grade': '2',
            'address': '',
            'zipCode': '',
            'master': '',
            'phone': '',
            'fax': '',
            'email': '',
            'useable': '1',
            'primaryPerson': '',
            'deputyPerson': '',
            'createBy': '1',
            'createDate': 1497888000000,
            'updateBy': '1',
            'updateDate': 1502265256000,
            'remarks': '',
            'delFlag': '0',
            'children': [{
              'id': '55',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '宝山区政府',
              'sort': 30,
              'areaId': '21',
              'code': '100000009009',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505444156000,
              'updateBy': '1',
              'updateDate': 1505444156000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '34',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '城市运营',
              'sort': 30,
              'areaId': '13',
              'code': '100000009001',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1497888000000,
              'updateBy': '1',
              'updateDate': 1501516800000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '45',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '黄浦区政府',
              'sort': 30,
              'areaId': '24',
              'code': '',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1504070206000,
              'updateBy': '1',
              'updateDate': 1504070206000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '56',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '松江区政府',
              'sort': 30,
              'areaId': '26',
              'code': '100000009010',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505444183000,
              'updateBy': '1',
              'updateDate': 1505444183000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '57',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '杨浦区政府',
              'sort': 30,
              'areaId': '18',
              'code': '100000009011',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505444214000,
              'updateBy': '1',
              'updateDate': 1505444214000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '58',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '徐汇区政府',
              'sort': 30,
              'areaId': '16',
              'code': '100000009012',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505444231000,
              'updateBy': '1',
              'updateDate': 1505444231000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '59',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '长宁区政府',
              'sort': 30,
              'areaId': '17',
              'code': '100000009013',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505444293000,
              'updateBy': '1',
              'updateDate': 1505444301000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '49',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '虹口区政府',
              'sort': 30,
              'areaId': '25',
              'code': '100000009003',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505385789000,
              'updateBy': '1',
              'updateDate': 1505385789000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '60',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '青浦区政府',
              'sort': 30,
              'areaId': '67',
              'code': '100000009014',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505444388000,
              'updateBy': '1',
              'updateDate': 1505444388000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '50',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '普陀区政府',
              'sort': 30,
              'areaId': '22',
              'code': '100000009004',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505385822000,
              'updateBy': '1',
              'updateDate': 1505385822000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '61',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '奉贤区政府',
              'sort': 30,
              'areaId': '28',
              'code': '100000009015',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505444411000,
              'updateBy': '1',
              'updateDate': 1505444411000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '51',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '静安区政府',
              'sort': 30,
              'areaId': '19',
              'code': '100000009005',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505394685000,
              'updateBy': '1',
              'updateDate': 1505394814000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '62',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '金山区政府',
              'sort': 30,
              'areaId': '27',
              'code': '100000009016',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505444436000,
              'updateBy': '1',
              'updateDate': 1505444436000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '52',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '嘉定区政府',
              'sort': 30,
              'areaId': '23',
              'code': '100000009006',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505443295000,
              'updateBy': '1',
              'updateDate': 1505443295000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '53',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '浦东新区政府',
              'sort': 30,
              'areaId': '14',
              'code': '100000009007',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505443937000,
              'updateBy': '1',
              'updateDate': 1505444014000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }, {
              'id': '54',
              'parentId': '33',
              'parentIds': '0,1,33,',
              'name': '闵行区政府',
              'sort': 30,
              'areaId': '15',
              'code': '100000009008',
              'type': '2',
              'grade': '3',
              'address': '',
              'zipCode': '',
              'master': '',
              'phone': '',
              'fax': '',
              'email': '',
              'useable': '1',
              'primaryPerson': '',
              'deputyPerson': '',
              'createBy': '1',
              'createDate': 1505444077000,
              'updateBy': '1',
              'updateDate': 1505444077000,
              'remarks': '',
              'delFlag': '0',
              'children': []
            }]
          }]
        }]
      },
      handleNodeClick (data) {
        this.formInline.officeId = data.id
        this.query()
      },
      onBeginTimeChange (val) {
        this.formInline.beginTime = new Date(val).getTime()
      },
      onEndTimeChange (val) {
        this.formInline.endTime = new Date(val).getTime()
      },
      hasPermission (data) {
        if (this.permissionList && this.permissionList.length && this.permissionList.includes(data)) {
          return true
        }
        return false
      },
      handleClick () {
        if (this.activeName2 === 'first' && this.create) {
          this.title = '广告内容新增'
        } else if (this.title === '广告内容新增') {
          this.ruleForm = {}
          this.$refs.loadFile.clearFiles()
          this.$refs.upload.clearFiles()
          this.update = true
          this.tip = '立即创建'
          this.$refs.ruleForm.resetFields()
        }
      },
      query () {
        this.$ajax.get(`${baseUrl.cityFencingUrl}/remind/list`, {params: this.formInline, timeout: 1000})
          .then((res) => {
            if (res.data.code === 200) {
              let result = res.data.data
              this.tableData = result
              for (let i = 0; i < result.length; i++) {
                this.tableData[i].showRule = this.opFlag[result[i].showRule]
              }
            } else {
              this.$message({
                type: 'error',
                message: '获取列表失败'
              })
            }
          })
          .catch((error) => {
            console.log('获取列表失败:', error)
            this.$message({
              type: 'error',
              message: '获取列表异常'
            })
          })
      },
      getMore (id) {
        this.$ajax.get(`${baseUrl.cityFencingUrl}/remind/one`, {params: {ruleId: id}})
          .then(res => {
            if (res.data.code === 200) {
              let resultData = res.data.data
              this.ruleForm = resultData
              this.showFlag = resultData.showRule
              this.ruleForm.showRule = this.opFlag[resultData.showRule]
              console.log(this.ruleForm)
            } else if (res.data.code === 500) {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '查询异常'
            })
          })
      },
      more (row, column, cell, event) {
        if (column.property !== 'id') {
          return false
        } else {
          this.activeName2 = 'second'
          this.create = true
          this.update = false
          this.title = '电子围栏基础信息详情'
          this.getMore(row.id)
          console.log(row.id)
        }
      },
      addNewRecord () {
        this.ruleForm = {}
        this.activeName2 = 'second'
        this.update = true
        this.$refs.ruleForm.resetFields()
      },
      back () {
        this.activeName2 = 'first'
        if (this.create) {
          this.title = '广告内容新增'
        }
      },
      modifyRecord (id) {
        this.activeName2 = 'second'
        this.create = true
        this.update = true
        this.title = '广告内容修改'
        this.tip = '提交修改'
        this.getMore(id)
      },
      deleteRecord (id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (id !== undefined) {
            this.$ajax.post(`${baseUrl.cityFencingUrl}/delete`, {ruleId: id})
              .then((res) => {
                console.log(res)
                if (res.data.code === 200) {
                  // 删除成功
                  this.$message({
                    type: 'success',
                    message: res.data.msg
                  })
//                this.$refs['formA'].resetFields()
                  // 刷新页面
                  this.query()
                } else {
                  this.$message({
                    type: 'error',
                    message: '删除失败'
                  })
                }
              })
              .catch(() => {
                this.$message({
                  type: 'error',
                  message: '删除异常'
                })
              })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        })
      },
      resetForm (ruleForm) {
        this.ruleForm = {}
      },
      submitForm (ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          let url
          if (valid) {
            if (this.ruleForm.id === undefined || this.ruleForm.id === '') {
              url = `${baseUrl.cityFencingUrl}/add` // 新增功能
              this.ruleForm.showRule = parseInt(this.ruleForm.showRule)
              console.log(77)
            } else {
              url = `${baseUrl.cityFencingUrl}/update`
              console.log(this.ruleForm.showRule)
              console.log(this.opFlag[this.showFlag])
              if (this.ruleForm.showRule === this.opFlag[this.showFlag]) {
                this.ruleForm.showRule = parseInt(this.showFlag)
                console.log(this.ruleForm.showRule)
              } else {
                this.ruleForm.showRule = parseInt(this.ruleForm.showRule)
              }
            }
            if (this.ruleForm.autoDisplayTimes !== undefined && this.ruleForm.autoDisplayTimes !== '') {
              this.ruleForm.autoDisplayTimes = parseInt(this.ruleForm.autoDisplayTimes)
            } else {
              this.ruleForm.autoDisplayTimes = 0
            }
            this.ruleForm.sessionId = Cookie.get('sessionId')
            this.$ajax.post(url, this.ruleForm)
              .then(response => {
                if (response.data.code === 200) {
                  // 更新成功
                  this.$message({
                    type: 'success',
                    message: response.data.msg
                  })
                  this.back()
                  // 刷新页面
                  this.query()
                } else {
                  this.$message({
                    type: 'error',
                    message: '提交失败'
                  })
                }
              })
              .catch(() => {
                this.$message({
                  type: 'error',
                  message: '提交异常'
                })
              })
          } else {
            return
          }
        })
      },
      handleCheckedCitiesChange () {},
      // 上传组件获取oss相关 图片上传之前获取oss秘钥
      beforeUploadImgPath (file) {
        return new Promise((resolve) => {
          this.$ajax.get(`${baseUrl.mainUrl}/electric/ossutil/interface/policy`, {params: {user_dir: 'cityFencingInfo'}})
            .then((res) => {
              console.log(96, res)
              this.Token = res.data.data
              this.Token.OSSAccessKeyId = res.data.data.accessid
              this.Token.key = this.Token.dir + '/' + (+new Date()) + '_' + file.name
              resolve()
            })
            .catch(err => {
              this.$message({
                message: err.data.msg,
                type: 'error'
              })
            })
        })
      },
      successImgPath (response, file, fileList) {
        this.ruleForm.iconUrl = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
      },
      beforeUploadCoverPath (file) {
        return new Promise((resolve) => {
          this.$ajax.get('beforeUpload/img', {params: {user_dir: 'cityFencingInfo'}})
            .then((res) => {
              this.Token1 = res.data.data
              this.Token1.OSSAccessKeyId = res.data.data.accessid
              this.Token1.key = this.Token1.dir + '/' + (+new Date()) + file.name
              resolve()
            })
            .catch(err => {
              this.$message({
                message: err.data.msg,
                type: 'error'
              })
            })
        })
      },
      successCoverPath () {
        this.ruleForm.displayUrl = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token1.key
      },
      // 上传之前 清除原有图片
      clearUploadedImgPath () {
        // 如果有就清除
        if (this.ruleForm.iconUrl) {
          this.$refs.loadFile.clearFiles()
        }
        this.ruleForm.iconUrl = ''
      },
      clearUploadedCoverPath () {
        // 如果有就清除
        if (this.ruleForm.displayUrl) {
          this.$refs.upload.clearFiles()
        }
        this.ruleForm.displayUrl = ''
      },
      // 移除图片时清空form表单中的图片地址
      removeImgPath () {
        this.ruleForm.iconUrl = ''
      },
      removeCoverPath () {
        this.ruleForm.displayUrl = ''
      }
    }
  }
</script>
<style scoped>
  /*图片开始*/
  img {
    width: 148px;
    height: 148px;
  }

  .keySearch {
    padding:5px;
    width: 188px;
  }
  .treeWidth {
    width: 200px;
    height: 300px;
    overflow: auto;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    padding: 3px 10px;
    box-sizing: border-box;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  /*图片结束 */
  html, body {
    height: 100%;
  }

  .width {
    width: 203px;
  }

  .active {
    color: #20a0ff;
  }

  .demo-form-inline {
    padding-left: 10px;
  }

  .el-dialog__header {
    text-align: center;
  }

  .ruleForm > .el-form-item > .el-form-item__label {
    width: 100px !important;
  }

  .ruleForm > .el-form-item > .el-form-item__content {
    margin-left: 100px !important;
  }
</style>
