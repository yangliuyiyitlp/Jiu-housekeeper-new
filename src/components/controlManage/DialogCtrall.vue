<template>
  <div class="order-list-wrap ">
    <div class="follow-wrap">
      <el-dialog title="拒单" width='450px'  center :visible.sync="dialogFollow.dialogFollowVisible">
        <el-form :model="form" ref="form" :rules="form_rules">
          <el-form-item label="订单编号：">
          <a href="#">{{multipleSelectionIdList}}</a>
          </el-form-item>
          <el-form-item label="拒单原因：" prop="a" class="rejectInfo">
              <el-select v-model="form.homeProvinceId" class="proviceCity" placeholder="请选择" @change='changeHead' clearable >
                <!--<el-option v-for = '(val,ind) in applyProvince' :label='val.provinceName' :value="val.id" :key='ind'></el-option>-->
              </el-select>
              <el-select v-model="form.homeCityId" class="proviceCity" placeholder="请选择" @change='changeInfo' clearable >
                <!--<el-option v-for = '(val,ind) in applyCity' :label='val.cityName' :value="val.id" :key='ind'></el-option>-->
              </el-select>
              <el-select v-model="form.homeDistrictId" class="proviceCity" placeholder="请选择" clearable>
                <!--<el-option v-for = '(val,ind) in applyArea' :label='val.districtName' :value="val.id" :key='ind'></el-option>-->
              </el-select>
          </el-form-item>
          <el-form-item label="备注说明：" prop="warnIng" class="textPro">
            <el-input type="textarea" v-model.trim="form.warnIng" :maxlength = '200' ></el-input>
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
</template>

<script>
  import api from "@/api/index"
  export default {
    props: {
      dialogFollow: {
        type: Object,
        default: function () {
          return {
            dialogFollowVisible: false,
          }
        }
      },
      rowFollowId: {
        type: String,
        default: ''
      },
      multipleSelectionIdList:{
        type: String,
        default: ''
      }
    },
    data () {
      return {
        saveFollow:false,
        formLabelWidth: '80px',
        form: {
          format: '',
          date: '',
          content: '',
          warnIng: ''
        },
        form_rules:{
          a:[
            {required:true, message: '请选择跟进日期', trigger: 'blur,change' }
          ],
          warnIng:[
            {required:true, message: '请选择跟进日期', trigger: 'blur,change' }
          ]
        },
      }
    },
    created(){

    },
    methods: {
      changeHead(){},
      changeInfo(){},
      confirm_follow(form){
        this.$refs['form'].validate((valid) => {
          if(valid){
            this.saveFollow = true
            api.saveFollowInfo({
              crmCustInfoId:this.rowFollowId,
              followNode:'3',//跟进环节:1.贷前 2.监测 3.贷后 4.ERP跟进 必填
//							followTime:this.form.date,
//							followType:this.form.format,
              followContent:this.form.content,//跟进内容
              reminderTime: this.form.date,//提醒时间,预约跟进 贷后
              reminderContent: this.form.warnIng,//提醒内容 贷后
            }).then((res) => {
              this.saveFollow = false
              this.dialogFormVisible = false
              this.queryFollowList()
              console.log('==============')
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

      }
    },
  }
</script>
<style scoped lang="less">
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
</style>
