<template>
  <div id="dataGrid">
    <el-form :inline="true" :model="requestParam" style="padding-left:10px;" class="demo-form-inline">
      <el-form-item label="城市名称:">
        <el-input v-model.trim="requestParam.cityName">
        </el-input>
      </el-form-item>
      <el-form-item label="显示顺序:">
        <el-input v-model.trim="requestParam.rank">
        </el-input>
      </el-form-item>
      <el-form-item label="广告位置:">
        <el-select v-model="requestParam.type" clearable>
          <el-option v-for="(val,key) in typeObj" v-bind:key=key :label=typeObj[key] :value=key></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="广告类型:">
        <el-select v-model="requestParam.displayType" clearable>
          <el-option v-for="(val,key) in disObj" v-bind:key=key :label=disObj[key] :value=key ref="s"></el-option>
          <!--<el-option label="app" value="1"></el-option>-->
          <!--<el-option label="广告" value="2"></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="安卓编号:">
        <el-input v-model.trim="requestParam.androidInmobiId">
        </el-input>
      </el-form-item>
      <el-form-item label="苹果编号:">
        <el-input v-model.trim="requestParam.iosInmobiId">
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
    <form action="" style="display: none"
          method=" " ref="FileForm">
      <input name="cityName" v-model="exportParam.cityName"/>
      <input name="rank" v-model="exportParam.rank"/>
      <input name="type" v-model="exportParam.type"/>
      <input name="displayType" v-model="exportParam.displayType"/>
      <input name="androidInmobiId" v-model="exportParam.androidInmobiId"/>
      <input name="iosInmobiId" v-model="exportParam.iosInmobiId"/>
      <input name="pageSize" v-model="exportParam.pageSize"/>
      <input name="pageNo" v-model="exportParam.pageNo"/>
    </form>
    <el-table
      :data="tableData"
      border
      stripe
      show-header
      style="width: 100%"
      fit
      @cell-click="more"
    >
      <el-table-column
        prop="id"
        label="id"
        v-if=0
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="城市名称"
        prop="cityName">
        <template slot-scope="scope">
          <span v-bind:class="{active: true}">{{ scope.row.cityName}}</span>
        </template>
      </el-table-column>

      <el-table-column
        header-align="center"
        align="center"
        label="显示顺序"
        sortable
        prop="rank">
        <template slot-scope="scope">
          <el-input v-model=scope.row.rank @focus="onFocus(scope)" @change="modifyOrder"></el-input>
        </template>

      </el-table-column>

      <el-table-column
        header-align="center"
        align="center"
        prop="type"
        label="广告位置">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="displayType"
        label="广告类型">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="androidInmobiId"
        label="安卓inmobi编号">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="iosInmobiId"
        label="苹果inmobi编号">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="更新时间"
        sortable
        prop="updateDate"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="remarks"
        show-overflow-tooltip
        label="备注">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
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
               :close-on-click-modal="false" class="demo-ruleForm">
      <el-form label-width="150px" :model="form" :rules="rules" ref="formA" class="tbody">
        <el-form-item label="城市名称：" ref='city' class="elform">
          <el-input v-model="form.cityName"></el-input>
          <div class="red" v-show='vif'>添加模式下，城市的添加以《快速添加到城市》的选项为准</div>
        </el-form-item>
        <el-form-item label="显示顺序：" prop="rank" class="elform">
          <el-input v-model="form.rank"></el-input>
        </el-form-item>
        <el-form-item label="广告位置：" prop="type">
          <el-select style='width:100%;' v-model="form.type" clearable>
            <el-option v-for="(val,key) in typeObj" v-bind:key=key :label=typeObj[key] :value=key></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告类型：" prop="displayType">
          <el-select style='width:100%;' v-model="form.displayType" clearable>
            <el-option v-for="(val,key) in disObj " v-bind:key=key :label=disObj[key] :value=key></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="安卓inmobi编号：" prop="androidInmobiId" class="elform">
          <el-input v-model="form.androidInmobiId"></el-input>
        </el-form-item>
        <el-form-item label="苹果inmobi编号：" prop="iosInmobiId" class="elform">
          <el-input v-model="form.iosInmobiId"></el-input>
        </el-form-item>
        <el-form-item label="备注：" class="elform">
          <el-input type="textarea" :row="3" v-model="form.remarks"></el-input>
        </el-form-item>
        <el-checkbox class='check-all' v-show="vif" :indeterminate="isIndeterminate" v-model="checkAll"
                     @change="handleCheckAllChange">快速添加城市：
        </el-checkbox>
        <el-form-item style="text-align: left;" v-show="vif">
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
      <el-form label-width="150px" :model="moreInfo" ref="formB" class="tbody">
        <el-form-item label="城市名称" class="elform">
          <el-input :value="moreInfo.cityName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" class="elform">
          <el-input :value="moreInfo.rank" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="广告位置" class="elform">
          <el-input :value="moreInfo.type" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="广告类型" class="elform">
          <el-input :value="moreInfo.displayType" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="安卓inmobi编号" class="elform">
          <el-input :value="moreInfo.androidInmobiId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="苹果inmobi编号" class="elform">
          <el-input :value="moreInfo.iosInmobiId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注：" class="elform">
          <el-input type="textarea" :row="3" :value="moreInfo.remarks" :disabled="true" style="resize:none"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancelMore">关 闭</el-button>
      </div>
    </el-dialog>
    <!--导出弹框-->
    <el-dialog size='tiny' title="导出" :visible.sync="exportFormVisible" :show-close="false"
               :close-on-press-escape="false"
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
        checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true,
        tableData: [],
        dialogFormVisible: false,  // 增加修改是否显示
        moreFormVisible: false,   // 详情
        exportFormVisible: false,
        addLoading: false,       // 是否显示loading
        form: {
          id: '',
          cityName: '',
          rank: '',
          type: '',
          displayType: '',
          androidInmobiId: '',
          iosInmobiId: '',
          remarks: ''
        },
        moreInfo: {
          cityName: '',
          rank: '',
          type: '',
          displayType: '',
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
            {required: true, message: '请选择广告位置', trigger: 'blur'}
          ],
          displayType: [
            {required: true, message: '请选择广告类型', trigger: 'blur'}
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
        // 获取inmobi广告类型
        this.$ajax.get('http://localhost:3000/activity/inmobi/display', {params: {type: 'inmobi_display_type'}})
          .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
              this.disObj[res.data[i].value] = res.data[i].label
            }
            // 获取inmobi广告位置
            this.$ajax.get('http://localhost:3000/activity/inmobi/display', {params: {type: 'inmobi_type'}})
              .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                  this.typeObj[res.data[i].value] = res.data[i].label
                }
                // 获取inmobi广告配置列表
                this.$ajax.get('http://localhost:3000/activity/inmobi/tDisplayType/list', {params: this.requestParam})
                  .then((response) => {
                    if (response.data.code === 0) {
                      this.tableData = response.data.page.list
                      for (let i = 0; i < response.data.page.list.length; i++) {
                        this.tableData[i].displayType = this.disObj[response.data.page.list[i].displayType]
                        this.tableData[i].type = this.typeObj[response.data.page.list[i].type]
                      }
                      this.pagination.count = response.data.page.count
                    } else {
                      this.$message({
                        type: 'error',
                        message: response.data.msg
                      })
                    }
                  })
                  .catch(() => {
                    this.$message({
                      type: 'info',
                      message: '获取广告配置列表异常'
                    })
                  })
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '获取广告位置异常'
                })
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '获取广告类型失败'
            })
          })
      },
      modifyRecord: function (scope) {
        this.vif = false
        this.dialogFormVisible = true
        // 获取当前行的详细信息
        this.$ajax.get('http://localhost:3000/activity/inmobi/tDisplayType/form', {params: {id: scope.row.id}})
          .then((res) => {
            if (res.status === 200) {
              this.form.id = res.data.tDisplayType.id
              this.form.cityName = res.data.tDisplayType.cityName
              this.form.rank = res.data.tDisplayType.rank
              this.form.type = res.data.tDisplayType.type
              this.form.displayType = res.data.tDisplayType.displayType
              this.form.androidInmobiId = res.data.tDisplayType.androidInmobiId
              this.form.iosInmobiId = res.data.tDisplayType.iosInmobiId
              this.form.remarks = res.data.tDisplayType.remarks
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '获取详细信息异常'
            })
          })
      },
      deleteRecord: function (id) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (id !== undefined) {
            // 调用后台服务
            // 删除当前信息
            this.$ajax.get('http://localhost:3000/activity/inmobi/tDisplayType/delete', {params: {'id': id}})
              .then((response) => {
                if (response.data.code === 0) {
                  // 删除成功
                  this.$message({
                    type: 'success',
                    message: response.data.msg
                  })
//                this.$refs['formA'].resetFields()
                  // 刷新页面
                  this.query()
                } else {
                  this.$message({
                    type: 'error',
                    message: '删除异常'
                  })
                }
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '删除失败'
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
      doModify (formName) {       // 增加修改确定功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false
            this.form.areaNames = this.checkedCities.join(',')
            this.checkedCities = []
            this.$ajax.get('http://localhost:3000/activity/inmobi/tDisplayType/save', {params: this.form})
              .then((response) => {
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
                    message: response.data.msg
                  })
                }
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '保存异常'
                })
              })
          } else {
            return false
          }
        })
      },
      cancelOperate: function () {
        console.log('form', JSON.stringify(this.form))
        this.dialogFormVisible = false
        this.$nextTick(function () {
          if (this.$refs['formA'] !== undefined) {
            this.$refs['formA'].resetFields()
          }
        })
        this.form = {
          cityName: '',
          rank: '',
          type: '',
          displayType: '',
          androidInmobiId: '',
          iosInmobiId: '',
          remarks: '',
          areaNames: ''
        }
      },
      more: function (row, column, cell, event) {
        if (column.property !== 'cityName') {
          return false
        } else {
          this.moreFormVisible = true
          this.$ajax.get('http://localhost:3000/activity/inmobi/tDisplayType/view_form', {params: {id: row.id}})
            .then(res => {
              if (res.data.code === 0) {
                this.moreInfo.type = this.typeObj[res.data.tDisplayType.type]
                this.moreInfo.displayType = this.disObj[res.data.tDisplayType.displayType]
                this.moreInfo.cityName = res.data.tDisplayType.cityName
                this.moreInfo.androidInmobiId = res.data.tDisplayType.androidInmobiId
                this.moreInfo.iosInmobiId = res.data.tDisplayType.iosInmobiId
                this.moreInfo.rank = res.data.tDisplayType.rank
                this.moreInfo.remarks = res.data.tDisplayType.remarks
              }
            })
            .catch(err => {
              this.$message({
                type: 'error',
                message: err.data.msg
              })
            })
        }
      },
      cancelMore: function () {
        this.moreFormVisible = false
      },
      handleSizeChange: function (val) {
        this.requestParam.pageSize = val
        this.pagination.pageSize = val
        this.query()
      },
      handleCurrentChange: function (val) {
        this.requestParam.pageNo = val
        this.pagination.pageNo = val
        this.query()
      },
      addNewRecord: function () {
        this.dialogFormVisible = true
        this.vif = true
        this.checkedCities = []
        this.form = {
          id: '',
          cityName: '',
          rank: '',
          type: '',
          displayType: '',
          androidInmobiId: '',
          iosInmobiId: '',
          remarks: '',
          areaNames: ''
        }
        this.$nextTick(() => {
          if (this.$refs['formA'] !== undefined) {
            this.$refs['formA'].resetFields()
          }
        })
        this.$ajax.get('http://localhost:3000/activity/inmobi/tDisplayType/findMaxSort')
          .then((res) => {
            if (res.status === 200) {
              this.form.rank = res.data.maxSort
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '获取信息异常'
            })
          })
      },
      exportFile: function () {
        this.exportFormVisible = true
      },
      cancelExport: function () {
        this.exportFormVisible = false
      },
      // TODO node没更新
      exportCurrent: function () {
        this.exportParam.pageSize = this.pagination.pageNo
        this.exportParam.pageSize = this.pagination.pageSize
        this.$refs['FileForm'].setAttribute('action', 'http://localhost:3000/activity/inmobi/tDisplayType/export')
        this.$refs['FileForm'].setAttribute('method', 'get')
        this.$refs['FileForm'].submit()
      },
      // TODO node没更新
      exportAll: function () {
        this.exportParam.pageSize = ''
        this.exportParam.pageNo = ''
        this.$refs['FileForm'].setAttribute('action', 'http://localhost:3000/activity/inmobi/tDisplayType/exportAll')
        this.$refs['FileForm'].setAttribute('method', 'post')
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
        let obj = this.modifyOrders.find(item => item.id === this.focusId)
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
//        this.vm.$ajax(
//          {
//            method: 'post',
//            url: 'http://172.16.20.235:10001/a/electric/inmobidisplay/tDisplayType/interface/updateSort',
//            data: this.tableData,
//            headers: {
//              'Content-Type': 'multipart/form-data'
//            }
//          }
//        ).then(function (response) {
//          this.$message({
//            message: response.data,
//            type: 'success'
//          })
//          console.log(response.data)
//        }).catch(function (error) {
//          console.log(error)
//        })
        if (this.modifyOrders === [] || this.modifyOrders === undefined) {
          return
        }
        // post 到后台
        let ids = []
        let sorts = []
        let newids = []
        let newsorts = []
        this.modifyOrders.forEach(function (value, index) {
          ids.push(value.id)
          sorts.push(value.rank)
          newids = ids.join(',')
          newsorts = sorts.join(',')
        })
        // 保存排序
        this.$ajax.get('http://localhost:3000/activity/inmobi/tDisplayType/updateSort', {
          params: {
            'ids': newids,
            'sorts': newsorts
          }
        })
          .then(function (res) {
            this.$message({
              message: res.data.mesage,
              type: 'success'
            })
            this.query()
          }.bind(this))
          .catch(function (err) {
            this.$message({
              message: err.data.msg,
              type: 'error'
            })
          })
      }
    }
  }
</script>
<style scoped>
  #dataGrid {
    padding-top: 20px;
  }

  .red {
    color: red;
  }

  .check-all {
    width: 150px;
    float: left;
    padding-top: 6px;
  }

  .demo-ruleForm {
    font-size: 20px !important;
    text-align: center;
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
