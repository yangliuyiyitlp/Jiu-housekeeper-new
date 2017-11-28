<template>
  <div class="right">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="反馈明细列表" name="first" class="padding">

        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="用户姓名:">
            <el-input v-model="formInline.user" placeholder="用户姓名">
            </el-input>
          </el-form-item>

          <el-form-item label="手机号:">
            <el-input v-model="formInline.phone" placeholder="手机号">
            </el-input>
          </el-form-item>

          <el-form-item label="提交手机号:">
            <el-input v-model="formInline.submit_phone" placeholder="提交手机号">
            </el-input>
          </el-form-item>

          <el-form-item label="车辆编号:">
            <el-input v-model="formInline.bicycle_number" placeholder="车辆编号">
            </el-input>
          </el-form-item>

          <el-form-item label="反馈类型:">
            <el-select v-model="formInline.feedback_type" placeholder="反馈类型" clearable>
              <el-option label="违停举报" value="1"></el-option>
              <el-option label="故障报修" value="2"></el-option>
              <el-option label="意见反馈" value="3"></el-option>
              <el-option label="其他问题" value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="子类型:">
            <el-select v-model="formInline.child_type" placeholder="子类型" clearable>
              <el-option label="无法关锁" value="1"></el-option>
              <el-option label="车座丢失" value="2"></el-option>
              <el-option label="刹车失灵" value="3"></el-option>
              <el-option label="二维码损坏" value="4"></el-option>
              <el-option label="踏板损坏" value="5"></el-option>
              <el-option label="车把歪了" value="6"></el-option>
              <el-option label="车铃损坏" value="7"></el-option>
              <el-option label="链条问题" value="8"></el-option>
              <el-option label="其他" value="9"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="审核状态:">
            <el-select v-model="formInline.audit_status" placeholder="审核状态" clearable>
              <el-option label="未审核" value="1"></el-option>
              <el-option label="审核通过" value="2"></el-option>
              <el-option label="审核未通过" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否故障车:">
            <el-select v-model="formInline.isMalfunction" placeholder="是否故障车" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="图片上传:">
            <el-select v-model="formInline.hasImage" placeholder="图片上传" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="问题描述:">
            <el-input v-model="formInline.problem_des" placeholder="问题描述">
            </el-input>
          </el-form-item>

          <el-form-item label="添加时间:">
            <el-date-picker
              v-model="formInline.add_date"
              type="datetimerange"
              placeholder="选择时间范围">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="操作员:">
            <el-input v-model="formInline.operator" placeholder="选择操作员">
            </el-input>
          </el-form-item>

          <el-form-item label="更新时间:">
            <el-date-picker
              v-model="formInline.update_date"
              type="datetimerange"
              placeholder="选择时间范围">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="备注:">
            <el-date-picker
              v-model="formInline.remarks"
              type="datetimerange"
              placeholder="选择时间范围">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="故障车:">
            <el-select v-model="formInline.malfunction_car" placeholder="是否只选故障车" clearable>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="exportData">导出</el-button>
          </el-form-item>
        </el-form>

        表格
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          stripe>
          <el-table-column
            header-align="center"
            align="center"
            prop="user"
            label="会员姓名"
            width="110">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="phone"
            label="会员手机"
            width="130">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="submit_phone"
            label="提交手机号"
            width="130">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="bicycle_number"
            label="车辆编号"
            width="130">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="feedback_type"
            label="反馈类型"
            width="130">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="child_type"
            label="子类型"
            width="130">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="hasImage"
            label="图片上传"
            width="100">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="isMalfunction"
            label="是否故障车"
            width="140">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="problem_des"
            label="问题描述"
            width="170">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="upload_date"
            label="上传时间"
            width="170">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="audit_status"
            label="审核状态"
            width="170">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="operator"
            label="操作员"
            width="140">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="update_date"
            label="更新时间"
            width="170">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="des"
            label="备注"
            width="300">
          </el-table-column>

          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small">审核</el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--分页-->
        <paginations></paginations>

      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        activeName: 'first',
        formInline: {
          user: '',
          phone: '',
          submit_phone: '',
          bicycle_number: '',
          feedback_type: '',
          child_type: '',
          audit_status: '',
          isMalfunction: '',
          hasImage: '',
          problem_des: '',
          add_date: '',
          operator: '',
          update_date: '',
          remarks: '',
          malfunction_car: ''
        },
        tableData: [{
          user: '大剿匪啊',
          phone: '13054851851',
          submit_phone: '13054851851',
          bicycle_number: '520000106',
          feedback_type: '故障报修',
          child_type: '无法关锁',
          hasImage: '否',
          isMalfunction: '是',
          problem_des: '无法结束行程',
          upload_date: '2017-09-21 15:51:12',
          audit_status: '审核通过',
          operator: '系统管理员',
          update_date: '2017-09-21 15:51:12',
          des: '你要说些什么呢'
        }, {
          user: '大剿匪啊',
          phone: '13054851851',
          submit_phone: '13054851851',
          bicycle_number: '520000106',
          feedback_type: '故障报修',
          child_type: '无法关锁',
          hasImage: '否',
          isMalfunction: '是',
          problem_des: '无法结束行程',
          upload_date: '2017-09-21 15:51:12',
          audit_status: '审核通过',
          operator: '系统管理员',
          update_date: '2017-09-21 15:51:12',
          des: '你要说些什么呢'
        }, {
          user: '大剿匪啊',
          phone: '13054851851',
          submit_phone: '13054851851',
          bicycle_number: '520000106',
          feedback_type: '故障报修',
          child_type: '无法关锁',
          hasImage: '否',
          isMalfunction: '是',
          problem_des: '无法结束行程',
          upload_date: '2017-09-21 15:51:12',
          audit_status: '审核通过',
          operator: '系统管理员',
          update_date: '2017-09-21 15:51:12',
          des: '你要说些什么呢'
        }, {
          user: '大剿匪啊',
          phone: '13054851851',
          submit_phone: '13054851851',
          bicycle_number: '520000106',
          feedback_type: '故障报修',
          child_type: '无法关锁',
          hasImage: '否',
          isMalfunction: '是',
          problem_des: '无法结束行程',
          upload_date: '2017-09-21 15:51:12',
          audit_status: '审核通过',
          operator: '系统管理员',
          update_date: '2017-09-21 15:51:12',
          des: '你要说些什么呢'
        }]
      }
    },
    methods: {
      search () {
        console.log('search')
      },
      exportData () {
        console.log('exportData')
      }
    }
  }
</script>

<style scoped>
  .padding{
    padding-left:10px;
  }
</style>
