<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!--菜单列表-->
      <el-tab-pane label="菜单列表" name="first">
        <div>
          <tree-grid
            :defaultExpandAll="false"
            :columns="columns"
            :tree-structure="true"
            :data-source="dataSource">
          </tree-grid>
        </div>

      </el-tab-pane>

      <!--菜单添加 -->
      <el-tab-pane :label="titleSecond" name="second" class="second">

        <el-form ref="menuForm" :rules="rules" :model="form" label-width="150px">
          <el-form-item>
            <el-input v-model="form.id" v-if=false></el-input>
          </el-form-item>

          <el-form-item label="上级菜单：">
            <el-input
              :disabled=true
              :on-icon-click="searchMenu"
              icon="search"
              v-model="form.menuName">
            </el-input>
          </el-form-item>

          <el-form-item label="名称：" prop="label">
            <el-input v-model="form.label"></el-input>
          </el-form-item>

          <el-form-item label="链接：">
            <el-input v-model="form.path"></el-input>
            <span>点击菜单跳转的页面</span>
          </el-form-item>

          <el-form-item label="目标：">
            <el-input v-model="form.target" placeholder="输入目标窗口"></el-input>
            <span>链接地址打开的目标窗口</span>
          </el-form-item>

          <!--<el-form-item label="图标：">-->
          <!--<el-input v-model="form.icon" v-show='true'></el-input>-->
          <!--<img width="100%" :src="form.icon" alt="图标">-->
          <!--<el-upload-->
          <!--ref="uploadFile"-->
          <!--list-type="picture-card"-->
          <!--action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'-->
          <!--:data="Token"-->
          <!--:on-remove="removeImgPath"-->
          <!--:on-success="successImgPath"-->
          <!--:before-upload="beforeUploadImgPath">-->
          <!--<el-button type="primary" @click="clearUploadedImgPath">上传图片-->
          <!--<i class="el-icon-upload el-icon&#45;&#45;right"></i>-->
          <!--</el-button>-->
          <!--</el-upload>-->
          <!--</el-form-item>-->

          <el-form-item label="排序：" prop="sort">
            <el-input v-model.number="form.sort"></el-input>
            <span>排列顺序，升序</span>
          </el-form-item>

          <el-form-item label="可见：" prop="isShow">
            <el-radio class="radio" v-model="form.isShow" label="1">显示</el-radio>
            <el-radio class="radio" v-model="form.isShow" label="0">隐藏</el-radio>
            <span>该菜单或操作是否显示到系统菜单中</span>
          </el-form-item>

          <el-form-item label="菜单属性：" prop="type">
            <el-radio class="radio" v-model="form.type" label=0>空菜单</el-radio>
            <el-radio class="radio" v-model="form.type" label=1>页面</el-radio>
            <el-radio class="radio" v-model="form.type" label=2>按钮</el-radio>
          </el-form-item>

          <!--<el-form-item label="菜单属性：" prop="type">-->
          <!--<el-select v-model="form.type" clearable class="width">-->
          <!--<el-option label="空菜单" value=0></el-option>-->
          <!--<el-option label="页面" value="1"></el-option>-->
          <!--<el-option label="按钮" value="2"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->

          <el-form-item label="权限标识：">
            <el-input v-model="form.permission"></el-input>
            <span>控制器中定义的权限标识，如：electric:bicycleinfo:tBicycleInfo:view</span>
          </el-form-item>

          <el-form-item label="备注：">
            <el-input v-model="form.remarks" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveData('form')">保存</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>

    </el-tabs>
    <div class="wrapperTree">
      <!--模态框-->
      <el-dialog title="上次菜单" size="tiny" :visible.sync="cityVisible" center>
        关键字：<input ref='keySearch' type='text' class='keySearch' v-model="filterText">
        <el-tree
          ref="tree"
          highlight-current
          :data="select"
          :props="defaultProps"
          class="searchTree"
          accordion
          :filter-node-method="filterNode"
          @node-click="handleNode">
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="modifyCancel">取 消</el-button>
          <el-button type="primary" @click="doModify">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import TreeGrid from '../../../components/commons/Ztree/TreeGrid.vue'
  //  import arr2tree from '../../../utils/arr2tree.js'
  import bus from '@/assets/js/eventBus.js'
  import Cookie from 'js-cookie'

  export default {
    data () {
      return {
        value1: '',
        activeName2: 'first',
        title: '',
        filterText: '',
        filterId: '',
        cityVisible: false,
        saveUp: true,
        titleSecond: '菜单添加',
        select: [],
        Token: {},
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        form: {},
        tableData: [],
        rules: {
          label: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
          sort: [
            {required: true, message: '请输入序号'},
            {type: 'number', message: '必须为数字值'}
          ],
          isShow: [
            {required: true, message: '是否展示', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请输入菜单类型', trigger: 'blur'}
          ]
        },
        columns: [
          {
            text: '名称',
            dataIndex: 'label'
          },
          {
            text: '链接',
            dataIndex: 'path'
          },
          {
            text: '排序',
            dataIndex: 'sort'
          },
          {
            text: '可见',
            dataIndex: 'show'
          },
          {
            text: '权限标识',
            dataIndex: 'permission'
          }
        ], // 树表格
        dataSource: [] // 树表格
      }
    },
    created () {
      this.query()
    },
    mounted () {
      // 编辑
      bus.$on('updateBtn', (id) => {
        this.modifyRecord(id)
      })
      // 删除
      bus.$on('delBtn', (id) => {
        this.deleteRecord(id)
      })
      // 添加下一级
      bus.$on('addBtn', (parentId, menuName, id) => {
        this.addNextRecord(parentId, menuName, id)
      })
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
    },
    methods: {
      handleClick (tab, event) {
        if (this.activeName2 === 'first') {
          this.titleSecond = '菜单添加'
        }
        if (tab.label === '添加下一级') {
          this.addNextRecord()
          this.companySearch()
        }
        if (tab.label === '菜单添加') {
          this.addRecord()
          this.companySearch()
        }
      },
      handleNodeClick () {},
      query () {
        // 请求栏目列表
        this.$ajax.get('/setting/menu/list', {params: {sessionId: Cookie.get('sessionId')}})
          .then(res => {
            if (res.data.code === 200) {
              // 递归循环 显示隐藏
              isShow(res.data.data)
              this.dataSource = res.data.data
            } else {
              this.$message({
                type: 'error',
                message: '获取列表失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取列表异常'
            })
          })
      }, // 树表格
      deleteRecord (id) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          if (id !== undefined) {
            // 调用后台服务
            // 删除元素
            this.$ajax.get('setting/menu/delete', {params: {'id': id}})
              .then((res) => {
                if (res.data.code === 200) {
                  // 删除成功
                  this.$message({
                    type: 'success',
                    message: res.data.msg
                  })
                  this.query()
                } else {
                  this.$message({
                    type: 'error',
                    message: '删除失败'
                  })
                }
              })
              .catch(() => {
                this.$message({
                  type: 'error',
                  message: '删除异常'
                })
              })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        })
      },
      modifyRecord (id) {
        console.log(22, this.$refs['menuForm'])
        if (this.$refs['menuForm'] !== undefined) {
          this.$refs['menuForm'].resetFields()
        }
        this.activeName2 = 'second'
        this.titleSecond = '菜单修改'
        this.$ajax.get('/setting/menu/form', {params: {id: id, sessionId: Cookie.get('sessionId')}})
          .then((res) => {
            if (res.data.code === 200) {
              this.form = res.data.data
              this.form.type = this.form.type.toString()
            } else {
              this.$message({
                type: 'error',
                message: '获取失败'
              })
            }
          })
          .catch((error) => {
            console.log('点击修改报错:', error)
            this.$message({
              type: 'error',
              message: '获取异常'
            })
          })
      }, // 修改
      addNextRecord (parentId, menuName, id) {
        this.$refs['menuForm'].resetFields()
        this.form = {}
        this.activeName2 = 'second'
        this.titleSecond = '添加下一级'
        this.form.menuName = menuName
        this.form.parentId = id
      }, // 添加
      addRecord () {
        this.$refs['menuForm'].resetFields()
        this.form = {}
        this.activeName2 = 'second'
        this.titleSecond = '菜单添加'
      },
      saveData () {       // 修改确定功能
        console.log(typeof (this.form.sort))
        this.$refs['menuForm'].validate((valid) => {
          if (valid) {
            let url = ''
            if (this.form.id !== undefined && this.form.id !== '') {  // 修改
              url = '/setting/menu/update'
            } else {  // 新增
              url = '/setting/menu/add'
            }
            this.form.type = parseInt(this.form.type)
            this.$ajax.get(url, {params: this.form})
              .then((response) => {
                if (response.data.code === 200) {
                  // 更新成功
                  this.$message({
                    type: 'success',
                    message: '操作成功'
                  })
                  this.activeName2 = 'first'
                  this.query()
                } else {
                  this.$message({
                    type: 'error',
                    message: '操作失败'
                  })
                }
              })
              .catch((err) => {
                this.$message({
                  type: 'error',
                  message: err
                })
              })
          } else {
            return false
          }
        })
      },
      back () {
        this.activeName2 = 'first'
        this.titleSecond = '用户添加'
      },
      searchMenu () {
        this.cityVisible = true
        this.defaultProps.label = 'label'
        this.filterText = ''
      },
      companySearch () { // 上级菜单列表
        this.$ajax.get('/setting/menu/section', {params: {sessionId: Cookie.get('sessionId')}})
          .then(response => {
            if (response.data.code === 200) {
              this.select = response.data.data
            } else {
              this.$message({
                type: 'error',
                message: '获取菜单列表失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取菜单列表异常'
            })
          })
      },
      doModify () {
        this.form.menuName = this.filterText
        this.form.parentId = this.filterId
        this.cityVisible = false
      },
      modifyCancel () {
        this.cityVisible = false
        this.form.menuName = ''
        this.form.parentId = ''
      },
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      handleNode (data) {
        this.filterText = data.label // 弹框树模型点击输入值
        this.filterId = data.id
      }
//      // 上传之前 清除原有图片
//      clearUploadedImgPath () {
//        // 如果有就清除
//        if (this.form.imgPath) {
//          this.$refs.uploadFile.clearFiles()
//        }
//        this.form.imgPath = ''
//      },
//      // 移除图片时清空form表单中的图片地址
//      removeImgPath () {
//        this.form.imgPath = ''
//      },
//      // 上传组件获取oss相关
//      beforeUploadImgPath (file) {
//        return new Promise((resolve) => {
//          this.$ajax.get('beforeUpload/img', {params: {user_dir: 'settingMenu'}})
//            .then((res) => {
//              this.Token = res.data
//              this.Token.key = this.Token.dir + '/' + (+new Date()) + '_' + file.name
//              resolve()
//            })
//            .catch(err => {
//              this.$message({
//                message: err.data.msg,
//                type: 'error'
//              })
//            })
//        })
//      },
//      successImgPath (response, file, fileList) {
//        this.form.imgPath = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
//      }
    },
    components: {
      TreeGrid
    }  // 树表格
  }

  function isShow (result) {
    for (let i = 0; i < result.length; i++) {
      let item = result[i]
      if (item.children !== undefined && item.children.length > 0) {
        isShow(item.children)
      }
      if (item.isShow === '1') {
        item.show = '显示'
      } else if (item.isShow === '0') {
        item.show = '隐藏'
      }
    }
  }

</script>

<style scoped>
  @import '../../../assets/css/treecss.css';

  .keySearch {
    width: 140px;
    height: 20px;
    outline-style: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  .second .textarea, .second .el-input, .second .el-input__inner, .width {
    width: 300px;
  }

  span {
    color: #888;
  }

  img {
    width: 148px;
    height: 148px;
  }

</style>
