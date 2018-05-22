<template>
	<div class="treeData">
		<!--<el-tree
		  :data="arrData"
		  :props="defaultProps"
		 node-key="name"
				  :default-expanded-keys="idArr"
				  :default-checked-keys="idArr"
		  accordion
		  @node-click="handleNodeClick">
		</el-tree>-->
		<!--<div style="height: 300px;overflow: auto;">
		 	<v-tree ref='tree' :data='treeData' :multiple='false'  :halfcheck='true' @node-click='nodeClick'/>
		 </div>-->
		 <v-tree ref='tree' :data='arrData' :multiple='false'  :halfcheck='true' @node-click='handleNodeClick'/>
		<!--<el-tree
		  :data="arrData"
		  :props="defaultProps"
		 node-key="id"
				  :default-expanded-keys="idArr"
				  :default-checked-keys="idArr"
		  accordion
		  @node-click="handleNodeClick">
		</el-tree>-->
	</div>
</template>

<script>
	export default {
		props: {			
			arrData: {//用于展示tree
				type: Array,
				default:function() {
					return []
				}
			},
			ids:'',			
			idArr: {
				type: Array,
				default:function() {
					return []
				}
			}
		},
		data() {
			return {
				dataTrees: null,
//				innerVisible: false,
		        defaultProps: {
		          children: 'child',
		          label: 'name'
		        }		        
			}
		},
		mounted() {
		},
		methods: {
			handleNodeClick(selectData){
//				if(this.ids =='id1'){
					this.$emit('handleNodeClick',selectData)
//				}else{
//					this.$emit('handleNodeClick2',selectData)
//				}
			}		
		}
	}
</script>

<style scoped lang="less">
.treeData {
	overflow: auto;
    height: 200px;
    width: 100%;
    padding-top: 17px;    
}
</style>