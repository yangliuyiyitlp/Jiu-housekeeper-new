<template>
  <div class="allCustList table-wraps android">
    <TitCommon :title='title'></TitCommon>
    <el-row  type="flex" >
      <el-col  class="searchbox">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item>
            <el-input
              class="titleTip"
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
              <!--v-if="scope.row.newData == 1"-->
              <el-button
                v-if="scope.row.newData == 1"
                class="modify"
                @click.native.prevent="modifyData(scope.row)"
                type="text"
                size="small">
                修改
              </el-button>
              <a :href="scope.row.url"  class="downLoadUrl">下载</a>
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
    <el-dialog :title="androidTitle" :center =true :visible.sync="banner_DialogVisible" width="50%"   @close="addDiaClose" :close-on-click-modal ='false'>
      <el-form label-width="130px" ref="addForm" :model="addForm" class="demo-form-inline" :rules="addForm_rules">
        <el-form-item label="安装包：" prop="url"  >
          <el-upload
            class="upload-demo"
            :action="fileUpLoad"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :on-error="handleError"
            :before-upload="beforeAvatarUpload"
            :limit="1"
            :file-list="fileList"
            :on-exceed="handleExceed">
            <el-button size="small androidUpLoad" type="primary">上传</el-button>
            <div slot="tip">仅支持上传.apk格式的文件，文件大小100M以内；</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="版本号：" prop="version"  >
          <el-input  class='titleTip' v-model="addForm.version" ></el-input>&nbsp;&nbsp;<a href="javascript:void(0)" class="androidTip">版本号不可重复</a>
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
        androidTitle:'',
        formInline:{queryParam:''},
        currentPage:1,
        pageSize: 10,
        total: 1,
        pageNo: 1,
        tableData:[],
        addForm:{
          id:'',
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
        ControlId:""
      }
    },
    created() {
//  	console.log(this.fileUpLoad,'90000000')
		 	if (JSON.parse(localStorage.getItem('myPageSize'))) { 	
		 		this.pageSize = JSON.parse(localStorage.getItem('myPageSize')).W_AndroidVersionControl?JSON.parse(localStorage.getItem('myPageSize')).W_AndroidVersionControl:10
		 		console.log(JSON.parse(localStorage.getItem('myPageSize')).W_AndroidVersionControl)
		 	} else {
		 		let obj = {}
		 		localStorage.setItem('myPageSize',JSON.stringify(obj))
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
        this.androidTitle='新增'
        this.ControlId=''
        this.fileList =[]
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
              message: "获取列表失败",
              duration: 1500
            });
          }
        })
      },//查询列表
      modifyData(row){
        this.fileList =[]
        console.log(96,row);
        console.log(11,this.addForm.urlName);
        // row.urlName= this.addForm.urlName
        this.buttonLoading = false;
        this.banner_DialogVisible =true
        this.androidTitle='修改'
        this.ControlId=row.id
        // this.fileList.push({name:row.urlName,url:row.url})
        // console.log(97,this.fileList);
        this.addForm = Object.assign(this.addForm,row)
        console.log(this.addForm)
      },
      // downLoad(scope){
      //   const id=scope.row.id
      //   api.androidVersionLoad({id:id}).then(res=>{
      //     if(res.data.code == 1){
      //     } else {
      //       this.$notify({
      //         title: '提示',
      //         message: res.data.msg,
      //         duration: 1500
      //       });
      //     }
      //   })
      // },
      confirm_add(addForm){
        this.$refs[addForm].validate((valid) => {
          if (valid) {
            console.log(666)
            this.buttonLoading = true;
            api.updateAndroidVersion({
              id:this.ControlId,
              version:this.addForm.version,
              status:this.addForm.status,
              content:this.addForm.content,
              url:this.addForm.url
            }).then(res=>{
              this.buttonLoading = false;
              console.log(res)
              if(res.data.code == 1){
                this.queryAndroidVersion()
                this.$message.success(res.data.msg);
                this.banner_DialogVisible = false;
                this.fileList =[]
              }else{
                this.$message.error(res.data.msg)
              }


            })
          }
        })
      },
      cancel_addModify(){
        this.banner_DialogVisible =false
        this.fileList =[]
        this.$refs['addForm'].resetFields();
      },
      addDiaClose(){
        this.fileList =[]
        Object.assign(this.addForm,{
          id:'',
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
        this.addForm.url = ""
        // this.addForm.urlName = ""
      },
      handlePreview(file) { //点击文件列表中已上传的文件时的钩子

      },
      handleExceed(files, fileList) { //文件超出个数限制时的钩子
        this.$message('当前限制选择 1个文件');
      },
      handleError(err){
        console.log(89,err);
        this.$message.error('文件上传失败!')
      },
      handleAvatarSuccess(response, file){ //上传成功后
        console.log(99,response,file);
        this.addForm.url = file.url
        // this.addForm.urlName = file.name
        // this.urlName = file.name
        this.$message.success('文件上传成功!')
        this.$refs.addForm.validateField('url');
        console.log(22,response);
        console.log(33,file);
        if(response.responseCode == 1 || response.responseCode == "1"){
          console.log(99,file);
          this.addForm.url = response.fileURL
          // this.addForm.urlName = file.name
          // this.urlName = file.name
          this.$message.success('文件上传成功!')
          this.$refs.addForm.validateField('url');
        }else{
          this.$message.error(response.message)
        }
      },
      beforeAvatarUpload(file){ //文件上传之前
        console.log(55,file);
        const textArr = file.name.split('.')
        const isApk = textArr[textArr.length-1]
        // const isApk=file.type
        const isLtName = file.name.split('.')[0]
        const isLt1M = file.size / 1024 < 100
        if(isApk === "apk"){
          if (!isLt1M) {
            this.$message('文件大小100M以内!')
            return false
          }
          if (isLtName.length>50) {
            this.$message('文件名长度最多为50!')
            return false
          }
        }else{
          this.$message("仅支持上传.apk格式的文件");
          return false
        }
      },
      handleSizeChange(val) {
      	this.currentPage = 1
				let myPageSize = JSON.parse(localStorage.getItem('myPageSize'))
  			myPageSize.W_AndroidVersionControl = val
	 			localStorage.setItem('myPageSize',JSON.stringify(myPageSize))
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
      Pagination
    }

  }
</script>
<style  lang="less" scoped>
.titleTip{
  width:350px;
}
  .android .el-dialog__title{
    font-weight:700;
  }
  .androidTip{
    color:#606266;
  }
  .androidUpLoad{width:100px;}
  .modify span,.downLoadUrl{
    color: #409EFF;
    font-size:12px;
    font-weight:400;
  }
</style>
