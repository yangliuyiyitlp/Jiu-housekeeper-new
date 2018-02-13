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
                  <div class="downCircle" v-if="index===0?false:true"><i
                    class="circle iconfont icon-jiantouarrow505"></i></div>
                  <div class="topCircle" v-if="index===0?false:true"><i
                    class="circle iconfont icon-jiantouarrow499"></i></div>
                  <div class="headerContent">{{item.value}}</div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <!--页头-->
        <el-col :span="14" :offset="1" v-if="isHeader">
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
              <el-form-item v-if=0>
                <el-input v-if=0 v-model="form.id"></el-input>
                <el-input v-if=0 v-model="form.updateBy"></el-input>
                <el-input v-if=0 v-model="form.rank"></el-input>
                <el-input v-if=0 v-model="form.iconUrl"></el-input>
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

              <el-form-item label="页头标题：" class="minWidth">
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
        <!--轮播区-->
        <el-col v-if='isCarousel' :span="14" :offset="1">
          <div class="rightForm">
            <div class="headerTitle">
              <a class="fontWeight">轮播区</a>
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
              <el-form-item v-if=0>
                <el-input v-if=0 v-model="form.id"></el-input>
                <el-input v-if=0 v-model="form.updateBy"></el-input>
              </el-form-item>

              <el-form-item label="是否显示：">
                <el-switch
                  :width=60
                  v-model="isOpen"
                  on-text="登录"
                  off-text="关闭"
                  on-color="#DB5050"
                  off-color="#4F4D4D">
                </el-switch>
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

              <el-form-item label="模块宽高：">
                <el-input v-model="form.rank" placeholder="宽" class="miWidth"></el-input>
                x
                <el-input v-model="form.rank" placeholder="高" class="miWidth"></el-input>
              </el-form-item>

              <el-form-item label="切换时间（秒）：" >
                <el-input class="secWidth" v-model="form.iconUrl" placeholder="只能输入数字"></el-input>
              </el-form-item>
              <a class="fontWeight">内容上传</a>
              <hr class="lineWeight">
              <div class="carousel">
                <el-row :gutter="0">
                  <el-col :span="4">
                    <el-upload
                      class="avatar-uploader"
                      action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
                      :data="Token"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="form.iconUrl" :src="iconUrl" class="avatar">
                      <i v-else class="el-icon-plus
                avatar-uploader-icon"></i>
                    </el-upload>
                    <span style="font-size: 12px;color: red">上传图标icon<br/>宽高比10*10</span>
                  </el-col>

                  <el-col :span="19" :offset="1">
                    <el-form ref="form" :rules="rules" :model="form"></el-form>
                    <el-form ref="formData" :rules="rules" :model="form" label-width="100px">

                      <el-form-item v-if=0>
                        <el-input v-model="form.id"></el-input>
                        <el-input v-model="form.updateBy"></el-input>
                      </el-form-item>

                      <el-form-item  label="类型：">
                        <el-select v-model="value" placeholder="请选择">
                          <el-option
                            v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item  label="链接：">
                        <el-select v-model="value" placeholder="请选择">
                          <el-option
                            v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item  label="跳转类型：">
                        <el-select v-model="value" placeholder="请选择">
                          <el-option
                            v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item  label="模板选择：">
                        <el-select v-model="value" placeholder="请选择">
                          <el-option
                            v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item  label="链接：">
                        <el-select v-model="value" placeholder="请选择">
                          <el-option
                            v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="展示日期：" prop="beginTime">
                        <el-date-picker
                          v-model="form.beginTime"
                          type="datetime">
                        </el-date-picker>
                        -
                        <el-date-picker
                          v-model="form.endDate"
                          type="datetime">
                        </el-date-picker>
                      </el-form-item>

                      <el-form-item  label="平台：">
                        <el-select v-model="value" placeholder="请选择">
                          <el-option
                            v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
              </div>
            </el-form>
           <div class="addForm"><i class="circle iconfont icon-add"></i></div>

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
        isHeader: false,
        isCarousel: false,
        filterText: '',
        filterId: '',
        Token: {},
        form: {},
        select: [{'id': '1', 'label': '全国', 'children': [{'id': '2', 'label': '北京'}, {'id': '3', 'label': '上海'}]}],
        options:[],
        value:'',
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
        if (index === 0) {
          this.isHeader = true
          this.isCarousel = false
        }
        if (index === 1) {
          this.isHeader = false
          this.isCarousel = true
        }
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
  @import '../../assets/css/activeEnjoy.css';

</style>
