<template>
  <div class="order-list-wrap ">
		<el-dialog
			:close-on-click-modal ='false'
			width='60%'
			title=""
			:visible.sync="dialogFollow.dialogFollowVisible"
		>
			  <div class="title">跟进记录</div>
			  <p class="mrtop20">
          <el-button type="primary" @click='followWrap'>新增跟进</el-button>
        </p>
			  <div class="wrap-list table-wraps">
			  	<el-table
			  		height='300px'
					  	border
					  	:data="arrData">
					  	<el-table-column
					    	label="序号"
					      	type="index"
					      	align='center'
					      	width="50">
				    	</el-table-column>
					    <el-table-column prop="followNode" label="跟进环节" align='center'>
					    	<template slot-scope="scope">
						        <span v-if='scope.row.followNode == 1'>贷前</span>
						        <span v-if='scope.row.followNode == 2'>检测</span>
						        <span v-if='scope.row.followNode == 3'>贷后</span>
						        <span v-if='scope.row.followNode == 4'>ERP贷后</span>
					      </template>
					    </el-table-column>
					    <el-table-column prop="followType" label="跟进形式" align='center'>
					    	<template slot-scope="scope">
						        <span v-if='scope.row.followType == 1'>电话</span>
						        <span v-if='scope.row.followType == 2'>外访</span>
						        <span v-if='scope.row.followType == 3'>活动</span>
					      </template>
					    </el-table-column>
					    <el-table-column prop="createTime" label="跟进时间" align='center'>
					    </el-table-column>
					    <el-table-column prop="followContent" label="跟进内容" align='center'>
					    	<template slot-scope="scope">
						        <span class="btn-color" @click="showDifferDialog(scope.row,scope.row.followNode)">查看</span>
					      </template>
					    </el-table-column>
					    <el-table-column prop="followTime" label="操作日期" align='center'>
					    </el-table-column>
					    <el-table-column prop="realName" label="操作人" align='center'>
					    </el-table-column>
					</el-table>
					<div class="pagWrap">
					  <pagination
							:currentPage = 'currentPage'
							:total = 'total'
							@handleSizeChange = 'handleSizeChange'
							@handleCurrentChange = 'handleCurrentChange'
			 				>
	 					</pagination>
	 				</div>
			  </div>
		</el-dialog>
		<div class="follow-wrap">
			<!--①新增跟进’贷前‘弹框--START-->
			<el-dialog title="新增跟进" width='800px' center :visible.sync="dialogFormVisible">
			  <el-form :model="form" ref="form" :rules="form_rules">
          <el-form-item label="监测时间：" :label-width="formLabelWidth" class="miniHeader" prop="followTime">
            <el-date-picker
            v-model="form.followTime"
            :picker-options="follow_pickerOptions"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
			    <el-form-item label="监测方式：" :label-width="formLabelWidth" class="miniHeader"  prop="monitorType" >
			      <el-select v-model="form.monitorType" placeholder="请选择"  @change="changeType">
			        <el-option label="常规监测" value="1"></el-option>
			        <el-option label="上门拜访" value="2"></el-option>
			      </el-select>
			    </el-form-item>
          <el-form-item> </el-form-item>
          <el-form-item>
            <div class=" borBot1px dialogLoanEnd"></div>
          </el-form-item>
          <el-form-item label="是否失联：" :label-width="formLabelWidth" prop="disappearStatus">
            <el-radio-group v-model="form.disappearStatus">
              <el-radio  :label="0" >否</el-radio>
              <el-radio  :label="1" >是</el-radio>
            </el-radio-group>
            <el-input v-model="form.disappearRemark" class="miniInput" :id="isDisappearRemark ? 'classTip':'classDefault'"></el-input>
            <a href="#" class="dialogTip" v-if="isDisappearRemark"  >{{remarksInfo.isDisappearRemark}}</a>
          </el-form-item>
          <el-form-item label="是否异常：" :label-width="formLabelWidth" prop="expectionStatus">
            <el-radio-group v-model="form.expectionStatus">
              <el-radio  :label="0" >否</el-radio>
              <el-radio  :label="1" >是</el-radio>
            </el-radio-group>
            <el-input v-model="form.expectionRemark" class="miniInput" :id="isExpectionRemark ? 'classTip':'classDefault'"></el-input>
            <a href="#" class="dialogTip" v-if="isExpectionRemark">{{remarksInfo.isExpectionRemark}}</a>
          </el-form-item>
          <el-form-item v-if="isStyle">
            <el-checkbox-group v-model="isFamily" class="formType">
              <el-checkbox  name="type"><a href="#" class="addressTip">*</a>上门回访家庭地址：</el-checkbox>
            </el-checkbox-group>
            <el-select v-model="form.homeProvinceId" class="proviceCity" placeholder="请选择" @change='changeFamilyProvince' clearable :disabled="!isFamily">
            <el-option v-for = '(val,ind) in applyProvince' :label='val.provinceName' :value="val.id" :key='ind'></el-option>
            </el-select>
            <el-select v-model="form.homeCityId" class="proviceCity" placeholder="请选择" @change='changeFamilyCity' clearable :disabled="!isFamily">
            <el-option v-for = '(val,ind) in applyCity' :label='val.cityName' :value="val.id" :key='ind'></el-option>
            </el-select>
            <el-select v-model="form.homeDistrictId" class="proviceCity" placeholder="请选择" clearable :disabled="!isFamily">
            <el-option v-for = '(val,ind) in applyArea' :label='val.districtName' :value="val.id" :key='ind'></el-option>
            </el-select>
            <el-input v-model="form.homeAddress" class="proviceInput" :disabled="!isFamily"></el-input>
            <a href="#" class="dialogTip" v-if="isHomeAddress">请填写全回访家庭地址</a>
          </el-form-item>

          <el-form-item  v-if="isStyle" label="地址是否变化：" :label-width="formLabelWidth" prop="homeChangeStatus" >
            <el-radio-group v-model="form.homeChangeStatus" :disabled="!isFamily">
              <el-radio  :label="0" >否</el-radio>
              <el-radio  :label="1" >是</el-radio>
            </el-radio-group>
            <el-input v-model="form.homeChangeRemark" class="miniInput" :disabled="!isFamily" :id="isHomeChangeRemark ? 'classTip':'classDefault'"></el-input>
            <a href="#" class="dialogTip" v-if="isHomeChangeRemark">{{remarksInfo.isHomeChangeRemark}}</a>
          </el-form-item>


          <el-form-item  v-if="isStyle" label="地址是否异常：" :label-width="formLabelWidth" prop="homeExceptionStatus">
            <el-radio-group v-model="form.homeExceptionStatus" :disabled="!isFamily">
              <el-radio  :label="0" >否</el-radio>
              <el-radio  :label="1" >是</el-radio>
            </el-radio-group>
            <el-input v-model="form.homeExceptionRemark" class="miniInput" :disabled="!isFamily" :id="isHomeExceptionRemark ? 'classTip':'classDefault'"></el-input>
            <a href="#" class="dialogTip" v-if="isHomeExceptionRemark">{{remarksInfo.isHomeExceptionRemark}}</a>
          </el-form-item>


          <el-form-item v-if="isStyle" >
            <el-checkbox-group v-model="isCompany" class="formType">
              <el-checkbox  name="type"><a href="#" class="addressTip">*</a>上门回访公司地址：</el-checkbox>
            </el-checkbox-group>
            <el-select v-model="form.comProvinceId" class="proviceCity" placeholder="请选择" clearable @change='changeCompanyProvince' :disabled="!isCompany" >
              <el-option v-for = '(val,ind) in applyProvince' :label='val.provinceName' :value="val.id" :key='ind'></el-option>
            </el-select>
            <el-select v-model="form.comCityId" class="proviceCity" placeholder="请选择" clearable @change='changeCompanyCity' :disabled="!isCompany">
              <el-option v-for = '(val,ind) in companyCity' :label='val.cityName' :value="val.id" :key='ind'></el-option>
            </el-select>
            <el-select v-model="form.comDistrictId" class="proviceCity" placeholder="请选择" clearable :disabled="!isCompany" @change='changeProviceCity'>
              <el-option v-for = '(val,ind) in companyArea' :label='val.districtName' :value="val.id" :key='ind'></el-option>
            </el-select>
            <el-input v-model="form.comAddress" class="proviceInput" :disabled="!isCompany"></el-input>
            <a href="#" class="dialogTip" v-if="isComAddress">请填写全回访公司地址</a>
          </el-form-item>

          <el-form-item  v-if="isStyle"  label="地址是否变化：" :label-width="formLabelWidth" prop="comChangeStatus">
            <el-radio-group v-model="form.comChangeStatus" :disabled="!isCompany">
              <el-radio  :label="0" >否</el-radio>
              <el-radio  :label="1" >是</el-radio>
            </el-radio-group>
            <el-input v-model="form.comChangeRemark" class="miniInput" :disabled="!isCompany" :id="isComChangeRemark ? 'classTip':'classDefault'"></el-input>
            <a href="#" class="dialogTip" v-if="isComChangeRemark">{{remarksInfo.isComChangeRemark}}</a>
          </el-form-item>

          <el-form-item  v-if="isStyle"  label="地址是否异常：" :label-width="formLabelWidth" prop="comExceptionStatus" >
            <el-radio-group v-model="form.comExceptionStatus" :disabled="!isCompany">
              <el-radio  :label="0" >否</el-radio>
              <el-radio  :label="1" >是</el-radio>
            </el-radio-group>
            <el-input v-model="form.comExceptionRemark" class="miniInput" :disabled="!isCompany" :id="isComExceptionRemark ? 'classTip':'classDefault'"></el-input>
            <a href="#" class="dialogTip" v-if="isComExceptionRemark">{{remarksInfo.isComExceptionRemark}}</a>
          </el-form-item>

            <el-form-item   label="其他异常信息：" :label-width="formLabelWidth" prop="otherExceptionStatus">
              <el-radio-group v-model="form.otherExceptionStatus">
                <el-radio  :label="0" >否</el-radio>
                <el-radio  :label="1" >是</el-radio>
              </el-radio-group>
               <!--todo 其他异常备注-->
              <el-input v-model="form.otherExceptionRemark" class="miniInput" :id="isOtherExceptionRemark ? 'classTip':'classDefault'"></el-input>
              <a href="#" class="dialogTip" v-if="isOtherExceptionRemark">{{remarksInfo.isOtherExceptionRemark}}</a>
            </el-form-item>
          <el-form-item>
          <div class=" borBot1px dialogLoanEnd"></div>
          </el-form-item>
          <el-form-item label="结论：" :label-width="formLabelWidth" prop="monitorResult">
            <el-radio-group v-model="form.monitorResult">
              <el-radio  :label="1" >正常</el-radio>
              <el-radio  :label="2" >移交电催</el-radio>
              <el-radio  :label="3" >移交外访</el-radio>
              <el-radio  :label="4" >移交总部</el-radio>
              <!--<el-radio v-for="(value,index) in checkListName" :label="value.radio" :key="index">{{value.name}}</el-radio>-->
            </el-radio-group>
          </el-form-item>
			    <el-form-item label="回访意见：" :label-width="formLabelWidth" prop="visitOpinion">
			       <el-input type="textarea" v-model="form.visitOpinion" class="miniTextarea"></el-input>
			    </el-form-item>
			  </el-form>

			  <div slot="footer" class="dialog-footer">
			    <div class='text-rt'>
			    	<el-button @click="dialogFormVisible = false">取 消</el-button>
			      <el-button type="primary" @click="confirm_follow(form)" :loading='saveFollow'>确 定</el-button>
			    </div>
			  </div>
			</el-dialog>
			<!--新增跟进弹框--END-->

      <!--增跟进’放款监测--END-->
			<!--贷前弹框--START-->
			<el-dialog title="查看跟进" width='360px' center :visible.sync="dialogLoan">
			  <p>{{beforeLoan_followCont}}</p>
			</el-dialog>
			<!--贷前弹框--END-->
			<!--//检测弹框--START-->
			<el-dialog title="查看跟进" width='700px' center :visible.sync="dialogObserve">
			  <p class="observe">
			  	监测时间：{{observeObj.followTime}}
			  	<!--monitorType (integer, optional): 监测方式 ：1.常规监测 2.上门回访-->
			  	<span class="rt">监测方式：{{observeObj.monitorType == 1? '常规监测' : '上门回访'}}</span>
			  </p>
			  <div class="padTop20 borBot1px dialogLoanEnd" style='margin-top: -25px;'>
			  	<el-row>
			  		<el-row>
			  			<el-col :span="5" >是否失联：</el-col>
			  			<!--disappearStatus (integer, optional): 是否失联0.否 1.是 ,-->
			  			<el-col :span="19" >{{observeObj.disappearStatus == 0? '否' : '是'}}{{observeObj.disappearRemark}}</el-col>
			  		</el-row>
						<el-row>
							<el-col :span="5" >是否异常：</el-col>
							<el-col :span="19" >
								{{observeObj.expectionStatus == 0? '否' : '是'}}{{observeObj.expectionRemark}}
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5" >上门回访家庭地址：</el-col>
							<el-col :span="19" >
								{{observeObj.homeProvinceId}} {{observeObj.homeCityId}} {{observeObj.homeDistrictId}}{{observeObj.homeAddress}}
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5" >地址是否变化：</el-col>
							<el-col :span="19" >
								{{observeObj.homeChangeStatus == 0? '否' : '是'}}{{observeObj.homeChangeRemark}}</el-col>
						</el-row>
						<el-row>
							<el-col :span="5" >地址是否异常：</el-col>
							<el-col :span="19" >{{observeObj.comExceptionStatus == 0? '否' : '是'}}{{observeObj.comExceptionRemark}}</el-col>
						</el-row>
						<el-row>
							<el-col :span="5" >上门回访公司地址：</el-col>
							<el-col :span="19" >
								{{observeObj.comProvinceId}}{{observeObj.comCityId}}{{observeObj.comDistrictId}}{{observeObj.comAddress}}
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5" >地址是否变化：</el-col>
							<el-col :span="19" >
								{{observeObj.comChangeStatus == 0? '否' : '是'}}{{observeObj.comChangeRemark}}
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5" >地址是否异常：</el-col>
							<el-col :span="19" >
								{{observeObj.comExceptionStatus == 0? '否' : '是'}}{{observeObj.comExceptionRemark}}
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="5" >其他异常情况：</el-col>
							<el-col :span="19" >{{observeObj.otherExceptionStatus == 0? '否' : '是'}}{{observeObj.comExceptionRemark}}</el-col>
						</el-row>
					</el-row>
				</div>
			  <div class="padTop20 dialogLoanEnd">
			  	<el-row  style='margin-top: -25px;'>
						<div>
							<el-row>
								<el-col :span="5" >结论：</el-col>
									<!--1.正常 2.移交电催 3.移交外访 4.移交总部-->
								<el-col :span="19" >
									<span v-if='observeObj.monitorResult == 1'>正常</span>
									<span v-if='observeObj.monitorResult == 2'>移交电催</span>
									<span v-if='observeObj.monitorResult == 3'>移交外访</span>
									<span v-if='observeObj.monitorResult == 4'>移交总部</span>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="5" >回访意见：</el-col>
								<el-col :span="19" >{{observeObj.visitOpinion}}</el-col>
							</el-row>
						</div>
					</el-row>
				</div>
			</el-dialog>
			<!--检测弹框--END-->

			<!--贷后弹框--START-->
			<el-dialog title="查看跟进" width='700px' center :visible.sync="dialogLoanEnd">
			  <div class="dialogLoanEnd" style='margin-top: -25px;'>
			  	<el-row>
			  		<div>
			  			<el-col :span="3" >催收对象：</el-col>
			  			<el-col :span="21" >本人</el-col>
			  		</div>
						<div>
							<el-col :span="3" >姓名：</el-col>
							<el-col :span="21" >是内容</el-col>
						</div>
						<div>
							<el-col :span="3" >电话/地址：</el-col>
							<el-col :span="21" >1324564879</el-col>
						</div>
						<div>
							<el-col :span="3" >催收反馈：</el-col>
							<el-col :span="21" >
								<span v-if='observeObj.feedbackType == 310000'>有效联络</span>
								<span v-if='observeObj.feedbackType == 310001'>无效联络</span>
							</el-col>
						</div>
						<div>
							<el-col :span="3" >跟进情况：</el-col>
							<el-col :span="21" >{{observeObj.followContent}}</el-col>
						</div>
						<div>
							<el-col :span="3" >预约跟进：</el-col>
							<el-col :span="21" >{{observeObj.reminderTime}}</el-col>
						</div>
						<div>
							<el-col :span="3" >预约提醒：</el-col>
							<el-col :span="21" >{{observeObj.reminderContent}}</el-col>
						</div>
					</el-row>
				</div>
			</el-dialog>
			<!--贷后弹框--END-->
			<!--erp贷后弹框--START-->
			<el-dialog title="查看跟进" width='700px' center :visible.sync="dialogErp">
			  <div class="padTop20" style='margin-top: -25px;'>
			  		<el-row>
			  			<el-col :span="3" >跟进时间：</el-col>
			  			<!--disappearStatus (integer, optional): 是否失联0.否 1.是 ,-->
			  			<el-col :span="9" >{{observeObj.followTime}}</el-col>
			  			<el-col :span="3" >跟进类型：</el-col>
			  			<!--1.电话 2.外访 3.活动-->
			  			<el-col :span="9" >
			  				{{observeObj.followType==1?'电话':observeObj.followType==2?'外访':'活动'}}
			  			</el-col>
			  		</el-row>
						<el-row>
			  			<el-col :span="3" >跟进人员：</el-col>
			  			<!--disappearStatus (integer, optional): 是否失联0.否 1.是 ,-->
			  			<el-col :span="21" >{{observeObj.realName}}</el-col>
			  		</el-row>
			  		<el-row>
			  			<el-col :span="3" >来源：</el-col>
			  			<!--贷后 2信贷 3贷后-->
			  			<el-col :span="9" >{{observeObj.systemType ==1?'贷后':'信贷'}}</el-col>
			  			<el-col :span="3" >系统来源：</el-col>
			  			<!--disappearStatus (integer, optional): 是否失联0.否 1.是 ,-->
			  			<el-col :span="9" >{{observeObj.systemType ==1?'贷后':'信贷'}}</el-col>
			  		</el-row>
			  		<el-row>
			  			<el-col :span="3" >客户状态：</el-col>
			  			<!--disappearStatus (integer, optional): 是否失联0.否 1.是 ,-->
			  			<el-col :span="9" >{{observeObj.customerType ==0?'异常':'正常'}}</el-col>
			  			<el-col :span="4" >本人联系状态：</el-col>
			  			<!--disappearStatus (integer, optional): 是否失联0.否 1.是 ,-->
			  			<el-col :span="8" >{{observeObj.contactType ==0?'异常':'正常'}}</el-col>
			  		</el-row>
			  		<el-row>
			  			<el-col :span="3" >备注：</el-col>
			  			<!--disappearStatus (integer, optional): 是否失联0.否 1.是 ,-->
			  			<el-col :span="21" >
			  				{{122}}
			  				<p><a :href="observeObj.followFileUrl">下载附件</a></p>
			  			</el-col>
			  		</el-row>
				</div>
			</el-dialog>
			<!--erp贷后弹框--END-->
		</div>
  </div>
</template>

<script>
//	import CommonTable from '@/components/custManage/dialog/CommonTable'
import api from "@/api/index"
import Pagination from '@/components/common/Pagination'
	export default {
		props: {
	  	dialogFollow: {
	  		type: Object,
	  		default: function () {
	        return {
	        	dialogFollowVisible: false
	        }
	      }
	  	},
	  	rowFollowId: {
	  		type: String,
	  		default: ''
	  	}
	  },
	  data () {
	    return {
		    	follow_pickerOptions:{
		          disabledDate(time) {
		            return time.getTime() >= Date.now();
		        }
	        },
          isStyle:false,
          isCompany:false,
          isFamily:false,
		    	currentPage:1,
		  		total: 0,
		  		pageNo: 1,
	        pageSize: 10,
	        dialogFormVisible: false,
	        dialogLoan: false,
	        dialogObserve: false,
	        observeObj: {},
	        dialogLoanEnd: false,
	        dialogErp: false,
	        formLabelWidth: '150px',
	        saveFollow: false,
        isDisappearRemark:false,
        isExpectionRemark:false,
        isHomeChangeRemark:false,
        isHomeExceptionRemark:false,
        isComChangeRemark:false,
        isComExceptionRemark:false,
        isOtherExceptionRemark:false,
        isHomeAddress:false,
        isComAddress:false,
        remarksInfo:{},
        form_rules:{
          followTime:[
            {required:true, message: '请选择跟进日期', trigger: 'blur,change' }
          ],
          monitorType:[
            {required:true, message: '请选择监测方式', trigger: 'blur,change' }
          ],
          disappearStatus:[
            {required:true, message: '请选择是否失联', trigger: 'blur,change' }
          ],
          expectionStatus:[
            {required:true, message: '请选择是否异常', trigger: 'blur,change' }
          ],
          otherExceptionStatus:[
            {required:true, message: '请选择其他异常信息', trigger: 'blur,change' }
          ],
          monitorResult:[
            {required:true, message: '请选择结论', trigger: 'blur,change' }
          ],
          visitOpinion:[
            {required:true, max:200, message: '请输入回访意见', trigger: 'blur,change' }
          ],
          homeChangeStatus:[
        {required:true, message: '请选择地址是否变化', trigger: 'blur,change' }
         ],
          homeExceptionStatus:[
            {required:true, message: '请选择地址是否异常', trigger: 'blur,change' }
          ],
          comChangeStatus:[
            {required:true, message: '请选择地址是否变化', trigger: 'blur,change' }
          ],
          comExceptionStatus:[
            {required:true, message: '请选择地址是否异常', trigger: 'blur,change' }
          ],
        },
	        form: {
            followTime: '', //监测时间
            monitorType:"",//监测方式
            disappearStatus:"",//是否失联
            disappearRemark:"",//失联备注
            expectionStatus:"",//是否异常
            expectionRemark:"",//异常备注
            otherExceptionStatus:"",//其他异常
            otherExceptionRemark:"",//其他异常
            monitorResult:"",//结论
            visitOpinion:"",//回访意见
            homeProvinceId: '',
            homeCityId: '',
            homeDistrictId: '',
            homeAddress: '',
            homeChangeStatus: '',
            homeChangeRemark: '',
            homeExceptionStatus: '',
            homeExceptionRemark: '',
            comProvinceId: '',
            comCityId: '',
            comDistrictId: '',
            comAddress: '',
            comChangeStatus: '',
            comChangeRemark: '',
            comExceptionStatus: '',
            comExceptionRemark: ''
	        },
        applyProvince: [],
        applyCity: [],
        applyArea:[],
        companyCity:[],
        companyArea:[],
	        arrData: [],
	        beforeLoan_followCont:''
	    }
	  },

	  methods: {
      changeType(val){
        console.log(val);
        if(val == "1"){
          this.isStyle = false
        }else{
          this.isStyle = true
        }
      },
      changeFamilyProvince(id){//省，改变时
        this.form.homeCityId = ''
        this.form.homeDistrictId = ''
        this.queryCityByProvinceIdFn(id)
      },
      changeFamilyCity(id){//市，改变时
        this.form.homeDistrictId= ''
        this.queryCityByAreaIdFn(id)
      },
      queryCityByProvinceIdFn(provinceId){//市
        api.queryCityByProvinceId({provinceId:provinceId}).then(res => {
          if(res.data.success){
            this.applyCity = res.data.data
            console.log(res.data.data)
          } else {
            this.$notify({
              title: '提示',
              message: res.data.msg,
              duration: 1500
            });
          }
        })
      },
      queryCityByAreaIdFn(cityId){//区
        api.queryCityByCityId({cityId:cityId}).then(res => {
          if(res.data.success){
            this.applyArea = res.data.data
            console.log(res.data.data)
          } else {
            this.$notify({
              title: '提示',
              message: res.data.msg,
              duration: 1500
            });
          }
        })
      },
      queryProvinceFn(){//省
        api.queryProvince().then(res => {
          if(res.data.success){
            this.applyProvince = res.data.data
          } else {
            this.$notify({
              title: '提示',
              message: res.data.msg,
              duration: 1500
            });
          }
        })
      },
      changeCompanyProvince(id){//省，改变时
        this.form.comCityId = ''
        this.form.comDistrictId = ''
        this.queryCityCompany(id)
      },
      changeCompanyCity(id){//市，改变时
        this.form.comDistrictId= ''
        this.queryAreaCompany(id)
      },
      changeProviceCity(){

      },
      queryCityCompany(provinceId){//市
        api.queryCityByProvinceId({provinceId:provinceId}).then(res => {
          if(res.data.success){
            this.companyCity = res.data.data
            console.log(res.data.data)
          } else {
            this.$notify({
              title: '提示',
              message: res.data.msg,
              duration: 1500
            });
          }
        })
      },
      queryAreaCompany(cityId){//区
        api.queryCityByCityId({cityId:cityId}).then(res => {
          if(res.data.success){
            this.companyArea = res.data.data
            console.log(res.data.data)
          } else {
            this.$notify({
              title: '提示',
              message: res.data.msg,
              duration: 1500
            });
          }
        })
      },

	  	followWrap() {
	  		this.dialogFormVisible = true
         this.isDisappearRemark=false,
         this.isExpectionRemark=false,
         this.isHomeChangeRemark=false,
         this.isHomeExceptionRemark=false,
         this.isComChangeRemark=false,
         this.isComExceptionRemark=false,
         this.isOtherExceptionRemark=false,
         this.isComAddress=false,
         this.isHomeAddress=false,
	  		this.$nextTick(()=>{
	  			this.$refs['form'].resetFields()
        })
	  		this.form = {
          followTime: this.getNowFormatDate(),
          monitorType:'',
          disappearStatus:0,
          expectionStatus:0,
          disappearRemark:'',
          expectionRemark:'',
          otherExceptionStatus:0,
          otherExceptionRemark:"",
          monitorResult:1,
          visitOpinion:'',
          homeProvinceId: '',
          homeCityId: '',
          homeDistrictId: '',
          homeAddress: '',
          homeChangeStatus: 0,
          homeChangeRemark: '',
          homeExceptionStatus: 0,
          homeExceptionRemark: '',
          comProvinceId: '',
          comCityId: '',
          comDistrictId: '',
          comAddress: '',
          comChangeStatus: 0,
          comChangeRemark: '',
          comExceptionStatus:0,
          comExceptionRemark: ''
        }
	  	},
	  	showDifferDialog(row,followNode) {//followNode跟进环节:1.贷前 2.监测 3.贷后 4.ERP贷后
	  			console.log(row,followNode)
	  			this.observeObj = row
					if(followNode == 1) {
						this.dialogLoan = true //贷前，
						this.beforeLoan_followCont = row.followContent
					} else if (followNode == '2') {//检测				////
						this.dialogObserve = true
					} else if (followNode == '3'){//贷后
						this.dialogLoanEnd = true //贷后
					} else if (followNode == '4'){//4.ERP贷后
						this.dialogErp = true
					}
					//this.dialogErp = true
	  	},

	  handleSizeChange(val) {
			this.pageSize = val
			this.queryFollowList()
		},
		handleCurrentChange(val) {
			this.pageNo = val
			this.currentPage = val
			this.queryFollowList()
		},
		queryFollowList(){
			console.log('父组件调用子组件成功')
			api.queryFollowList({
  				pageNo:this.pageNo,
  				pageSize:this.pageSize,
  				crmCustId:this.rowFollowId
  			}).then((res) => {//followNode跟进环节:1.贷前 2.监测 3.贷后 4.ERP贷后
  				this.arrData = res.data.data
  				this.total = res.data.total
  				console.log(this.arrData ,this.total )
  			})
		},
		confirm_follow(form){
      if(this.form.disappearStatus == 1 && (this.form.disappearRemark).length<=0){
        this.isDisappearRemark = true
        this.remarksInfo.isDisappearRemark = "请输入失联备注"
        return false
      }else if((this.form.disappearRemark).length>50){this.isDisappearRemark = true
        this.remarksInfo.isDisappearRemark = "超过最大长度50"
        return false
      }else{
        this.isDisappearRemark = false
      }
      if(this.form.expectionStatus == 1 && (this.form.expectionRemark).length<=0){
        this.isExpectionRemark = true
        this.remarksInfo.isExpectionRemark = "请输入异常备注"
        return false
      }else if((this.form.expectionRemark).length>50){this.isExpectionRemark = true
        this.remarksInfo.isExpectionRemark = "超过最大长度50"
        return false
      }else{
        this.isExpectionRemark = false
      }
      if(this.form.homeChangeStatus == 1 && (this.form.homeChangeRemark).length<=0){
        this.isHomeChangeRemark = true
        this.remarksInfo.isHomeChangeRemark = "请输入地址变化备注"
        return false
      }else if((this.form.homeChangeRemark).length>50){   this.isHomeChangeRemark = true
        this.remarksInfo.isHomeChangeRemark = "超过最大长度50"
        return false}else{
        this.isHomeChangeRemark = false
      }
      if(this.form.homeExceptionStatus == 1 && (this.form.homeExceptionRemark).length<=0){
        this.isHomeExceptionRemark = true
        this.remarksInfo.isHomeExceptionRemark = "请输入地址异常备注"
        return false
      }else if((this.form.homeExceptionRemark).length>50){ this.isHomeExceptionRemark = true
        this.remarksInfo.isHomeExceptionRemark = "超过最大长度50"
        return false}else{
        this.isHomeExceptionRemark = false
      }
      if(this.form.comChangeStatus == 1 && (this.form.comChangeRemark).length<=0){
        this.isComChangeRemark = true
        this.remarksInfo.isComChangeRemark = "请输入地址变化备注"
        return false
      }else if((this.form.comChangeRemark).length>50){this.isComChangeRemark = true
        this.remarksInfo.isComChangeRemark = "超过最大长度50"
        return false}else{
        this.isComChangeRemark = false
      }
      if(this.form.comExceptionStatus == 1 && (this.form.comExceptionRemark).length<=0){
        this.isComExceptionRemark = true
        this.remarksInfo.isComExceptionRemark = "请输入地址异常备注"
        return false
      }else if ((this.form.comExceptionRemark).length>50){     this.isComExceptionRemark = true
        this.remarksInfo.isComExceptionRemark = "超过最大长度50"
        return false}else{
        this.isComExceptionRemark = false
      }
      if(this.form.otherExceptionStatus == 1 && (this.form.otherExceptionRemark).length<=0){
        this.isOtherExceptionRemark = true
        this.remarksInfo.isOtherExceptionRemark = "请输入其他异常信息备注"
        return false
      }else if((this.form.otherExceptionRemark).length>50){ this.isOtherExceptionRemark = true
        this.remarksInfo.isOtherExceptionRemark = "超过最大长度50"
        return false}else{
        this.isOtherExceptionRemark = false
      }
      //判断地址是否填了
      if(this.form.monitorType == 2){
        if(!this.form.homeProvinceId || !this.form.homeCityId || !this.form.homeDistrictId || !this.form.homeAddress){
          this.isHomeAddress = true
          return false
        }else {
          this.isHomeAddress = false
        }
        if(!this.form.comProvinceId || !this.form.comCityId || !this.form.comDistrictId || !this.form.comAddress){
          this.isComAddress = true
          return false
        }else {
          this.isComAddress = false
        }
      }
      this.$refs['form'].validate((valid) => {
            if(valid){
              this.saveFollow = true
              api.saveFollowInfo({
                crmCustInfoId:this.rowFollowId,
                followTime:this.form.followTime,
                monitorType:this.form.monitorType,
                disappearStatus:this.form.disappearStatus,
                disappearRemark:this.form.disappearRemark,
                expectionStatus:this.form.expectionStatus,
                expectionRemark:this.form.expectionRemark,
                otherExceptionStatus:this.form.otherExceptionStatus,
                otherExceptionRemark:this.form.otherExceptionRemark,
                monitorResult:this.form.monitorResult,
                visitOpinion:this.form.visitOpinion,
                homeProvinceId:this.form.homeProvinceId,
                homeCityId: this.form.homeCityId,
                homeDistrictId: this.form.homeDistrictId,
                homeAddress:this.form.homeAddress,
                homeChangeStatus: this.form.homeChangeStatus,
                homeChangeRemark: this.form.homeChangeRemark,
                homeExceptionStatus: this.form.homeExceptionStatus,
                homeExceptionRemark: this.form.homeExceptionRemark,
                comProvinceId:this.form.comProvinceId,
                comCityId: this.form.comCityId,
                comDistrictId:this.form.comDistrictId,
                comAddress: this.form.comAddress,
                comChangeStatus: this.form.comChangeStatus,
                comChangeRemark: this.form.comChangeRemark,
                comExceptionStatus: this.form.comExceptionStatus,
                comExceptionRemark: this.form.comExceptionRemark,
              }).then((res) => {
                this.saveFollow = false
                this.dialogFormVisible = false
                this.queryFollowList()
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
      //获取当前时间，格式YYYY-MM-DD
   getNowFormatDate() {
  let date = new Date();
  let seperator1 = "-";
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
		},
	  mounted(){
      this.queryProvinceFn()
	  },
	  watch: {
	  	rowFollowId(newVal) {
	  		if(newVal){
	  			//this.queryFollowList()
	  		}
	  		console.log(newVal,'-----')
	  	}
	  },
	  components: {
//	  	CommonTable
			Pagination
	  }
}
</script>
<style scoped lang="less">
  @import url("dialogFollowMini.css");

	.order-list-wrap {
    .addressTip{
      color: #f56c6c;
      font-size: 12px;
    }
    .dialogTip{
      color: #f56c6c;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      position: absolute;
      top: 100%;
      left: 122px;
    }
    #disappearRemark:focus{
      border-color: #f56c6c!important;
    }
    .btn-color{
      cursor:pointer;
    }
    .formType{
      float:left;
    }
   .el-textarea[data-v-ce290f66] {
      width: 520px!important;
    }
    .proviceInput{
      width:205px;
    }
    .proviceCity{
      width:100px!important;
    }
    .miniInput{
      margin-left:10px;
      width:400px;
    }
    .miniHeader{
      margin-bottom:0px;
      width:335px;
      display: inline-block;
      .el-input{
        width:160px;
      }
    }
    .dialogLoanEnd .el-row div{
      height:30px;
    }
		.pagWrap {
			margin-top: 10px;
			text-align: right;
		}
		.title {
			margin-top: -40px;
			font-size: 16px;
			border-bottom: 1px solid #ccc;
    	padding-bottom: 10px;
		}
		.follow-wrap {
			.el-date-editor.el-input, .el-date-editor.el-input__inner {
			  width: 100%;
			}
			.el-select {
				width: 100%;
			}
			.text-rt {
				    margin-top: -40px;
			}
		}
		.wrap-list {
			padding-top: 5px;
		}
		.observe {
			margin-top: -25px;
	    	padding-bottom: 8px;
	    	border-bottom: 1px solid #ccc;
		}
	}
</style>
