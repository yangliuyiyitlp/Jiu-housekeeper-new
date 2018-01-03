<template>
  <div>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!--菜单列表-->
      <el-tab-pane label="区域列表" name="first">
        <div>
          <tree-grid
            :defaultExpandAll="true"
            :areaOpsFencing=true
            :areaBikeFencing=true
            :columns="columns"
            :tree-structure="true"
            :data-source="dataSource">
          </tree-grid>
        </div>

      </el-tab-pane>

      <!--区域添加 -->
      <el-tab-pane :label="titleSecond" name="second" class="second">

        <el-form ref="areaForm" :rules="rules" :model="areaForm" label-width="150px">
          <el-form-item>
            <el-input v-model="areaForm.id" v-if=false></el-input>
          </el-form-item>

          <el-form-item label="上级区域：" prop="areaName">
            <el-input
              :disabled=true
              :on-icon-click="searchMenu"
              icon="search"
              v-model="areaForm.areaName">
            </el-input>
          </el-form-item>

          <el-form-item label="区域名称：" prop="name">
            <el-input v-model="areaForm.name"></el-input>
          </el-form-item>

          <el-form-item label="区域编码：">
            <el-input v-model="areaForm.code"></el-input>
          </el-form-item>

          <el-form-item label="区域推送码：">
            <el-input v-model="areaForm.pushCode"></el-input>
          </el-form-item>

          <el-form-item label="区域类型：" prop="type">
            <el-select v-model="areaForm.type" clearable class="width">
              <el-option  v-for="(area,val,index) in areas" :value="val" :label="area" :key="index"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="备注：">
            <el-input v-model="areaForm.remarks" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveData('form')">保存</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>

      <!--电子围栏-->
      <el-tab-pane :label="OPSFencing" name="third" v-if='areaFence'>
        <el-form ref="areaForm" :inline="true" :model="fencingForm" class="demo-form-inline">
          <el-form-item label="所属区域：">
            <el-input
              :disabled=true
              :on-icon-click="searchMenu"
              icon="search"
              v-model="fencingForm.menuName">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doModify">保存</el-button>
            <el-button type="primary" @click="doModify">清楚轨迹</el-button>
            <el-button type="primary" @click="doModify">将区域边界设置围栏</el-button>
          </el-form-item>
        </el-form>
        <!--百度地图-->
        <div>
          <map-ops :height="height" :longitude="longitude" :latitude="latitude"></map-ops>
        </div>

      </el-tab-pane>

    </el-tabs>
    <div class="wrapperTree">
      <!--模态框-->
      <el-dialog title="上级区域" size="tiny" :visible.sync="cityVisible" center>
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
  import bus from '@/assets/js/eventBus.js'
  import Cookie from 'js-cookie'
  import mapOps from './areamap.vue'

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
        titleSecond: '区域添加',
        OPSFencing: '运维电子围栏',
        areaFence: false,
        select: [],
        areas: {'1': '国家', '2': '省份，直辖市', '3': '地市', '4': '区县'},
        Token: {},
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        areaForm: {},
        tableData: [],
        fencingForm: {}, // 电子围栏
        rules: {
          areaName: [
            {required: true, message: '请选择上级区域', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择区域类型', trigger: 'blur'}
          ]
        },
        columns: [
          {
            text: '区域名称',
            dataIndex: 'name'
          },
          {
            text: '城市代码',
            dataIndex: 'id'
          },
          {
            text: '区域编码',
            dataIndex: 'code'
          },
          {
            text: '区域类型',
            dataIndex: 'type'
          },
          {
            text: '区域推送码',
            dataIndex: 'pushCode'
          }
        ], // 树表格
        dataSource: [], // 树表格
        height: 300, // 地图
        longitude: 116.404,
        latitude: 39.915
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
      bus.$on('addBtn', (parentId, menuName, id, name) => {
        this.addNextRecord(parentId, menuName, id, name)
      })
      // 运维电子围栏
      bus.$on('areaOps', (id) => {
        this.handleAreaOps(id)
      })
      // 骑行电子围栏
      bus.$on('areaBike', (id) => {
        this.handleAreaBike(id)
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
          this.titleSecond = '区域添加'
          this.areaFence = false
        } else if (tab.label === '添加下一级') {
          this.addNextRecord()
          this.areaFence = false
        } else if (tab.label === '区域添加') {
          this.addRecord()
          this.areaFence = false
        }
      },
      query () {
        // 请求栏目列表
        this.$ajax.get('/setting/area/list')
          .then(res => {
            if (res.data.code === 200) {
              // 递归循环 显示隐藏
              isShow(res.data.data)
              this.dataSource = res.data.data
              this.select = res.data.data
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
            this.$ajax.get('setting/area/delete', {params: {'id': id}})
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
        if (this.$refs['areaForm'] !== undefined) {
          this.$refs['areaForm'].resetFields()
        }
        this.activeName2 = 'second'
        this.titleSecond = '区域修改'
        this.$ajax.get('/setting/area/form', {params: {id: id, sessionId: Cookie.get('sessionId')}})
          .then((res) => {
            if (res.data.code === 200) {
              this.areaForm = res.data.data
              this.areaForm.type = this.areas[res.data.data.type]
            } else {
              this.$message({
                type: 'error',
                message: '获取失败'
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '获取异常'
            })
          })
      }, // 修改
      addNextRecord (parentId, menuName, id, name) {
        console.log(22, name)
        if (this.$refs['areaForm'] !== undefined) {
          this.$refs['areaForm'].resetFields()
        }
        this.areaForm = {}
        this.activeName2 = 'second'
        this.titleSecond = '添加下一级'
        this.areaForm.areaName = name
        this.areaForm.parentId = id
      }, // 添加
      addRecord () {
        if (this.$refs['areaForm'] !== undefined) {
          this.$refs['areaForm'].resetFields()
        }
        this.areaForm = {}
        this.activeName2 = 'second'
        this.titleSecond = '区域添加'
      },
      saveData () {       // 修改确定功能
        this.$refs['areaForm'].validate((valid) => {
          if (valid) {
            let url = ''
            if (this.areaForm.id !== undefined && this.areaForm.id !== '') {  // 修改
              url = '/setting/area/update'
            } else {  // 新增
              url = '/setting/area/add'
            }
//            this.form.type = parseInt(this.form.type)
            this.$ajax.get(url, {params: this.areaForm})
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
        this.filterText = ''
      },
//      companySearch () { // 上级菜单列表
//        this.$ajax.get('/setting/menu/section', {params: {sessionId: Cookie.get('sessionId')}})
//          .then(response => {
//            if (response.data.code === 200) {
//              this.select = response.data.data
//            } else {
//              this.$message({
//                type: 'error',
//                message: '获取菜单列表失败'
//              })
//            }
//          })
//          .catch(() => {
//            this.$message({
//              type: 'error',
//              message: '获取菜单列表异常'
//            })
//          })
//      },
      doModify () {
        this.areaForm.areaName = this.filterText
        this.areaForm.parentId = this.filterId
        this.cityVisible = false
      },
      modifyCancel () {
        this.cityVisible = false
        this.areaForm.areaName = ''
        this.areaForm.parentId = ''
      },
      filterNode (value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      handleNode (data) {
        this.filterText = data.name // 弹框树模型点击输入值
        this.filterId = data.id
      },
      handleAreaOps (id) {
        this.activeName2 = 'third'
        this.areaFence = true
        this.OPSFencing = '运维电子围栏'
      }, // 电子围栏
      handleAreaBike (id) {
        this.activeName2 = 'third'
        this.areaFence = true
        this.OPSFencing = '骑行电子围栏'
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
      TreeGrid,
      mapOps
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
  /*地图*/
  /*#allmap {width: 100%; height:500px; overflow: hidden;}*/
  /*#result {width:100%;font-size:12px;}*/
  /*dl,dt,dd,ul,li{*/
    /*margin:0;*/
    /*padding:0;*/
    /*list-style:none;*/
  /*}*/
  /*p{font-size:12px;}*/
  /*dt{*/
    /*font-size:14px;*/
    /*font-family:"微软雅黑";*/
    /*font-weight:bold;*/
    /*border-bottom:1px dotted #000;*/
    /*padding:5px 0 5px 5px;*/
    /*margin:5px 0;*/
  /*}*/
  /*dd{*/
    /*padding:5px 0 0 5px;*/
  /*}*/
  /*li{*/
    /*line-height:28px;*/
  /*}*/

</style>
