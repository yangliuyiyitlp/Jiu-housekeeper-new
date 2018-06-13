<template>
  <div>
    <div class="top"><img src="../../assets/images/logo.png"></div>
    <div class="detail">
      <div class="sheet">
        <!--1待命,2审批中,3还款中,4已结清,5拒绝,6线上筹资中,7满标,8满标以放款,9流标,10退件-->
        <p>
          订单编号：<span>{{orderBaseInfo.orderNumber}}</span>
          姓名：<span>{{orderBaseInfo.custName}}</span>
          申请时间：<span>{{orderBaseInfo.createTime}}</span>
          申请城市：<span>{{orderBaseInfo.provId}} {{orderBaseInfo.cityId}}</span>
          状态：<span v-if="orderBaseInfo.status == 1">待命</span>
             <span v-if="orderBaseInfo.status == 2">审批中</span>
             <span v-if="orderBaseInfo.status == 3">还款中</span>
             <span v-if="orderBaseInfo.status == 4">已结清</span>
             <span v-if="orderBaseInfo.status == 5">拒绝</span>
             <span v-if="orderBaseInfo.status == 6">线上筹资中</span>
             <span v-if="orderBaseInfo.status == 7">满标</span>
             <span v-if="orderBaseInfo.status == 8">满标以放款</span>
             <span v-if="orderBaseInfo.status == 9">流标</span>
             <span v-if="orderBaseInfo.status == 10">退件</span>

          <span v-if="orderBaseInfo.status==3?0:1">当前环节：<span>{{orderBaseInfo.nodeName}}</span></span>
          订单归属业务员：<span>{{orderBaseInfo.empName}}</span>
          <span class="change-permission" v-if='changePermission'>
					<el-popover
            trigger="click"
            placement="bottom"
            width="160"
            v-model="visiblePer">
					  <div style="text-align: center;font-size: 16px;">
					    <el-button size="mini" @click='visiblePerFn' type="text"  style="font-size: 15px">变更订单归属业务员</el-button>
					  </div>
					  <i class="" ></i>
					  <i class="changePerIcon" slot="reference"></i>
					</el-popover>
    		</span>
        </p>
      </div>
      <div class="params">
        <p>意向借款金额：<span>{{orderBaseInfo.expectMomey}}元</span></p>
        <p>意向借款期限：<span>{{orderBaseInfo.expectDuetime}}</span></p>
        <p>产品系列：<span>{{orderBaseInfo.cptName}}</span></p>
        <div v-if="status ==1?false:true">
          <p>产品名称：<span>{{orderBaseInfo.cpName}}</span></p>
          <p>产品期数：<span>{{orderBaseInfo.periods}}期</span></p>
          <p>合同金额：<span>{{orderBaseInfo.contractMoney}}元</span></p>
          <p>产品利率：<span>{{orderBaseInfo.rate}}/年</span></p>
          <p>还款方式：<span>{{orderBaseInfo.payment}}</span></p>
          <p>授信范围：<span>{{orderBaseInfo.actualLowerLimit}}-{{orderBaseInfo.actualUpperLimit}}元</span></p>
        </div>
      </div>
      <div class="steps" v-if="orderNodeList.length>=0?1:0">
        <el-steps :active="+currentStep" align-center  finish-status="success">
          <el-step v-for ="(val,index) in orderNodeList" :title="val.nodeName" :description="val.outTime" :key="index"></el-step>
        </el-steps>
      </div>
      <el-tabs type="border-card" style="margin-top:35px" @tab-click="tabClick" v-model="activeName">
        <el-tab-pane label="审批记录"  name="1" v-if="status==2 || status==5">
          <el-table
            :data="examData"
            border
            style="width: 100%">
            <el-table-column align='center' type="index"  width="160" label="序号" :index="indexMethod">
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="nodeName"
              label="环节">
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="createTime"
              label="操作时间">
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="inTime"
              label="进入环节时间">
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="residenceTime"
              label="停留时长">
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="rejectReason"
              label="结果">
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="realName"
              label="操作人">
            </el-table-column>
          </el-table>
          <pagination
            :currentPage = 'currentPage'
            :total = 'total'
            @handleSizeChange = 'handleSizeChange'
            @handleCurrentChange = 'handleCurrentChange'
          >
          </pagination>
        </el-tab-pane>
        <el-tab-pane label="还款计划"  name="2" v-if="status==3">
          <p class="des">
            当前应还总金额：<span>{{OrderAmountt.shouldAmount}}元</span>
            当前应还本息：<span>{{OrderAmountt.principalInterest}}元</span>
            当前应还罚息：<span>{{OrderAmountt.fine}}元</span>
            提前结清总金额：<span>{{OrderAmountt.amount}}元</span>
          </p>
          <el-table
            :data="RepaymentPlan"
            border
            style="width: 100%">
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="periods"
              label="期数">
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="repaymentTime"
              label="应还时间">
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="shouldMoney"
              label="应还总金额">
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="shouldCapiital"
              label="还款本金">
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="shouldAccral"
              label="还款利息">
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="manageMoney"
              label="分期服务费">
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="overdueMoney"
              label="逾期费用">
            </el-table-column>
            <!--0  待还，1 结清，2 逾期-->
            <el-table-column prop="status" label="状态" align='center'>
              <template slot-scope="scope">
                <span v-if='scope.row.status == 0'>待还</span>
                <span v-if='scope.row.status == 1'>结清</span>
                <span v-if='scope.row.status == 2'>逾期</span>
                </template>
            </el-table-column>
          </el-table>
          <pagination
            :currentPage = 'currentPage2'
            :total = 'total2'
            @handleSizeChange = 'handleSizeChange2'
            @handleCurrentChange = 'handleCurrentChange2'
          >
          </pagination>
        </el-tab-pane>
        <el-tab-pane label="还款记录" name="3" v-if="status==3">
          <p class="des">
            当前应还总金额：<span>{{OrderAmountt.shouldAmount}}元</span>
            当前应还本息：<span>{{OrderAmountt.principalInterest}}元</span>
            当前应还罚息：<span>{{OrderAmountt.fine}}元</span>
            提前结清总金额：<span>{{OrderAmountt.amount}}元</span>
          </p>
          <el-table
            :data="PaymentHistory"
            border
            style="width: 100%">
            <el-table-column align='center' type="index"  width="160" label="序号" >
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="paymentTime"
              label="还款时间">
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="shouldMoney"
              label="还款金额(元)">
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              label="还款方式">
              <template  slot-scope="scope"><span>{{scope.row.operationPlatform||scope.row.paymentChannel||scope.row.paymentPlatform}}</span></template>
            </el-table-column>
          </el-table>
          <pagination
            :currentPage = 'currentPage3'
            :total = 'total3'
            @handleSizeChange = 'handleSizeChange3'
            @handleCurrentChange = 'handleCurrentChange3'
          >
          </pagination>
        </el-tab-pane>
        <el-tab-pane label="基本信息" name="4" class="tabs">
          <h3>基本信息</h3>
          <table>
            <tr>
              <td>性别</td>
              <td>{{userBaseInfo.icSex}}</td>
              <td>发证机关</td>
              <td>{{userBaseInfo.icIssUingAuthority}}</td>
            </tr>
            <tr>
              <td>民族</td>
              <td>{{userBaseInfo.icNation}}</td>
              <td>证件有效期</td>
              <td>{{userBaseInfo.icLimittime}}</td>
            </tr>
            <tr>
              <td>出生日期</td>
              <td>{{userBaseInfo.icBirth}}</td>
              <td>邮箱</td>
              <td>{{userBaseInfo.custEmail}}</td>
            </tr>
            <tr>
              <td>身份证地址</td>
              <td>{{userBaseInfo.icAddress}}</td>
              <td>婚属</td>
              <td>{{userBaseInfo.marital }}</td>
            </tr>
            <tr>
              <td>身份证号码</td>
              <td>{{userBaseInfo.icNumber }}</td>
              <td>学历</td>
              <td>{{userBaseInfo.hignestDegree }}</td>
            </tr>
            <tr>
            <td>居住地址</td>
            <td>{{userBaseInfo.houseProvince }}{{userBaseInfo.houseCity }}{{userBaseInfo.houseArea }}{{userBaseInfo.houseAddress }}</td>
          </tr>
            <tr>
              <td>客户归属人</td>
              <td>{{userBaseInfo.empName }}</td>
              <td>归属团队</td>
              <td>{{userBaseInfo.deptName}}</td>
            </tr>

          </table>
          <h3>工作信息</h3>
          <table v-if="jobType==1">
            <tr>
              <th colspan="4">单位信息</th>
            </tr>
            <tr>
              <td>工作单位</td>
              <td>{{userBaseInfo.companyName}}</td>
              <td>单位地址</td>
              <td>{{userBaseInfo.companyProv}}{{userBaseInfo.companyCity }}{{userBaseInfo.companyArea }}{{userBaseInfo.companyAddress }}</td>
            </tr>
            <tr>
              <th colspan="4">单位联系方式</th>
            </tr>
            <tr>
              <td>座机</td>
              <td>{{userBaseInfo.companyTelArea}}-{{userBaseInfo.companyTelNo}}-{{userBaseInfo.companyTelExt}}</td>
              <td>手机</td>
              <td>{{userBaseInfo.companyMobile }}</td>
            </tr>
          </table>
          <table v-if="jobType==2">
            <tr>
              <th colspan="4">公司信息</th>
            </tr>
            <tr>
              <td>公司名称</td>
              <td>{{userBaseInfo.companyName}}</td>
              <td>公司地址</td>
              <td>{{userBaseInfo.companyProv}}{{userBaseInfo.companyCity }}{{userBaseInfo.companyArea }}{{userBaseInfo.companyAddress }}</td>
            </tr>
            <tr>
              <th colspan="4">公司联系方式</th>
            </tr>
            <tr>
              <td>座机</td>
              <td>{{userBaseInfo.fixedTelephone}}</td>
              <td>手机</td>
              <td>{{userBaseInfo.companyMobile }}</td>
            </tr>
          </table>
          <table v-if="jobType==3">
            <tr>
              <td width="60">收入来源</td>
              <td>{{userBaseInfo.revenueSources}}</td>
              <td width="60">月收入</td>
              <td >{{userBaseInfo.averageMonthlyIncome}}</td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="联系人信息" name="5">
          <el-table
            :data="linkInfo"
            border
            style="width: 100%">
            <el-table-column align='center' type="index"  width="160" label="序号" :index="indexMethod">
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="relation"
              label="关系">
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="phone"
              label="联系电话">
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              align='center'
              :show-overflow-tooltip="true"
              prop="linkmanIsKnow"
              label="是否允许知晓该借款">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="账户信息" class="tabs" name="6">
          <table >
            <tr>
              <th colspan="2">江西银行账号信息</th>
            </tr>
            <tr>
              <td width="100">电子账号</td>
              <td>{{accoutInfo.bankAccount}}</td>
            </tr>
            <tr>
              <td width="100">账户余额</td>
              <td>
                <span v-if="!eye">{{accountMoney}}</span>
                <span v-if="eye">*****</span>
                元<i class="el-icon-view" @click="eyeToggle()" ></i>
              </td>
            </tr>
          </table>
          <table >
            <tr>
              <th colspan="2">绑定银行卡</th>
            </tr>
            <tr>
              <td width="100">开户银行</td>
              <td>{{accoutInfo.bankName  }}</td>
            </tr>
            <tr>
              <td width="100">银行卡号</td>
              <td>{{accoutInfo.cradNumber }}</td>
            </tr>
            <tr>
              <td width="100">银行预留手机号</td>
              <td>{{accoutInfo.bindCardMobile  }}</td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
      <!--客户分配组织架构弹框--START-->
      <el-dialog title="客户分配" width='800px' :visible.sync="CustDistributionDialog" :close-on-click-modal ='false'>
        <el-row  type="flex" style='margin-top: -25px;'>
          <el-col :span="11" >
            <h3 class="titsheet">组织架构</h3>
            <div class="mrtop20">
              <el-input
                clearable
                placeholder="根据名称模糊查询"
                v-model="ser_department"
              >
                <el-button slot="append" icon="el-icon-search" @click='search_tree()'></el-button>
              </el-input>
            </div>
            <div class="v-tree-wrap" style="border: 1px solid #dcdfe6;margin-top: 10px;border-radius: 5px;    height: 220px;overflow: auto;">
              <v-tree ref='tree' :data='zTreeData' :multiple='false'  :halfcheck='true' @node-click='handleNodeClickCustDis'/>
            </div>
          </el-col>
          <el-col :span="1" >
          </el-col>
          <el-col :span="12" >
            <h3 class="titsheet">员工信息</h3>
            <div class="mrtop20">
              <el-input placeholder="根据员工工号、姓名模糊查询"  v-model="ser_people" clearable>
                <el-button slot="append" icon="el-icon-search" @click='search_employee()'></el-button>
              </el-input>
            </div>
            <div class="table-wraps" style="margin-top: 10px">
              <el-table
                v-loading="loadingTableShow"
                highlight-current-row
                @current-change="handleCurrentSelect"
                :data="tableData_s"
                border
                height='220'
                style="width: 100%">
                <el-table-column
                  align='center'
                  prop="realName"
                  label="姓名"
                  width="180">
                </el-table-column>
                <el-table-column
                  align='center'
                  prop="username"
                  label="工号"
                  width="180">
                </el-table-column>
              </el-table>
              <div style="width: 100%;overflow:auto">
                <pagination
                  :layout='layout'
                  :currentPage = 'currentPage_s'
                  :total = 'total_s'
                  @handleSizeChange = 'handleSizeChange_s'
                  @handleCurrentChange = 'handleCurrentChange_s'
                >
                </pagination>
              </div>
            </div>

          </el-col>

        </el-row>
        <div class="text-rt">
          <el-button  type="info" @click='CustDistributionDialog = false'>取消</el-button>
          <el-button type="primary" @click='saveDisCust' :loading="orSaveDisCust">保存</el-button>
        </div>
      </el-dialog>
      <!--客户分配组织架构弹框--END-->
    </div>
  </div>
</template>
<script>
  import api from '@/api/index.js'
  import TitCommon from '@/components/common/TitCommon'
  import TableList from '@/components/custManage/TableList'
  import Pagination from '@/components/common/Pagination'
  export default {
    name: 'allList',
    data() {
      return {
        crmCustInfoId_s:'',
        activeName:'',
        tableData_s: [],
        total_s: 0,
        pageSize_s:10,
        pageNo_s:1,
        loadingTableShow:false,
        orSaveDisCust: false,
        zTreeData: [],
        layout: 'total, prev, pager, next',
        currentPage_s:1,
        ser_department:'',//搜索的部门
        ser_people: '',
        deptId: '',
        CustDistributionDialog: false,
        visiblePer: false,
        orderBaseInfo:{},
        userBaseInfo:{},
        accoutInfo:{},
        linkInfo:[],
        PaymentHistory:[], //还款记录列表
        RepaymentPlan:[], //还款计划列表
        buttonLoading:false,
        // apply_state:true,
        eye:true,
        money:'2500',
        status:'',
        examData:[],
        planData:[],
        recordData:[],
        tableData:[],
        jobType:1,
        pageSize:10,
        pageNo:1,
        total:0,
        currentPage:1,
        pageSize2:10,
        pageNo2:1,
        total2:0,
        currentPage2:1,
        pageSize3:10,
        pageNo3:1,
        total3:0,
        currentPage3:1,
        orderNodeList:[],
        orderList:[],
        OrderAmountt:{},
        currentStep:"",
        accountMoney: null,
        changePermission: false
      }
    },
    components:{
      Pagination
    },
    beforeCreate(){
			let pararms = {
				menuId:this.$route.query.menuId
			}
//			var s=new Date()
			this.$store.dispatch('SET_POWER_BTN_ARR', pararms).then(res=>{
				//注意：assigningCustomers，frozenCustomer，updateOrderAttachEmp写死的，前端不可以轻易变更
				//assigningCustomers:分配客户权限, "frozenCustomer：冻结按钮权限,//updateOrderAttachEmp:变更业务员权限按钮
//				var d=new Date()
				if (res) {
					const flag = res.indexOf('updateOrderAttachEmp')
					if (flag > -1) {
						this.changePermission = true
					} else {
						this.changePermission = false
					}
				}
	//			console.log(d-s)
	//			console.log(this.permission,'=====4544545=========')
	//			console.log(flag,'=====4544545=========')
			})
		},
    mounted(){
      // this.addViewTags()
      this.queryBaseOrderInfo()
      this.getDepartmentZtreeFn()
      // this.queryNodeListInfo()  后请求
    },
    methods:{
//    async addViewTags() {
//      this.queryBaseOrderInfo()
//      await   this.queryNodeListInfo()
//    },
      queryAccountBalanceFn(){//账户余额
				api.queryAccountBalance({
					crmApplayId:this.$route.query.crmApplayId
				}).then(res => {
					if(res.data.success){
						this.accountMoney = res.data.data.data
					}
				})
			},
      queryNodeListInfo(){ // 查询订单节点信息
        api.queryNodeListInfo({
          crmApplayId:this.$route.query.crmApplayId,
          orderStatus:this.status
          // orderStatus:this.$route.query.orderStatus
        }).then((res) =>{
          console.log(666666,this.status);
          if (res.data.code==1 && res.data.data != null) {
            console.log(8989,res);
            this.orderNodeList = res.data.data.orderNodeList
            this.orderList = res.data.data.nodeList
            let currentNode =this.orderList.find(function(item){
              return item.status=="0"
            })
            if(this.orderList.length<=0){
              this.currentStep=0
            }else{
              this.orderNodeList.forEach((item,index) =>{
                if(item.nodeCode==currentNode.nodeCode){
                  this.currentStep=index
                }
              })
            }

            for(let i=0;i<this.orderNodeList.length;i++){
              for(let j=0;j<this.orderList.length;j++){
                if(this.orderNodeList[i].nodeCode == this.orderList[j].nodeCode ){
                  this.orderNodeList[i].outTime =this.orderList[j].outTime
                }
              }

            }

          }
        })
      },
      queryExamData(){ //审批记录
        api.queryExamDataList({
          pageSize:this.pageSize,
          pageNo:this.pageNo,
          crmApplayId:this.$route.query.crmApplayId
        }).then((res) =>{
          if(res.data.success) {
            console.log(99,res);
            this.examData = res.data.data
          } else {
            this.$notify({
              title: '提示',
              message: res.data.msg,
              duration: 1500
            });
          }
        })

      },
      queryRepaymentPlan(){ //还款计划
        api.queryRepaymentPlan({
          pageSize:this.pageSize,
          pageNo:this.pageNo,
          crmApplayId:this.$route.query.crmApplayId
        }).then((res) =>{
          if(res.data.success) {
            this.RepaymentPlan = res.data.data
          } else {
            this.$notify({
              title: '提示',
              message: res.data.msg,
              duration: 1500
            });
          }
        })

      },
      queryPaymentHistory(){ //还款记录
        api.queryPaymentHistory({
          pageSize:this.pageSize2,
          pageNo:this.pageNo2,
          crmApplayId:this.$route.query.crmApplayId
        }).then((res) =>{
          if(res.data.success) {
            this.PaymentHistory = res.data.data
          } else {
            this.$notify({
              title: '提示',
              message: res.data.msg,
              duration: 1500
            });
          }
        })
      },
      queryQueryOrderAmountt(){
        api.queryQueryOrderAmountt({
          crmApplayId:this.$route.query.crmApplayId
        }).then((res) =>{
          if(res.data.success) {
            this.OrderAmountt = res.data.data
          } else {
            this.$notify({
              title: '提示',
              message: res.data.msg,
              duration: 1500
            });
          }
        })
      },
      queryBaseOrderInfo(){
        api.queryBaseOrderInfo({
          crmApplayId:this.$route.query.crmApplayId
        }).then((res) =>{
          console.log(res.data.data,888888888888)
          if(res.data.success) {
            if (res.data.code==1 && res.data.data != null) {
              this.orderBaseInfo = Object.assign(this.orderBaseInfo,res.data.data)
              this.status = res.data.data.status
              this.queryNodeListInfo()
              console.log(55555555,res.data);
              if(this.status == 3){
                this.activeName = "2"
                this.queryRepaymentPlan()//还款计划a
                this.queryQueryOrderAmountt()
              }else if(this.status == 2 || this.status == 5){
                this.activeName = "1"
                this.queryExamData() //审批记录
              }else{
                this.activeName = "4"
                this.queryEssentialInfo()//基本信息
              }
              this.crmCustInfoId_s = res.data.data.crmCustInfoId
          } else {
            this.$notify({
              title: '提示',
              message: res.data.msg,
              duration: 1500
            });
          }
          }
        })
      },
      queryEssentialInfo(){ // 基本信息
        api.queryEssentialInfo({
          crmCustInfoId:this.$route.query.crmApplayId
        }).then((res) =>{
          console.log('jobType',res.data.data)
          if(res.data.success) {
            this.userBaseInfo = res.data.data
            this.jobType = res.data.data.jobType
          } else {
            this.$notify({
              title: '提示',
              message: res.data.msg,
              duration: 1500
            });
          }
        })
      },
      queryLinkManInfo(){ //联系人信息
        api.queryLinkManInfo({
          crmCustInfoId:this.$route.query.crmApplayId
        }).then((res) =>{
          if(res.data.success) {
            this.linkInfo = res.data.data
          } else {
            this.$notify({
              title: '提示',
              message: res.data.msg,
              duration: 1500
            });
          }
        })
      },
      queryAccountInfo(){ //账户信息
        api.queryAccountInfo({
          crmCustInfoId:this.$route.query.crmApplayId
        }).then((res) =>{
          if(res.data.success) {
            this.accoutInfo = res.data.data
          } else {
            this.$notify({
              title: '提示',
              message: res.data.msg,
              duration: 1500
            });
          }
        })
      },
      tabClick(tab, even){
        console.log(tab, even)
        if(tab.name=='4'){ //基本信息
          this.queryEssentialInfo()
        }else if(tab.name=='5'){ //联系人信息
          this.queryLinkManInfo()
        }else if(tab.name=='6'){ // 账户信息
          this.queryAccountInfo()
        }else if(tab.name=='1'){ // 审批记录
          this.queryExamData()
        }else if(tab.name=='2'){ // 还款计划
          this.queryRepaymentPlan()
          this.queryQueryOrderAmountt()
        }else if(tab.name=='3'){ //还款记录
          this.queryPaymentHistory()
        }
      },
      indexMethod(index){
        var a = `第${index+1}联系人`
        return a;
      },
      eyeToggle(){
        if(this.eye == false){
          this.eye =true
        }else{
          this.eye=false
          this.queryAccountBalanceFn()
        }
      },
      handleSizeChange(val){
        this.pageSize = val
      },
      handleCurrentChange(val){
        this.pageNo = val
        this.currentPage = val
      },
      handleSizeChange2(val){
        this.pageSize2 = val
      },
      handleCurrentChange2(val){
        this.pageNo2 = val
        this.currentPage2 = val
      },
      handleSizeChange3(val){
        this.pageSize3 = val
      },
      handleCurrentChange3(val){
        this.pageNo3 = val
        this.currentPage3 = val
      },
      search_tree() {
        this.$refs.tree.searchNodes(this.ser_department)
//  		console.log(this.treeData)
      },
      saveDisCust() {
        this.$confirm('此操作将是保存, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.cuntomerDistributionFn()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存'
          });
        });
      },
      cuntomerDistributionFn() {
        this.orSaveDisCust = true
        let arr = []
        arr.push(this.crmCustInfoId_s)
//  		let customerIdList = this.multipleSelectionIdList
        let parsrms = {
          customerIdList: arr,
          employeeId: this.employeeId
        }
        console.log(parsrms)
        api.cuntomerDistribution(parsrms).then(res => {
          this.orSaveDisCust = false
          if(res.data.success){
            this.CustDistributionDialog = false
            console.log(res.data.data)
          } else {
            this.CustDistributionDialog = true
          }
          this.$notify({
            title: '提示',
            message: res.data.msg,
            duration: 1500
          });
        })
      },
      visiblePerFn() {
        this.CustDistributionDialog = true
      },
      handleSizeChange_s(val) {
        this.currentPage_s = 1
        this.pageNo_s = 1
        this.pageSize_s = val
        this.queryCustDistributionByDeptIdFn()
        console.log(val,777777777777)
      },
      handleCurrentChange_s(val) {
        this.pageNo_s = val
        this.queryCustDistributionByDeptIdFn()
        console.log(val,88888888)
      },
      handleNodeClick(data) {
        console.log(data,'ssssddddd')
        this.search.partName = data.title
        this.showTree = false
//	        console.log(data,6664444455555);
      },
      handleNodeClickCustDis(data){
        this.ser_department = data.name
        console.log(data.id,6664444455555);
        this.deptId = data.id
        this.queryCustDistributionByDeptIdFn()
      },
      handleCurrentSelect(val) {
        if (val) {

          this.employeeId = val.username
        }
        console.log(val,65656655)
      },
      search_employee() {
        this.queryCustDistributionByDeptIdFn()
        console.log(this.multipleSelectionIdList,12121,'-=-=77777777777777')
      },
      queryCustDistributionByDeptIdFn(){
        this.tableData_s= []
        let pararms = {
          pageNo: this.pageNo_s,
          pageSize: this.pageSize_s,
          deptId: this.deptId,
          username: this.ser_people
        }
        this.loadingTableShow = true
        if(!this.deptId){
          this.loadingTableShow = false
          this.$notify({
            title: '提示',
            message: '请选择组织架构',
            duration: 1500
          });
          return
        }

//	    	console.log(pararms)
        api.queryCustDistributionByDeptId(pararms).then(res => {
          console.log(res,'-=-=-=-=6666')

          this.loadingTableShow = false
          if(res.data.success){
            this.total_s = res.data.total
            this.tableData_s = res.data.data

            console.log(res.data.data)
          } else {
            this.$notify({
              title: '提示',
              message: res.data.msg,
              duration: 1500
            });
          }
        })
//	    	console.log(data)
      },
      getDepartmentZtreeFn() {
        api.getDepartmentZtree({groupId:''}).then(res => {
          if(res.data.status == 1) {
//					this.treeData = res.data.ztree
            this.zTreeData = this.toTree(res.data.ztree)
          } else {
            this.$notify({
              title: '提示',
              message: res.data.msg,
              duration: 1500
            });
          }
          //			console.log(this.zTreeData,123)
        })
      },
      toTree(ary, data) {
        var _this = this
        var data = data ? data : (function(ary) {
          var tempAry = [];
          var idList = [];
          ary.forEach(function(item) {
            idList.push(item.id)
          });
          for(var i = 0, len = ary.length; i < len; i++) {
            if(ary[i].pId == undefined || (ary[i].pId != undefined && _this.debFn(ary[i].pId, idList))) {
              var obj = {
                title: ary[i].name,
                id: ary[i].id
              };
              tempAry.push(obj);
            }
          }
          return tempAry;
        }(ary));
        var temp = 0;
        if(data.constructor == Array) {
          for(var i = 0, len = data.length; i < len; i++) {
            for(var j = 0, lenA = ary.length; j < lenA; j++) {
              if(ary[j].pId == data[i].id) {
                var obj = {
                  title: ary[j].name,
                  id: ary[j].id
                };
                data[i].children = data[i].children || [];
                data[i].children.push(obj);
                temp++;
              }
            }
          }
        }
        if(temp > 0) {
          if(data.constructor == Array) {
            for(var n = 0, lenB = data.length; n < lenB; n++) {
              data[n].children = this.toTree(ary, data[n].children ? data[n].children : []);
              if(data[n].children.length == 0) {
                delete data[n].children;
              }
              //							delete data[n].id;
            }
          }
        } else {
          for(var n = 0, lenB = data.length; n < lenB; n++) {
            //						delete data[n].id;
          }
        }
        return data;

      },
      debFn(id, idList) {
        var flag = true;
        for(var ida in idList) {
          if(id == idList[ida]) {
            flag = false;
          }
        }
        return flag;
      },
    }
  }
</script>
<style lang="less">
  .top{
    width: 100%;
    height: 60px;
    background: #31AFFF;
    margin-bottom: 20px;
  }
  .detail{
    width: 1300px;
    margin:20px auto;
    .sheet{
      background: #f7f7f7;
      border-radius: 10px;
      padding:20px 15px;
      font-size:12px;
      span{
        margin-right: 50px;
      }
      .change-permission {
        float: right;
        margin-right: -50px;
      }
      .changePerIcon {
        display: inline-block;
        background: url('../../assets/images/changePer.png') no-repeat 0 0;
        width: 20px;
        height: 22px;
        background-size: 100%;
        margin-top: -2px;
        vertical-align: middle;
      }
    }
    .params{
      border-radius:8px;
      border:#ddd solid 1px;
      padding: 20px;
      margin: 20px;
      overflow: hidden;
      font-size:13px;
      p{
        float: left;
        margin:15px 0;
        width: 200px;
        span{

        }
      }
    }
    .tabs{
      h3{
        margin: 10px 0;
        border-bottom: #ccc dotted 1px;
        padding-bottom: 10px;
      }
      table{
        font-size: 12px;
        width: 100%;
        margin-bottom: 20px;
        td{
          padding: 10px;
          &:nth-child(even){
            color: #666;
          }
        }
        th{
          padding: 10px;
          background: #f7f7f7;
          text-align: left;
        }
      }
    }
    .el-icon-view{
      padding-left: 10px;
      cursor: pointer;
    }
    .steps{
      font-size: 12px;
      .el-step__title{
        font-size: 12px;
      }
    }
    .des{
      font-size:12px;
      color:#666;
      margin:5px 0 20px;
      padding-left: 5px;
      span{
        color: #222;
        padding-right: 20px;
      }
    }
  }
</style>
