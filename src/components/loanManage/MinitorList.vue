<template>
 <div class="allCustList">
 	<TitCommon :title='title'></TitCommon>
   <div class="custListWrap">
     <search
       ref='search'
       :data = 'zTreeData'
       @searchFn='searchFn'
       :permission ='permission'>
     </search>
     <div class="table-wrap mrtop20">
       <table-list
         :loadingTable = 'loadingTable'
         :tableData='tableData'
         @forWard = 'forWard'
         @viewData = 'viewData'
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
<div>
  <!--跟进弹框-->
  <dialog-follow :dialogFollow='dialogFollow' :rowFollowId = 'rowFollowId' ref="childDialogFollow"></dialog-follow>
</div>
   </div>
 </div>
</template>

<script>
import TitCommon from '@/components/common/TitCommon'
import Pagination from '@/components/common/Pagination'
import Search from '@/components/loanManage/Search'
import DialogFollow from '@/components/loanManage/dialog/DialogFollowMini'
import TableList from '@/components/loanManage/LoanTableList'
import api from "@/api/index"
export default {
  name: 'MinitorList',
  data() {
  	return {
  		title: '放款监测订单',
      currentPage:1,
      total: 0,
      pageNo: 1,
      pageSize: 10,
      tableData:[],
      rowFollowId: null,
      dialogFollow: {
        dialogFollowVisible: false

      },
      loadingTable: false,
      zTreeData: [],
      serachPararms:{},
  	}
  },
  created() {
    if (JSON.parse(localStorage.getItem('myPageSize'))) {
      this.pageSize = JSON.parse(localStorage.getItem('myPageSize')).MinitorList?JSON.parse(localStorage.getItem('myPageSize')).MinitorList:10
    } else {
      let obj = {}
      localStorage.setItem('myPageSize',JSON.stringify(obj))
    }
  },
  computed: {
    permission () {
      return {
        showAllPararms:true,
        typeNameIndex:2
      }
    }
  },
  mounted() {
    this.queryMiniList()

  },
  methods:{

    searchFn(data) {
      console.log(66,data);
      this.serachPararms = Object.assign(this.serachPararms,data)
//		let arrCheckList = this.serachPararms.checkList
      if(!this.serachPararms.checkListParams){
        this.serachPararms.checkListParams = ''
      }
      this.queryMiniList()


    },
    queryMiniList(){
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
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        queryParam: this.serachPararms.content, //姓名|手机|身份证号查询参数
        a: this.serachPararms.checked, //todo 全部
        b: this.serachPararms.checkList, //todo 正常 监测异常
        oneSelf: this.serachPararms.onlyCheck,//仅查看我的客户
        proTypeId: this.serachPararms.productList,//产品系列
        proId: this.serachPararms.productName,//产品名称
        department: this.serachPararms.partName,//公司|部门
        empQueryParam: this.serachPararms.people,//归属人
        loanDayBegin: this.serachPararms.overDateStart,//放款天数开始
        loanDayEnd: this.serachPararms.overDateEnd,//放款天数结束
        provId: this.serachPararms.applyProvince,//省份
        cityId: this.serachPararms.applyCity,//城市
        loanTimeBegin: s_time,//放款时间开始
        loanTimeEnd: e_time,//放款时间结束
      }
      console.log(pararms)
      api.queryMiniList(pararms).then(res => {
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
      })
    },
    forWard(row){
      this.dialogFollow.dialogFollowVisible= true
      this.rowFollowId = row.crmCustInfoId
      this.$nextTick(function () {
        this.$refs.childDialogFollow.queryFollowList() // 方法2 父组件调用子组件弹框里面的方法

      })
    },
    viewData(row){
      var routeData = this.$router.resolve({
        path: '/detail/orderDetail',
        query: {
          crmApplayId: row.applyId
        }
      });
      window.open(routeData.href);
      console.log('href:',routeData);
    },
    handleSizeChange(val) {
      this.currentPage = 1
      let myPageSize = JSON.parse(localStorage.getItem('myPageSize'))
      myPageSize.MinitorList = val
      localStorage.setItem('myPageSize',JSON.stringify(myPageSize))
      this.pageNo = 1
      this.pageSize = val
      this.queryMiniList()
    },
    handleCurrentChange(val) {
      this.pageNo = val
      this.queryMiniList()
    },
  },
  components: {
  	TitCommon,
    Search,
    Pagination,
    DialogFollow,
    TableList
  }

 }
</script>
