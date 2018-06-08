<template>
  <div class="header-wrap">
    <div class="con-wrap clearfix">
    	<div class="logo">
    		<img src="../../assets/images/logo.png"/>
    	</div>    	
    	<div class="ulList">
    		<ul class="clearfix router-wrap" v-if='muneList.length != 0'>
    			<li @click="showManger(item,index)" v-for ='(item,index) in muneList' :key='index'>
    				{{item.name}}
    				<transition-group name="list" tag="div">
	    				<div class="router_list" :key='index' v-if="showObj['show' + (index+1)]">
			    			<div class="cust-wrap">
			    				<ul class="clearfix" v-if='item.list.length != 0'>
			    					<li class='' v-for ='(val,ind) in item.list' :key='ind'>
			    						<div class="tit"><i :class="val.icon"></i>{{val.name}}</div>
			    						<div v-if='val.list.length != 0' class="clearfix">
			    							<div class="routerItem"
			    								v-for = "(valChild,indChild) in val.list" :key='indChild'>			    								
			    							
			    								<!--<router-link :to="valChild.url" @click.native.stop='showTag(valChild)'>{{valChild.name}}</router-link>-->
			    								<router-link :to="{ path: valChild.url, query: { menuId: valChild.id }}" @click.native.stop='showTag(valChild)'>{{valChild.name}}</router-link>
			    								<!--<router-link :to="valChild.url + '/' + valChild.id" @click.native.stop.prevent='showTag(valChild)'>{{valChild.name}}</router-link>-->			    								
			    							</div>
			    						</div>
			    					</li>			    					
			    				</ul>
			    			</div>
			    		</div>
    			</transition-group>
    			</li>
    		</ul>    		
    	</div> 
    	<div class="rt head-rt">
    		<span class="admin-wrap">    			
					<!--<el-popover
					  placement="bottom"
					  width="160"
					  v-model="visiblePassWord">
					  <div style="text-align: center;font-size: 16px;">
					    <el-button size="mini" type="text" @click="showModifyPassWord" style="font-size: 15px">修改密码</el-button>					    
					  </div>
					  <i class="" slot="reference"></i>
					</el-popover>-->
					<i class=""></i>
    			管理员，您好！
    		</span>
    		<span class="login-out">
    			<i class=""></i>
    			退出登录
    		</span>
    	</div>
    </div>
	  <div class="tagViews">
			<tag-views></tag-views>
	  </div>
	  <modify-pass-word :dialogPassVisible = 'dialogPassVisible'></modify-pass-word>
  </div>
</template>

<script>
	import TagViews from '@/components/TagViews'
	import ModifyPassWord from '@/components/header/ModifyPassWord'
	export default {
	  data () {
	    return {
	    	visiblePassWord: false,
	      show: false,
	      show2: false,
	      show3: false,
	      showObj : {
	      	show1: false,
		      show2: false,
		      show3: false,
	      },
	      dialogPassVisible: {
	      	outerVisible: false,
	        innerVisible: false
	      }
	    }
	  },
	  props: {
	  	muneList:{
	  		type: Array,
	  		default: function () {
	        return []
	      }
	  	}
	  },
	  methods: {
	  	showModifyPassWord() {	  		
	  		this.visiblePassWord = false
	  		this.dialogPassVisible.outerVisible = true
//	        		innerVisible: false
	  	},
	  	showManger(item,index) {
	  		for (var i=1; i <= this.muneList.length; i++) {
	  			if ((index+1) == i) {
	  				this.showObj['show' + i] = !this.showObj['show' + i]
	  			} else {
	  				this.showObj['show' + i] = false
	  			}
	  		}
	  		console.log(this.muneList,122222)
//				this.showObj.show1 = !this.showObj.show1
//	  		this.showObj.show2 = false
//	      this.showObj.show3 = false
	  	},
	  	showControl() {
	  		this.showObj.show2 = !this.showObj.show2
	  		this.showObj.show1 = false
	      this.showObj.show3 = false
	  	},
	  	showSet() {
	  		this.showObj.show3 = !this.showObj.show3
	  		this.showObj.show1 = false
	      this.showObj.show2 = false
	  	},
	  	showTag(valChild) {
//	  		this.$route.query.menuId =valChild.id 
	  		console.log(this.$route,'12313123132132132131@@',valChild.url)
	  		for (var i=1; i <= this.muneList.length; i++) {	 
	  				this.showObj['show' + i] = false
	  		}
//	  		this.showObj.show1 = false
//	  		this.showObj.show2 = false
//	      this.showObj.show3 = false
			}
	  },
	  components: {
	  	TagViews,
	  	ModifyPassWord
	  }
}
</script>
<style scoped lang="less">
	.header-wrap {
		.con-wrap {
			width: 100%;
			height: 64px;
			padding-top: 1px;
			line-height: 65px;
			background-color: #31AFFF;
			position: relative;
			.logo {
        width: 173px;
				height: 48px;			    
		    margin-top: 6px;
		    margin-left: 11px;
		    margin-right: 70px;
		    float: left;
			}
			.head-rt {
				margin-right: 50px;
				color: #fff;
				font-size: 14px;
				span {
					display: inline-block;
				}
				.admin-wrap {
					margin-right: 20px;	
					i {
						display: inline-block;
						background: url('../../assets/images/admin.png') no-repeat 0 0;
						width: 20px;
    				height: 22px;
			   	  background-size: 100%;
				    margin-top: -2px;
				    vertical-align: middle;

					}
				}
				.login-out i {
					  display: inline-block;
						background: url('../../assets/images/loginOut.png') no-repeat 0 0;
						width: 20px;
    				height: 17px;
			   	  background-size: 100%;
				    margin-top: -2px;
				    vertical-align: middle;

				}
			}
			.ulList {
				float: left;
				li {
				  cursor: pointer;
					float: left;
					color: #fff;
					font-size: 20px;
					margin-right: 30px;
					&:last-child {
						margin-right: 0;
					}
					/*&:hover {
						color: red;
						
					}*/
				}
			}
		}
		.router_list {			
			position: absolute;
			top: 65px;
			left: 0;
			width: 100%;
			/*height: 50px;*/
			/*border-width: 1px;
	    border-style: solid;
	    border-color: rgba(204, 204, 204, 1);
			border-top: none;*/
			background-color: #fff;
			z-index: 999999;
		}
		.router-wrap {
			.cust-wrap {
				border: 1px solid #ccc;
				border-top: none;
				ul li {
		        float: left;
				    width: 300px;
				    margin-right: 30px;
				    position: relative;
				    border-right: 1px solid #c3c3c3;
				    margin-top: 20px;
				    height: 118px;
				    margin-bottom: 30px;
 			    &:first-child {
 			    	margin-left: 10%; 
						
 			    }
					&:last-child {
						border-right: none;
					}
					.routerItem {
						line-height: 1;
						font-size: 16px;
						margin-bottom: 15px;
						float: left;
						width: 50%;
				    a {
				    	display: inline-block;
    					margin-left: 20px;
		    	    font-size: 16px;
				    }
					}
				}
			}
		}
		.tit {
			line-height: 1;
	    padding: 0px 0 15px;
      font-family: '微软雅黑 Bold', '微软雅黑';
	    font-weight: 600;
	    font-style: normal;
	    color: #333;
	    font-size: 18px;
		}
		.list-enter-active, .list-leave-active {
		  transition: all 1s;
		}
		.list-enter, .list-leave-to {
		  opacity: 0;
		  transform: translateY(100px);
		}
	}
</style>
