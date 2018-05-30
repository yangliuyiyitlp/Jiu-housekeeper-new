<template>
  <div class="allCustList table-wraps">
    <TitCommon :title='title'></TitCommon>
    <el-row  type="flex" >
      <el-col  class="searchbox">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label-width='105px'>
            <el-date-picker
              v-model="formInline.applyDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd"
              :default-time="['00:00:00', '24:00:00']"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item >
            <el-select v-model="formInline.state" placeholder="通知类型">
              <el-option
                v-for="item in states"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button  icon="el-icon-search" @click='queryInfoList'>查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click='add'>新增推送</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="custListWrap">
      <div class="table-wrap mrtop20">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column align='center' type="index"  width="100" label="序号" >

          </el-table-column>
          <el-table-column
            align='center'
            :show-overflow-tooltip="true"
            prop="status"
            label="类型">
            <template slot-scope="scope">
              <span v-if='scope.row.channel==0'>手机站</span>
              <span v-if='scope.row.channel==1'>APP</span>
              <span v-if='scope.row.channel==2'>官网</span>

            </template>
          </el-table-column>
          <el-table-column
            align='center'
            :show-overflow-tooltip="true"
            prop="link"
            label="发送内容">
          </el-table-column>

          <el-table-column
            align='center'
            :show-overflow-tooltip="true"
            prop="reorder"
            label="发送时间">
          </el-table-column>

          <el-table-column
            align='center'
            :show-overflow-tooltip="true"
            prop="reorder"
            label="操作人">
          </el-table-column>

        </el-table>
      </div>
      <div class="pad20 alignCen">
        <pagination
          :currentPage = 'currentPage'
          :myPageSizes = 'pageSize'
          :total = 'total'
          @handleSizeChange = 'handleSizeChange'
          @handleCurrentChange = 'handleCurrentChange'
        >
        </pagination>
      </div>
    </div>
    <el-dialog title="消息推送" :visible.sync="banner_DialogVisible" width="35%"  center  @close="addDiaClose" :close-on-click-modal ='false' class="infoListDialog">
      <el-form label-width="130px" ref="addForm" :model="addForm" class="demo-form-inline infoListClass" :rules="addForm_rules" >

        <el-form-item  prop="status"  >
          <el-select v-model="addForm.status" placeholder="请选择通知类型" >
            <el-option  label="有效" value="1" ></el-option>
            <el-option  label="无效" value="0" ></el-option>
          </el-select>
          &nbsp;&nbsp;默认发送所有注册会员
        </el-form-item>
        <el-form-item prop="textarea">
        <el-input
          @input="descInput"
          type="textarea"
          :rows="5"
          placeholder="请录入需发送消息，限制100个文字以内"
          v-model="addForm.textarea">
        </el-input>
        </el-form-item>
        <p>{{number}}/100</p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel_addModify()">取消</el-button>
        <el-button type="primary" :loading="buttonLoading" @click="confirm_add('addForm')">发送</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import api from '@/api/index.js'
  import TitCommon from '@/components/common/TitCommon'
  import TableList from '@/components/custManage/TableList'
  import Pagination from '@/components/common/Pagination'
  export default {
    name: 'infoList',
    data() {
      return {
        buttonLoading:false,
        title: '消息推送',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        banner_DialogVisible:false,
        currentPage:1,
        total: 1,
        pageNo: 1,
        pageSize: 10,
        tableData: [],
        formInline:{},
        states:[
          {
            label:'全部',
            value: null
          },
          {
            label:'有效',
            value:'1'
          },
          {
            label:'无效',
            value:'0'
          }
        ],
        addForm:{},
        addForm_rules:{
          status:[
            {required:true, max:50,message: '请选择通知类型', trigger: 'blur' }
          ],
          textarea:[
            {required:true, max:200,message: '请录入发送信息', trigger: 'blur' }
          ]
        },
        bannerId:'',
        number:200
      }
    },
    created() {

      if (JSON.parse(localStorage.getItem('myPageSize'))) {
        this.pageSize = JSON.parse(localStorage.getItem('myPageSize')).W_bannerList?JSON.parse(localStorage.getItem('myPageSize')).W_bannerList:10
        console.log(JSON.parse(localStorage.getItem('myPageSize')).W_bannerList)
      } else {
        let obj = {}
        localStorage.setItem('myPageSize',JSON.stringify(obj))
      }
    },
    mounted(){
      this.queryInfoList();
    },
    methods: {
      descInput(){ //校验字符或者文字
        let len=0
        let txtVal = this.addForm.textarea;
        for (let i = 0; i < txtVal.length; i++) {
            let a = txtVal.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null)
            {
              len += 1;
            }
            else
            {
              len += 0.5;
            }
          }
        this.number = parseInt(100 - len);
      },
      handleSizeChange(val) {
        let myPageSize = JSON.parse(localStorage.getItem('myPageSize'))
        myPageSize.infoList = val
        localStorage.setItem('myPageSize',JSON.stringify(myPageSize))
        this.pageSize = val
        this.queryInfoList();

      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.currentPage = val
        this.queryInfoList();
      },
      queryInfoList(){
        const pararms = {
          pageNo:this.pageNo,
          pageSize:this.pageSize,
          title:this.formInline.title,
          status:this.formInline.state,
          channel:this.formInline.channel
        }
        console.log('==============')
        api.queryBannerList(pararms).then(res=>{
          console.log(res)
          if(res.data.code == 1){
            this.total = res.data.total;
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
      add(a){
        this.buttonLoading = false;
        this.banner_DialogVisible = true;
        this.bannerId='';
      },
      confirm_add(addForm){
        this.$refs[addForm].validate((valid) => {
          if (valid) {
            console.log(666)
            this.buttonLoading = true;
//          	this.updateSysBannerFn()
            api.updateSysBanner({
              id:this.bannerId,
              title:this.addForm.title,
              link:this.addForm.link,
              status:this.addForm.status,
              channel:this.addForm.channel,
              reorder:this.addForm.reorder,
              imgAddress:this.addForm.imgAddress,
              describe:this.addForm.describe
            }).then(res=>{
              this.buttonLoading = false;
              console.log(res)
              if(res.data.code == 1){
                this.queryInfoList()
                this.$message.success(res.data.msg);
                this.banner_DialogVisible = false;
              }else{
                this.$message.error(res.data.msg)
              }


            })
          }
        })
      },
      addDiaClose(){
        // console.log("addDiaClose=====")
        Object.assign(this.addForm,{
          title:'',
          link:'',
          status:'',
          channel:'',
          imgAddress:'',
          describe:'',
          reorder:''
        })
        this.$nextTick(()=>{
          this.$refs.addForm.clearValidate();
        })
      },
      cancel_addModify(){
        this.banner_DialogVisible = false;
        this.$refs['addForm'].resetFields();
      }
    },

    components: {
      TitCommon,
      TableList,
      Pagination
    }

  }
</script>
<style  lang="less" >
.infoListClass {
  .el-form-item__content{
    margin-left:0!important;
  }
  .el-select{
    width:200px;
    float:left;
  }
  p{
    float:right;
  }
}
</style>
