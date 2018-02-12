<template>
  <div class="pageWidth">
    <div class="introBtn">
      <span class="introduce">预览</span>
      <span class="publish">发布</span>
    </div>
    <el-form ref="menuForm" :model="form" class="city">
      <h2>地址选择</h2>
      <a>{{form.cityName}}</a>&nbsp;<i class="el-icon-search" @click="searchCity"></i>
    </el-form>
    <div class="showWidth">
      <div class="showHeader">
        <a class="showPage">展示效果</a>
      </div>

      <el-row :gutter="0">
        <el-col :span="8" :offset="1">
          <div class="view">
            <div class="sidebar">
              <div class="pageTop"><img src="../../assets/images/activity/phoheader.png"></div>

              <div class="menuContent" ref="menu">
                <div v-for="(item,index) in menuList" :key="item.id" :class="item.class" @click="choiceMenu(index)">
                  <div class="headerContent">{{item.value}}</div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="14" :offset="1">
          <div class="rightForm">
            <div class="headerTitle">
              <a class="fontWeight">页头</a>
              <span class="savePageHeader">保存</span>
              <el-switch
                :width=100
                v-model="isOpen"
                on-text="启用"
                off-text="停用"
                on-color="#DB5050"
                off-color="#4F4D4D">
              </el-switch>
            </div>
            <hr class="lineWeight">
            <el-form ref="formData" :rules="rules" :model="form" label-width="100px" class="formData">
              <el-form-item  v-if=0>
                <el-input v-if=0 v-model="form.id"></el-input>
                <el-input v-if=0 v-model="form.updateBy"></el-input>
                <el-input v-if=0  v-model="form.rank"></el-input>
                <el-input  v-if=0 v-model="form.iconUrl"></el-input>
              </el-form-item>

              <el-form-item label="是否登录：">
                <el-switch
                  :width=60
                  v-model="isOpen"
                  on-text="登录"
                  off-text="关闭"
                  on-color="#DB5050"
                  off-color="#4F4D4D">
                </el-switch>
              </el-form-item>

              <el-form-item label="默认标题：" class="minWidth">
                <el-input v-model="form.rank" placeholder="请输入显示的名称（建议5个字以内）"></el-input>
              </el-form-item>

              <el-form-item label="页头标题："class="minWidth">
                <el-input v-model="form.iconUrl" placeholder="请输入也同样文字（最多16个字符）"></el-input>
              </el-form-item>
              <el-form-item label="有效日期：" prop="beginTime">
                <el-date-picker
                  v-model="form.beginTime"
                  type="datetime"
                  placeholder="选择生效时间">
                </el-date-picker>
                -
                <el-date-picker
                  v-model="form.endDate"
                  type="datetime"
                  placeholder="选择失效时间">
                </el-date-picker>
              </el-form-item>

            </el-form>

          </div>
        </el-col>


        <el-col v-if=false :span="14" :offset="1">
          <div class="rightForm">
            <h2>页头</h2>
            <hr>
            <el-row :gutter="0">
              <el-col :span="4" :offset="1">
                <el-upload
                  class="avatar-uploader"
                  action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
                  :data="Token"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                </el-upload>
                <span style="font-size: 12px;color: red">上传图标icon<br/>宽高比10*10</span>
              </el-col>

              <el-col :span="18" :offset="1">
                <el-form ref="form" :rules="rules" :model="form"></el-form>
                <el-form ref="formData" :rules="rules" :model="form" label-width="100px">

                  <el-form-item label="id：" v-if=0>
                    <el-input v-model="form.id"></el-input>
                  </el-form-item>

                  <el-form-item label="操作人员：" v-if=0>
                    <el-input v-model="form.updateBy"></el-input>
                  </el-form-item>

                  <el-form-item label="权重：" v-if=0>
                    <el-input v-model="form.rank"></el-input>
                  </el-form-item>

                  <el-form-item label="图片url：" v-if=0>
                    <el-input v-model="form.iconUrl"></el-input>
                  </el-form-item>

                  <el-form-item label="菜单名称：" prop="menuName">
                    <el-input v-model="form.menuName" style="width:215px"></el-input>
                  </el-form-item>

                  <el-form-item label="跳转类型：">
                    {{form.actionTypeName === 'app原生跳转' ? 'app原生跳转' : 'h5跳转'}}

                    <el-form-item prop="actionUrl" v-if="form.actionTypeName === 'app原生跳转'? false : true">
                      <el-input v-model="form.actionUrl"
                                style="margin-top: 10px"
                                placeholder="请输入跳转地址">
                      </el-input>
                    </el-form-item>
                  </el-form-item>

                  <el-form-item label="是否登录：" v-if="form.actionTypeName === 'app原生跳转'? false : true">
                    <el-radio-group v-model="form.needLogin">
                      <el-radio :label="0">不登录</el-radio>
                      <el-radio :label="1">登录</el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <el-form-item label="生效时间：" prop="beginTime">
                    <el-date-picker
                      v-model="form.beginTime"
                      type="datetime"
                      placeholder="选择生效时间">
                    </el-date-picker>
                  </el-form-item>

                  <el-form-item label="失效时间：" prop="endDate">
                    <el-date-picker
                      v-model="form.endDate"
                      type="datetime"
                      placeholder="选择失效时间">
                    </el-date-picker>
                  </el-form-item>

                  <el-form-item>
                    <el-button round
                               style="background-color:#DB5050;color:#fff"
                    >立即创建
                    </el-button>
                    <el-button
                    >重置
                    </el-button>
                    <el-button round style="background-color:#4F4D4D;color:#fff">取消</el-button>
                  </el-form-item>

                </el-form>
              </el-col>
            </el-row>

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
        cityVisible: false,
        isOpen: true,
        filterText: '',
        filterId: '',
        Token: {},
        form: {},
        select: [{'id': '1', 'label': '全国', 'children': [{'id': '2', 'label': '北京'}, {'id': '3', 'label': '上海'}]}],
        checkedCity: [],
        menuList: [{value: '页头 ① 点击编辑', class: 'pageHeader'}, {
          value: '轮播区 ② 点击编辑',
          class: 'pageCarousel'
        }, {value: '图标区 ③ 点击编辑', class: 'pageFoot'}, {value: '瀑布流 ④ 点击编辑', class: 'pageActivity'}],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        rules: {}
      }
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      },
      menuList: function () {
        this.$nextTick(() => {
          let menuDivs = this.$refs.menu.children
          for (let i = 0; i < this.menuDivs.length; i++) {
            if (this.menuDivs[i].isShow === 0) {
              menuDivs[i].style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
            } else {
              menuDivs[i].style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
            }
          }
        })
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.choiceMenu()
      })
    },
    methods: {
      // 当前行高亮
      choiceMenu (index) {
        if (isNaN(index)) {
          return
        }
        let menuDivs = this.$refs.menu.children
        for (let i = 0; i < menuDivs.length; i++) {
          menuDivs[i].classList.remove('active')
        }
        menuDivs[index].classList.add('active')
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
      },
      handleAvatarSuccess () {},
      beforeAvatarUpload () {},
    }
  }

  //  function searchRole (result, checkedRoles) {
  //    for (let i = 0; i < result.length; i++) {
  //      let item = result[i]
  //      if (item.children !== undefined && item.children.length > 0) {
  //        // 递归
  //        searchRole(item.children, checkedRoles)
  //      }
  //      if (item.roleId && item.roleId) {
  //        let arr = checkedRoles.push(item.id)
  //        return arr
  //      }
  //    }
  //  }
</script>
<style scoped>
  /*左边*/
  @import '../../assets/icon_font/iconfont.css';
  @import '../../assets/css/treecss.css';

  .width {
    width: 100px;
  }

  .pageWidth {
    padding: 0px 40px 20px;
  }

  .showWidth {
    margin-top: 100px;
  }

  .lineWeight {
    color:#ccc;
  }
.minWidth{
  width:467px;
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

  .pageTop {
    width: 100%;
  }

  .pageTop img {
    width: 100%;
  }

  .headerContent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  .pageHeader, .pageCarousel, .pageActivity, .pageFoot {
    position: relative;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    margin-bottom: 5px;
    color: #fff;
  }

  .pageHeader {
    height: 10%;
  }

  .active {
    background-color: #DB5050;
  }

  .pageCarousel {
    height: 25%;
  }

  .pageActivity {
    height: 20%;
  }

  .pageFoot {
    height: 40%;
  }

  .menuContent {
    height: 100%;
  }

  .showPage {
    float: left;
    font-size: 1.5em;
    font-weight: 700;
  }

  .introBtn {
    padding: 15px;
    box-sizing: border-box;
    float: right;
    width: 415px;
    height: 80px;
    line-height: 80px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
    text-align: center;
  }

  .publish {
    margin-left: 15px;
  }

  .introduce, .publish {
    cursor: pointer;
    float: left;
    width: 180px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    border-radius: 30px;
    background-color: #DB5050;
  }

  .showHeader {
    height: 40px;
  }

  /*页头侧边*/
  .rightForm {
    padding: 30px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    -webkit-box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
  }
  .fontWeight {
    font-weight: 700;
    font-size: 1.5rem;
  }

  .formData {
    margin-top: 20px;
  }

  .headerTitle{
    height: 35px;
    line-height:35px;
  }

  .savePageHeader {
    margin-left: 10px;
    cursor: pointer;
    float: right;
    width: 100px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    border-radius: 30px;
    background-color: #DB5050;
  }

  /*头像上传*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    margin-top: 20px;
    font-size: 28px;
    color: #8c939d;
    width: 88px;
    height: 88px;
    line-height: 88px;
    text-align: center;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
  }

  .avatar {
    width: 88px;
    height: 88px;
    display: block;
  }
</style>
