<template>
  <div class="allCustList table-wraps android">
    <TitCommon :title='title'></TitCommon>
    <el-row  type="flex" >
      <el-col  class="searchbox">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-input
              class="title"
              placeholder="请录入版本号、更新内容查询"
              clearable
              v-model.trim="formInline.queryParam" :maxlength="50">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">查询</el-button>
            <el-button type="primary" @click="add('add')">新增</el-button>
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
          <el-table-column align='center' type="index"  width="60" label="序号" >

          </el-table-column>
          <el-table-column
            prop="id"
           v-if="0" >
          </el-table-column>
          <el-table-column
            align='center'
            :show-overflow-tooltip="true"
            prop="version"
            label="版本号"
            width="180">
          </el-table-column>

          <el-table-column
            align='center'
            :show-overflow-tooltip="true"
            prop="updateTime"
            label="更新时间">
          </el-table-column>
          <el-table-column
            align='center'
            :show-overflow-tooltip="true"
            prop="publisher"
            label="更新人">
          </el-table-column>
          <el-table-column
            align='center'
            :show-overflow-tooltip="true"
            prop="content"
            label="更新说明">
          </el-table-column>
          <el-table-column
            align='center'
            :show-overflow-tooltip="true"
            prop="date"
            label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="scope.$index == 0"
                @click.native.prevent="modifyData(scope.row)"
                type="text"
                size="small">
                修改
              </el-button>
              <el-button
                @click.native.prevent="downLoad(scope)"
                type="text"
                size="small">
                下载
              </el-button>
            </template>
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
    <el-dialog :title="addModify_title" :center =true :visible.sync="banner_DialogVisible" width="50%"   @close="addDiaClose" :close-on-click-modal ='false'>
      <el-form label-width="130px" ref="addForm" :model="addForm" class="demo-form-inline" :rules="addForm_rules">
        <el-form-item label="安装包：" prop="url"  >
          <el-upload
            class="upload-demo"
            :action="fileUpLoad"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small androidUpLoad" type="primary">上传</el-button>
            <div slot="tip">仅支持上传.apk格式的文件，文件大小100M以内；</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="版本号：" prop="version"  >
          <el-input  class='title' v-model="addForm.version" ></el-input>&nbsp;&nbsp;<a href="javascript:void(0)" class="androidTip">版本号不可重复</a>
        </el-form-item>
        <el-form-item label="是否强制更新：" prop="status"  >
          <el-radio-group v-model="addForm.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="更新说明：" prop="content"  >
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 8}"
            v-model="addForm.content">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel_addModify()">取消</el-button>
        <el-button type="primary" :loading="buttonLoading" @click="confirm_add('addForm')">确定</el-button>
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
    name: 'AndroidVersionControl',
    data() {
      const validateFileAddress = (rule, value, callback) => {
        console.log(789,value);
        if (value === '') {
          callback(new Error('请上传安装包'))
        }else {
          callback()
        }
      }
      return {
        title: '安卓版本管理',
        addModify_title:'',
        formInline:{queryParam:''},
        currentPage:1,
        pageSize: 10,
        total: 1,
        pageNo: 1,
        tableData:[{'title':1}],
        addForm:{
          version:'',
          status:'',
          content:'',
          url:''
        },
        banner_DialogVisible:false,
        buttonLoading:false,
        addForm_rules:{
          version:[
            {required:true, max:20,message: '请输入版本号', trigger: 'blur' }
          ],
          status:[
            {required:true, message: '请选择是否强制更新', trigger: 'blur' }
          ],
          content:[
            {required:true, max:100,message: '请输入更新说明', trigger: 'blur' }
          ],
          url:[
            {required:true, message: '请上传文件', trigger: 'blur' }
          ]
          // fileAddress:[
          //   {validator: validateFileAddress, trigger: 'blur,change'}
          // ]
        },
        fileList:[],
        fileUpLoad:api.fileUpLoad,
        ControlId:''
      }
    },
    mounted(){
      this.queryAndroidVersion()
    },
    methods: {
      search(){
        this.pageNo = 1
        this.pageSize = 10
        this.queryAndroidVersion()
      },
      add(){
        this.buttonLoading = false;
        this.banner_DialogVisible =true
        this.addModify_title='新增'
        this.ControlId=''
      },
      queryAndroidVersion(){
        const pararms = {
          pageNo:this.pageNo,
          pageSize:this.pageSize,
          queryParam:this.formInline.queryParam
        }
        console.log('==============')
        api.queryAndroidVersion(pararms).then(res=>{
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
      },//查询列表
      modifyData(row){
        this.buttonLoading = false;
        this.banner_DialogVisible =true
        this.addModify_title='修改'
        this.ControlId=row.id
        this.addForm = Object.assign(this.addForm,row)
        console.log(this.addForm)
      },
      downLoad(scope){
        const id=scope.row.id
        api.androidVersionLoad({id:id}).then(res=>{
          if(res.data.code == 1){
          } else {
            this.$notify({
              title: '提示',
              message: res.data.msg,
              duration: 1500
            });
          }
        })
      },
      confirm_add(addForm){
        this.$refs[addForm].validate((valid) => {
          if (valid) {
            console.log(666)
            this.buttonLoading = true;
            api.updateAndroidVersion({
              id:this.ControlId,
              version:this.addForm.version,
              status:this.addForm.status,
              content:this.addForm.content
            }).then(res=>{
              this.buttonLoading = false;
              console.log(res)
              if(res.data.code == 1){
                this.queryAndroidVersion()
                this.$message.success(res.data.msg);
                this.banner_DialogVisible = false;
              }else{
                this.$message.error(res.data.msg)
              }


            })
          }
        })
      },
      cancel_addModify(){
        this.banner_DialogVisible =false
        this.$refs['addForm'].resetFields();
      },
      addDiaClose(){
        Object.assign(this.addForm,{
          version:'',
          status:'',
          content:'',
          url:''
        })
        this.$nextTick(()=>{
          this.$refs.addForm.clearValidate();
        })
      },
      handleRemove(file, fileList) { //文件列表移除文件时的钩子
        console.log(file, fileList);
        this.addForm.url = ""
      },
      handlePreview(file) { //点击文件列表中已上传的文件时的钩子

      },
      handleExceed(files, fileList) { //文件超出个数限制时的钩子
        this.$message('当前限制选择 1个文件');
      },
      beforeRemove(file, fileList) { //文件列表移除前文件时的钩子
        const isYes = this.$confirm(`确定移除 ${ file.name }？`);
        if(isYes){
          this.addForm.url = ""
        }else{
          return false;
        }

      },
      handleAvatarSuccess(a){ //上传成功后
        console.log(99,a);
        this.addForm.url = a.data.url
        this.$refs.addForm.validateField('url');
      },
      beforeAvatarUpload(file){ //文件上传之前
        const isApk = file.name.split('.')[1]
        const isLt1M = file.size / 1024 < 100
        if(isApk === "apk"){
          if (!isLt1M) {
            this.$message('文件大小100M以内!')
            return false
          }
        }else{
          this.$message("仅支持上传.apk格式的文件");
          return false
        }
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.queryAndroidVersion();
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.currentPage = val
        this.queryAndroidVersion();
      },
    },

    components: {
      TitCommon,
      TableList,
      Pagination
    }

  }
</script>
<style  lang="less" scoped>
.title{
  width:350px;
}
  .android .el-dialog__title{
    font-weight:700;
  }
  .androidTip{
    color:#606266;
  }
  .androidUpLoad{width:100px;}
</style>
