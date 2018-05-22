<template>
	<div class="wrap" ref='wrapSroll'>
		<slot>
			
		</slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
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
//			/** * 是否派发滚动到底部的事件，用于上拉加载 */ 
//			pullup: { 
//				type: Boolean,
//				default: false 
//			},
//			/** * 是否派发顶部下拉的事件，用于下拉刷新 */ 
//			pulldown: { 
//				type: Boolean,
//				default: false 
//			},
			/** * 是否派发顶部下拉的事件，用于下拉刷新 */ 
			pullDownRefresh: {
		        type: Boolean,
		        default: false
		    },
		    /** * 是否派发滚动到底部的事件，用于上拉加载 */ 
		    pullUpLoad: {
		        type: Boolean,
		        default: false
		    },
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
//			this.$nextTick(() => { 
//					this.scroll = new BScroll(this.$refs.wrapSroll,{
//					})
//				})	

			setTimeout(() => {
		        this._initScroll()
		      }, 20)
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
          			pullUpLoad: this.pullUpLoad,
          			
			    }) 
			    // 是否派发滚动事件 
			    if (this.listenScroll) { 
			    	let _this = this 
			    	this.scroll.on('scroll', (pos) => {			    		
			    		_this.$emit('scroll', pos) 
			    	})
			    } 
			    /*
			              	方法一：上拉下拉（SATRT）
			     * */
				 // 是否派发顶部下拉事件，用于下拉刷新
//			    if (this.pullDownRefresh) { 
//			    	this.scroll.on('touchend', (pos) => { 
//			    		// 下拉动作 
//			    		if (pos.y > 50) { 
//			    			console.log(pos.y,'------')
//			    			this.$emit('pullingDown') 
//			    		} 
//			    	}) 
//			    }
//			    // 是否派发滚动到底部事件，用于上拉加载 
//			    if (this.pullUpLoad) { 
//			    	this.scroll.on('scrollEnd', (pos) => { 
//			    		// 滚动到底部 
//			    		if (this.scroll.y <= (this.scroll.maxScrollY + 50)) { 
//			    			console.log(this.scroll.y,this.scroll.maxScrollY)
//			    			this.$emit('pullingUp') 
//			    		}
//			    	})
//			    } 
			     /*
			              	方法一：上拉下拉（END）
			     * */
			    
			     /*
			              	方法二：上拉下拉（SATRT）
			     * */
			    // 是否派发顶部下拉事件，用于下拉刷新
			    if (this.pullDownRefresh) {			    	
		            this._initPullDownRefresh()				
		        }
			     // 是否派发滚动到底部事件，用于上拉加载 
		        if (this.pullUpLoad) {
		            this._initPullUpLoad()
		        }
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
		    _initPullDownRefresh() {
		        this.scroll.on('pullingDown', (pos) => {		          
		        	console.log(123111)
		            this.$emit('pullingDown',pos)
		        })
		    },
	        _initPullUpLoad() {
	        	console.log('============')
		        this.scroll.on('pullingUp', (pos) => {
//					if (pos.y > 50) { 
		    			this.$emit('pullingUp',pos)
//		    		} 
		        })
	        },
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
		}
	}
</script>

<style scoped="">
.wrap {
	position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: #fff;
}
</style>