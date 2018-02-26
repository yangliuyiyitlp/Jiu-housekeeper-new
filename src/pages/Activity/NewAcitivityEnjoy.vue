<template>
  <div class="pageWidth">
    <div class="introBtn">
      <span class="introduce">预览</span>
      <span class="publish">发布</span>
    </div>
    <el-form ref="menuForm" :model="menuForm" class="city">
      <h2>地址选择</h2>
      <a>{{menuForm.cityName}}</a>&nbsp;<i class="el-icon-search" @click="searchCity"></i>
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
                  <div @click='downCircle(index)' class="downCircle" v-if="index===0?false:true"><i
                    class="circle iconfont icon-jiantouarrow505"></i></div>
                  <div @click='topCircle(index)' class="topCircle" v-if="index===0?false:true"><i
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
              <span class="savePageHeader" @click="savePageHeader">保存</span>
              <el-switch
                :width=100
                @change = isUseChange
                v-model='form.isUse'
                on-text="启用"
                off-text="停用"
                on-color="#DB5050"
                off-color="#4F4D4D">
              </el-switch>
            </div>
            <hr class="lineWeight">
            <el-form ref="formData" :rules="rules" :model="form" label-width="100px" class="formData">
              <el-input v-if=0 v-model="form.id"></el-input>
              <el-form-item label="是否登录：">
                <el-switch
                  :width=60
                  v-model='form.needLogin'
                  on-text="登录"
                  off-text="关闭"
                  on-color="#DB5050"
                  off-color="#4F4D4D">
                </el-switch>
              </el-form-item>

              <el-form-item label="默认标题：" class="minWidth">
                <el-input v-model="form.oldTitle" placeholder="请输入显示的名称（建议5个字以内）"></el-input>
              </el-form-item>

              <el-form-item label="页头标题：" class="minWidth">
                <el-input v-model="form.newTitle" placeholder="请输入也同样文字（最多16个字符）"></el-input>
              </el-form-item>
              <el-form-item label="有效日期：" prop="beginTime">
                <el-date-picker
                  v-model="form.beginDate"
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
                  v-model="form.isShow"
                  on-text="登录"
                  off-text="关闭"
                  on-color="#DB5050"
                  off-color="#4F4D4D">
                </el-switch>
              </el-form-item>
              <el-form-item label="是否登录：">
                <el-switch
                  :width=60
                  v-model="form.needLogin"
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

              <el-form-item label="切换时间（秒）：">
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
                    <span style="font-size: 12px;color: red">上传图标图片<br/>宽高比670*300</span>
                  </el-col>

                  <el-col :span="19" :offset="1">
                    <el-form ref="formData" :rules="rules" :model="form" label-width="100px">
                      <div class="carouselIcon">
                        <div class="carouseDel"><i class="circle iconfont icon-icon--"></i></div>
                        <div class="carouseDown"><i class="circle iconfont icon-jiantouarrow505"></i></div>
                        <div class="carouseTop"><i class="circle iconfont icon-jiantouarrow499"></i></div>
                        <div class="carouseMaxTop"><i class="circle iconfont icon-zhiding"></i></div>
                      </div>
                      <el-form-item v-if=0>
                        <el-input v-model="form.id"></el-input>
                        <el-input v-model="form.updateBy"></el-input>
                      </el-form-item>

                      <el-form-item label="类型：">
                        <el-select v-model="value" placeholder="请选择">
                          <el-option
                            v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="链接：">
                        <el-select v-model="value" placeholder="请选择">
                          <el-option
                            v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="跳转类型：">
                        <el-select v-model="value" placeholder="请选择">
                          <el-option
                            v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="模板选择：">
                        <el-select v-model="value" placeholder="请选择">
                          <el-option
                            v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="链接：">
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

                      <el-form-item label="平台：">
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
            <div class="addForm"><i class="iconAdd iconfont icon-add"></i></div>

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
  import baseUrl from '../../utils/baseUrl'
  import a from '../../assets/js/getsessionId.js'
  import Cookie from 'js-cookie'

  export default {
    data () {
      return {
        cityVisible: false,
        isOpen: true,
        isHeader: false,
        isCarousel: false,
        filterText: '',
        cityId: '',
        ranks: '',
        Token: {},
        menuForm:{},
        form: {},
        select: [{'id': '-1', 'name': '全国', 'children': []}],
        options: [],
        value: '',
        checkedCity: [],
        menuList: [{value: '页头 ① 点击编辑', class: 'pageHeader'}, {value: '轮播区 ② 点击编辑', class: 'pageCarousel'},
          {value: '图标区 ③ 点击编辑', class: 'pageFoot'}, {value: '瀑布流 ④ 点击编辑', class: 'pageActivity'}],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        rules: {},
        adminId: '',
        path: '',
        permissionList: []
      }
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
//      isUse (val, old) {
//        if (val === true) {
//          this.$message.warning('保存后点击发布才会生效')
//        }
//      }
//      menuList: function () {
//        this.$nextTick(() => {
//          let menuDivs = this.$refs.menu.children
//          for (let i = 0; i < this.menuDivs.length; i++) {
//            if (this.menuDivs[i].isShow === 0) {
//              menuDivs[i].style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
//            } else {
//              menuDivs[i].style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
//            }
//          }
//        })
//      }
    },
    created () {
      // 请求按钮权限
      this.adminId = this.$route.query.adminId
      this.path = this.$route.path
      a.sessionId(this.adminId, this.path, this.$router, this.$ajax, this.permissionList)
      this.getCityRelation()
    },
//    computed: {
//      isUse () {
//        return this.form.isUse
//      }
//    },
    methods: {
      isUseChange(val){
        if (val === true) {
          this.$message.warning('保存后点击发布才会生效')
        }
      },
      // 全局获取城市对应关系
      getCityRelation () {
        this.$ajax.get(`${baseUrl.ActivityArea}/electric/userUtilsInterface/interface/getBikeAreaList`)
          .then(res => {
            if (res.data.code === 0) {
              let bikeAreaList = res.data.bikeAreaList
              for (let i = 0; i < bikeAreaList.length; i++) {
                this.select[0].children.push(bikeAreaList[i])
              }
            } else {
              this.$message('城市列表获取失败')
            }
          })
          .catch(err => {
            this.$message.error('城市列表获取异常')
          })
      },
      //全局货物模板排序
      getRank () {
        this.$ajax.get(`${baseUrl.newEnjoyUrl}/jjEnjoy/getRank`, {params: {cityId: Number(this.cityId)}})
          .then((res) => {
            if (res.data.code === 1) {
              this.ranks = res.data.ranks
            } else {
              this.$message('获取模板排序失败')
            }
          })
          .catch(() => {
            this.$message('获取模板排序异常')
          })
      },
      downCircle (index) {
        if (!this.cityId) {
          this.$message('请先选择地址')
          return false
        }
        if (index === this.menuList.length - 1) {
          // 最后一条
          this.$message('已经是最后一条')
          return
        }
        let thisMenu = this.menuList[index]
        this.menuList.splice(index, 1) // 选中的删除
        this.menuList.splice(index + 1, 0, thisMenu) //选中的移到index+1
      },
      topCircle () {},
      // 全局左边当前行高亮,模块事件
      choiceMenu (index) {
        if (this.cityId) {
          if (isNaN(index)) {
            return false
          }
          let menuDivs = this.$refs.menu.children
          for (let i = 0; i < menuDivs.length; i++) {
            menuDivs[i].classList.remove('active')
          }
          menuDivs[index].classList.add('active')
          // 获取页头
          if (index === 0) {
            this.isHeader = true
            this.isCarousel = false
            this.$ajax.get(`${baseUrl.newEnjoyUrl}/jjEnjoy/title/form`, {params: {cityId: Number(this.cityId)}})
              .then((res) => {
                  if (res.data.code === 1) {
                    this.form = res.data.data
                    if (this.form.isUse === 1) {
                      this.form.isUse = true
                    } else {
                      this.form.isUse = false
                    }
                    if (this.form.needLogin === 1) {
                      this.form.needLogin = true
                    } else {
                      this.form.needLogin = false
                    }
                  } else {
                    this.$message('页头信息获取失败')
                  }
                }
              )
              .catch(err => {
                this.$message.error('页头信息获取异常')
              })
          }
          if (index === 1) {
            this.isHeader = false
            this.isCarousel = true
          }
        } else {
          this.$message('请先选择地址')
          return false
        }
      },
      // 城市树模型开始
      filterNode (value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      handleNode (data) {
        this.filterText = data.name // 弹框树模型点击输入值
        this.cityId = data.id
      },
      doModify () {
        this.menuForm.cityName = this.filterText
        this.menuForm.Id = this.cityId
        this.cityVisible = false
      },
      modifyCancel () {
        this.cityVisible = false
        this.menuForm.cityName = ''
        this.menuForm.Id = ''
      },
      searchCity () {
        this.cityVisible = true
        this.filterText = ''
      },
      // 城市树模型结束
      //页头保存
      savePageHeader () {
        if (this.form.isUse === true) {
          this.form.isUse = 1
        } else {
          this.form.isUse = 0
        }
        if (this.form.needLogin === true) {
          this.form.needLogin = 1
        } else {
          this.form.needLogin = 0
        }
        this.form.cityId = Number(this.cityId)
        this.form.updataBy = Cookie.get('adminId')
        this.$ajax.post(`${baseUrl.newEnjoyUrl}/jjEnjoy/title/save`, this.form)
          .then((res) => {
              if (res.data.code === 1) {
                this.$message.success(res.data.msg)
              } else {
                this.$message(res.data.msg)
              }
            }
          )
          .catch(err => {
            this.$message.error(err.data.msg)
          })
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
