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

                <div v-for="(item,index) in menuList" :key="item.id" :class="item.class" @click="choiceMenu(item.id)"
                     :id=item.id>
                  <div>
                    <div @click.stop='downCircle(index)' class="downCircle" v-if="index===0?false:true"><i
                      class="circle iconfont icon-jiantouarrow505"></i></div>
                    <div @click.stop='topCircle(index)' class="topCircle" v-if="index===0?false:true"><i
                      class="circle iconfont icon-jiantouarrow499"></i></div>
                    <div class="headerContent">
                      <div>{{item.value}}</div>
                    </div>
                  </div>
                  <!--列表区详情-->
                  <div class="isFall" v-if="isFall&&item.id===3?true:false" ref="isFall">
                    <div v-for="(item,index) in fallList" :key="item.id" :class="item.class">
                      <!--<div v-for="(item,index) in formFalls.waterfallDetails" :key="item.id" :class="item.class">-->
                      <el-input v-if="0" v-model="item.id"></el-input>
                      <el-row :gutter="0">
                        <el-col :span="7">
                          <div @click.stop='topFall(index)' class="fallCircle"><i
                            class="circle iconfont icon-jiantouarrow499"></i></div>
                          <div @click.stop='downFall(index)' class="fallCircle"><i
                            class="circle iconfont icon-jiantouarrow505"></i></div>
                          <div @click.stop='delFall(item.id)' class="fallCircle"><i
                            class="circle iconfont icon-icon--"></i></div>
                          <div v-model="item.name"></div>
                        </el-col>
                        <el-col :span="13">
                          <div><span class="fallFont">按钮颜色：</span><input class="fallColor" placeholder="请选择"
                                                                         v-model="item.color"></div>
                          <div><span class="fallFont">按钮名字：</span><input class="fallColor" placeholder="请输入"
                                                                         v-model="item.buttonName"></div>
                        </el-col>
                        <el-col :span="3">
                          <el-color-picker v-model="item.color"></el-color-picker>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
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
                @change=isUseChange
                v-model='headerIsUse'
                on-text="启用"
                off-text="停用"
                on-color="#DB5050"
                off-color="#4F4D4D">
              </el-switch>
            </div>
            <hr class="lineWeight">
            <el-form ref="formData" :rules="rules" :model="form" label-width="100px" class="formData">
              <el-input v-if=0 v-model="form.id"></el-input>
              <el-form-item label="是否登录：" prop="headerNeedLogin">
                <el-switch
                  :width=60
                  v-model='headerNeedLogin'
                  on-text="登录"
                  off-text="关闭"
                  on-color="#DB5050"
                  off-color="#4F4D4D">
                </el-switch>
              </el-form-item>

              <el-form-item label="默认标题：" class="minWidth" prop="oldTitle">
                <el-input v-model="form.oldTitle" placeholder="请输入显示的名称（建议5个字以内）"></el-input>
              </el-form-item>

              <el-form-item label="页头标题：" class="minWidth" prop="newTitle">
                <el-input v-model="form.newTitle" placeholder="请输入也同样文字（最多16个字符）"></el-input>
              </el-form-item>
              <el-form-item label="有效日期：" prop="beginDate">
                <el-date-picker
                  v-model="form.beginDate"
                  type="datetime"
                  @change="beginDateChange"
                  placeholder="选择生效时间">
                </el-date-picker>
                -
                <el-date-picker
                  v-model="form.endDate"
                  type="datetime"
                  @change="endDateChange"
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
              <span class="savePageCarouse" @click="savePageCarouse">保存</span>
              <el-switch
                :width=100
                v-model="carouselIsUse"
                @change=isUseChange
                on-text="启用"
                off-text="停用"
                on-color="#DB5050"
                off-color="#4F4D4D">
              </el-switch>
            </div>
            <hr class="lineWeight">
            <el-form ref="formCarousel" :rules="rules" :model="formCarousel" label-width="120px" class="formData">
              <el-input v-if=0 v-model="formCarousel.id"></el-input>
              <el-input v-if=0 v-model="formCarousel.updateBy"></el-input>

              <el-form-item label="是否显示：" prop="carouselIsShow">
                <el-switch
                  :width=60
                  v-model="carouselIsShow"
                  on-text="显示"
                  off-text="隐藏"
                  on-color="#DB5050"
                  off-color="#4F4D4D">
                </el-switch>
              </el-form-item>
              <el-form-item label="是否登录：" prop="carouselNeedLogin">
                <el-switch
                  :width=60
                  v-model="carouselNeedLogin"
                  on-text="登录"
                  off-text="关闭"
                  on-color="#DB5050"
                  off-color="#4F4D4D">
                </el-switch>
              </el-form-item>

              <el-form-item label="模块宽高：">
                <el-input v-model="formCarousel.width" placeholder="宽" class="miWidth"></el-input>
                x
                <el-input v-model="formCarousel.height" placeholder="高" class="miWidth"></el-input>
              </el-form-item>

              <el-form-item label="切换时间(秒)："prop="changeTime">
                <el-input class="secWidth" v-model="formCarousel.changeTime" placeholder="只能输入数字"></el-input>
              </el-form-item>
              <a class="fontWeight">内容上传</a>


              <div class="carousel" v-for="(item,index) in formCarousel.carouselDetails" :key="index">

                <hr class="lineWeight">
                <el-row :gutter="0">

                  <el-col :span="4">
                    <a class="iconFont">轮播图{{index + 1}}</a>
                    <el-upload
                      :ref="item.id"
                      class="avatar-uploader"
                      action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
                      :data="Token"
                      :show-file-list="false"
                      :on-success="handleAvatar"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="item.iconUrl" :src="item.iconUrl" class="avatar" @click="getIconId(index)">
                      <i v-else class="el-icon-plus
                      avatar-uploader-icon" @click="getIconId(index)"></i>
                      <input type="text" v-if=0 v-model="item.iconUrl">
                      <span class="iconFont">图片<br>宽高670*300</span>
                    </el-upload>
                  </el-col>
                  <el-col :span="15" :offset="1">

                    <el-form :rules="rules" label-width="100px">

                      <el-input v-if=0 v-model="item.id"></el-input>
                      <el-input v-if=0 v-model="item.mainId"></el-input>

                      <el-form-item label="类型："prop="type">
                        <el-select v-model="item.type" placeholder="请选择类型" @change="enjoyTypeChange">
                          <el-option
                            v-for="(option,index) in enjoyType" :key="index" :label="option.label"
                            :value="option.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="跳转类型：" v-show="(item.type === 0|| item.type === 1?true:false)" prop="actionType">
                        <el-select v-model="item.actionType" placeholder="请选择跳转类型">
                          <el-option
                            v-for="(option,index) in (item.type===0?actionType:actionType2)" :key="index"
                            :label="option.label" :value="option.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <!--<el-form-item label="模板选择：" v-show="isDownloadModle">-->
                      <!--<el-select v-model="item.downloadModle" placeholder="请选择模板">-->
                      <!--<el-option-->
                      <!--v-for="(option,index) in enjoyDownUrl" :key="index" :label="option.label"-->
                      <!--:value="option.value">-->
                      <!--</el-option>-->
                      <!--</el-select>-->
                      <!--</el-form-item>-->
                      <el-form-item label="链接：" v-show="item.type === 2?true:false">
                        <el-select v-model="item.actionUrl" placeholder="请选择链接">
                          <el-option
                            v-for="(option,index) in enjoyUrl" :key="index" :label="option.label" :value="option.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="展示日期：" prop="beginDate">
                        <el-date-picker
                          v-model="item.beginDate"
                          type="datetime">
                        </el-date-picker>
                        -
                        <el-date-picker
                          v-model="item.endDate"
                          type="datetime">
                        </el-date-picker>
                      </el-form-item>

                      <el-form-item label="平台：">
                        <el-select v-model="item.os" placeholder="请选择平台">
                          <el-option
                            v-for="(option,index) in showType" :key="index" :label="option.label" :value="option.value">
                          </el-option>
                        </el-select>
                      </el-form-item>

                    </el-form>
                  </el-col>
                  <el-col :span="4">
                    <div class="carouseFormAll">
                      <div @click="carouseDel(item.id,index)"><i class="circle iconfont icon-icon--"></i></div>
                      <div @click="carouseDown(item.id,index)"><i class="circle iconfont icon-jiantouarrow505"></i>
                      </div>
                      <div @click="carouseTop(item.id,index)"><i class="circle iconfont icon-jiantouarrow499"></i></div>
                      <div @click="carouseMaxTop(item.id,index)"><i class="circle iconfont icon-zhiding"></i></div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-form>
            <div class="addForm" @click="addForm"><i class="iconAdd iconfont icon-add"></i></div>

          </div>
        </el-col>
        <!--图标区-->
        <el-col v-if='isIcon' :span="14" :offset="1">
          <div class="rightForm">
          <div class="headerTitle">
          <a class="fontWeight">图标区</a>
          <span class="savePageCarouse" @click="saveIcon">保存</span>
          <el-switch
          :width=100
          v-model="iconIsUse"
          @change=isUseChange
          on-text="启用"
          off-text="停用"
          on-color="#DB5050"
          off-color="#4F4D4D">
          </el-switch>
          </div>
          <hr class="lineWeight">
          <el-form ref="formIcon" :rules="rules" :model="formIcon" label-width="110px" class="formData">
          <el-input v-if=0 v-model="formIcon.id"></el-input>
          <el-input v-if=0 v-model="formIcon.updateBy"></el-input>

          <el-form-item label="是否显示：">
          <el-switch
          :width=60
          v-model="formIcon.carouselIsShow"
          on-text="登录"
          off-text="关闭"
          on-color="#DB5050"
          off-color="#4F4D4D">
          </el-switch>
          </el-form-item>
          <el-form-item label="是否登录：">
          <el-switch
          :width=60
          v-model="formIcon.carouselNeedLogin"
          on-text="登录"
          off-text="关闭"
          on-color="#DB5050"
          off-color="#4F4D4D">
          </el-switch>
          </el-form-item>

          <el-form-item label="模块宽高：">
          <el-input v-model="formIcon.width" placeholder="宽" class="miWidth"></el-input>
          x
          <el-input v-model="formIcon.height" placeholder="高" class="miWidth"></el-input>
          </el-form-item>
          <a class="fontWeight">图标配置</a>


          <div class="carousel" v-for="(item,index) in formIcon.carouselDetails" :key="index">

          <hr class="lineWeight">
          <el-row :gutter="0">

          <el-col :span="4">
          <a class="iconFont">图标配置{{index + 1}}</a>
          <!--<el-upload-->
          <!--class="avatar-uploader"-->
          <!--action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'-->
          <!--:data="Token"-->
          <!--:show-file-list="false"-->
          <!--:on-success="handleAvatarSuccess(item.id)"-->
          <!--:before-upload="beforeAvatarUpload">-->
          <!--<img v-if="item.iconUrl" :src="item.iconUrl" class="avatar">-->
          <!--<i v-else class="el-icon-plus-->
          <!--avatar-uploader-icon"></i>-->
          <!--<span class="iconFont">上传图片<br/>宽高比188*188</span>-->
          <!--</el-upload>-->
          <el-input v-model="item.iconUrl" v-if="0"></el-input>
          </el-col>
          <el-col :span="15" :offset="1">

          <el-form :ref=index :rules="rules" label-width="100px">

          <el-input v-if=0 v-model="item.id"></el-input>

          <el-form-item label="图标名称：">
          <el-input v-model="item.iconUrl"></el-input>
          </el-form-item>

          <el-form-item label="指向列表：" v-show="isActionType">
          <el-select v-model="item.actionType" placeholder="请选择" @change="actionTypeChange">
          <el-option
          v-for="(option,index) in actionType" :key="index" :label="option.label" :value="option.value">
          </el-option>

          </el-select>
          </el-form-item>
          <span>配置指向列表</span>

          <el-form-item label="链接：">
          <el-input v-model="item.iconUrl"></el-input>
          </el-form-item>

          <el-form-item label="平台：">
          <el-select v-model="item.os" placeholder="请选择平台">
          <el-option
          v-for="(option,index) in showType" :key="index" :label="option.label" :value="option.value">
          </el-option>
          </el-select>
          </el-form-item>

          <el-form-item label="生效日期：" prop="beginTime">
          <el-date-picker
          v-model="item.beginDate"
          type="datetime">
          </el-date-picker>
          </el-form-item>


          </el-form>
          </el-col>
          <el-col :span="4">
          <div class="carouseFormAll">
          <div @click="iconDel(item.id)"><i class="circle iconfont icon-icon--"></i></div>
          <div @click="iconDown(item.id,index)"><i class="circle iconfont icon-jiantouarrow505"></i>
          </div>
          <div @click="iconTop(item.id,index)"><i class="circle iconfont icon-jiantouarrow499"></i></div>
          <div @click="iconMaxTop(item.id,index)"><i class="circle iconfont icon-zhiding"></i></div>
          </div>
          </el-col>
          </el-row>
          </div>
          </el-form>
          <div class="addForm" @click="addIcon"><i class="iconAdd iconfont icon-add"></i></div>

          </div>
        </el-col>
        <!--列表区-->
        <el-col :span="14" :offset="1" v-if="isFalls">
          <div class="rightForm">
            <div class="headerTitle">
              <a class="fontWeight">赳赳特选</a>
              <span class="savePageHeader" @click="savePageFall">保存</span>
              <el-switch
                :width=100
                @change=isUseChange
                v-model='fallIsUse'
                on-text="启用"
                off-text="停用"
                on-color="#DB5050"
                off-color="#4F4D4D">
              </el-switch>
            </div>
            <hr class="lineWeight">
            <el-form ref="formData" :rules="rules" :model="formFalls" label-width="100px" class="formData">
              <el-input v-if=0 v-model="formFalls.id"></el-input>
              <el-form-item label="是否显示：" prop="headerNeedLogin">
                <el-switch
                  :width=60
                  v-model='fallIsShow'
                  on-text="登录"
                  off-text="关闭"
                  on-color="#DB5050"
                  off-color="#4F4D4D">
                </el-switch>
              </el-form-item>
              <el-form-item label="是否登录：" prop="headerNeedLogin">
                <el-switch
                  :width=60
                  v-model='fallIsLogin'
                  on-text="登录"
                  off-text="关闭"
                  on-color="#DB5050"
                  off-color="#4F4D4D">
                </el-switch>
              </el-form-item>
              <el-form-item label="模块宽高：">
                <el-input v-model="formFalls.width" placeholder="宽" class="miWidth"></el-input>
                x
                <el-input v-model="formFalls.height" placeholder="高" class="miWidth"></el-input>
              </el-form-item>
              <el-form-item label="模块名称：" class="minWidth">
                <el-input v-model="formFalls.waterfallName" placeholder="赳赳特选（可修改，建议5个字以内）"></el-input>
              </el-form-item>


            </el-form>

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
  import { convertDate2String } from '../../assets/js/convert'

  export default {
    data () {
      return {
        cityVisible: false,
        isOpen: true,
        isHeader: false,
        isCarousel: false,
        isIcon: false,
        isFalls: false,
        isFall: false,
        headerIsUse: false,
        headerNeedLogin: false,
        carouselIsUse: false,
        carouselIsShow: false,
        carouselNeedLogin: false,
        iconId: '',
        fallIsUse: false,
        fallIsShow: false,
        fallIsLogin: false,
        filterText: '',
        cityId: -1,
        rankArr: [],
        ranks: '',
        rankArrFall: [],
        Token: {},
        menuForm: {'cityName': '全国'},
        form: {},
        formCarousel: {'carouselDetails': []},
        carouselDetails: [],
        select: [{'id': '-1', 'name': '全国', 'children': []}],
        options: [{'label': 'rrr', 'value': 'eed'}],
        value: '',
        checkedCity: [],
        fallList: [{'class': 'fallFirst'}, {}, {}, {}],
        menuList: [],
        formIcon: {},
        iconIsUse: false,
        iconDetails: {},
        menuCount: [{value: '轮播区 ② 点击编辑', class: 'pageCarousel', id: 1}, {
          value: '图标区 ③ 点击编辑',
          class: 'pageFoot',
          id: 2
        }, {value: '列表区 ④ 点击编辑', class: 'pageActivity', id: 3}],
        enjoyType: [],
        actionType: [],
        actionType2: [],
        welfareList: [],
        enjoyDownUrl: [],
        showType: [],
        enjoyUrl: [],
        isActionType: true,
        formFalls: {},
        rules: {
          oldTitle: [{required: true, message: '请输入默认标题', trigger: 'blur'},
            {max: 5, message: '长度不大于 5个字', trigger: 'blur'}],
          newTitle: [{required: true, message: '请输入页头标题', trigger: 'blur'}],
          beginDate: [{required: true, message: '请输入日期', trigger: 'blur'}],
          headerNeedLogin: [{required: true, message: '请选择', trigger: 'blur'}],
          carouselIsShow: [{required: true, message: '请选择', trigger: 'blur'}],
          carouselNeedLogin: [{required: true, message: '请选择', trigger: 'blur'}],
          changeTime: [{required: true, message: '请填写切换时间', trigger: 'blur'}],
          type: [{required: true, message: '请选择', trigger: 'blur'}],
          actionType: [{required: true, message: '请选择', trigger: 'blur'}]
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
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
    mounted () {
//      this.menuList = this.menuCount // 接口关了先直接赋值
    },
    created () {
      // 请求按钮权限
      this.adminId = this.$route.query.adminId
      this.path = this.$route.path
      a.sessionId(this.adminId, this.path, this.$router, this.$ajax, this.permissionList)
      this.getCityRelation()
      this.getRanks() // 接口关了先直接赋值
    },
//    computed: {
//      isUse () {
//        return this.form.isUse
//      }
//    },
    methods: {
      isUseChange (val) {
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
      //全局模板排序获取
      getRanks () {
        //直接赋值
        this.menuList = [{value: '页头 ① 点击编辑', class: 'pageHeader', id: 0},{value: '轮播区 ② 点击编辑', class: 'pageCarousel', id: 1}, {
          value: '图标区 ③ 点击编辑',
          class: 'pageFoot',
          id: 2
        }, {value: '列表区 ④ 点击编辑', class: 'pageActivity', id: 3}]

//        this.menuList = [{value: '页头 ① 点击编辑', class: 'pageHeader', id: 0}]
//        if (!this.cityId) { //判断条件 获取排序
//          this.$message('请先选择地址')
//          return false
//        }
//        this.$ajax.get(`${baseUrl.newEnjoyUrl}/jjEnjoy/getRank`, {params: {cityId: this.cityId}})
//          .then(res => {
//            if (res.data.code === 0) {
//              if (res.data.data && res.data.data !== undefined) {
//                this.ranks = res.data.data.ranks
//              } else {
//                this.ranks = '1,2,3'
//              }
//              this.rankArr = this.ranks.split(',')
//              for (let i = 0; i < this.rankArr.length; i++) {
//                for (let j = 0; j < this.menuCount.length; j++) {
//                  if (Number(this.rankArr[i]) === this.menuCount[j].id) {
//                    this.menuList.push(this.menuCount[j])
//                  }
//                }
//              }
//              this.form = {}
//              this.formCarousel = {}
//              this.formFalls = {}
//              this.formIcon = {}
//              this.choiceMenu(null)
//            } else {
//              this.$message('获取排序失败')
//            }
//          })
//          .catch((err) => {
//            this.$message.error('获取排序异常')
//          })
      },
      //全局模板排序提交
      setRanks () {
        this.$ajax.post(`${baseUrl.newEnjoyUrl}/jjEnjoy/saveRank`, {
          cityId: this.cityId,
          ranks: this.ranks,
          updateBy: this.adminId
        })
          .then(res => {
            if (res.data.code === 0) {
              // 获取排序
              this.getRanks()
            } else {
              this.$message('提交排序失败')
            }
          })
          .catch((err) => {
            this.$message.error('提交排序异常')
          })
      },
      downCircle (index) {
        this.rankArr = []
        if (!this.cityId) { //判断条件
          this.$message('请先选择地址')
          return false
        }
        if (index === this.menuList.length - 1) {
          this.$message('已经是最后一条啦')
          return
        }
        //提交排序
        let newMenuList = this.menuList
        let thisMenu = newMenuList[index]
        newMenuList.splice(index, 1) // 选中的删除
        newMenuList.splice(index + 1, 0, thisMenu) //选中的移到index+1
        for (let i = 1; i < newMenuList.length; i++) {
          this.rankArr.push(newMenuList[i].id)
        }
        this.ranks = this.rankArr.join(',')
        this.setRanks()
      },
      topCircle (index) {
        this.rankArr = []
        if (!this.cityId) { //判断条件
          this.$message('请先选择地址')
          return false
        }
        if (index === 1) {
          this.$message('已经是第一条啦')
          return
        }
        //提交排序
        let newMenuList = this.menuList
        let thisMenu = newMenuList[index]
        newMenuList.splice(index, 1) // 选中的删除
        newMenuList.splice(index - 1, 0, thisMenu) //选中的移到index+1
        for (let i = 1; i < newMenuList.length; i++) {
          this.rankArr.push(newMenuList[i].id)
        }
        this.ranks = this.rankArr.join(',')
        this.setRanks()
      },
      // 全局左边当前行高亮,模块事件
      choiceMenu (id) {
        if (this.cityId) {
          if (isNaN(id)) {
            return false
          }
          let menuDivs = this.$refs.menu.children
          getMenu(menuDivs, id)
          this.menuCount[2].class = 'pageActivity'
          if (id === 0) { // 获取页头
            this.isHeader = true
            this.isCarousel = false
            this.isIcon = false
            this.isFalls = false
            this.isFall = false
            this.getHeader()
          } else if (id === 1) {
            this.isHeader = false
            this.isCarousel = true
            this.isIcon = false
            this.isFalls = false
            this.isFall = false
            this.getEnjoyType()
          } else if (id === 2) {
            this.isHeader = false
            this.isCarousel = false
            this.isIcon = true
            this.isFalls = false
            this.isFall = false
          } else if (id === 3) {
            this.menuCount[2].class = 'pageActivityClick'
            this.isHeader = false
            this.isCarousel = false
            this.isIcon = false
            this.isFalls = true
            this.isFall = true
            this.getPageFall()
          } else {
            this.isHeader = false
            this.isCarousel = false
            this.isIcon = false
            this.isFalls = false
            this.isFall = false
          }
        } else {
          this.$message('请先选择地址')
          return false
        }
      },
      // 全局城市树模型开始
      filterNode (value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      handleNode (data) {
        this.filterText = data.name // 弹框树模型点击输入值
        this.cityId = Number(data.id)
      },
      doModify () {
        this.menuForm.cityName = this.filterText
        this.cityVisible = false
        this.getRanks()
      },
      modifyCancel () {
        this.cityVisible = false
        this.menuForm.cityName = ''
        this.cityId = ''
      },
      searchCity () {
        this.cityVisible = true
        this.filterText = ''
      },
      //页头
      getHeader () {
        this.$ajax.get(`${baseUrl.newEnjoyUrl}/jjEnjoy/title/form`, {params: {cityId: this.cityId}})
          .then((res) => {
              if (res.data.code === 0) {
                if (res.data.data && res.data.data !== undefined) {
                  this.form = res.data.data
                } else {
                  this.form = {}
                }
                if (this.form.isUse === 1) {
                  this.headerIsUse = true
                } else {
                  this.headerIsUse = false
                }
                if (this.form.needLogin === 1) {
                  this.headerNeedLogin = true
                } else {
                  this.headerNeedLogin = false
                }
              } else {
                this.$message('页头信息获取失败')
              }
            }
          )
          .catch(err => {
            this.$message.error('页头信息获取异常')
          })
      },
      beginDateChange (val) {
        this.form.beginDate = val
      },
      endDateChange (val) {
        this.form.endDate = val
      },
      savePageHeader () {
        if (this.form.beginDate > this.form.endDate) {
          this.$message('有效日期开始时间必须早于结束时间')
          return
        }
        if (this.headerIsUse === true) {
          this.form.isUse = 1
        } else {
          this.form.isUse = 0
        }
        if (this.headerNeedLogin === true) {
          this.form.needLogin = 1
        } else {
          this.form.needLogin = 0
        }
        this.form.cityId = this.cityId
        this.form.updateBy = this.adminId
        this.$ajax.post(`${baseUrl.newEnjoyUrl}/jjEnjoy/title/save`, this.form)
          .then((res) => {
              if (res.data.code === 0) {
                this.$message.success(res.data.msg)
                this.getHeader()
              } else {
                this.$message('保存失败')
              }
            }
          )
          .catch(err => {
            this.$message.error('保存异常')
          })
      },
      //轮播区
      handleAvatar () {
//        this.formCarousel.carouselDetails[0].iconUrl = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
        let result = this.formCarousel.carouselDetails
        for (let i = 0; i < result.length; i++) {
//          if (result[i].id === this.iconId) {
//            console.log(i,'一样',result[i].id)
//            result[i].iconUrl = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
//          }
          if (i === this.iconId) {
            console.log(i, '一样', result[i].id)
            result[i].iconUrl = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
          }
          console.log(result[i].iconUrl)
        }
      },
      getIconId (index) {
        console.log(index)
        this.iconId = index
      },
      beforeAvatarUpload (file) {
        return new Promise((resolve) => {
          this.$ajax.get(`${baseUrl.mainUrl}/electric/ossutil/interface/policy`, {params: {user_dir: 'newActivityEnjoy'}})
            .then((res) => {
              this.Token = res.data
              this.Token.OSSAccessKeyId = res.data.accessid
              this.Token.key = this.Token.dir + '/' + (+new Date()) + file.name
              // oss上图片的路径 在表单体提交之前拼接
//              for (let i = 0; i < this.formCarousel.carouselDetails.length; i++) {
//                if (this.formCarousel.carouselDetails[i].id === this.iconId) {
//                  console.log(this.iconId)
//                  this.formCarousel.carouselDetails[i].iconUrl2 = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
//                }
//              }
              resolve()
            })
            .catch(() => {
              this.$message({
                message: '图片秘钥获取失败',
                type: 'error'
              })
            })
        })
      },
      getEnjoyType () {
        this.$ajax.get(`${baseUrl.mainUrl}/sys/dictutils/interface/getDictList`, {params: {type: 'enjoy_type'}})
          .then((res) => {
            this.enjoyType = []
            for (let i = 0; i < res.data.length; i++) {
              let enjoyTypeObj = {}
              enjoyTypeObj.value = (+res.data[i].value)
              enjoyTypeObj.label = res.data[i].label
              this.enjoyType.push(enjoyTypeObj)
            }
            this.$ajax.get(`${baseUrl.mainUrl}/sys/dictutils/interface/getDictList`, {params: {type: 'show_type'}})
              .then((res) => {
                this.showType = []
                for (let k = 0; k < res.data.length; k++) {
                  let showTypeObj = {}
                  showTypeObj.value = (+res.data[k].value)
                  showTypeObj.label = res.data[k].label
                  this.showType.push(showTypeObj)
                }
                this.getCarousel()
              })
              .catch((err) => {
                this.$message.error('获取下拉列表失败')
              })
          })
          .catch((err) => {
            this.$message.error('获取下拉列表失败')
          })
      },
      getCarousel () {
        this.$ajax.get(`${baseUrl.newEnjoyUrl}/jjEnjoy/carousel/form`, {params: {cityId: this.cityId}})
          .then((res) => {
              if (res.data.code === 0) {
                if (res.data.data && res.data.data !== undefined) {
                  this.formCarousel = res.data.data
                  for (let i = 0; i < this.formCarousel.carouselDetails.length; i++) {
                    this.formCarousel.carouselDetails[i].iconUrl2 = this.formCarousel.carouselDetails[i].iconUrl
                    let id = this.formCarousel.carouselDetails[i].actionType
                    if (this.formCarousel.carouselDetails[i].type === 0) {
                      this.getActionList(`${baseUrl.newEnjoyUrl}/icon/getWelfareList`, 0)
                      this.$ajax.get(`${baseUrl.newEnjoyUrl}/icon/getWelfareList`, {
                        params: {
                          cityId: this.cityId,
                          actionType: id
                        }
                      })
                        .then((res) => {
                          if (res.data.code === 0) {
                            if (res.data.data[0] && res.data.data[0].name) {
                              this.formCarousel.carouselDetails[i].actionType = res.data.data[0].name
                            } else {
                              this.formCarousel.carouselDetails[i].actionType = ''
                            }
                          } else {
                            this.$message('跳转类型获取失败')
                          }
                        })
                        .catch(() => {
                          this.$message.error('跳转类型获取异常')
                        })
                    } else if (this.formCarousel.carouselDetails[i].type === 1) {
                      this.getActionList(`${baseUrl.newEnjoyUrl}/icon/getDiscountList`, 1)
                      this.$ajax.get(`${baseUrl.newEnjoyUrl}/icon/getDiscountList`, {
                        params: {
                          cityId: this.cityId,
                          actionType: id
                        }
                      })
                        .then((res) => {
                          if (res.data.code === 0) {
                            if (res.data.data[0] && res.data.data[0].name) {
                              this.formCarousel.carouselDetails[i].actionType = res.data.data[0].name
                            } else {
                              this.formCarousel.carouselDetails[i].actionType = ''
                            }
                          } else {
                            this.$message('跳转类型获取失败')
                          }
                        })
                        .catch(() => {
                          this.$message.error('跳转类型获取异常')
                        })
                    } else if (this.formCarousel.carouselDetails[i].type === 2) {
                      this.getEnjoyUrl()
                    }
                  }
                } else {
                  this.formCarousel = {}
                }
                if (this.formCarousel.isUse === 1) {
                  this.carouselIsUse = true
                } else {
                  this.carouselIsUse = false
                }
                if (this.formCarousel.needLogin === 1) {
                  this.carouselNeedLogin = true
                } else {
                  this.carouselNeedLogin = false
                }
                if (this.formCarousel.isShow === 1) {
                  this.carouselIsShow = true
                } else {
                  this.carouselIsShow = false
                }
                if (this.formCarousel.ratio.indexOf('X') !== -1) {
                  this.formCarousel.width = this.formCarousel.ratio.split('X')[0]
                  this.formCarousel.height = this.formCarousel.ratio.split('X')[1]
                }
              } else {
                this.$message('轮播区获取失败')
              }
            }
          )
          .catch(err => {
            this.$message.error('轮播区获取异常')
          })
      },
//      getActionResult(ul,id){
//        this.$ajax.get(ul,{params:{cityId:this.cityId,actionType:id}})
//          .then((res)=>{
//            if(res.data.code === 0){
//              if(res.data.data[0]&& res.data.data[0].name){
//                let result = res.data.data[0].name
//                console.log(4444,result)
//                return result
//              }else{
//                return ''
//              }
//            }else{
//              this.$message('跳转类型获取失败')
//            }
//          })
//          .catch(()=>{
//            this.$message.error('跳转类型获取异常')
//          })
//      },
      getActionList (ul, actionData) {
        this.$ajax.get(ul, {params: {cityId: this.cityId}})
          .then((res) => {
            if (res.data.code === 0) {
              if (actionData === 0) {
                this.actionType = []
                for (let k = 0; k < res.data.data.length; k++) {
                  let actionTypeObj = {}
                  actionTypeObj.value = res.data.data[k].id
                  actionTypeObj.label = res.data.data[k].name
                  this.actionType.push(actionTypeObj)
                }
              } else if (actionData === 1) {
                this.actionType2 = []
                for (let k = 0; k < res.data.data.length; k++) {
                  let actionTypeObj = {}
                  actionTypeObj.value = res.data.data[k].id
                  actionTypeObj.label = res.data.data[k].name
                  this.actionType2.push(actionTypeObj)
                }
              }

            } else {
              this.$message('跳转类型获取失败')
            }
          })
          .catch((err) => {
            this.$message.error('跳转类型获取异常')
          })
      },
      getEnjoyUrl () {
        this.$ajax.get(`${baseUrl.mainUrl}/sys/dictutils/interface/getDictList`, {params: {type: 'enjoy_url'}})
          .then((res) => {
            this.enjoyUrl = []
            for (let k = 0; k < res.data.length; k++) {
              let actionTypeObj = {}
              actionTypeObj.value = res.data[k].value
              actionTypeObj.label = res.data[k].label
              this.enjoyUrl.push(actionTypeObj)
            }
          })
          .catch((err) => {
            this.$message.error('链接获取失败')
          })
      },
      enjoyTypeChange (val) { //todo
        if (val === 0) {
          this.getActionList(`${baseUrl.newEnjoyUrl}/icon/getWelfareList`, 0)
        } else if (val === 1) {
          this.getActionList(`${baseUrl.newEnjoyUrl}/icon/getDiscountList`, 1)
        } else if (val === 2) {
          this.getEnjoyUrl()
        } else if (val === 3) {
        }

      },
      savePageCarouse () {
        console.log(111, this.formCarousel)
        //公用宽高转换
        this.formCarousel.ratio = this.formCarousel.width + 'X' + this.formCarousel.height
        //启用 显示 登录转换
        if (this.carouselIsUse === true) {
          this.formCarousel.isUse = 1
        } else {
          this.formCarousel.isUse = 0
        }
        if (this.carouselNeedLogin === true) {
          this.formCarousel.needLogin = 1
        } else {
          this.formCarousel.needLogin = 0
        }
        if (this.carouselIsShow === true) {
          this.formCarousel.isShow = 1
        } else {
          this.formCarousel.isShow = 0
        }
        //展示日期转换  排序
        let result = this.formCarousel.carouselDetails
        for (let i = 0; i < result.length; i++) {
          result[i].beginDate = convertDate2String(new Date(result[i].beginDate).getTime())
          result[i].endDate = convertDate2String(new Date(result[i].endDate).getTime())
          result[i].rank = i
          result[i].iconUrl2 = ''
        }
        this.$ajax.post(`${baseUrl.newEnjoyUrl}/jjEnjoy/carousel/save`, this.formCarousel)
          .then((res) => {
            if (res.data.code === 0) {
              this.$message.success('保存成功')
              this.getCarousel()
            } else {
              this.$message('保存失败')
            }
          })
          .catch((err) => {
            this.$message.error('保存异常')
          })
      },
      addForm () {
        let lastRank = this.formCarousel.carouselDetails.length
        let addCarouseData = {
          'id': '',
          'mainId': '',
          'type': 0,
          'actionType': '',
          'actionUrl': '',
          'downloadModel': 0,
          'beginDate': '',
          'endDate': '',
          'os': 0,
          'iconUrl': '',
          'rank': lastRank
        }
        this.getActionList(`${baseUrl.newEnjoyUrl}/icon/getWelfareList`, 0)
        this.formCarousel.carouselDetails.splice(lastRank, 0, addCarouseData)
      },
      carouseDel (id, index) {
        if (id === '') {
          this.formCarousel.carouselDetails.splice(index, 1)
        } else {
          var formData = new FormData() // 一个form表单的对象 然后可以设置表单的值模拟 multipart/form-data这种请求头的请求
          formData.append('id', id) // 文件数据
          this.$ajax(
            {
              method: 'post',
              url: `${baseUrl.newEnjoyUrl}/jjEnjoy/carousel/delete`,
              data: formData,
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((res) => {
              this.$message.success(res.data.msg)
              this.getCarousel()
            })
            .catch(() => {
              this.$message.error('轮播图保存失败')
            })
        }
      },
      carouseDown (id, index) {
        let result = this.formCarousel.carouselDetails
        if (index === result.length - 1) {
          this.$message('已经是最后一条啦!')
          return
        }
        for (let i = 0; i < result.length; i++) {
          if (result[i].id === id) {
            let thisResult = result[i]
            result.splice(i, 1)
            result.splice(i + 1, 0, thisResult)
          }
        }
      },
      carouseTop (id, index) {
        if (index === 0) {
          this.$message('已经是第一条啦!')
          return
        }
        let result = this.formCarousel.carouselDetails
        for (let i = 0; i < result.length; i++) {
          if (result[i].id === id) {
            let thisResult = result[i]
            result.splice(i, 1)
            result.splice(i - 1, 0, thisResult)
          }
        }
      },
      carouseMaxTop (id, index) {
        if (index === 0) {
          this.$message('已经是第一条啦!')
          return
        }
        let result = this.formCarousel.carouselDetails
        for (let i = 0; i < result.length; i++) {
          if (result[i].id === id) {
            let thisResult = result[i]
            result.splice(i, 1)
            result.splice(0, 0, thisResult)
          }
        }
      },
      //列表区
      topFall (index) {
        this.rankArrFall = []
        if (!this.cityId) { //判断条件
          this.$message('请先选择地址')
          return false
        }
        if (index === this.formFalls.waterfallDetails.length - 1) {
          this.$message('已经是第一条啦')
          return
        }
        //提交排序
        let formFallsList = this.formFalls.waterfallDetails
        let thisFalls = formFallsList[index]
        formFallsList.splice(index, 1) // 选中的删除
        formFallsList.splice(index - 1, 0, thisFalls) //选中的移到index+1
        for (let i = 1; i < formFallsList.length; i++) {
          this.rankArrFall.push(formFallsList[i].id)
        }
        this.ranks = this.rankArrFall.join(',')
        this.setRanksFall()
      },
      downFall (index) {
        this.rankArrFall = []
        if (!this.cityId) { //判断条件
          this.$message('请先选择地址')
          return false
        }
        if (index === this.formFalls.waterfallDetails.length - 1) {
          this.$message('已经是最后一条啦')
          return
        }
        //提交排序
        let formFallsList = this.formFalls.waterfallDetails
        let thisFalls = formFallsList[index]
        formFallsList.splice(index, 1) // 选中的删除
        formFallsList.splice(index + 1, 0, thisFalls) //选中的移到index+1
        for (let i = 1; i < formFallsList.length; i++) {
          this.rankArrFall.push(formFallsList[i].id)
        }
        this.ranks = this.rankArrFall.join(',')
        this.setRanksFall()
      },
      delFall (id) {
        this.$ajax.post(`${baseUrl.newEnjoyUrl2}/jjEnjoy/waterFall/deleteWaterFall`, {id: id})
          .then((res) => {
            this.$message.success(res.data.msg)
            this.getPageFall()
          })
          .catch(() => {
            this.$message.error('列表删除失败')
          })
      },
      setRanksFall () {
        this.$ajax.post(`${baseUrl.newEnjoyUrl2}/jjEnjoy/waterfall/rankWaterfall`, {
          cityId: this.cityId,
          ranks: this.ranks,
          updateBy: this.adminId
        })
          .then(res => {
            if (res.data.code === 0) {
              // 获取排序
              this.getPageFall()
            } else {
              this.$message('提交排序失败')
            }
          })
          .catch((err) => {
            this.$message.error('提交排序异常')
          })
      },
      savePageFall () {
        if (this.fallIsUse === true) {
          this.formFalls.isStopped = 1
        } else {
          this.formFalls.isStopped = 0
        }
        if (this.fallIsLogin === true) {
          this.formFalls.isLogin = 1
        } else {
          this.formFalls.isLogin = 0
        }
        if (this.fallIsShow === true) {
          this.formFalls.isShow = 1
        } else {
          this.formFalls.isShow = 0
        }
        this.formFalls.cityId = this.cityId
        this.formFalls.updateBy = this.adminId
        this.$ajax.post(`${baseUrl.newEnjoyUrl}/jjEnjoy/title/save`, this.form)
          .then((res) => {
              if (res.data.code === 0) {
                this.$message.success(res.data.msg)
                this.getHeader()
              } else {
                this.$message('保存失败')
              }
            }
          )
          .catch(err => {
            this.$message.error('保存异常')
          })
      },
      getPageFall () {
        this.$ajax.post(`${baseUrl.newEnjoyUrl2}/jjEnjoy/waterfall/form`, this.form)
          .then((res) => {
              if (res.data.code === 200) {
                this.formFalls = res.data.data.waterfall
                if (this.formFalls.isStopped === 1) {
                  this.fallIsUse = true
                } else {
                  this.fallIsUse = false
                }
                if (this.formFalls.isShow === 1) {
                  this.fallIsShow = true
                } else {
                  this.fallIsShow = false
                }
                if (this.formFalls.isLogin === 1) {
                  this.fallIsLogin = true
                } else {
                  this.fallIsLogin = false
                }
                if (this.formFalls.ratio.indexOf('X') !== -1) {
                  this.formFalls.width = this.formFalls.ratio.split('X')[0]
                  this.formFalls.height = this.formFalls.ratio.split('X')[1]
                }
              } else {
                this.$message('获取列表区信息失败')
              }
            }
          )
          .catch(err => {
            this.$message.error('获取列表区信息异常')
          })
      },
      // 图标区
      getIcon () {},
      saveIcon () {},
      addIcon () {
        let lastRank = this.iconDetails.length
        let addIconData = {
          'id': '',
          'mainId': '',
          'type': 0,
          'actionType': 0,
          'actionUrl': '',
          'downloadModel': 0,
          'beginDate': '',
          'endDate': '',
          'os': 0,
          'iconUrl': '',
          'rank': lastRank
        }
        this.iconDetails.splice(lastRank, 0, addIconData)
      },
      iconDel (id) {
        this.$ajax.post(`${baseUrl.newEnjoyUrl}/jjEnjoy/carousel/delete`, {id: id})
          .then((res) => {
            this.$message.success(res.data.msg)
            this.getIcon()
          })
          .catch(() => {
            this.$message.error('轮播图保存失败')
          })
      },
      iconDown (id, index) {
        let result = this.formIcon.carouselDetails
        if (index === result.length - 1) {
          this.$message('已经是最后一条啦!')
          return
        }
        for (let i = 0; i < result.length; i++) {
          if (result[i].id === id) {
            let thisResult = result[i]
            result.splice(i, 1)
            result.splice(i + 1, 0, thisResult)
          }
        }
      },
      iconTop (id, index) {
        if (index === 0) {
          this.$message('已经是第一条啦!')
          return
        }
        let result = this.formCarousel.carouselDetails
        for (let i = 0; i < result.length; i++) {
          if (result[i].id === id) {
            let thisResult = result[i]
            result.splice(i, 1)
            result.splice(i - 1, 0, thisResult)
          }
        }
      },
      iconMaxTop (id, index) {
        if (index === 0) {
          this.$message('已经是第一条啦!')
          return
        }
        let result = this.formCarousel.carouselDetails
        for (let i = 0; i < result.length; i++) {
          if (result[i].id === id) {
            let thisResult = result[i]
            result.splice(i, 1)
            result.splice(0, 0, thisResult)
          }
        }
      }
    }
  }

  // 全局当前高亮
  function getMenu (menuDivs, id) {
    let i = 0
    while (i < menuDivs.length) {
      if (Number(menuDivs[i].id) === id) {
        menuDivs[i].classList.add('active')
      } else {
        menuDivs[i].classList.remove('active')
      }
      i++
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
