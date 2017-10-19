<template>
  <div class="right">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!--优惠券配置列表-->
      <el-tab-pane label="优惠券配置列表" name="first" style="padding-left:10px;">

        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="优惠券编号:">
            <el-input v-model="formInline.coupon_number" placeholder="输入优惠券编号">
            </el-input>
          </el-form-item>

          <el-form-item label="商标:">
            <el-input v-model="formInline.trademark" placeholder="输入商标">
            </el-input>
          </el-form-item>

          <el-form-item label="商户名:">
            <el-input v-model="formInline.business_name" placeholder="输入商户名">
            </el-input>
          </el-form-item>

          <el-form-item label="手机号:">
            <el-input v-model="formInline.mobile_phone" placeholder="输入手机号">
            </el-input>
          </el-form-item>

          <el-form-item label="活动:">
            <el-input v-model="formInline.activity" placeholder="输入活动">
            </el-input>
          </el-form-item>

          <el-form-item label="所属城市:">
            <el-input v-model="formInline.city" placeholder="输入所属城市">
            </el-input>
          </el-form-item>

          <el-form-item label="优惠券状态:">
            <el-select v-model="formInline.coupon_status" placeholder="选择优惠券状态" clearable>
              <el-option label="未领取" value="1"></el-option>
              <el-option label="已领取" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="优惠券类型:">
            <el-select v-model="formInline.coupon_type" placeholder="选择优惠券类型" clearable>
              <el-option label="商户优惠券" value="1"></el-option>
              <el-option label="骑行券" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="生效时间:">
            <el-date-picker
              v-model="formInline.effective_time_begin"
              type="date"
              placeholder="开始生效时间">
            </el-date-picker>
            <el-date-picker
              v-model="formInline.effective_time_end"
              type="date"
              placeholder="结束生效时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="失效时间:">
            <el-date-picker
              v-model="formInline.failure_time_begin"
              type="date"
              placeholder="开始失效时间">
            </el-date-picker>
            <el-date-picker
              v-model="formInline.Failure_time_end"
              type="date"
              placeholder="结束失效时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="exportData">导出</el-button>
          </el-form-item>
        </el-form>

        <!--表格-->
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          stripe>
          <el-table-column
            header-align="center"
            align="center"
            prop="id"
            label="id"
            v-if=0>
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="city"
            label="所属城市"
            width="150">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="coupon_number"
            label="优惠券编号"
            width="120">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="business_name"
            label="商户名"
            width="120">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="coupon_status"
            label="优惠券状态"
            width="120">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="coupon_type"
            label="骑行券"
            width="140">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="coupon_content"
            label="优惠内容"
            width="130">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="use_info"
            label="用户信息"
            width="110">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="mobile_phone"
            label="用户手机"
            width="140">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="activity"
            label="活动"
            width="120">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="effective_date"
            label="生效时间"
            width="170">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="failure_date"
            label="失效时间"
            width="170">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="update_date"
            label="更新时间"
            width="170">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="des"
            label="备注"
            width="200">
          </el-table-column>

          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="modify()">修改</el-button>
              <el-button
                @click="open2(scope.$index, tableData)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
        <!--<el-pagination-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="pagination.pageNo"-->
        <!--:page-sizes="pagination.pageSizes"-->
        <!--:page-size="pagination.pageSize"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="pagination.count">-->
        <!--</el-pagination>-->

      </el-tab-pane>

      <!--优惠券配置添加-->
      <el-tab-pane label="优惠券配置添加" name="second" class="second">

        <el-form ref="form" :model="form" label-width="150px">

          <el-form-item label="优惠券编号:">
            <el-input v-model="form.city_name" placeholder="填写优惠券编号"></el-input>
          </el-form-item>

          <el-form-item label="城市:">
            <el-select v-model="form.city" placeholder="选择城市" clearable>
              <el-option label="成都市" value="1"></el-option>
              <el-option label="湖州市" value="2"></el-option>
              <el-option label="上海市" value="3"></el-option>
              <el-option label="北京市" value="4"></el-option>
              <el-option label="深圳市" value="5"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商标:">
            <!--<el-input v-model="form.trademark"></el-input>-->
            <el-button type="primary">选择文件</el-button>
            <el-button type="primary">开始上传</el-button>
          </el-form-item>

          <el-form-item label="商户名:">
            <el-input v-model="form.business_name"></el-input>
          </el-form-item>

          <el-form-item label="优惠券类型:">
            <el-select v-model="form.coupon_type" placeholder="选择优惠券类型" clearable>
              <el-option label="商户优惠券" value="1"></el-option>
              <el-option label="骑行券" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="优惠券内容:">
            <el-input v-model="form.coupon_content" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item label="详情url:">
            <el-input v-model="form.details_url" placeholder="填写详情url"></el-input>
          </el-form-item>

          <el-form-item label="有效时间:">
            <el-date-picker
              v-model="form.effective_time_begin"
              type="date"
              placeholder="开始时间">
            </el-date-picker>
            -
            <el-date-picker
              v-model="form.effective_time_end"
              type="date"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input v-model="form.des" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveData">保存</el-button>
            <el-button>返回</el-button>
          </el-form-item>

        </el-form>

      </el-tab-pane>

      <!--优惠券批量导入-->
      <el-tab-pane label="优惠券批量导入" name="third" class="second">

        <el-form ref="form" :model="form_batch" label-width="150px">

          <el-form-item label="商标:">
            <!--<el-input v-model="form_batch.trademark"></el-input>-->
            <el-button type="primary">选择文件</el-button>
            <el-button type="primary">开始上传</el-button>
          </el-form-item>

          <el-form-item label="城市:">
            <el-select v-model="form_batch.city" placeholder="选择城市" clearable>
              <el-option label="成都市" value="1"></el-option>
              <el-option label="湖州市" value="2"></el-option>
              <el-option label="上海市" value="3"></el-option>
              <el-option label="北京市" value="4"></el-option>
              <el-option label="深圳市" value="5"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商户名:">
            <el-input v-model="form_batch.business_name"></el-input>
          </el-form-item>

          <el-form-item label="优惠券类型:">
            <el-select v-model="form_batch.coupon_type" placeholder="选择优惠券类型" clearable>
              <el-option label="商户优惠券" value="1"></el-option>
              <el-option label="骑行券" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="优惠券内容:">
            <el-input v-model="form_batch.coupon_content" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item label="详情url:">
            <el-input v-model="form_batch.details_url" placeholder="填写详情url"></el-input>
          </el-form-item>

          <el-form-item label="有效时间:">
            <el-date-picker
              v-model="form_batch.effective_time_begin"
              type="date"
              placeholder="开始时间">
            </el-date-picker>
            -
            <el-date-picker
              v-model="form_batch.effective_time_end"
              type="date"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input v-model="form_batch.des" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="selectFile">选择文件</el-button>
            <el-button type="primary" @click="importData">导入</el-button>
            <el-button @click="downloadTemplate">下载模板</el-button>
            <el-button>返回</el-button>
          </el-form-item>

        </el-form>

      </el-tab-pane>

    </el-tabs>

    <!--模态框-->
    <!--修改弹框-->
    <el-dialog title="添加/修改" :visible.sync="dialogFormVisible" :show-close="false" :close-on-press-escape="false"
               :close-on-click-modal="false" class="demo-ruleForm ">
      <el-form label-width="150px" :model="form" :rules="rules" ref="formA" class="tbody">
        <el-form-item v-if="!vif" label="城市名称：" prop="cityName" class="elform">
          <el-input v-model="form.cityName"></el-input>
          <!--<p v-if="vif" style="color:red;">添加模式下，城市的添加以《快速添加城市》的选项为准</p>-->
        </el-form-item>
        <el-form-item label="显示顺序：" prop="rank" class="elform">
          <el-input v-model="form.rank"></el-input>
        </el-form-item>
        <el-form-item label="广告位置：" prop="type">
          <el-select style='width:100%;' v-model="form.type" clearable>
            <el-option v-for="(val,idx) in typeObj" :label=typeObj[idx] :value=idx></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告类型：" prop="displayType">
          <el-select style='width:100%;' v-model="form.displayType" clearable>
            <el-option v-for="(val,idx) in disObj" :label=disObj[idx] :value=idx></el-option>
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
        <!--ToDO-->
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value1: '',
        activeName2: 'first',
        formInline: {
          coupon_number: '',
          trademark: '',
          business_name: '',
          mobile_phone: '',
          activity: '',
          city: '',
          coupon_status: '',
          coupon_type: '',
          effective_time_begin: '',
          effective_time_end: '',
          failure_time_begin: '',
          Failure_time_end: ''
        },
        form: {
          city: '',
//          trademark: '',
          business_name: '',
          coupon_type: '',
          coupon_content: '',
          details_url: '',
          effective_time_begin: '',
          effective_time_end: '',
          des: ''
        },
        form_batch: {
          city: '',
//          trademark: '',
          business_name: '',
          coupon_type: '',
          coupon_content: '',
          details_url: '',
          effective_time_begin: '',
          effective_time_end: '',
          des: ''
        },
        tableData: [{
          id: '1300',
          city: '上海市shanghai',
          coupon_number: 'OFTS3ACC81',
          business_name: '饿了么',
          coupon_status: '已领取',
          coupon_type: '商户优惠券',
          coupon_content: '满16元减2.8',
          use_info: '99宝贝',
          mobile_phone: '125458425784',
          activity: '饿了么',
          effective_date: '2017-09-21 15:51:12',
          failure_date: '2017-09-21 15:51:12',
          update_date: '2017-09-21 15:51:12',
          des: '上海市'
        }, {
          id: '1300',
          city: '上海市shanghai',
          coupon_number: 'OFTS3ACC81',
          business_name: '饿了么',
          coupon_status: '已领取',
          coupon_type: '商户优惠券',
          coupon_content: '满16元减2.8',
          use_info: '99宝贝',
          mobile_phone: '125458425784',
          activity: '饿了么',
          effective_date: '2017-09-21 15:51:12',
          failure_date: '2017-09-21 15:51:12',
          update_date: '2017-09-21 15:51:12',
          des: '上海市'
        }, {
          id: '1300',
          city: '上海市shanghai',
          coupon_number: 'OFTS3ACC81',
          business_name: '饿了么',
          coupon_status: '已领取',
          coupon_type: '商户优惠券',
          coupon_content: '满16元减2.8',
          use_info: '99宝贝',
          mobile_phone: '125458425784',
          activity: '饿了么',
          effective_date: '2017-09-21 15:51:12',
          failure_date: '2017-09-21 15:51:12',
          update_date: '2017-09-21 15:51:12',
          des: '上海市'
        }, {
          id: '1300',
          city: '上海市shanghai',
          coupon_number: 'OFTS3ACC81',
          business_name: '饿了么',
          coupon_status: '已领取',
          coupon_type: '商户优惠券',
          coupon_content: '满16元减2.8',
          use_info: '99宝贝',
          mobile_phone: '125458425784',
          activity: '饿了么',
          effective_date: '2017-09-21 15:51:12',
          failure_date: '2017-09-21 15:51:12',
          update_date: '2017-09-21 15:51:12',
          des: '上海市'
        }],
        currentPage: 1
//        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1}
      }
    },
    methods: {
      handleClick (tab, event) {
//        console.log(tab, event)
      },
      search () {
        console.log('search!')
      },
      exportData () {
        console.log('exportData!')
      },
//      modify (row, column, cell, event) {
//        console.log((row, column, cell, event))
//      },
      modify () {
        console.log(1)
      },
      deleteRow (index, rows) {
        rows.splice(index, 1)
      },
      open2 (index, rows) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRow(index, rows)
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
      handleSizeChange: function (val) {
        console.log(`每页 ${val} 条`)
//        this.requestParam.pageSize = val
//        this.query()
      },
      handleCurrentChange: function (val) {
        console.log(`当前页: ${val}`)
//        this.requestParam.pageNo = val
//        this.query()
      },
      saveData () {},
      selectFile () {},
      importData () {},
      downloadTemplate () {}
    }
  }
</script>

<style scoped>
  .right {

  }

  .second .textarea, .second .el-input, .second .el-input__inner {
    width: 300px;
  }
</style>
