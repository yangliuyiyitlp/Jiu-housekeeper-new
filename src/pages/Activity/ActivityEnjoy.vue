<template>
  <div class="right">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <!--赳赳乐享活动列表-->
      <el-tab-pane label="赳赳乐享活动列表" name="first"style="padding-left:10px;">

        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="活动类型:">
            <el-select v-model="formInline.type" placeholder="选择活动类型" clearable>
              <el-option label="普通活动" value="1"></el-option>
              <el-option label="视屏活动" value="2"></el-option>
              <el-option label="骑行活动" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="有无红包:">
            <el-select v-model="formInline.isHave" placeholder="选择活动类型" clearable>
              <el-option label="有" value="1"></el-option>
              <el-option label="无" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="分享平台:">
            <el-checkbox-group v-model="formInline.checkList">
              <el-checkbox label="微信好友"></el-checkbox>
              <el-checkbox label="朋友圈"></el-checkbox>
              <el-checkbox label="QQ好友"></el-checkbox>
              <el-checkbox label="QQ空间"></el-checkbox>
              <el-checkbox label="微博"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="城市标志:">
            <el-select v-model="formInline.logo" placeholder="选择城市标志" clearable>
              <el-option label="默认活动" value="1"></el-option>
              <el-option label="城市活动" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="生效状态:">
            <el-select v-model="formInline.status" placeholder="选择生效状态" clearable>
              <el-option label="待生效" value="1"></el-option>
              <el-option label="生效中" value="2"></el-option>
              <el-option label="已过期" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="城市名称:">
            <el-input v-model="formInline.city_name" placeholder="城市名称">
            </el-input>
          </el-form-item>

          <el-form-item label="生效时间:">
            <date-pickers></date-pickers>
          </el-form-item>

          <el-form-item label="失效时间:">
            <date-pickers></date-pickers>
          </el-form-item>

          <el-form-item label="添加时间:">
            <date-pickers></date-pickers>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="exportData">导出</el-button>
          </el-form-item>
        </el-form>

        <!--表格-->
        <el-table
          :data="tableData4"
          style="width: 100%"
          border
          stripe>
          <el-table-column
            header-align="center"
            align="center"
            prop="city_name"
            label="城市名称"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="activity_des"
            label="活动描述"
            width="120">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="isDefault"
            label="推送方式"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="status"
            label="生效状态"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="activity_id"
            label="活动ID"
            width="300">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="show_order"
            label="展示顺序"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="activity_type"
            label="活动类型"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="activity_status"
            label="车辆活动状态"
            width="130">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="limit_credit"
            label="限制信用分"
            width="120">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="isEnjoy"
            label="是否乐享活动"
            width="130">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="isRedpacket"
            label="有无红包"
            width="100">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="share_platform"
            label="分享平台"
            width="120">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="share_title"
            label="分享标题"
            width="200">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="share_content"
            label="分享内容"
            width="300">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="effective_date"
            label="生效时间"
            width="170">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="failure_date"
            label="失效时间"
            width="170">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="add_date"
            label="添加时间"
            width="170">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="update_date"
            label="更新时间"
            width="170">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="des"
            label="备注"
            width="100">
          </el-table-column>

          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            label="操作"
            width="120">
            <template scope="scope">
              <el-button type="text" size="small">修改</el-button>
              <el-button
                @click="open2(scope.$index, tableData4)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--分页-->
        <paginations></paginations>

      </el-tab-pane>

      <!--赳赳乐享活动添加-->
      <el-tab-pane label="赳赳乐享活动添加" name="second" class="second">

        <el-form ref="form" :model="form" label-width="150px">

          <el-form-item label="活动描述:">
            <el-input v-model="form.activity_des" placeholder="活动简要描述"></el-input>
          </el-form-item>

          <el-form-item label="活动类型:">
            <el-select v-model="form.activity_type" placeholder="选择活动类型" clearable>
              <el-option label="普通活动" value="1"></el-option>
              <el-option label="视屏活动" value="2"></el-option>
              <el-option label="骑行活动" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否乐享活动:">
            <el-select v-model="form.isEnjoy" placeholder="是否乐享活动" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="限制信用分:">
            <el-input v-model="form.min_credit" placeholder="可以参与活动的最小信用分"></el-input>
          </el-form-item>

          <el-form-item label="封面图片:">
          </el-form-item>

          <el-form-item label="展示顺序:">
            <el-input v-model="form.show_order" placeholder="填写展示顺序"></el-input>
          </el-form-item>

          <el-form-item label="活动链接:">
            <el-input v-model="form.activity_url" placeholder="填写活动链接"></el-input>
          </el-form-item>

          <el-form-item label="分享平台:">
            <el-checkbox-group v-model="form.share_platform">
              <el-checkbox label="微信好友"></el-checkbox>
              <el-checkbox label="朋友圈"></el-checkbox>
              <el-checkbox label="QQ好友"></el-checkbox>
              <el-checkbox label="QQ空间"></el-checkbox>
              <el-checkbox label="微博"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="是否默认:">
            <el-radio class="radio" v-model="form.isDefault" label="1">默认活动</el-radio>
            <el-radio class="radio" v-model="form.isDefault" label="2">城市活动</el-radio>
          </el-form-item>

          <el-form-item label="有效日期:">
            <el-date-picker
              v-model="form.effective_date"
              type="datetimerange"
              placeholder="选择时间范围">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input v-model="form.des" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item label="快速添加到城市:">
            <el-checkbox-group v-model="form.add_cities">
              <el-checkbox label="成都市"></el-checkbox>
              <el-checkbox label="湖州市"></el-checkbox>
              <el-checkbox label="上海市"></el-checkbox>
              <el-checkbox label="北京市"></el-checkbox>
              <el-checkbox label="深圳市"></el-checkbox>
              <el-checkbox label="厦门市"></el-checkbox>
              <el-checkbox label="珠海市"></el-checkbox>
              <el-checkbox label="厦门"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveData">保存</el-button>
            <el-button>返回</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value1: '',
        activeName2: 'first',
        formInline: {
          type: '',
          isHave: '',
          logo: '',
          status: '',
          checkList: [],
          city_name: ''
        },
        form: {
          activity_des: '',
          activity_type: '',
          isEnjoy: '',
          min_credit: '',
          show_order: '',
          activity_url: '',
          share_platform: [],
          isDefault: '1',
          city_name: 'default',
          effective_date: '',
          des: '',
          add_cities: []
        },
        tableData4: [{
          city_name: '上海市',
          activity_des: '僵尸车测试1',
          isDefault: '是否活动',
          status: '已过期',
          activity_id: '02744d0d75fb48bea3e9b97344afe001',
          show_order: 40,
          activity_type: '骑行活动',
          activity_status: '大剿匪',
          limit_credit: 99,
          isEnjoy: '是',
          isRedpacket: '是',
          share_platform: '微信好友',
          share_title: '微信好友',
          share_content: '激动啊佛爱UFO会啊复牌分',
          effective_date: '2017-09-21 15:51:12',
          failure_date: '2017-09-21 15:51:12',
          add_date: '2017-09-21 15:51:12',
          update_date: '2017-09-21 15:51:12',
          des: ''
        }, {
          city_name: '上海市',
          activity_des: '僵尸车测试1',
          isDefault: '是否活动',
          status: '已过期',
          activity_id: '02744d0d75fb48bea3e9b97344afe001',
          show_order: 40,
          activity_type: '骑行活动',
          activity_status: '大剿匪',
          limit_credit: 99,
          isEnjoy: '是',
          isRedpacket: '是',
          share_platform: '微信好友',
          share_title: '微信好友',
          share_content: '激动啊佛爱UFO会啊复牌分',
          effective_date: '2017-09-21 15:51:12',
          failure_date: '2017-09-21 15:51:12',
          add_date: '2017-09-21 15:51:12',
          update_date: '2017-09-21 15:51:12',
          des: ''
        }, {
          city_name: '上海市',
          activity_des: '僵尸车测试1',
          isDefault: '是否活动',
          status: '已过期',
          activity_id: '02744d0d75fb48bea3e9b97344afe001',
          show_order: 40,
          activity_type: '骑行活动',
          activity_status: '大剿匪',
          limit_credit: 99,
          isEnjoy: '是',
          isRedpacket: '是',
          share_platform: '微信好友',
          share_title: '微信好友',
          share_content: '激动啊佛爱UFO会啊复牌分',
          effective_date: '2017-09-21 15:51:12',
          failure_date: '2017-09-21 15:51:12',
          add_date: '2017-09-21 15:51:12',
          update_date: '2017-09-21 15:51:12',
          des: ''
        }, {
          city_name: '上海市',
          activity_des: '僵尸车测试1',
          isDefault: '是否活动',
          status: '已过期',
          activity_id: '02744d0d75fb48bea3e9b97344afe001',
          show_order: 40,
          activity_type: '骑行活动',
          activity_status: '大剿匪',
          limit_credit: 99,
          isEnjoy: '是',
          isRedpacket: '是',
          share_platform: '微信好友',
          share_title: '微信好友',
          share_content: '激动啊佛爱UFO会啊复牌分',
          effective_date: '2017-09-21 15:51:12',
          failure_date: '2017-09-21 15:51:12',
          add_date: '2017-09-21 15:51:12',
          update_date: '2017-09-21 15:51:12',
          des: ''
        }]
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      },
      search () {
        console.log('search!')
      },
      exportData () {
        console.log('exportData!')
      },
      deleteRow (index, rows) {
        rows.splice(index, 1)
      },
      open2 (index, rows) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRow(index, rows)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      saveData () {
        console.log('saveData!')
      }
    }
  }
</script>

<style scoped>
  .right {
  
  }

  .second .textarea, .second .el-input, .second .el-input__inner {
    width: 300px;
  }
  p{
    color:red;
  }
</style>
