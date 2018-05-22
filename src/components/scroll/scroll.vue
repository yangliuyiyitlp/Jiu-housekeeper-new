<template>
	<div class="wrap" ref='wrapSroll'>
		<slot>
				
			</slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
//	import LoadingMore from '../loadingMore/loading'
	export default {
		props: {
			/** * 列表的数据 */ 
			data: {
		        type: Array,
		        default: null
		    },
			/** 
			 * * 1 滚动的时候会派发scroll事件，会截流。 *
			 * 2 滚动的时候实时派发scroll事件，不会截流。
			 * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件 
			 * */
			probeType: { 
				type: Number, 
				default: 1 
			},
			/** * 点击列表是否派发click事件 */ 
			click: { 
				type: Boolean,
				default: true 
			},
			/** * 是否开启横向滚动 */ 
			scrollX: { 
				type: Boolean,
				default: false 
			},
			/** * 是否派发滚动事件 */ 
			listenScroll: { 
				type: Boolean,
				default: false 
			},
			/** * 是否派发滚动到底部的事件，用于上拉加载 */ 
			pullup: { 
				type: Boolean,
				default: false 
			},
			/** * 是否派发顶部下拉的事件，用于下拉刷新 */ 
			pulldown: { 
				type: Boolean,
				default: false 
			},			
//			/** * 是否派发顶部下拉的事件，用于下拉刷新 */ 
//			pullDownRefresh: {
//		        type: Boolean,
//		        default: false
//		    },
//		    /** * 是否派发滚动到底部的事件，用于上拉加载 */ 
//		    pullUpLoad: {
//		        type: Boolean,
//		        default: false
//		    },
			/** * 是否派发列表滚动开始的事件 */ 
			beforeScroll: { 
				type: Boolean,
				default: false 
			},
			/** * 当数据更新后，刷新scroll的延时。 */ 
			refreshDelay: { 
				type: Number,
				default: 20 
			}
		},
		mounted() {
			setTimeout(() => {
		        this._initScroll()
		      }, 20)
		},
		data() {
			return {
				pulldownText: "下拉刷新",
				pullupText: '上拉加载更多',
				 status: {
			        pullupStatus: 'default',
			        pulldownStatus: 'default'
		        }
			}
		},
		methods: {
			_initScroll() {
//				this.scroll = new BScroll(this.$refs.wrapSroll,{	})	
			    if (!this.$refs.wrapSroll ) { 
			    	return 
			    }
			    // better-scroll的初始化 
			    this.scroll = new BScroll(this.$refs.wrapSroll, {
			    	probeType: this.probeType, 
			    	click: this.click, 
			    	scrollX: this.scrollX ,
			    	pullDownRefresh: this.pullDownRefresh,
          			pullUpLoad: this.pullUpLoad
			    }) 
			    // 是否派发滚动事件 
			    if (this.listenScroll) { 
			    	let _this = this 
			    	this.scroll.on('scroll', (pos) => {	
			    		if(pos.y > 30) {
					      this.pulldownText = '释放立即刷新'
					      this.$emit('scroll', pos) 
					      this.status.pullupStatus = 'up'
					    }
			    		if (pos.y < this.scroll.maxScrollY - 10) {
			    			this.pullupText = '正在加载。。。。'			    			
			    			this.status.pullupStatus = 'up'
			    		} else {
			    			this.pullupText = '上拉加载'			    			
			    			this.status.pullupStatus = 'default'
			    			console.log('====')
			    		}
			    		console.log(pos.y,this.scroll.maxScrollY -40)
			    	})
			    } 
			    /*
			              	方法一：上拉下拉（SATRT）
			     * */
				 // 是否派发顶部下拉事件，用于下拉刷新
			    if (this.pulldown) { 
//			    	debugger
					this._initPullDown()			    	
			    }
			    // 是否派发滚动到底部事件，用于上拉加载 
			    if (this.pullup) { 
			    	this._initPullUp()
			    } 
			     /*
			              	方法一：上拉下拉（END）
			     * */
			    
			     /*
			              	方法二：上拉下拉（SATRT）
			     * */
//			    // 是否派发顶部下拉事件，用于下拉刷新
//			    if (this.pullDownRefresh) {			    	
//		            this._initPullDownRefresh()				
//		        }
//			     // 是否派发滚动到底部事件，用于上拉加载 
//		        if (this.pullUpLoad) {
//		            this._initPullUpLoad()
//		        }
 				/*
			            	  方法二：上拉下拉（END）
			     * */
			    // 是否派发列表滚动开始的事件 
			    if (this.beforeScroll) { 
			    	this.scroll.on('beforeScrollStart', () => {
			    		console.log(55555)
			    		this.$emit('beforeScroll') 
			    	}) 
			    } 
			},
			_initPullDown() {
//				console.log(this.pulldown,'------')
				this.scroll.on('touchend', (pos) => { 
		    		// 下拉动作 
//		    		console.log(pos.y)
		    		if (pos.y > 30) {
		    			setTimeout(() => {
		    			    this.pulldownText = '下拉刷新'
		    			    this.$emit('pullingDown') 
				      	}, 800);
		    			//回复文本值
		    		} 
		    	}) 
			},
			_initPullUp() {
				this.scroll.on('scrollEnd', () => { 
		    		// 滚动到底部 
//		    		console.log(this.scroll.y,this.scroll.maxScrollY,1212)	
		    		if (this.scroll.y <= (this.scroll.maxScrollY + 50)) { 
						this.pullupText = '上拉加载'			    			
		    			this.status.pullupStatus = 'default'
						setTimeout( () => {				 
	//						this.pullupText = '正在加载。。。。'
			    			this.$emit('pullingUp') 
	//		    			this.status.pullupStatus = 'default'
					      }, 1000)
			    		} 
		    	})
			},
			disable() { 
				// 代理better-scroll的disable方法 
				this.scroll && this.scroll.disable() 
			}, 
			enable() { 
				// 代理better-scroll的enable方法
				this.scroll && this.scroll.enable() 
			}, 
			refresh() { 
				// 代理better-scroll的refresh方法 
				this.scroll && this.scroll.refresh() 
			}, 
			scrollTo() { 
				// 代理better-scroll的scrollTo方法
			    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments) 
			}, 
			scrollToElement() { 
				// 代理better-scroll的scrollToElement方法 
			 this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments) 
			},	
			destroy() {
		        this.scroll.destroy()
		    },
//		    _initPullDownRefresh() {
//		        this.scroll.on('pullingDown', (pos) => {		          
//		        	console.log(123111)
//		            this.$emit('pullingDown',pos)
//		        })
//		    },
//	        _initPullUpLoad() {
//	        	console.log('============')
//		        this.scroll.on('pullingUp', (pos) => {
//					if (pos.y > 50) { 
//		    			this.$emit('pullingUp',pos)
//		    		} 
//		        })
//	        },
//	        _initPullUpLoad() {
//		        this.scroll.on('pullingUp', () => {
//		          this.isPullUpLoad = true
//		         
//		          this.$emit('pullingUp')
//		        })
//		    },
		},
		watch: {
			data() {
				setTimeout(() => {
		            this.refresh()
		        }, 20)
			}
		},
		components: {
			//LoadingMore
		}
	}
</script>

<style scoped="">
.wrap {
	/*position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: #fff;*/
    overflow: hidden;
    width: 100%;
}
.pulldown-refesh {
	position: absolute;
	top: -40px;
    width: 100%;
    height: 40px;
    line-height: 40px;
}
.pullup-more {
	    text-align: left;
    box-sizing: content-box;
    
    background: #fff;
    height: 40px;
    line-height: 40px;
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    color: #888;
}
.pullup-more .pullUpIcon {
    display: inline-block;
    vertical-align: middle;
    width: 40px;
    height: 40px;
    background: url('./pull-icon@2x.png') 0 0 no-repeat;
    -webkit-background-size: 40px 80px;
    background-size: 40px 80px;
    -webkit-transition-property: -webkit-transform;
    -webkit-transition-duration: 250ms;
    -webkit-transform: rotate(-180deg) translateZ(0);
    transform: rotate(-180deg) translateZ(0);
}
 .rotate .pullUpIcon {
    -webkit-transform: rotate(-0) translateZ(0);
    transform: rotate(-0) translateZ(0);
}
</style>