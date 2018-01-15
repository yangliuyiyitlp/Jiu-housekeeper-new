<template>
  <div>
    <el-form :inline="true" :model="cityForm" class="demo-form-inline">

      <el-form-item label="城市：" prop="cityName">
        <el-input
          :disabled=true
          :on-icon-click="searchMenu"
          icon="search"
          v-model="cityForm.cityName">
        </el-input>
      </el-form-item>

      <el-form-item label="换锁时间：">
        <el-date-picker
          v-model="cityForm.beginTime"
          @change="onBeginTimeChange"
          type="datetime">
        </el-date-picker>
        至
        <el-date-picker
          v-model="cityForm.endTime"
          @change="onEndTimeChange"
          type="datetime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input v-model="cityForm.name"></el-input>
      </el-form-item>
      <el-form-item label="旧车辆编号：">
        <el-input v-model="cityForm.oldCode"></el-input>
      </el-form-item>
      <el-form-item label="新车辆编号：">
        <el-input v-model="cityForm.newCode"></el-input>
      </el-form-item>

      <el-form-item v-if="hasPermission('/setting/lockNodes/view')">
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
      <el-form-item v-if="hasPermission('/setting/lockNodes/export')">
        <el-button type="primary" @click="exportForm">导出</el-button>
      </el-form-item>
    </el-form>
    <!--隐藏表单用于文件导出-->
    <form style="display: none" action="" method="get" ref="FileForm">
      <input name="areaId" v-model="exportParam.areaId"/>
      <input name="name" v-model="exportParam.name"/>
      <input name="oldCode" v-model="exportParam.oldCode"/>
      <input name="newCode" v-model="exportParam.newCode"/>
      <input name="beginTime" v-model="exportParam.beginTime"/>
      <input name="endTime" v-model="exportParam.endTime"/>
      <input name="pageSize" v-model="exportParam.pageSize"/>
      <input name="pageNum" v-model="exportParam.pageNum"/>
    </form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        header-align="center"
        align="center"
        prop="id"
        label="ID">
      </el-table-column>

      <el-table-column
        header-align="center"
        align="center"
        prop="oldBarcode"
        label="旧二维码编码">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="newBarcode"
        label="新二维码编号">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="operatorName"
        label="人员姓名">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        show-overflow-tooltip
        prop="warehouseName"
        label="仓库名称">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        show-overflow-tooltip
        prop="addTime"
        label="换锁时间">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.pageNum"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.count">
    </el-pagination>
    <div class="wrapperTree">
      <!--模态框-->
      <el-dialog title="城市" size="tiny" :visible.sync="cityVisible" center>
        关键字：<input ref='keySearch' type='text' class='keySearch' v-model="filterText">
        <el-tree
          ref="tree"
          highlight-current
          :data="select"
          :props="defaultProps"
          class="searchTree"
          accordion
          :filter-node-method="filterNode"
          @node-click="handleNode">
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="modifyCancel">取 消</el-button>
          <el-button type="primary" @click="doModify">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import a from '../../assets/js/getsessionId.js'
  import baseUrl from '../../utils/baseUrl'
  export default {
    data () {
      return {
        cityVisible: false,
        filterText: '',
        filterId: '',
        select: [],
        tableData: [],
        cityForm: {},
        exportParam: {},
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNum: 1},
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
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
    },
    methods: {
      searchMenu () {
        this.cityVisible = true
        this.filterText = ''
        this.cityTree()
      },
      cityTree () {
        this.$ajax.get(`${baseUrl.cityFencingUrl}/area/list`).then(res => {
          if (res.data.code === 200) {
            this.select = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        }
        ).catch(() => {
          this.$message({
            type: 'error',
            message: '获取城市列表失败'
          })
        })
      },
      doModify () {
        this.cityForm.cityName = this.filterText
        this.cityForm.areaId = this.filterId
        this.cityVisible = false
      },
      modifyCancel () {
        this.cityVisible = false
        this.cityForm.cityName = ''
        this.cityForm.areaId = ''
      },
      filterNode (value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      handleNode (data) {
        this.filterText = data.name
        this.filterId = data.id
      },
      onBeginTimeChange (val) {
        console.log(val)
//        this.cityForm.beginTime = val
        this.cityForm.beginTime = new Date(val).getTime()
      },
      onEndTimeChange (val) {
//        this.cityForm.endTime = val
        this.cityForm.endTime = new Date(val).getTime()
      },
      hasPermission (data) {
        if (this.permissionList && this.permissionList.length && this.permissionList.includes(data)) {
          return true
        }
        return false
      },
      handleSizeChange (val) {
        this.cityForm.pageSize = val
        this.pagination.pageSize = val
        this.query()
      },
      handleCurrentChange (val) {
        this.cityForm.pageNum = val
        this.pagination.pageNum = val
        this.query()
      },
      query () {
        this.exportParam.areaId = this.cityForm.areaId
        this.exportParam.name = this.cityForm.name
        this.exportParam.oldCode = this.cityForm.oldCode
        this.exportParam.newCode = this.cityForm.newCode
        this.exportParam.beginTime = this.cityForm.beginTime
        this.exportParam.endTime = this.cityForm.endTime
//        this.exportParam.pageNum = this.cityForm.pageNum
//        this.exportParam.pageSize = this.cityForm.pageSize
        if (this.cityForm.beginTime > this.cityForm.endTime) {
          alert('开始时间不能晚于结束时间')
          return
        } else if (this.cityForm.name && this.cityForm.name.length > 10) {
          alert('姓名长度不能超过10')
          return
        } else if (this.cityForm.oldCode && this.cityForm.oldCode.length > 20) {
          alert('编号长度不能超过20')
          return
        } else if (this.cityForm.beginTime && this.cityForm.beginTime.length > 20) {
          alert('编号长度不能超过20')
          return
        }
        this.$ajax.get(`${baseUrl.cityFencingUrl}/replace/lock/list`, {
          params: this.cityForm,
          timeout: 3000
        }).then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data
            this.pagination.count = res.data.total
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '获取列表信息失败'
          })
        })
      },
      exportForm () {
        this.$confirm('确定导出么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.exportParam.pageNum = ''
          this.exportParam.pageSize = ''
          this.$refs['FileForm'].setAttribute('action', `${baseUrl.cityFencingUrl}/exportAll `)
          this.$refs['FileForm'].submit()
          this.exportFormVisible = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消导出'
          })
        })
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
