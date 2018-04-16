<template>
  <div>
    <el-row :gutter="0">

      <el-col :span="8">

        <h2>城市选择</h2>
        <el-select v-model="searchForm.cityId"
                   disabled
                   placeholder="推送城市添加" style="width: 320px" @change="changeCity">
          <el-option
            v-for="(item,index) in areaRelation"
            :key="index"
            :label="item"
            :value="index">
          </el-option>
        </el-select>

        <h2>平台选择</h2>
        <el-radio-group v-model="searchForm.os" @change="changeOs">
          <el-radio :label="0">iOS</el-radio>
          <el-radio :label="1">Android</el-radio>
        </el-radio-group>

        <h2>展示效果</h2>
        <div class="view">
          <div class="viewInside">
            <!--侧边栏-->
            <div class="sidebar">
              <div class="top">
                <div class="touXiang">
                  <img src="../../assets/images/activity/touxiang.png" alt="">
                </div>
                <p>188****8888</p>
              </div>
              <div class="bottom">
                <ul v-show="menuList==null ? false:true" ref="menuUl">

                  <li v-for="(item,index) in menuList" :key="item.id"
                      @dblclick="dblClickMenu(item)"
                      @click="choiceMenu(index)">
                    <span class="isExpired">{{item.isExpired}}</span>
                    <i class="el-icon-edit" @click="editMenu(item.id)"
                       v-if="hasPermission('activity/dynamic/menu/view')"></i>
                    <img :src="item.iconUrl" alt="">
                    <span class="menuName">{{item.menuName}}</span>
                    <i class="btns" v-if="hasPermission('activity/dynamic/menu/edit')">
                      <span @click="deleteMenu(item.id)" v-if="item.actionTypeName === 'h5跳转'? true:false">
                        <i class="el-icon-delete"></i></span>
                      <span @click="upRank(index)"><i class="el-icon-caret-top"></i></span>
                      <span @click="downRank(index)"><i class="el-icon-caret-bottom"></i></span>
                    </i>

                  </li>

                </ul>
                <div class="newEdit"
                     @click="newMenu"
                     style="margin-bottom: 10px;margin-top: 30px"
                     v-if="hasPermission('activity/dynamic/menu/edit')"
                > + 点击新建菜单
                </div>
                <div class="newEdit"
                     @click="saveRank"
                     v-if="hasPermission('activity/dynamic/menu/edit')"
                >保存当前排序
                </div>
              </div>
            </div>
          </div>
        </div>

      </el-col>

      <el-col :span="14" :offset="1">
        <div class="releaseBtn" style="margin-top: 100px;cursor: pointer"
             v-if="hasPermission('activity/dynamic/menu/edit')"
             @click="isRelease">
          <el-button type="danger" round style="background-color: #DB5050">发布</el-button>
        </div>
        <div class="rightForm" v-if="isShowForm && hasPermission('activity/dynamic/menu/view')">
          <h2 v-text="form.id?'修改菜单':'新建菜单'"></h2>
          <el-row :gutter="0">
            <el-col :span="4">
              <el-upload
                class="avatar-uploader"
                action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
                :data="Token"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="iconUrl" :src="iconUrl" class="avatar">
                <i v-else class="el-icon-plus
                avatar-uploader-icon"></i>
              </el-upload>
              <span style="font-size: 12px;color: red">上传图标icon<br/>宽高比10*10</span>
            </el-col>

            <el-col :span="19" :offset="1">
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
                  <el-input v-model="form.menuName"></el-input>
                </el-form-item>

                <el-form-item label="跳转类型：">
                  {{form.actionTypeName === 'app原生跳转'? 'app原生跳转':'h5跳转'}}

                  <el-form-item label="地址" prop="actionUrl" id='actionUrl' v-if="form.actionTypeName === 'app原生跳转'? false : true" >
                    <el-input v-model="form.actionUrl"
                              style="margin-top: 10px"
                              placeholder="请输入跳转地址">
                    </el-input>
                  </el-form-item>
                </el-form-item>

                <div v-if="form.actionTypeName === 'app原生跳转'? false : true">

                  <el-form-item label="分享平台：">
                    <el-select v-model="form.sharePlatformList"
                               placeholder="请选择分享平台"
                               multiple>
                      <el-option label="微信好友" value="1"></el-option>
                      <el-option label="朋友圈" value="2"></el-option>
                      <el-option label="QQ" value="3"></el-option>
                      <el-option label="QQ空间" value="4"></el-option>
                      <el-option label="微博" value="5"></el-option>
                    </el-select>
                  </el-form-item>

                  <div v-if="form.sharePlatformList.length === 0 ? false : true">

                    <el-form-item label="分享标题：">
                      <el-input v-model="form.shareTitle"
                                placeholder="请输入分享标题">
                      </el-input>
                    </el-form-item>

                    <el-form-item label="分享内容：">
                      <el-input v-model="form.shareContent"
                                placeholder="请输入分享内容">
                      </el-input>
                    </el-form-item>


                    <el-form-item label="分享图标：">

                      <el-upload
                        class="avatar-uploader"
                        action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
                        :data="TokenShare"
                        :show-file-list="false"
                        :on-success="handleSharePicSuccess"
                        :before-upload="beforeSharePicUpload">
                        <img v-if="sharePic" :src="sharePic" class="avatar">
                        <i v-else class="el-icon-plus
                avatar-uploader-icon"></i>
                      </el-upload>

                      <el-input v-model="form.sharePic" v-if="0">

                      </el-input>
                    </el-form-item>

                    <el-form-item label="分享链接：">
                      <el-input v-model="form.shareUrlOrigin">
                      </el-input>
                    </el-form-item>
                  </div>

                </div>


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
                             @click="CreateMenu"
                             v-if="hasPermission('activity/dynamic/menu/edit')"
                  >立即创建
                  </el-button>
                  <el-button @click="clearMenu"
                             v-if="hasPermission('activity/dynamic/menu/edit')"
                  >重置
                  </el-button>
                  <el-button round style="background-color:#4F4D4D;color:#fff" @click="cancelCreate">取消</el-button>
                </el-form-item>

              </el-form>
            </el-col>
          </el-row>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  import baseUrl from '../../utils/baseUrl'
  import Tools from '../../../static/js/tools.js'
  import Moment from 'moment'
  import a from '../../assets/js/getsessionId.js'
  import Cookie from 'js-cookie'

  export default {
    name: 'message-inform',
    data () {
      // 时间范围判断
      let beginTimeRule = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择生效时间!'))
          return
        } else {
          callback()
        }
      }
      let endDateRule = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请选择失效时间!'))
          return
        } else {
          callback()
        }
      }
      return {
        rules: {
          menuName: [
            {required: true, message: '请写入菜单名称', trigger: 'blur'},
            {max: 6, message: '长度不大于 6 个字符', trigger: 'blur'}
          ],
          actionUrl: [
            {required: true, message: '请输入跳转地址', trigger: 'blur'}
          ],
          beginTime: [
            {required: true, validator: beginTimeRule, trigger: 'blur'}
          ],
          endDate: [
            {required: true, validator: endDateRule, trigger: 'blur'}
          ]
        }, // 正则校验规则
        areaRelation: {}, // 城市对应关系
        menuList: [], // 菜单列表
        searchForm: {
          cityId: '-1',
          os: 0
        }, // 查询列表字符串
        form: {
          needLogin: 1,
          actionType: 0,
          rank: '99',
          iconUrl: '',
          sharePic: '',
          sharePlatformList: []
        }, // 单个菜单详情
        iconUrl: '', // 图片上传的url
        sharePic: '', // 分享图标
        Token: {}, // oss秘钥
        TokenShare: {}, // oss秘钥 分享图标
        isShowForm: false, // 是否展现详情
        adminId: '',
        path: '',
        permissionList: []
      }
    },
    created () {
      // 请求按钮权限
      this.adminId = this.$route.query.adminId
      this.path = this.$route.path
      a.sessionId(this.adminId, this.path, this.$router, this.$ajax, this.permissionList)
      this.getCityRelation()
      this.searchMenu()
    },
    mounted () {
      this.$nextTick(() => {
        this.choiceMenu()
      })
    },
    methods: {
      // 获取城市对应关系
      getCityRelation () {
        this.$ajax.get(`${baseUrl.ActivityArea}/electric/userUtilsInterface/interface/getBikeAreaList`)
          .then(res => {
            if (res.data.code === 0) {
              // console.log(res.data.bikeAreaList)
              let bikeAreaList = res.data.bikeAreaList
              bikeAreaList.unshift({id: '-1', name: '全国'})
              this.areaRelation = Tools.nameRelation(bikeAreaList, 'id', 'name')
              // console.log(this.areaRelation)
            }
          })
          .catch(err => {
            // console.log('getCityRelation报错')
            console.error(err)
          })
      },
      // 根据条件查询动态菜单列表
      searchMenu () {
        this.$ajax.get(`${baseUrl.DynamicMenu}/getAll`, {params: this.searchForm})
          .then(res => {
            // console.log(res.data)
            if (res.data.code === 0) {
              // console.log(res.data.data)
              let menuList = res.data.data
              console.log(menuList)
              for (let i = 0; i < menuList.length; i++) {
                // 未开始
                if (+new Date(menuList[i].beginTime) > +new Date()) {
                  menuList[i].isExpired = '待生效'
                }
                // 已过期
                if (+new Date(menuList[i].endDate) < +new Date()) {
                  menuList[i].isExpired = '已过期'
                }
                // 生效中
                if (+new Date(menuList[i].endDate) > +new Date() && +new Date(menuList[i].beginTime) < +new Date()) {
                  menuList[i].isExpired = '生效中'
                }
                // 可双击
                if (menuList[i].systemMenuKey !== 'JJH5') {
                  menuList[i].actionTypeName = 'app原生跳转'
                  menuList[i].isDblClick = 1
                } else {
                  // 不可双击h5
                  menuList[i].actionTypeName = 'h5跳转'
                  menuList[i].isDblClick = 0
                }
              }
              this.menuList = menuList
              // console.log(this.menuList)
            } else {
              this.menuList = null
            }
            this.cancelCreate()
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 新建 修改菜单
      CreateMenu () {
        if (!this.form.iconUrl) {
          this.$message.error('请上传头像图片!')
          return
        }
        this.form.cityId = this.searchForm.cityId
        this.form.os = this.searchForm.os
        if (!this.form.beginTime) {
          this.$message.error('请选择生效时间!')
          return
        }
        if (!this.form.endDate) {
          this.$message.error('请选择失效时间!')
          return
        }
        this.form.beginTime = Moment(this.form.beginTime).format('YYYY-MM-DD HH:mm:ss')
        this.form.endDate = Moment(this.form.endDate).format('YYYY-MM-DD HH:mm:ss')
        if (+new Date(this.form.beginTime) >= +new Date(this.form.endDate)) {
          this.$message.error('失效时间必须大于生效时间!')
          return
        }
        if (this.form.actionTypeName === 'app原生跳转') {
          // 原生跳转类型
          this.form.actionType = 0
        } else {
          // h5跳转类型
          this.form.actionType = 1
          // 分享相关 只有h5才有
          this.form.sharePlatform = this.form.sharePlatformList.join(',')
          if (this.form.sharePlatform) {
            console.log('勾选分享平台')
            this.form.shareUrl = this.form.shareUrlOrigin
            // 勾选分享平台 其他的分享相关必须填
            if (!this.form.shareTitle) {
              this.$message.error('请选择分享标题!')
              return
            }
            if (!this.form.shareContent) {
              this.$message.error('请选择分享内容!')
              return
            }
            if (!this.form.sharePic) {
              this.$message.error('请上传分享图标!')
              return
            }
            if (!this.form.shareUrl) {
              this.$message.error('请选择分享链接!')
              return
            }
          } else {
            console.log('未勾选分享平台')
            // 未勾选分享平台 其他的分享相关不需填
            this.form.shareUrl = this.form.actionUrl
          }
        }
        // 操作人员放入表单中
        this.form.updateBy = this.getUserId()
        // 必须登录
        this.form.needLogin = 1
        console.log(this.form)
        this.$refs.formData.validate((valid) => {
          if (valid) {
            // console.log('submit!')
            this.$ajax.post(`${baseUrl.DynamicMenu}/upDataMenu`, this.form)
              .then(res => {
                console.log(res.data)
                if (res.data.code === 0) {
                  // 新建成功
                  this.searchMenu()
                }
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            // console.log('error submit!!')
            return false
          }
        })
      },
      // 当前行高亮
      choiceMenu (index) {
        if (isNaN(index)) {
          return
        }
        let lis = this.$refs.menuUl.childNodes
        console.log(lis)
        for (let i = 0; i < lis.length; i++) {
          // console.log(lis[i])
          lis[i].classList.remove('active')
        }
        lis[index].classList.add('active')
      },
      // 编辑当前菜单 获取详情
      editMenu (id) {
        // console.log(id)
        this.$ajax.get(`${baseUrl.DynamicMenu}/getMessage`, {params: {id: id}})
          .then(res => {
            // console.log(res.data.data)
            if (res.data.code === 0) {
              let form = res.data.data
              form.actionType = res.data.data.actionType
              if (form.sharePlatform) {
                form.sharePlatformList = res.data.data.sharePlatform.split(',')
                form.shareUrlOrigin = res.data.data.shareUrl
              } else {
                form.sharePlatformList = []
              }
              if (form.actionType === 0) {
                form.actionTypeName = 'app原生跳转'
              } else {
                form.actionTypeName = 'h5跳转'
              }
              console.log(form)
              this.form = form
              this.iconUrl = this.form.iconUrl
              this.sharePic = this.form.sharePic
              this.isShowForm = true
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 删除当前菜单
      deleteMenu (id) {
        console.log(id)
        this.$confirm('此操作将删除此行菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送请求
          this.$ajax.post(`${baseUrl.DynamicMenu}/deleteMenu`, {
            id: id,
            updateBy: this.getUserId()
          })
            .then(res => {
              // console.log(res)
              if (res.data.code === 0) {
                this.searchMenu()
                this.$message({
                  type: 'success',
                  message: '删除菜单成功!'
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
        this.cancelCreate()
      },
      // 双击当前行 隐藏菜单
      dblClickMenu (data) {
        console.log(data.id)
        // console.log('双击')
        // 如果不是原生的 直接返回
        if (data.isDblClick === 0) {
          return
        }
        if (data.isShow === 1) {
          this.$confirm('是否隐藏此行菜单, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 发送请求 隐藏此行菜单
            this.$ajax.get(`${baseUrl.DynamicMenu}/isshow`, {
              params: {
                id: data.id,
                isShow: 0, // 隐藏
                updateBy: this.getUserId()
              }
            })
              .then(res => {
                // console.log(res)
                if (res.data.code === 0) {
                  this.searchMenu()
                  this.$message({
                    type: 'success',
                    message: '隐藏此行菜单成功!'
                  })
                }
              })
              .catch(err => {
                console.log(err)
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消关闭此行菜单!'
            })
          })
        } else {
          this.$confirm('是否显示此行菜单, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 发送请求 隐藏此行菜单
            this.$ajax.get(`${baseUrl.DynamicMenu}/isshow`, {
              params: {
                id: data.id,
                isShow: 1, // 显示
                updateBy: this.getUserId()
              }
            })
              .then(res => {
                // console.log(res)
                if (res.data.code === 0) {
                  this.searchMenu()
                  this.$message({
                    type: 'success',
                    message: '显示此行菜单成功!'
                  })
                }
              })
              .catch(err => {
                console.log(err)
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消显示此行菜单!'
            })
          })
        }
        this.cancelCreate()
      },
      // 正式发布菜单
      isRelease () {
        // console.log('isRelease')
        this.$confirm('此操作将正式发布菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // 发送正式发布请求
            this.$ajax.get(`${baseUrl.DynamicMenu}/release`, {params: {updateBy: this.getUserId()}})
              .then(res => {
                console.log(res)
                if (res.data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: '正式发布菜单成功!'
                  })
                  this.searchMenu()
                }
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消发布菜单!'
            })
          })
      },
      // 升序
      upRank (index) {
        if (index === 0) {
          // 这已经是第一条啦
          this.$message({
            message: '这已经是第一条菜单啦!',
            type: 'warning'
          })
          return
        }
        let thisMenu = this.menuList[index]
        this.menuList.splice(index, 1)
        this.menuList.splice(index - 1, 0, thisMenu)
      },
      // 降序
      downRank (index) {
        if (index === this.menuList.length - 1) {
          // 最后一条
          this.$message({
            message: '这已经是最后一条菜单啦!',
            type: 'warning'
          })
          return
        }
        let thisMenu = this.menuList[index]
        this.menuList.splice(index, 1)
        this.menuList.splice(index + 1, 0, thisMenu)
      },
      // 保存排序
      saveRank () {
        this.$confirm('此操作将保存最新排序, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // 发送请求
            let list = this.menuList
            // console.log(list)
            // console.log(list.length)
            let rankList = []
            for (var i = 0; i < list.length; i++) {
              rankList.push(list[i].id)
              // console.log(rankList)
            }
            // console.log(rankList)
            // console.log('遍历结束')
            let ranks = rankList.join(',')
            // console.log(ranks)
            this.$ajax.get(`${baseUrl.DynamicMenu}/upDataRank`, {
              params:
                {
                  ranks: ranks,
                  updateBy: this.getUserId()
                }
            })
              .then(res => {
                console.log(res)
                if (res.data.code === 0) {
                  this.searchMenu()
                  this.$message({
                    type: 'success',
                    message: '保存最新排序成功!'
                  })
                }
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消发布菜单!'
            })
          })
      },
      // 更换城市时 查询菜单列表
      changeCity (val) {
        // console.log(val)
        this.searchMenu()
      },
      // 更换平台时 查询菜单列表
      changeOs (val) {
        // console.log(val)
        this.searchMenu()
      },
      // 点击新建按钮 出现右边详情空表单
      newMenu () {
        this.form = {
          needLogin: 1,
          actionType: 0,
          rank: '99',
          sharePlatformList: []
        }
        this.iconUrl = ''
        this.sharePic = ''
        this.isShowForm = true
      },
      // 点击取消按钮 隐藏右边详情 清空表单
      cancelCreate () {
        this.form = {
          needLogin: 1,
          actionType: 0,
          rank: '99',
          sharePlatformList: []
        }
        this.iconUrl = ''
        this.sharePic = ''
        this.isShowForm = false
      },
      // 重置
      clearMenu () {
        this.cancelCreate()
        this.isShowForm = true
      },
      // 获取操作人员
      getUserId () {
        console.log(`操作人员:${Cookie.get('adminId')}`)
        return Cookie.get('adminId')
      },
      // 获取oss秘钥
      beforeAvatarUpload (file) {
        const isLt2M = file.size / 1024 < 200
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 200KB!')
          return
        }
        // console.log(file)
        // let _this = this
        // let reader = new FileReader()
        // reader.onload = function () {
        //   let image = new Image()
        //   reader.readAsDataURL(file)
        //   image.onload = function () {
        //     console.log(this)
        //     let width = this.width
        //     let height = this.height
        //     console.log(width)
        //     if (width > 20 || width < 10) {
        //       _this.$message('图片尺寸必须在10~20之间！', '提示', {confirmButtonText: '确定'})
        //       return
        //     }
        //     if (height > 20 || height < 10) {
        //       _this.$message('图片尺寸必须在10~20之间！', '提示', {confirmButtonText: '确定'})
        //       return
        //     }
        //   }
        // }
        return new Promise((resolve) => {
          this.$ajax.get(`${baseUrl.mainUrl}/electric/ossutil/interface/policy`, {params: {user_dir: 'DynamicMenu'}})
            .then((res) => {
                this.Token = res.data
                this.Token.key = this.Token.dir + '/' + (+new Date()) + file.name
                this.Token.OSSAccessKeyId = this.Token.accessid
                // oss上图片的路径 在表单体提交之前拼接
                this.form.iconUrl = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
                resolve()
              }
            )
            .catch(err => {
              console.log(err)
            })
        })
      },
      // 上传图片成功后 获取图片地址
      handleAvatarSuccess () {
        // oss上图片的路径 在表单提交之前拼接
        this.iconUrl = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
      },
      // 获取oss秘钥 分享图标
      beforeSharePicUpload (file) {
        const isLt2M = file.size / 1024 < 200
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 200KB!')
          return
        }
        return new Promise((resolve) => {
          this.$ajax.get(`${baseUrl.mainUrl}/electric/ossutil/interface/policy`, {params: {user_dir: 'DynamicMenu'}})
            .then((res) => {
                this.TokenShare = res.data
                this.TokenShare.key = this.TokenShare.dir + '/' + (+new Date()) + file.name
                this.TokenShare.OSSAccessKeyId = this.TokenShare.accessid
                // oss上图片的路径 在表单体提交之前拼接
                this.form.sharePic = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.TokenShare.key
                resolve()
              }
            )
            .catch(err => {
              console.log(err)
            })
        })
      },
      // 上传图片成功后 获取分享图片地址
      handleSharePicSuccess () {
        // oss上图片的路径 在表单提交之前拼接
        this.sharePic = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.TokenShare.key
      },
      hasPermission (data) {
        if (this.permissionList && this.permissionList.length && this.permissionList.includes(data)) {
          return true
        }
        return false
      }
    },
    watch: {
      menuList: function () {
        this.$nextTick(() => {
          let lis = this.$refs.menuUl.childNodes
          // console.log(lis)
          for (let i = 0; i < this.menuList.length; i++) {
            // 小标签的背景颜色
            if (this.menuList[i].isExpired === '生效中') {
              lis[i].firstChild.style.backgroundColor = '#009933'
            } else if (this.menuList[i].isExpired === '待生效') {
              lis[i].firstChild.style.backgroundColor = '#f90'
            } else if (this.menuList[i].isExpired === '已过期') {
              // console.log(lis[i].firstChild)
              lis[i].firstChild.style.backgroundColor = '#ff3333'
            }
            // 停用和使用的背景颜色
            if (this.menuList[i].isShow === 0) {
              lis[i].style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
            } else {
              lis[i].style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import '../../assets/css/dynamic.css';
  .view {
    border: 1px solid rgba(0, 0, 0, 0.06);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 35px;
    width: 375px;
    height: 669px;
    -webkit-border-radius: 45px;
    -moz-border-radius: 45px;
    border-radius: 45px;
    -webkit-box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.02), 0 0 32px 0 rgba(0, 0, 0, 0.07) inset;
    -moz-box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.02), 0 0 32px 0 rgba(0, 0, 0, 0.07) inset;
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.02), 0 0 32px 0 rgba(0, 0, 0, 0.07) inset;
  }

  .view .viewInside {
    width: 100%;
    height: 100%;
    -webkit-box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.02);
    -moz-box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.02);
    box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.02);
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    /*overflow: hidden;*/
  }

  .view .sidebar {
    width: 80%;
    height: 100%;
    -webkit-box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.02);
    -moz-box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.02);
    box-shadow: 0 0 8px 3px rgba(0, 0, 0, 0.02);
  }

  .view .top {
    height: 180px;
    background-color: rgba(0, 0, 0, 0.07);
    margin-bottom: 20px;
  }

  .view .top .touXiang {
    text-align: center;
  }

  .view .top img {
    margin-top: 40px;
    width: 60px;
    height: 65px;
  }

  .view .top p {
    color: #fff;
    text-align: center;
  }

  .view .bottom {
    height: 65%;
    overflow: auto;
  }

  .view .bottom ul {
    padding: 0;
    list-style: none;
  }

  .view .bottom li {
    position: relative;
    height: 40px;
    padding-left: 20px;
    background-color: rgba(0, 0, 0, 0.2);
    margin-bottom: 7px;
    cursor: pointer;
  }

  .view .bottom li .isExpired {
    z-index: 9;
    font-size: 8px;
    color: #fff;
    position: absolute;
    padding: 2px;
    top: -4px;
    left: -2px;
    -webkit-transform: rotate(-20deg);
    -moz-transform: rotate(-20deg);
    -o-transform: rotate(-20deg);
    -ms-transform: rotate(-20deg);
    transform: rotate(-20deg);
  }

  .view .bottom li.active {
    background-color: rgba(219, 80, 80, 1) !important;
  }

  .view .bottom li > i {
    line-height: 40px;
    color: #fff;
  }

  .view .bottom li img {
    width: 12px;
    height: 12px;
    background-color: #000;
  }

  .bottom li .menuName {
    font-size: 12px;
    line-height: 40px;
  }

  .btns {
    display: inline-block;
    height: 40px;
    float: right;
    margin-right: 5px;
  }

  .btns span {
    display: inline-block;
    width: 26px;
    height: 26px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.4);
    line-height: 26px;
    text-align: center;
    color: #fff;
  }

  .view .bottom .newEdit {
    height: 40px;
    line-height: 40px;
    background-color: rgba(0, 0, 0, 0.4);
    margin-bottom: 50px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }

  .rightForm {
    margin-top: 250px;
    padding: 20px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    -webkit-box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
  }

  .rightForm h2 {
    margin: 0;
  }

  .releaseBtn {
    float: right;
    width: 220px;
    height: 80px;
    line-height: 80px;
    -webkit-box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
    text-align: center;
  }

  .releaseBtn button {
    width: 180px;
    height: 50px;
    line-height: 21px;
    text-align: center;
    background-color: #4F4D4D;
    color: #fff;
    font-size: 16px;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 50px;
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
