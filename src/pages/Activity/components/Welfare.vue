<template>
	<div class="welfare" >
		<div class="content">
			<!--关闭按钮-->
			<div class="close-btn">
				<i class="el-icon-circle-close" @click="closePage()"></i>
			</div>
			<!--左边内容-->
			<div class="show-area">

				<h1 class="top-txt">展示效果</h1>
				<div class="phone">
					<div class="phone-wrap">
						<div class="phone-header"></div>
						<div class="nav">
							<i class="el-icon-arrow-left"></i> 赳福利
						</div>
						<div class="addItem">
							<span class="addBtn">
      					<i class="el-icon-plus"></i>
      				</span>
							<br />
							<span class="addBtn-text">
      					点击新建列表
      				</span>
						</div>
						<div class="items-list">
							<div class="item-wrap">
								<div class="right-btn">
									<div @click.stop='topFall(index)' class="fallCircle"><i class="circle iconfont icon-jiantouarrow499"></i></div>
									<div @click.stop='downFall(index)' class="fallCircle"><i class="circle iconfont icon-jiantouarrow505"></i></div>
									<div @click.stop='delFall(item.id)' class="fallCircle"><i class="circle iconfont icon-icon--"></i></div>
								</div>

								<span class="item-tit">
								   列表区
								</span>
							</div>
						</div>
						<div class="items-list">
							<div class="item-wrap">
								<div class="right-btn">
									<div @click.stop='topFall(index)' class="fallCircle"><i class="circle iconfont icon-jiantouarrow499"></i></div>
									<div @click.stop='downFall(index)' class="fallCircle"><i class="circle iconfont icon-jiantouarrow505"></i></div>
									<div @click.stop='delFall(item.id)' class="fallCircle"><i class="circle iconfont icon-icon--"></i></div>
								</div>
								<span class="item-tit">
								   列表区
								</span>
							</div>
						</div>
						<div class="items-list">
							<div class="item-wrap">
								<div class="right-btn">
									<div @click.stop='topFall(index)' class="fallCircle"><i class="circle iconfont icon-jiantouarrow499"></i></div>
									<div @click.stop='downFall(index)' class="fallCircle"><i class="circle iconfont icon-jiantouarrow505"></i></div>
									<div @click.stop='delFall(item.id)' class="fallCircle"><i class="circle iconfont icon-icon--"></i></div>
								</div>
								<span class="item-tit">
								   列表区
								</span>
							</div>
						</div>
						<div class="items-list">
							<div class="item-wrap">
								<div class="right-btn">
									<div @click.stop='topFall(index)' class="fallCircle"><i class="circle iconfont icon-jiantouarrow499"></i></div>
									<div @click.stop='downFall(index)' class="fallCircle"><i class="circle iconfont icon-jiantouarrow505"></i></div>
									<div @click.stop='delFall(item.id)' class="fallCircle"><i class="circle iconfont icon-icon--"></i></div>
								</div>
								<span class="item-tit">
								   列表区
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--右边内容-->
			<div class="show-content">
				<div class="top-nav">
					<span class="top-tit">赳福利</span>
					<div class="top-btn">
						<button class="copy-btn">拷贝</button>
						<button class="copy-btn">保存配置</button>
					</div>
				</div>
				<div class="search-wrap">
					<el-form :inline="true" :model="formInline" class="demo-form-inline">
						<el-form-item label="类型：">
							<el-select size="small" v-model="formInline.region" placeholder="选择类型">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="标题：">
							<el-input size="small" v-model="formInline.user" placeholder="最多16个字符"></el-input>
						</el-form-item>
						<el-form-item label="生效系统：">
							<el-input size="small" v-model="formInline.user" placeholder="请输入生效系统"></el-input>
						</el-form-item>
						<el-form-item label="生效状态：">
							<el-input size="small" v-model="formInline.user" placeholder="请输入生效状态"></el-input>
						</el-form-item>
						<el-form-item label="失效时间：">
							<div class="time-wrap">
								<el-date-picker size="small" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
								<span>-</span>
								<el-date-picker size="small" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
							</div>
						</el-form-item>
						<el-form-item>
							<button class="query-btn">搜索</button>
						</el-form-item>
					</el-form>
				</div>
				<div class="arrangement-type">
					<div>

					</div>
				</div>
				<div class="form-items">
					<div class="update-img">
						<div class="list-img">
							<h6> 列表图6</h6>
							<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"  >
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
							<span>上传图片视屏</span><br />
							<span>高宽比630*300</span>
						</div>
						<div class="texuan-img">
							<h6> 特选配图</h6>
							<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"  >
								<!--<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
							</el-upload>
							<span>上传图片视屏</span><br />
							<span>高宽比630*300</span>
						</div>
					</div>
					<div class="item Flex">
						<span><i>*</i>是否显示：</span>
						<div>
							<el-switch on-text="启用" off-text="停用" on-color="#DB5050" off-color="#4F4D4D" >
							</el-switch>
						</div>
					</div>
					<div class="item Flex">
						<span><i>*</i>赳赳特选：</span>
						<div>
							<el-switch on-text="启用" off-text="停用" on-color="#DB5050" off-color="#4F4D4D">
							</el-switch>
						</div>
					</div>
					<div class="item Flex">
						<span><i></i>是否登陆：</span>
						<div>
							<el-switch on-text="启用" off-text="停用" on-color="#DB5050" off-color="#4F4D4D">
							</el-switch>
						</div>
					</div>
					<div class="item Flex">
						<span><i>*</i>跳转类型：</span>
						<div>
							<el-select size="small" v-model="formInline.region" placeholder="请选择类型">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</div>
					</div>
					<div class="item Flex">
						<span><i></i>链接：</span>
						<div>
							<el-input size="small" v-model="formInline.user" placeholder="请输入链接地址"></el-input>
						</div>
					</div>
					<div class="item Flex">
						<span><i>*</i>名称：</span>
						<div>
							<el-input size="small" v-model="formInline.user" placeholder="请输入图片名称"></el-input>
						</div>
					</div>
					<div class="item Flex">
						<span><i></i>有效日期：</span>
						<div class="time-wrap">
							<el-date-picker size="small" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
							<span>-</span>
							<el-date-picker size="small" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
						</div>
					</div>
					<div class="item Flex">
						<span><i>*</i>展示日期：</span>
						<div class="time-wrap">
							<el-date-picker size="small" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
							<span>-</span>
							<el-date-picker size="small" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
						</div>
					</div>
					<div class="item Flex">
						<span><i></i>分享平台：</span>
						<div>
							<el-checkbox-group >
						    <el-checkbox label="微信好友 "></el-checkbox>
						    <el-checkbox label="朋友圈 "></el-checkbox>
						    <el-checkbox label="QQ好友 "></el-checkbox>
						     <el-checkbox label="QQ空间 "></el-checkbox>
						    <el-checkbox label="微博 "></el-checkbox>
						  </el-checkbox-group>
						</div>
					</div>
					<div class="item Flex">
						<span><i></i>平台：</span>
						<div>
							<el-select size="small" v-model="formInline.region" placeholder="请选择平台">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import baseUrl from '../../../utils/baseUrl'
	export default {
		data() {
			return {
				formInline: {
					user: '',
					region: ''
				},
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		props:{
			closePage:Function
			
		},
		components: {

		},
		methods:{
			//获取指向列表
			getListIconDetails(){
				this.$ajax.post(`${baseUrl.newEnjoyUrl3}/jjEnjoy/icon/listIconDetails`,{
					
						cityId:"13",
						aimListId:"6c0a148ac8cc4052b4924f3355a23e24"
					
				})
			
			},
			
		},
		mounted() {
			console.log("9999999",this.closePage)
      this.getListIconDetails();
		}
	}
</script>

<style scoped>
	@import "../../../assets/css/global.css";
	.welfare {
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		z-index: 100;
	}
	
	.content {
		padding: 50px;
		display: flex;
		position: relative;
	}
	
	.close-btn {
		width: 40px;
		height: 40px;
		cursor: pointer;
		position: absolute;
		top: 5px;
		right: 40px;
	}
	
	.close-btn i {
		font-size: 40px;
		color: #fff;
	}
	
	.show-area {
		margin-right: 20px;
	}
	
	.top-txt {
		font-size: 20px;
		color: #fff;
		margin-bottom: 20px;
	}
	
	.show-area .phone {
		padding: 35px;
		background: #fff;
		width: 375px;
		height: 669px;
		border-radius: 45px;
		box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.02), 0 0 32px 0 rgba(0, 0, 0, 0.07) inset;
	}
	
	.phone-wrap {
		overflow: auto;
		height: 100%;
		border: 1px solid #fafbfc;
	}
	
	.phone .phone-header {
		height: 20px;
		background: url(../../../assets/images/activity/phoheader.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.phone .nav {
		height: 25px;
		font-size: 16px;
		text-align: center;
		padding: 0 2em 0 1em;
		margin: 10px;
	}
	
	.phone .nav i {
		float: left;
	}
	
	.addItem {
		text-align: center;
		height: 120px;
		background: #DB5050;
		padding: 20px;
		color: #fff;
	}
	
	.addBtn {
		font-size: 20px;
		cursor: pointer;
		display: inline-block;
		width: 50px;
		height: 50px;
		line-height: 50px;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.4);
		margin-bottom: 5px;
	}
	
	.items-list {
		position: relative;
		text-align: center;
		height: 120px;
		background: rgba(0, 0, 0, 0.4);
		border-bottom: 1px dashed #fff;
	}
	
	.right-btn {
		position: absolute;
		top: 10px;
		right: 10px;
	}
	
	.items-list .item-tit {
		line-height: 120px;
	}
	
	.show-content {
		flex: 1;
		background: #fff;
	}
	
	.show-content {
		border-radius: 20px;
	}
	
	.show-content .top-nav {
		display: flex;
		padding: 0 30px;
		justify-content: space-between;
		height: 70px;
		border-bottom: 1px solid #d8d8d8;
	}
	
	.show-content .top-nav .top-tit {
		line-height: 70px;
		font-size: 24px;
		font-weight: 800;
	}
	
	.show-content .top-nav .top-btn {
		height: 70px;
		display: flex;
		align-items: center;
	}
	
	.show-content .top-nav .top-btn button {
		color: #fff;
		background: #4F4D4D;
		height: 30px;
		width: 120px;
		border-radius: 15px;
		margin-left: 10px;
	}
	
	.show-content .top-nav .top-btn button:nth-of-type(2) {
		background: #DB5050;
	}
	
	.search-wrap {
		padding: 10px;
		border-bottom: 1px solid #d8d8d8;
	}
	
	.time-wrap {
		width: 300px;
		display: flex;
		justify-content: space-between;
	}
	
	.time-wrap span {
		margin: 0 5px;
		font-size: 16px;
	}
	
	.query-btn {
		background: #DB5050;
		height: 30px;
		width: 160px;
		border-radius: 18px;
		color: #fff;
		float: right;
	}
	
	.form-items {
		padding: 0 30px;
		height: 480px;
		overflow: auto;
	}
	
	.form-items .item {
		margin: 10px 0;
	}
	
	.form-items .item>span {
		width: 100px;
		text-align: right;
	}
	
	.form-items .item>span i {
		margin-right: 2px;
		color: red;
	}
	
	.form-items .Flex {
		display: flex;
	}
	
	.form-items .Flex>div {
		padding-left: 20px;
	}
	
	.update-img {
		padding: 20px;
		display: flex;
		text-align: center;
		font-size: 10px;
	}
	
	.update-img h6 {
		color: #666;
		text-align: left;
		margin-bottom: 5px;
	}
	
	.texuan-img {
		margin-left: 20px;
	}
</style>