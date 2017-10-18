<template>
  <div id="dataGrid">
    <el-form :inline="true" :model="requestParam" style="padding-left:10px;" class="demo-form-inline">
      <el-form-item label="城市名称:">
        <el-input v-model="requestParam.cityName">
        </el-input>
      </el-form-item>
      <el-form-item label="显示顺序:">
        <el-input v-model="requestParam.rank">
        </el-input>
      </el-form-item>
      <el-form-item label="广告位置:">
        <el-select v-model="requestParam.type" clearable>
          <el-option label="活动二级弹窗" value="1"></el-option>
          <el-option label="启动页" value="2"></el-option>
          <el-option label="确认换车后" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="广告类型:">
        <el-select v-model="requestParam.displayType" clearable>
          <el-option label="app" value="1"></el-option>
          <el-option label="广告" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="安卓编号:">
        <el-input v-model="requestParam.androidInmobiId">
        </el-input>
      </el-form-item>
      <el-form-item label="苹果编号:">
        <el-input v-model="requestParam.iosInmobiId">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exportFile">导出</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addNewRecord">新增</el-button>
      </el-form-item>
    </el-form>
    <!--隐藏表单用于文件导出-->
    <form action="http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/export" style="display: none"
          method="post" ref="FileForm">
      <input name="cityName" v-model="exportParam.cityName"/>
      <input name="rank" v-model="exportParam.rank"/>
      <input name="type" v-model="exportParam.type"/>
      <input name="displayType" v-model="exportParam.displayType"/>
      <input name="androidInmobiId" v-model="exportParam.androidInmobiId"/>
      <input name="iosInmobiId" v-model="exportParam.iosInmobiId"/>
    </form>
    <el-table
      :data="tableData"
      border
      show-header
      style="width: 100%"
      fit
    >
      <el-table-column
        prop="id"
        label="id"
      >
      </el-table-column>
      <el-table-column
        prop="cityName"
        show-overflow-tooltip
        label="城市名称">
      </el-table-column>
      <el-table-column
        label="显示顺序"
        sortable
        prop="rank"
      >
        <template slot-scope="scope">
          <el-input v-bind:value=scope.row.rank @focus="onFocus(scope)" @change="modifyOrder"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="广告位置">
      </el-table-column>
      <el-table-column
        prop="displayType"
        label="广告类型">
      </el-table-column>
      <el-table-column
        prop="androidInmobiId"
        label="安卓inmobi编号">
      </el-table-column>
      <el-table-column
        prop="iosInmobiId"
        label="苹果inmobi编号">
      </el-table-column>
      <el-table-column
        label="更新时间"
        sortable
        prop="updateDate"
      >
      </el-table-column>
      <el-table-column
        prop="remarks"
        show-overflow-tooltip
        label="备注">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="modifyRecord(scope)" type="text" size="small">修改</el-button>
          <el-button @click="deleteRecord(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="modifyRank.trim() !== ''">
      <el-button type="info" size="small" @click="doModifyOrder">保存排序</el-button>
    </div>
    <div v-else>
      <el-button type="info" size="small" @click="doModifyOrder" :disabled="true">保存排序</el-button>
    </div>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.pageNo"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.count">
    </el-pagination>
    <!--增加修改弹框-->
    <el-dialog title="添加/修改" :visible.sync="dialogFormVisible" :show-close="false" :close-on-press-escape="false"
               :close-on-click-modal="false" class="demo-ruleForm ">
      <el-form label-width="150px" :model="form" :rules="rules" ref="formA" class="tbody">
        <el-form-item label="城市名称：" prop="cityName" class="elform">
          <el-input v-model="form.cityName"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序：" prop="rank" class="elform">
          <el-input v-model="form.rank"></el-input>
        </el-form-item>
        <el-form-item label="广告位置：" prop="type">
          <el-select style='width:100%;' v-model="form.type" clearable>
            <el-option label="活动二级弹窗" value="5"></el-option>
            <el-option label="启动页" value="6"></el-option>
            <el-option label="确认换车后" value="9"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告类型：" prop="displayType">
          <el-select style='width:100%;' v-model="form.displayType" clearable>
            <el-option label="app" value="1"></el-option>
            <el-option label="广告" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="安卓inmobi编号：" prop="androidInmobiId" class="elform">
          <el-input v-model="form.androidInmobiId"></el-input>
        </el-form-item>
        <el-form-item label="苹果inmobi编号：" prop="iosInmobiId" class="elform">
          <el-input v-model="form.iosInmobiId"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="remarks" class="elform">
          <el-input type="textarea" :row="3" v-model="form.remarks"></el-input>
        </el-form-item>

        <el-checkbox class='check-all' v-if="vif" :indeterminate="isIndeterminate" v-model="checkAll"
                     @change="handleCheckAllChange">快速添加城市：
        </el-checkbox>
        <el-form-item v-if="vif" style="text-align: left;">
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelOperate">取 消</el-button>
        <el-button type="primary" @click="doModify('formA')" :loading="addLoading">确 定</el-button>
      </div>
    </el-dialog>
    <!--详情弹框-->
    <el-dialog title="详情" :visible.sync="moreFormVisible" :show-close="false" :close-on-press-escape="false"
               :close-on-click-modal="false" class="demo-ruleForm ">

      <el-form label-width="150px" :model="moreinfo" ref="formA" class="tbody">
        <el-form-item label="锁厂名称" class="elform">
          <el-input :value="moreinfo.type" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="锁厂家编号" class="elform">
          <el-input :value="moreinfo.displayType" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="添加时间" class="elform">
          <el-input :value="moreinfo.cityName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="更新时间" class="elform">
          <el-input :value="moreinfo.androidInmobiId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="操作者" class="elform">
          <el-input :value="moreinfo.iosInmobiId" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancelmore">关 闭</el-button>
      </div>
    </el-dialog>
    <!--导出弹框-->
    <el-dialog title="导出" :visible.sync="exportFormVisible" :show-close="false" :close-on-press-escape="false"
               :close-on-click-modal="false" class="demo-ruleForm ">
      <el-button @click="exportCurrent">导出当前页</el-button>
      <el-button @click="exportAll">导出所有</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelExport">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  const cityOptions = ['成都市', '湖州市', '北京市', '深圳市', '厦门市', '佛山市', '珠海市']
  export default {
    created: function () {
      this.query()
    },
    data: function () {
      return {
        typeObj: {},
        disObj: {},
        vif: false,
        checkAll: true,
        checkedCities: '',
        cities: cityOptions,
        isIndeterminate: true,
        tableData: [],
        dialogFormVisible: false,  // 增加修改是否显示
        moreFormVisible: false,   // 详情
        exportFormVisible: false,
        addLoading: false,       // 是否显示loading
        form: {
          cityName: '',
          rank: '',
          type: '',
          displayType: '',
          androidInmobiId: '',
          iosInmobiId: '',
          remarks: ''
        },
        moreinfo: {
          type: '',
          displayType: '',
          cityName: '',
          androidInmobiId: '',
          iosInmobiId: '',
          remarks: ''
        },
        formLabelWidth: '80px',
        requestParam: {
          cityName: '',
          rank: '',
          type: '',
          displayType: '',
          androidInmobiId: '',
          iosInmobiId: '',
          pageSize: 30,
          pageNo: 1
        },
        rules: {
          cityName: [
            {required: true, message: '请输入城市名称', trigger: 'blur'}
          ],
          rank: [
            {required: true, message: '请输入显示顺序', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请输入广告位置', trigger: 'blur'}
          ],
          displayType: [
            {required: true, message: '请输入广告类型', trigger: 'blur'}
          ],
          androidInmobiId: [
            {required: true, message: '请输入安卓inmobi编号', trigger: 'blur'}
          ],
          iosInmobiId: [
            {required: true, message: '请输入苹果inmobi编号', trigger: 'blur'}
          ]
        },
        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1},
        exportParam: {
          cityName: '',
          rank: '',
          type: '',
          displayType: '',
          androidInmobiId: '',
          iosInmobiId: '',
          pageSize: 30,
          pageNo: 1
        },
        modifyOrders: [],
        focusId: '',
        focusRank: '',
        modifyRank: ''
      }
    },
    methods: {
      query: function () {
        this.exportParam.cityName = this.requestParam.cityName
        this.exportParam.rank = this.requestParam.rank
        this.exportParam.type = this.requestParam.type
        this.exportParam.displayType = this.requestParam.displayType
        this.exportParam.androidInmobiId = this.requestParam.androidInmobiId
        this.exportParam.iosInmobiId = this.requestParam.iosInmobiId
        this.exportParam.pageNo = this.requestParam.pageNo
        this.exportParam.pageSize = this.requestParam.pageSize
        this.$http.get('http://172.16.20.235:10001/a/sys/dictutils/interface/getDictList', {params: {type: 'inmobi_display_type'}}).then(function (res) {
          for (var i = 0; i < res.data.length; i++) {
            this.disObj[res.data[i].value] = res.data[i].label
          }
        }).then(function () {
          this.$http.get('http://172.16.20.235:10001/a/sys/dictutils/interface/getDictList', {params: {type: 'inmobi_type'}}).then(function (res) {
            for (var i = 0; i < res.data.length; i++) {
              this.typeObj[res.data[i].value] = res.data[i].label
            }
          })
        }).then(function () {
          this.$http.get('http://172.16.20.235:10001/a/electric/inmobidisplay/tDisplayType/interface/list', {params: this.requestParam}).then(function (response) {
            if (response.status === 200) {
              this.tableData = response.data.page.list
              console.log(this.tableData)
              for (var i = 0; i < response.data.page.list.length; i++) {
                this.tableData[i].displayType = this.disObj[response.data.page.list[i].displayType]
                this.tableData[i].type = this.typeObj[response.data.page.list[i].type]
              }
              this.pagination.count = response.data.page.count
            } else {
              this.$message({
                type: 'info',
                message: '获取列表信息失败'
              })
            }
          }, function (err) {
            this.$message({
              type: 'info',
              message: '获取列表信息失败' + err.status
            })
          })
        })
      },
      modifyRecord: function (scope) {
        this.vif = false
        this.dialogFormVisible = true
        this.form.cityName = scope.row.cityName
        this.form.rank = scope.row.rank
        this.form.type = scope.row.type
        this.form.displayType = scope.row.displayType
        this.form.androidInmobiId = scope.row.androidInmobiId
        this.form.iosInmobiId = scope.row.iosInmobiId
        this.form.remarks = scope.row.remarks
      },
      deleteRecord: function (id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (id !== undefined) {
            // 调用后台服务
            // 删除元素
            this.$http.get('http://172.16.20.235:10001/a/electric/inmobidisplay/tDisplayType/interface/delete', {params: {'id': id}}).then(function (response) {
              if (response.status === 200) {
                // 删除成功
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.$refs['formA'].resetFields()
                // 刷新页面
                this.query()
              } else {
                this.$message({
                  type: 'error',
                  message: '删除记录失败:' + response.data.msg
                })
              }
            }, function (err) {
              this.$message({
                type: 'info',
                message: '操作失败' + err.status
              })
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '删除记录失败'
          })
        })
      },
      doModify: function (formName) {       // 修改确定功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url = ''
            if (this.form.id === undefined || this.form.id === '') {
              url = 'http://172.16.20.235:10001/a/electric/inmobidisplay/tDisplayType/interface/save' // 修改功能
            } else {
              url = 'http://172.16.20.235:10001/a/electric/inmobidisplay/tDisplayType/interface/form'// 新增功能
            }
            this.dialogFormVisible = false
            this.$http.get(url, {params: this.form}).then(function (response) {
              if (response.status === 200) {
                // 更新成功
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                // 刷新页面
                this.query()
              } else {
                this.$message({
                  type: 'error',
                  message: '操作失败:' + response.data.msg
                })
              }
            }, function (err) {
              this.$message({
                type: 'info',
                message: '操作失败' + err.status
              })
            })
          } else {
            console.log('error submit!!')
            return
          }
        })
      },
      cancelOperate: function () {
        this.dialogFormVisible = false
        this.form = {
          cityName: '',
          rank: '',
          type: '',
          displayType: '',
          androidInmobiId: '',
          iosInmobiId: '',
          remarks: ''
        }
        this.$refs['formA'].resetFields()
      },
      more: function (row, column, cell, event) {
        if (column.property !== 'factoryName') {
          return false
        } else {
          this.moreFormVisible = true
          this.$http.get('http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/form', {params: {id: row.id}}).then(function (res) {
            if (res.data.code === 0) {
              this.moreinfo.type = res.data.tLockFactoryInfo.type
              this.moreinfo.displayType = res.data.tLockFactoryInfo.displayType
              this.moreinfo.cityName = res.data.tLockFactoryInfo.cityName
              this.moreinfo.androidInmobiId = res.data.tLockFactoryInfo.androidInmobiId
              this.moreinfo.iosInmobiId = res.data.tLockFactoryInfo.iosInmobiId
            }
          }).catch(function (err) {
            this.$message({
              type: 'info',
              message: '获取详情失败' + err.status
            })
          })
        }
      },
      cancelmore: function () {
        this.moreFormVisible = false
      },
      handleSizeChange: function (val) {
        this.requestParam.pageSize = val
        this.query()
      },
      handleCurrentChange: function (val) {
        this.requestParam.pageNo = val
        this.query()
      },
      addNewRecord: function () {
        this.vif = true
        this.form = {
          cityName: '',
          rank: '',
          type: '',
          displayType: '',
          androidInmobiId: '',
          iosInmobiId: '',
          remarks: ''
        }
        this.dialogFormVisible = true
      },
      exportFile: function () {
        this.exportFormVisible = true
      },
      cancelExport: function () {
        this.exportFormVisible = false
      },
      exportCurrent: function () {
        this.$refs['FileForm'].setAttribute('action', 'http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/export')
        this.$refs['FileForm'].submit()
      },
      exportAll: function () {
        this.exportParam.pageSize = ''
        this.exportParam.pageNo = ''
        this.$refs['FileForm'].setAttribute('action', 'http://116.231.72.55:10001/a/electric/lockfactoryinfo/interface/exportAll')
        this.$refs['FileForm'].submit()
      },
      handleCheckAllChange (event) {
        this.checkedCities = event.target.checked ? cityOptions : []
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange (value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.cities.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
      },
      onFocus (scope) {
        this.focusId = scope.row.id
        this.focusRank = scope.row.rank
      },
      modifyOrder (val) {
        this.modifyRank = val
        console.log(this.focusId, val)
        var obj = this.modifyOrders.find(item => item.id === this.focusId)
        if (val !== undefined && val.trim() !== '') {
          if (this.focusRank === val) {  // 修改的值是原始的值
            // 判断该记录的id 是否已经存在
            if (obj !== undefined) {
              this.modifyOrders.pop(obj)
            }
          } else {
            if (obj !== undefined) {
              obj.rank = val
            } else {
              this.modifyOrders.push({'id': this.focusId, 'rank': val})
            }
          }
        } else {
          if (obj !== undefined) {
            this.modifyOrders.pop(obj)
          }
        }
      },
      doModifyOrder () {
        console.log(JSON.stringify(this.modifyOrders))
        if (this.modifyOrders === [] || this.modifyOrders === undefined) {
          return
        }
        // post 到后台
        var ids = []
        var sorts = []
        this.modifyOrders.forEach(function (value, index) {
          ids.push(value.id)
          sorts.push(value.rank)
        })
        this.$ajax(
          {
            method: 'post',
            url: '/tDisplayType/interface/updateSort',
            data: JSON.stringify({'ids': ids, 'sorts': sorts}),
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function (response) {
          this.$message({
            message: response.data,
            type: 'success'
          })
          console.log(response.data)
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>
<style scoped>

  .check-all {
    width: 150px;
    float: left;
  }

  .demo-ruleForm {
    font-size: 20px !important;
    text-align: center;
  }

  .el-dialog--small {

  }

  .tbody[data-v-30c85a31] {
    height: 350px !important;
  }

  .active {
    color: #20a0ff;
  }

  .module {
    height: 240px !important;
    width: 400px !important;
  }

  .tbody {
    height: 450px !important;
  }

  .addUp {
    height: 240px !important;
  }

  .elform {
    text-align: left !important;
  }

  .el-form-item__content {
    margin-left: 100px !important;
  }

  .el-dialog {
    width: 500px !important;
    height: 350px;
  }

  .cell {
    text-align: center;
  }

  .el-dialog {
    width: 20%;
  }

  .el-dialog__title {
    text-align: left;
    margin-left: 0%;
  }
</style>
