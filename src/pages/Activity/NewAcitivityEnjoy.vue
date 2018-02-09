<template>
  <div class="pageWidth">
    <el-form ref="menuForm" :model="form">
      <h2>地址选择</h2>
      <a>{{form.cityName}}</a>&nbsp;<i class="el-icon-search" @click="searchCity"></i>
    </el-form>

    <div class="showWidth">
      <div class="showHeader">
        <a class="showPage">展示效果</a>
        <div class="introBtn"><el-button class="introduce">发布</el-button></div>
      </div>

      <el-row>
        <el-col :span="8">
          <div class="view">
            <div class="sidebar">
              <div class="pageTop"><img src="../../assets/images/activity/phoheader.png"></div>
              <div class="pageFoot">
                <div class="headerContent">{{}}<i class=""></i></div>
              </div>

              <!--<div  class="pageHeader" >-->
                <!--<div class="headerContent">页头 ① 点击编辑</div>-->
              <!--</div>-->
              <!--<div  class="pageCarousel">-->
                <!--<div class="headerContent">轮播区 ② 点击编辑</div>-->
              <!--</div>-->
              <!--<div class="pageActivity">-->
                <!--<div class="headerContent">图标区 ③ 点击编辑</div>-->
              <!--</div>-->
              <!--<div class="pageFoot">-->
                <!--<div class="headerContent">瀑布流 ④ 点击编辑</div>-->
              <!--</div>-->

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
    <el-dialog title="城市" size="tiny" :visible.sync="cityVisible" center>
      关键字：<input ref='keySearch' type='text' class='keySearch' v-model="filterText">
      <el-tree
        :data="select"
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
        style:false,
        cityVisible: false,
        filterText: '',
        filterId: '',
        select: [{'id': '1', 'label': '全国', 'children': [{'id': '2', 'label': '北京'}, {'id': '3', 'label': '上海'}]}],
        checkedCity: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        form: {}
      }
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      styleChange(){
        this.style=true
      },
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleNode (data) {
        this.filterText = data.label // 弹框树模型点击输入值
        this.filterId = data.id
      },
      doModify () {
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

  function searchRole (result, checkedRoles) {
    for (let i = 0; i < result.length; i++) {
      let item = result[i]
      if (item.children !== undefined && item.children.length > 0) {
        // 递归
        searchRole(item.children, checkedRoles)
      }
      if (item.roleId && item.roleId) {
        let arr = checkedRoles.push(item.id)
        return arr
      }
    }
  }
</script>
<style scoped>
  @import '../../assets/icon_font/iconfont.css';

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
    cursor: pointer;
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
    position: relative;
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

  .pageTop {
    width: 100%;
  }
  .pageTop img {
    width: 100%;
    height: 100%;
  }
  .headerContent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  .pageHeader,.pageCarousel,.pageActivity,.pageFoot {
    position: relative;
    width: 100%;
    background-color: rgba(0,0,0,0.4);
    margin-bottom: 5px;
    color:#fff;
  }
  .pageHeader {
    height: 10%;
  }
  .active{
    background-color: #DB5050;
  }
  .unactive{
    background-color: rgba(0,0,0,0.4);
  }
  .pageCarousel{
    height: 25%;
  }
  .pageActivity{
    height: 20%;
  }
  .pageFoot{
    height: 40%;
  }
  .showPage{
    float:left;
    font-size: 1.5em;
    font-weight: 700;
  }
  .introBtn{
    float: right;
    width: 14.666667rem;
    height: 5.333333rem;
    line-height: 5.333333rem;
    box-shadow: 0 0.266667rem 1.066667rem 0 rgba(0, 0, 0, 0.15);
    text-align: center;
  }
  .introduce{
    width: 12rem;
    height: 3.333333rem;
    line-height: 1.4rem;
    text-align: center;
    color: #fff;
    font-size: 1.066667rem;
    border-radius: 3.333333rem;
    background-color: #DB5050;
  }
  .showHeader{
    height:40px;
  }
</style>
