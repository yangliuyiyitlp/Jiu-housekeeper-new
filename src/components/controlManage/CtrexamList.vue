<template>
  <div class="allCustList">
    <TitCommon :title='title'></TitCommon>
    <div class="custListWrap">
      <search
        ref='search'
        :treeData = 'treeData'
        :data = 'zTreeData'
        @searchFn='searchFn'
        @rejectFn="rejectFn"
        :productState="productState"
        :permission ='permission'>
      </search>
      <div class="table-wrap">
        <table-list
          :tablePermisson="tablePermisson"
          :loadingTable = 'loadingTable'
          :tableData='tableData'
          @showOrderDetail = 'showOrderDetail'
          @modifyReject="modifyReject"
        >
        </table-list>
      </div>
      <div class="pad20 alignCen">
        <pagination
          :currentPage = 'currentPage'
          :total = 'total'
          :myPageSizes = 'pageSize'
          @handleSizeChange = 'handleSizeChange'
          @handleCurrentChange = 'handleCurrentChange'
        >
        </pagination>
      </div>
      <!--拒绝弹框-->
      <div>
        <!--<dialog-follow :dialogFollow='dialogFollow' :rowFollowId = 'rowFollowId' ref="childDialogFollow" :multipleSelectionIdList="multipleSelectionIdList"></dialog-follow>-->
        <el-dialog title="拒单" width='450px'  center :visible.sync="dialogFollow.dialogFollowVisible" :close-on-click-modal="false">
          <el-form :model="form" ref="form" :rules="form_rules">
            <el-form-item label="订单编号：">
              <div  class="line-limit-length">{{orderNumber}}</div >
            </el-form-item>
            <el-form-item label="拒单原因：" prop="rejectReasonNumber" class="rejectInfo">
              <el-select v-model="form.a" class="proviceCity" placeholder="请选择" @change='changeHead' clearable >
                <!--<el-option v-for = '(val,ind) in applyProvince' :label='val.provinceName' :value="val.id" :key='ind'></el-option>-->
              </el-select>
              <el-select v-model="form.b" class="proviceCity" placeholder="请选择" @change='changeInfo' clearable >
                <!--<el-option v-for = '(val,ind) in applyCity' :label='val.cityName' :value="val.id" :key='ind'></el-option>-->
              </el-select>
              <el-select v-model="form.rejectReasonNumber" class="proviceCity" placeholder="请选择" clearable>
                <!--<el-option v-for = '(val,ind) in applyArea' :label='val.districtName' :value="val.id" :key='ind'></el-option>-->
              </el-select>
            </el-form-item>
            <el-form-item label="备注说明：" prop="remark" class="textPro">
              <el-input type="textarea" v-model.trim="form.remark" :maxlength = '200' ></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <div class='text-rt'>
              <el-button @click="dialogFollow.dialogFollowVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirm_follow(form)" :loading='saveFollow'>确 定</el-button>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>

  </div>
</template>

<script>
  import api from "@/api/index"
  import TitCommon from '@/components/common/TitCommon'
  import Pagination from '@/components/common/Pagination'
  import TableList from '@/components/orderManage/TableList'
  import Search from '@/components/controlManage/ControlSearch'
  // import DialogFollow from '@/components/controlManage/DialogCtrall'

  export default {
    name: 'CtrexamList',
    data() {
      return {
        title: '审批中订单',
        currentPage:1,
        total: 0,
        pageNo: 1,
        pageSize: 10,
        serachPararms:{},
        rowFollowId: null,
        tableData: [],
        zTreeData: [],
        treeData: [],
        loadingTable: false,
        multipleSelectionIdList:"",
        orderNumber:'',
        dialogFollow: {
          dialogFollowVisible: false

        },
        productState: [{name:"申请中",id:"1"},{name:"审批中",id:"2"}],
        saveFollow:false,
        formLabelWidth: '80px',
        form: {
          crmApplayId: '',
          remark: '',
          rejectReasonNumber: '',
          rejectReason: ''
        },
        form_rules:{
          remark:[
            {required:true, message: '请输入备注说明', trigger: 'blur,change' }
          ],
          // rejectReasonNumber:[
          //   {required:true, message: '请选择拒单原因', trigger: 'blur,change' }
          // ]
        },
      }
    },

    computed: {
      permission () {
        return {
          showAllPararms: false,//'申请中','审批中','还款中','已结清'
          showOrderState: true, //是否要展示高级搜索的‘订单状态’的条件
          showOrderNode: true, //是否要展示高级搜索的‘订单环节’的条件
          onlyOrderNode: true, //true是申请中页面控制的订单环节，fasle是审批中页面控制的订单环节
          showReject:true,
          showOnlyCheck:false,
          ShowRemainTime:true,
          showUp:true
        }
      },
      tablePermisson(){
        return{
          systemResidenceTime: true,//系统停留时间
          orderStatus: false, //订单状态
          orderStatusControl:true,//订单状态2
          hangTime: false, //挂起时间
          nodeName: false, //环节
          segment:true,//环节2
          detailBtn: true, //订单详情的‘查看’按钮
          remainTime:true,//停留时间
          hangStatus:true, //挂起状态
          rejectBtn:true,
          showSelection:true,
          applicationTime:true,
          applyTime:false
        }
      },
    },

    mounted() {
      this.getDepartmentZtreeFn()
      this.queryApplyOrderInfoFn()
      this.$refs.search.checkOrderNodeFn()
    },
    created() {
      if (JSON.parse(localStorage.getItem('myPageSize'))){
        this.pageSize = JSON.parse(localStorage.getItem('myPageSize')).C_ControlList?JSON.parse(localStorage.getItem('myPageSize')).C_ControlList:10
        console.log(JSON.parse(localStorage.getItem('myPageSize')).C_ControlList)
      } else {
        let obj = {}
        localStorage.setItem('myPageSize',JSON.stringify(obj))
      }
    },
    methods: {
      changeHead(){},
      changeInfo(){},
      confirm_follow(form){ // TODO 拒单
        this.$refs['form'].validate((valid) => {
          if(valid){
            this.saveFollow = true
            api.queryRefuseOrder({
              crmApplayId:this.multipleSelectionIdList,//申请单id(拒单/复活 必填)拒单多个以','隔开
              remark:this.form.remark, // 备注
              rejectReasonNumber:this.form.rejectReasonNumber,//处理编号
              rejectReason: this.form.rejectReason,//处理原因
            }).then((res) => {
              this.saveFollow = false
              this.dialogFollow.dialogFollowVisible=false
              this.queryApplyOrderInfoFn()
              this.$notify({
                title: '提示',
                message: res.data.msg,
                duration: 1500
              });
            })
          }else{
            return false
          }
        })

      },
      queryApplyOrderInfoFn() { //获取列表
        this.loadingTable = true
        let s_time,e_time
        if (this.serachPararms.applyDate) {
          s_time = this.serachPararms.applyDate[0]
          e_time = this.serachPararms.applyDate[1]
        } else {
          s_time = ''
          e_time = ''
        }
        const pararms = {
          number:1,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          queryParam: this.serachPararms.content,
          orderStatus: this.serachPararms.orderStatus,//订单状态：1申请中,2审批中,3还款中,4已结清,5拒绝,6线上筹资中,7满标,8满标以放款,9流标,10退件
//			custStatus: [1,2],//客户状态:1未实名,2已实名,3已成交[1,2]
          applyTimeBegin: s_time,
          applyTimeEnd: e_time,
          proTypeId:  this.serachPararms.productList,
          proId: this.serachPararms.productName,
          department: this.serachPararms.partName,
          empQueryParam: this.serachPararms.people,
          nodeCode: this.serachPararms.orderNode,
          hangStatus: this.serachPararms.hangStatus,
          provId: this.serachPararms.applyProvince,
          cityId: this.serachPararms.applyCity,
          remainTimeBegin:this.serachPararms.remainTimeBegin,
          remainTimeEnd:this.serachPararms.remainTimeEnd,
        }
        console.log(this.serachPararms,6666)
        console.log(pararms,6666)
        api.queryAllControlOrder(pararms).then(res => {
          console.log(898,res);
          this.loadingTable = false
          if(res.data.success) {
            this.total = res.data.total
            this.tableData = res.data.data
          } else {
            this.$notify({
              title: '提示',
              message: res.data.msg,
              duration: 1500
            });
          }
          console.log(res.data.data,6666)
        })
      },
      showOrderDetail(row,orShow) {
        var routeData = this.$router.resolve({
          path: '/detail/orderDetail',
          query: {
            crmApplayId: row.crmApplayId,
            menuId: this.$route.query.menuId
            // orderStatus:row.orderStatus
          }
        });
        window.open(routeData.href);
//		this.dialogFollow.dialogFollowVisible = orShow
        console.log(row,orShow,'/api/upload/upload')
//		this.rowFollowId = row.crmCustInfoId
//		this.$nextTick(function () {
////			this.$refs.childDialogFollow.$emit('showDialogFollow') // 方法1 子组件监听父组件发送的方法
// 			this.$refs.childDialogFollow.queryFollowList() // 方法2 父组件调用子组件方法
//
//		})
      },
      modifyReject(row){ // todo 拒单
        this.dialogFollow.dialogFollowVisible=true
        this.multipleSelectionIdList = row.crmApplayId
        this.orderNumber  = row.orderNumber // 订单编号
        this.form= {
          crmApplayId: '',
            remark: '',
            rejectReasonNumber: '',
            rejectReason: ''
        }
      },
      searchFn(data) {
        this.pageNo = 1
        this.currentPage = 1
        this.serachPararms = Object.assign(this.serachPararms,data)
        if(!this.serachPararms.orderStatus){
          this.serachPararms.orderStatus = ''
        }
        this.queryApplyOrderInfoFn()
      },
      rejectFn(){ // todo 拒单
        if ( !this.$store.state.controlArr || this.$store.state.controlArr.length <= 0) {
          this.$message.warning('请选择要拒绝的订单')
          return false
        }
        const arr  = []
        const arrOrderNumber  = []
        this.$store.state.controlArr.forEach((value, index)=>{
          arr.push(value.crmApplayId)
          arrOrderNumber.push(value.orderNumber)
        })
        this.multipleSelectionIdList = arr.join(',')
        this.orderNumber = arrOrderNumber.join(',')
        this.dialogFollow.dialogFollowVisible=true
        this.form= {
          crmApplayId: '',
          remark: '',
          rejectReasonNumber: '',
          rejectReason: ''
        }
      },
      handleSizeChange(val) {
        let myPageSize = JSON.parse(localStorage.getItem('myPageSize'))
        myPageSize.C_ControlList = val
        localStorage.setItem('myPageSize',JSON.stringify(myPageSize))
        this.pageSize = val
        this.queryApplyOrderInfoFn()
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.currentPage = val
        this.queryApplyOrderInfoFn()
      },
      getDepartmentZtreeFn() {
        api.getDepartmentZtree({groupId:''}).then(res => {
          if(res.data.status == 1) {
            this.treeData = res.data.ztree
            this.zTreeData = this.toTree(res.data.ztree)
//				console.log(this.zTreeData,123)
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
    },
    components: {
      TitCommon,
      TableList,
      Search,
      Pagination
    }

  }
</script>
<style lang="less">
  .allCustList {
    .line-limit-length {
      margin-left:10px;
      display: inline-block;
      width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .table-wrap {
      padding-top: 20px;
      .el-table th {
        padding: 9px 0;
      }
      .el-table td{
        padding: 3px 0;
      }
    }
    .rejectInfo{
      .proviceCity {
        /*display: block;*/
        width: 100px;
      }
    }
    .textPro {
      .el-textarea{
        width:308px;
        float:right;
      }
    }
  }
</style>
