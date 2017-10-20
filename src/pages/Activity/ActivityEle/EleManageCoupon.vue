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
              <el-option v-for="item in t_cup_state" :label=item.label :value=item.value :key="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="优惠券类型:">
            <el-select v-model="formInline.coupon_type" placeholder="选择优惠券类型" clearable>
              <el-option v-for="item in coupon_type" :label=item.label :value=item.value :key="item.id"></el-option>
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
            prop="areaName"
            label="所属城市"
            width="150">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="couponNo"
            label="优惠券编号"
            width="120">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="business"
            label="商户名"
            width="120">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="t_cup_state"
            label="优惠券状态"
            width="120">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="coupon_type"
            label="优惠券类型"
            width="140">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="content"
            label="优惠内容"
            width="130">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="fUser.realName"
            label="用户信息"
            width="110">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="fUser.phone"
            label="用户手机"
            width="140">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="activityDes"
            label="活动"
            width="120">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="startTime"
            label="生效时间"
            width="170">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="endTime"
            label="失效时间"
            width="170">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="updateDate"
            label="更新时间"
            width="170">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="remarks"
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
              <el-button type="text" size="small" @click="modifyRecord(scope.row.id)">修改</el-button>
              <el-button @click="deleteRecord(scope.row.id)" type="text" size="small">删除</el-button>
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
    <el-dialog title="添加/修改" :visible.sync="modifyFormVisible">

      <el-form ref="form" :model="updateForm" label-width="150px">
        <el-form-item label="id:" v-if=0>
          <el-input v-model="updateForm.id"></el-input>
        </el-form-item>

        <el-form-item label="优惠券编号:">
          <el-input v-model="updateForm.couponNo" placeholder="填写优惠券编号"></el-input>
        </el-form-item>

        <el-form-item label="商标:">
          <!--<el-input v-model="updateForm.trademark"></el-input>-->
          <el-button type="primary">选择文件</el-button>
          <el-button type="primary">开始上传</el-button>
        </el-form-item>

        <el-form-item label="商户名:">
          <el-input v-model="updateForm.business"></el-input>
        </el-form-item>

        <el-form-item label="优惠券类型:">
          <el-select v-model="updateForm.type" placeholder="选择优惠券类型" clearable>
            <el-option label="商户优惠券" value="1"></el-option>
            <el-option label="骑行券" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="优惠券内容:">
          <el-input v-model="updateForm.content" type="textarea" class='textarea'></el-input>
        </el-form-item>

        <el-form-item label="详情url:">
          <el-input v-model="updateForm.detailsUrl" placeholder="填写详情url"></el-input>
        </el-form-item>

        <el-form-item label="有效时间:">
          <el-date-picker
            v-model="updateForm.startTime"
            type="date"
            placeholder="开始时间">
          </el-date-picker>
          -
          <el-date-picker
            v-model="updateForm.endTime"
            type="date"
            placeholder="结束时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="备注:">
          <el-input v-model="updateForm.remarks" type="textarea" class='textarea'></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doUpdate">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import Moment from 'moment'

  export default {
    data () {
      return {
        activeName2: 'first',
        modifyFormVisible: false,
        coupon_type: [],
        t_cup_state: [],
        coupon_type_obj: {},
        t_cup_state_obj: {},
        tableData: [],
        updateForm: {},
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
        currentPage: 1
//        pagination: {pageSizes: [30, 40, 60, 100], pageSize: 30, count: 0, pageNo: 1}
      }
    },
    created () {
      this.query()
    },
    methods: {
      query () {
        this.$ajax.get('sys/dictutils/interface/getDictList?type=coupon_type')
          .then(res => {
            this.coupon_type = res.data
            for (let i = 0; i < this.coupon_type.length; i++) {
              this.coupon_type_obj[this.coupon_type[i].value] = this.coupon_type[i].label
            }
          })
          .then(this.$ajax.get('sys/dictutils/interface/getDictList?type=t_cup_state')
            .then(res => {
              this.t_cup_state = res.data
              for (let i = 0; i < res.data.length; i++) {
                this.t_cup_state_obj[res.data[i].value] = res.data[i].label
              }
            }))
          .then(this.$ajax.get('electric/tCouponInfo/interface/list')
            .then(res => {
              this.tableData = res.data.page.list
              for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].coupon_type = this.coupon_type_obj[this.tableData[i].type]
                this.tableData[i].t_cup_state = this.t_cup_state_obj[this.tableData[i].state]
              }
            }))
          .catch(err => {
            console.log(err)
          })
      },
      modifyRecord (id) {
        this.modifyFormVisible = true
        this.$ajax.get('electric/tCouponInfo/interface/form?id=' + id)
          .then(res => {
            this.updateForm = res.data.tCouponInfo
            this.updateForm.type = this.coupon_type_obj[this.updateForm.type]
          })
          .catch(err => {
            console.log(err)
          })
      },
      doUpdate () {
        this.modifyFormVisible = false
        this.updateForm.startTime = Moment(this.updateForm.startTime).format('YYYY-MM-DD HH:mm:ss')
        this.updateForm.endTime = Moment(this.updateForm.endTime).format('YYYY-MM-DD HH:mm:ss')
        for (let k in this.coupon_type_obj) {
          if (this.coupon_type_obj[k] === this.updateForm.type) {
            this.updateForm.type = k
            this.$ajax.get('electric/tCouponInfo/interface/save', {params: this.updateForm})
              .then(res => {
                this.open('success', res.data.msg)
                // 刷新页面
                this.query()
              })
              .catch(err => {
                this.open('info', err.data.msg)
                console.log(err)
              })
          }
        }
      },
      open (type, msg) {
        // 提示信息
        this.$message({
          type: type,
          message: msg
        })
      },
      deleteRecord (id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.delRecord(id)
          })
          .catch(() => {
            this.open('info', '已取消删除')
          })
      },
      delRecord (id) {
        this.$ajax.get('electric/tCouponInfo/interface/delete?id=' + id)
          .then(res => {
            if (res.status === 200) {
              // 删除成功
              this.open('success', res.data.msg)
              // 刷新页面
              this.query()
            } else {
              // 删除失败
              this.open('info', res.data.msg)
            }
          })
          .catch(err => {
            // 删除失败
            this.open('info', err.data.msg)
          })
      },
      handleClick (tab, event) {
//        console.log(tab, event)
      },
      search () {
        console.log('search!')
      },
      exportData () {
        console.log('exportData!')
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
//        this.requestParam.pageSize = val
//        this.query()
      },
      handleCurrentChange (val) {
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
