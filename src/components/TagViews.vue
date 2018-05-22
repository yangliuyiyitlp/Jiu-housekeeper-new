<template>
	<div id="tag" style="text-align: left;">		
	    <scroll	
	    	:scrollY = 'scrollY'
	    	:scrollX ='scrollX'
	    	:data='visitedViews'
	    	 ref="scroll" >
	        <ul class="tab-list clearfix tags-view-wrapper" ref="tabList" v-if='visitedViews.length != 0'>
		        <li v-for="tag in Array.from(visitedViews)" class="tab-item">        	
		            <!--<router-link 
		            	ref='tag' 
		            	class="tags-view-item" 
		            	:class="isActive(tag)?'active':''" 
				        :to="tag.path" 
				        :key="tag.path" 
				        >
					        {{tag.name}}
				        <span class='el-icon-close' v-if='tag.path != "/home"' @click.prevent.stop='closeSelectedTag(tag)'></span>
				    </router-link>-->
				     <router-link 
		            	ref='tag' 
		            	class="tags-view-item" 
		            	:class="isActive(tag)?'active':''" 
				        :to="{ path: tag.path, query: { menuId: tag.query.menuId }}" 				        
				        :key="tag.path" 
				        >
					        {{tag.name}}
				        <span class='el-icon-close' v-if='tag.path != "/home"' @click.prevent.stop='closeSelectedTag(tag)'></span>
				    </router-link>
		        </li>       
		      </ul>  
	    </scroll>		
	</div>
</template>

<script>
	import Scroll from '@/components/scroll/scroll'
	import api from "@/api/index"
	export default {
		props:{
			show: { 
				type: Boolean,
				default: false 
			},
			show2: { 
				type: Boolean,
				default: false 
			},
			show3: { 
				type: Boolean,
				default: false 
			},
		},
		components: {
	      	Scroll
	  	},
		data() {
		    return {
		    	data: [1.2,1212,121,11,454],
				pullDownRefresh: true,
				pullUpLoad: true,
				listenScroll: true,
				num: 0,
		        visible: false,
		        top: 0,
		        left: 0,
		        selectedTag: {},
		        currentTab: 4,
		        current: 1,
		        scrollX: true,
		        scrollY: false
		    }
	    },
	  	computed: {
		    visitedViews() {
//		    	console.log(this.$store.state.tagsView.visitedViews,'---------')
		      return this.$store.state.tagsView.visitedViews
		    }
	    },
	    watch: {
		    $route() {
//		    	console.log(12)
//	console.log(this.$route.query.menuId,56565656565)
				api.queryOperatelist({
					menuId:this.$route.query.menuId
				}).then((res)=>{
//					console.log('dddd')
				})
		        this.addViewTags()		      
		        this.moveToCurrentTag()
		        
	//	       this._initTabListWidth()
		    },
		    visible(value) {
		      if (value) {
		        document.body.addEventListener('click', this.closeMenu)
		      } else {
		        document.body.removeEventListener('click', this.closeMenu)
		      }
		    }
	    },
	    mounted() {
		    this.addViewTags()
	//	    this._initTabListWidth()
	   },
	    methods: {
	   
	  		_initTabListWidth() {
		        const tabList = this.$refs.tabList
		        const items = tabList.children
		        let width = 0        
		        for (let i = 0; i < items.length; i++) {
		          width += items[i].clientWidth
		        }
		        tabList.style.width = (width + 50) + 'px'
//		        console.log(width,66666)
		    },
		    generateRoute() {
		      if (this.$route.name) {
		        return this.$route
		      }
		      return false
		    },
		    isActive(route) {
		      return route.path === this.$route.path || route.name === this.$route.name
		    },
		    async addViewTags() {	
		      const route = this.generateRoute()
		      if (!route) {
		        return false
		      }
//		      console.log(route,66666666888888)
		      await this.$store.dispatch('addVisitedViews', route).then(res => {	   
		      	this._initTabListWidth()
		      })
		    },
		    moveToCurrentTag() {
		      const tags = this.$refs.tag
		      this.$nextTick(() => {
		        for (const tag of tags) {
		          if (tag.to === this.$route.path) {
	//	            this.$refs.scrollPane.moveToTarget(tag.$el)
		            break
		          }
		        }
		      })
		    },
		    closeSelectedTag(view) {
//		    	console.log(view)
		      this.$store.dispatch('delVisitedViews', view).then((views) => {
		        if (this.isActive(view)) {
		          const latestView = views.slice(-1)[0]
		          if (latestView) {
		            this.$router.push(latestView.path)
		          } else {
		            this.$router.push('/home')
		          }
		        }
		      })
		      this._initTabListWidth()
		    },
		    closeOthersTags() {
		      this.$router.push(this.selectedTag.path)
		      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
		        this.moveToCurrentTag()
		      })
		    },
		    closeAllTags() {
		      this.$store.dispatch('delAllViews')
		      this.$router.push('/')
		    },
		    openMenu(tag, e) {
		    	console.log(12)
		      this.visible = true
		      this.selectedTag = tag
		      this.left = e.clientX
		      this.top = e.clientY
		    },
		    closeMenu() {
		      this.visible = false
		    }
	    }
	}
</script>

<style lang="less" scoped>
.tags-view-item {
      display: inline-block;
      position: relative;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
.tags-view-container {

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
.tab-item {
  	/*display: inline-block;*/
    line-height: 54px;
    float: left;
  }
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>

