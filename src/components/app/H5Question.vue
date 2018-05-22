<template>
  <div class="ques-wrap">
  		<div class="search-wrap">
			 	<el-input clearable placeholder="Search" v-model="input5" class="input-with-select">
			    <el-button slot="append" icon="el-icon-search"></el-button>
			  </el-input>
			</div>
      <div class="scroll">
				<!--<cube-scroll
				  ref="scroll"
				  :data="items"
				  :options="options"
				  @pulling-down="onPullingDown"
				  @pulling-up="onPullingUp"
				  >
				 
				</cube-scroll>-->
				
				<cube-scroll
				  ref="scroll"		
				  :data="items"
				  
				  :options="options"
				  @pulling-down="onPullingDown"
				  @pulling-up="onPullingUp"
				  >
				  <template slot-scope="props">
				    <div >
				    	
				     <ul id='activityTab'>
							<li v-for="item in items">
								<h2 @click='targetTab($event)'>
									{{item}}
									<i class="icons"></i>
								</h2>
								<div class="actCon">
								item
						    </div>
							</li>
						</ul>
				    </div>
				  </template>
				</cube-scroll>
				
			</div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      idArr: [2],
      input5: '',
      itemIndex: 1,
	    items: ['<span>11212</span>','<span>222</span>', '<span>3333</span>','<span>444</span>','<span>555</span>','<span>66</span>'],
      options: {
        pullDownRefresh: {
          threshold: 90,
          stop: 40,
          txt: 'Refresh success'
        },
        pullUpLoad: {
          threshold: 0,          
          txt: {
            more: '上拉加载更多',
            noMore: '~我是有底线的~'
          }
        }
		  }
    }
  }, 
  methods: {
  	targetTab(eve) {
//		console.log(eve.target.parentNode.siblings())
  	console.log(112)
  		if(eve.target.nodeName == 'H2') {
//			 	console.log($($(eve.target).siblings()[0]).hasClass('actConShow'))
  			  $(eve.target).parent().siblings().each(function(index,value){
//			  	console.log(this)
						$(this).find('.actCon').removeClass('actConShow')
						$(this).find('.icons').removeClass('putdown')				
					});
					if($(eve.target).siblings().hasClass('actConShow')) {
//					if($($(eve.target).siblings()[0]).hasClass('actConShow')) {											
						$($(eve.target).siblings()[0]).removeClass('actConShow')
						$(eve.target).find('.icons').removeClass('putdown')
					} else {
						$(eve.target).siblings().addClass('actConShow')
						console.log()
						$(eve.target).find('.icons').addClass('putdown')
					}
  		}
  				
  	},
    onPullingDown() {
	      // Mock async load.
	      setTimeout(() => {
	        if (Math.random() > 0.5) {
	          // If have new data, just update the data property.
	          this.items.unshift('I am new data: ' + new Date())
	        } else {
	          // If no new data, you need use the method forceUpdate to tell us the load is done.
	          this.$refs.scroll.forceUpdate()
	        }
	      }, 1000)
    	},
    	 onPullingUp() {
	      // Mock async load.
	      setTimeout(() => {
	        if (Math.random() > 0.5) {
	          // If have new data, just update the data property.
	          let newPage = [
	            'I am line ' + ++this.itemIndex,
	            'I am line ' + ++this.itemIndex,
	            'I am line ' + ++this.itemIndex,
	            'I am line ' + ++this.itemIndex,
	            'I am line ' + ++this.itemIndex
	          ]
	
	          this.items = this.items.concat(newPage)
	        } else {
	          // If no new data, you need use the method forceUpdate to tell us the load is done.
	          this.$refs.scroll.forceUpdate()
	        }
	      }, 1000)
//	      this.tabFn() 
	    },
	    tabFn(){
	    	$('#activityTab li > h2').on('click',function(){
					$(this).parent().siblings().each(function(index,value){
						$(this).find('.actCon').removeClass('actConShow')
						$(this).find('.icons').removeClass('putdown')				
					});
					if($(this).siblings().hasClass('actConShow')) {
						$(this).siblings().removeClass('actConShow')
						$(this).find('.icons').removeClass('putdown')
					} else {
						$(this).siblings().addClass('actConShow')
						$(this).find('.icons').addClass('putdown')
					}
				})
	    }
  },
  mounted() {
//	this.tabFn()
  },
  watch: {
  	items() {
//		console.log(1231213123)
//		this.tabFn()
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.ques-wrap {
	position: fixed;
  top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	background-color: #f0eff5;
	z-index: 20180504;
	.search-wrap {
		padding: 5px 7px;
	}
	.scroll {
		position: absolute;
		top: 50px;
		left: 0;
		width: 100%;
		/*height:100%;*/
		bottom: 0;
	}
	#activityTab {
		background-color: #fff;
	}
	#activityTab li .actCon {
				display: none;
				border-bottom: 1px solid #e5e5e5;
			    padding: 10px;
			}
			#activityTab li .actCon:last-child {
				/*border-bottom: none;*/
			}
			#activityTab li .actConShow {
				display: block;
			}
			#activityTab li h2 {
			    margin: 0 10px;
			    font-size: 14px;			    
			    color: #333;
			    font-weight: 400;
			    height: 43px;
			    line-height: 45px;
			    border-bottom: 1px solid #e5e5e5;
		        overflow: hidden;
		        position: relative;
			   
			}
			#activityTab li h2 span {
			    float: right;
				margin-right: 20px;
			}
			#activityTab li i.icons {
				position: absolute;
			    top: 16px;
			    right: 0;
			    display: inline-block;
			    float: right;
			    width: 15px;
			    height: 15px;
			    background: url('../../assets/images/actRight.png') no-repeat 0px -1px;
			    background-size: 15px;
			}
			#activityTab li i.putdown {
			    background: url('../../assets/images/actDown.png') no-repeat 0px -1px;
			    background-size: 15px;
			}
			#activityTab li .actCon .imgErma {
				text-align: center;
			}
			#activityTab li .actCon .actName, #activityTab li .actCon .h5href{
				text-align: center;
			    margin-top: 1rem;
    			margin-bottom: 1rem;
			}
			#activityTab li .actCon .h5href a {
			 	text-decoration: none;
			 }
}
</style>
