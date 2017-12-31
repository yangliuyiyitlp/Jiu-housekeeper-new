<template>
  <div class="right" ref="right">
    <el-row>

      <el-col :span="3" class="search_bar" ref="search_bar">
        <el-tree
          highlight-current
          :data="select_section"
          :props="defaultProps"
          @node-click="handleNodeClick"
          accordion
          default-expand-all>
        </el-tree>
      </el-col>
      <el-col :span="21">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <!--菜单列表-->
          <el-tab-pane label="机构列表" name="first">
            <div>
              <tree-grid
                :defaultExpandAll="true"
                :columns="columns"
                :tree-structure="true"
                :data-source="dataSource">
              </tree-grid>
            </div>

          </el-tab-pane>

          <!--机构添加 -->
          <el-tab-pane :label="titleSecond" name="second" class="second">

            <el-form ref="menuForm" :rules="rules" :model="form" label-width="150px">
              <el-form-item>
                <el-input v-model="form.id" v-if=false></el-input>
              </el-form-item>

              <el-form-item label="上级机构：">
                <el-input
                  :disabled=true
                  :on-icon-click="searchMechanism"
                  icon="search"
                  v-model="form.menuName">
                </el-input>
              </el-form-item>
              <el-form-item label="归属区域：">
                <el-input
                  :disabled=true
                  :on-icon-click="searchArea"
                  icon="search"
                  v-model="form.menuArea">
                </el-input>
              </el-form-item>
              <el-form-item label="机构名称：" prop="label">
                <el-input v-model="form.label"></el-input>
              </el-form-item>

              <el-form-item label="机构编码：">
                <el-input v-model="form.path"></el-input>
              </el-form-item>

              <el-form-item label="机构类型：" prop="loginFlag">
                <el-select v-model="form.loginFlag" clearable class="width">
                  <el-option label="公司" value="1"></el-option>
                  <el-option label="部门" value="0"></el-option>
                  <el-option label="小组" value="0"></el-option>
                  <el-option label="其他" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="机构级别：" prop="loginFlag">
                <el-select v-model="form.loginFlag" clearable class="width">
                  <el-option label="一级" value="1"></el-option>
                  <el-option label="二级" value="0"></el-option>
                  <el-option label="三级" value="0"></el-option>
                  <el-option label="四级" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否可用：" prop="loginFlag">
                <el-select v-model="form.loginFlag" clearable class="width">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="主负责人：">
                <el-input
                  :disabled=true
                  :on-icon-click="mainLeader"
                  icon="search"
                  v-model="form.menuMain">
                </el-input>
              </el-form-item>
              <el-form-item label="副负责人：">
                <el-input
                  :disabled=true
                  :on-icon-click="secondLeader"
                  icon="search"
                  v-model="form.menuSecond">
                </el-input>
              </el-form-item>
              <el-form-item label="联系地址：">
                <el-input v-model="form.target"></el-input>
              </el-form-item>
              <el-form-item label="邮政编码：">
                <el-input v-model="form.target"></el-input>
              </el-form-item>
              <el-form-item label="负责人：">
                <el-input v-model="form.target"></el-input>
              </el-form-item>
              <el-form-item label="电话：">
                <el-input v-model="form.target"></el-input>
              </el-form-item>
              <el-form-item label="传真：">
                <el-input v-model="form.target"></el-input>
              </el-form-item>
              <el-form-item label="邮箱：">
                <el-input v-model="form.target"></el-input>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input v-model="form.remarks" type="textarea" class='textarea'></el-input>
              </el-form-item>

              <el-form-item label="快递添加下级部门：" prop="roleId">
                <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="role in roles" :label="role" :key="role">{{role}}
                  </el-checkbox>
                </el-checkbox-group>
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
          <el-dialog :title="title" size="tiny" :visible.sync="cityVisible" center>
            关键字：<input ref='keySearch' type='text' class='keySearch' v-model="filterText">
            <el-tree
              ref="tree"
              highlight-current
              :data="secondSection"
              :props="secondProps"
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
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import TreeGrid from '../../../components/commons/Ztree/TreeGrid.vue'
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
        titleSecond: '机构添加',
        select_section: [],
        secondSection: [],
        checkedRoles: [],
        roles: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        secondProps: {
          children: 'children',
          label: 'name'
        },
        formInline: {},
        form: {},
        rules: {
          label: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ]
        },
        columns: [
          {
            text: '机构名称',
            dataIndex: 'name'
          },
          {
            text: '归属区域',
            dataIndex: 'grade'
          },
          {
            text: '机构编码',
            dataIndex: 'code'
          },
          {
            text: '机构类型',
            dataIndex: 'type'
          },
          {
            text: '备注',
            dataIndex: 'remarks'
          }
        ], // 树表格
        dataSource: [] // 树表格
      }
    },
    created () {
      this.query()
      this.searchOrganization()
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
          this.titleSecond = '机构添加'
        }
        if (tab.label === '添加下级机构') {
          this.addNextRecord()
        }
        if (tab.label === '机构添加') {
          this.addRecord()
        }
      },
      handleNodeClick (data) {
        this.formInline.officeId = data.id
        this.query()
      },
      searchOrganization () {
        this.$ajax.get('/setting/user/section', {params: {sessionId: Cookie.get('sessionId')}})
          .then(response => {
            if (response.data.code === 200) {
              this.select_section = response.data.data
            } else {
              this.$message({
                type: 'error',
                message: '获取机构列表失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取机构列表异常'
            })
          })
      },
      query () {
        // 请求机构列表
        this.$ajax.get('/setting/user/section', {
          params: {
            sessionId: Cookie.get('sessionId'),
            officeId: this.formInline.officeId
          }
        })
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
        if (this.$refs['menuForm'] !== undefined) {
          this.$refs['menuForm'].resetFields()
        }
        this.activeName2 = 'second'
        this.titleSecond = '机构修改'
        this.$ajax.get('/setting/menu/form', {params: {id: id, sessionId: Cookie.get('sessionId')}})
          .then((res) => {
            if (res.data.code === 200) {
              this.form = res.data.data
//              this.form.type = this.form.type.toString()
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
        if (this.$refs['menuForm'] !== undefined) {
          this.$refs['menuForm'].resetFields()
        }
        this.form = {}
        this.activeName2 = 'second'
        this.titleSecond = '添加下级机构'
        this.form.menuName = menuName
        this.form.parentId = id
      }, // 添加
      handleCheckedCitiesChange () {},
      addRecord () {
        this.$refs['menuForm'].resetFields()
        this.form = {}
        this.activeName2 = 'second'
        this.titleSecond = '机构添加'
      },
      saveData () {       // 修改确定功能
        this.$refs['menuForm'].validate((valid) => {
          if (valid) {
            let url = ''
            if (this.form.id !== undefined && this.form.id !== '') {  // 修改
              url = '/setting/menu/update'
            } else {  // 新增
              url = '/setting/menu/add'
            }
//            this.form.type = parseInt(this.form.type)
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
        this.titleSecond = '机构添加'
      },
      searchMechanism () { // 上级机构
        this.cityVisible = true
        this.filterText = ''
        this.title = '机构选择'
        this.secondSection = this.select_section
      },
      searchArea () {  // 归属区域
        this.$ajax.get('/setting/menu/section', {params: {sessionId: Cookie.get('sessionId')}})
          .then(response => {
            if (response.data.code === 200) {
              this.cityVisible = true
              this.filterText = ''
              this.title = '区域选择'
              this.secondSection = response.data.data
            } else {
              this.$message({
                type: 'error',
                message: '获取区域列表失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取区域列表异常'
            })
          })
      },
      mainLeader () {
        this.cityVisible = true
        this.filterText = ''
        this.title = '主负责人'
        this.secondSection = this.select_section
      },
      secondLeader () {
        this.cityVisible = true
        this.filterText = ''
        this.title = '副负责人'
        this.secondSection = this.select_section
      },
      doModify () {
        if (this.title === '机构选择') {
          this.form.menuName = this.filterText
          this.form.Id = this.filterId
        } else if (this.title === '区域选择') {
          this.form.menuArea = this.filterText
          this.form.Id = this.filterId
        } else if (this.title === '主负责人') {
          this.form.menuMain = this.filterText
          this.form.Id = this.filterId
        } else if (this.title === '副负责人') {
          this.form.menuSecond = this.filterText
          this.form.Id = this.filterId
        }
        this.cityVisible = false
      },
      modifyCancel () {
        if (this.title === '机构选择') {
          this.form.menuName = ''
          this.form.Id = ''
        } else if (this.title === '机构选择') {
          this.form.menuArea = ''
          this.form.Id = ''
        } else if (this.title === '主负责人') {
          this.form.menuMain = this.filterText
          this.form.Id = this.filterId
        } else if (this.title === '副负责人') {
          this.form.menuSecond = this.filterText
          this.form.Id = this.filterId
        }
        this.cityVisible = false
      },
      filterNode (value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      handleNode (data) {
        this.filterText = data.name // 弹框树模型点击输入值
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
