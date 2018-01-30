<template>
  <div class="pageWidth">
    <el-form ref="menuForm" :model="form">
      <h2>地址选择</h2>
      <el-input
        class="width"
        :disabled=true
        :on-icon-click="searchCity"
        icon="search"
        v-model="form.cityName">
      </el-input>
    </el-form>

    <div class="showWidth">
      <h2>展示效果</h2>
      <el-row>
        <el-col :span="8">
          <div class="view">
            <div class="sidebar">
              <div class="pageTop"><img src="../../assets/images/timg.jpg"></div>
              <div v-if="pageHeader" class="pageHeader"><div class="headerContent">页头①点击取消编辑</div></div>
              <div v-else="pageHeader" class="pageHeader"><div class="headerContent">页头①点击取消编辑</div></div>
              <div v-if="pageCarousel" class="pageCarousel"><div class="headerContent">页头①点击取消编辑</div></div>
              <div v-else="pageCarousel" class="pageCarousel"><div class="headerContent">页头①点击取消编辑</div></div>
              <div v-if="pageActivity" class="pageCarousel"><div class="headerContent">页头①点击取消编辑</div></div>
              <div v-else="pageActivity" class="pageCarousel"><div class="headerContent">页头①点击取消编辑</div></div>
              <div v-if="pageFoot" class="pageCarousel"><div class="headerContent">页头①点击取消编辑</div></div>
              <div v-else="pageFoot" class="pageCarousel"><div class="headerContent">页头①点击取消编辑</div></div>
              <div v-if="pageFoot" class="pageCarousel"><div class="headerContent">页头①点击取消编辑</div></div>
              <div v-else="pageFoot" class="pageCarousel"><div class="headerContent">页头①点击取消编辑</div></div>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="viewRight">
            <div class="sidebarRight"></div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!--模态框-->
    <el-dialog title="地址" size="tiny" :visible.sync="cityVisible" center>
      关键字：<input ref='keySearch' type='text' class='keySearch' v-model="filterText">
      <el-tree
        :data="select"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="checkedCity"
        ref="tree"
        class="treeWidth"
        accordion
        :filter-node-method="filterNode"
        @node-click="handleNode"
        :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyCancel">取 消</el-button>
        <el-button type="primary" @click="doModify">确 定</el-button>
      </div>
    </el-dialog>
  </div>


</template>
<script>
  export default {
    data () {
      return {
        cityVisible: false,
        filterText: '',
        filterId: '',
        select: [],
        pageHeader: true,
        pageCarousel: true,
        pageActivity: true,
        pageFoot: true,
        checkedCity: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        form: {}
      }
    },
    methods: {
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleNode (data) {
        this.filterText = data.label // 弹框树模型点击输入值
        this.filterId = data.id
      },
      doModify () {
        let treeArr = this.$refs.tree.getCheckedKeys()

        this.form.cityName = this.filterText
        this.form.Id = this.filterId
        this.cityVisible = false
      },
      modifyCancel () {
        this.cityVisible = false
        this.form.cityName = ''
        this.form.Id = ''
      },
      searchCity () {
        this.cityVisible = true
        this.defaultProps.label = 'label'
        this.filterText = ''
      }
    }
  }
</script>
<style scoped>
  .width {
    width: 100px;
  }
  .pageWidth {
    padding: 0px 40px 20px;
  }
  .showWidth {
    margin-top: 100px;
  }
  .view {
    overflow: auto;
    border: 1px solid rgba(0, 0, 0, 0.06);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 35px;
    width: 375px;
    height: 669px;
    background-color: #fff;
    -webkit-border-radius: 45px;
    -moz-border-radius: 45px;
    border-radius: 45px;
    -webkit-box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.02), 0 0 32px 0 rgba(0, 0, 0, 0.07) inset;
    -moz-box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.02), 0 0 32px 0 rgba(0, 0, 0, 0.07) inset;
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.02), 0 0 32px 0 rgba(0, 0, 0, 0.07) inset;
  }
  .view .sidebar {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .viewRight {
    border: 1px solid rgba(0, 0, 0, 0.06);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 35px;
    height: 300px;
    background-color: #fff;
    -webkit-border-radius: 45px;
    -moz-border-radius: 45px;
    border-radius: 45px;
    -webkit-box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.02), 0 0 32px 0 rgba(0, 0, 0, 0.07);
    -moz-box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.02), 0 0 32px 0 rgba(0, 0, 0, 0.07);
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.02), 0 0 32px 0 rgba(0, 0, 0, 0.07);
  }
  .viewRight .sidebarRight {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .pageTop{
    width: 100%;
    height: 5%;
  }
  .pageTop img{
    width: 100%;
    height: 100%;
  }
  .pageHeader {
    position: relative;
    width: 100%;
    height: 10%;
    background-color: #DB5050;
  }
  .headerContent{
    position: absolute;top:50%;left: 50%;transform:translateX(-50%) translateY(-50%);
  }
  .pageCarousel {
    position: relative;
    width: 100%;
    height: 27%;
    background-color: #ccc;
    margin-bottom:10px;
  }
</style>
