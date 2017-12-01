<template>
  <div class="right">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <!--优惠券配置列表-->
      <el-tab-pane label="优惠券配置列表" name="first" style="padding-left:10px;">

        <!--筛选条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

          <el-form-item label="优惠券编号:">
            <el-input v-model="formInline.couponNo" placeholder="输入优惠券编号">
            </el-input>
          </el-form-item>

          <!--<el-form-item label="商标:">-->
          <!--<el-input v-model="formInline.trademark" placeholder="输入商标">-->
          <!--</el-input>-->
          <!--</el-form-item>-->

          <el-form-item label="商户名:">
            <el-input v-model="formInline.business" placeholder="输入商户名">
            </el-input>
          </el-form-item>

          <el-form-item label="手机号:">
            <el-input v-model="formInline.fuserPhone" placeholder="输入手机号">
            </el-input>
          </el-form-item>

          <el-form-item label="活动:">
            <el-input v-model="formInline.activityDes" placeholder="输入活动">
            </el-input>
          </el-form-item>

          <el-form-item label="奖项类型:">
            <el-select v-model="formInline.coupon_mode" placeholder="选择奖项类型" clearable>
              <el-option v-for="(item,k) in coupon_mode_obj" :label=item :value=k :key=k></el-option>
            </el-select>
          </el-form-item>

          <!--<el-form-item label="所属城市:">-->
          <!--<el-input v-model="formInline.city" placeholder="输入所属城市">-->
          <!--</el-input>-->
          <!--</el-form-item>-->

          <el-form-item label="优惠券状态:">
            <el-select v-model="formInline.coupon_status" placeholder="选择优惠券状态" clearable>
              <el-option v-for="(item,k) in t_cup_state_obj" :label=item :value=k :key=k></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="优惠券类型:">
            <el-select v-model="formInline.coupon_type" placeholder="选择优惠券类型" clearable>
              <el-option v-for="(item,k) in coupon_type_obj" :label=item :value=k :key=k></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="生效时间:">
            <el-date-picker
              v-model="formInline.beginStartTime"
              type="date"
              placeholder="开始生效时间">
            </el-date-picker>
            <el-date-picker
              v-model="formInline.endStartTime"
              type="date"
              placeholder="结束生效时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="失效时间:">
            <el-date-picker
              v-model="formInline.beginEndTime"
              type="date"
              placeholder="开始失效时间">
            </el-date-picker>
            <el-date-picker
              v-model="formInline.endEndTime"
              type="date"
              placeholder="结束失效时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="exportData">导出</el-button>
          </el-form-item>
        </el-form>

        <!--隐藏表格用于提交-->
        <form action="" v-if="0" method="post" ref="FileForm">
        <input name="activityDes" v-model="exportParam.activityDes"/>
        <input name="beginEndTime" v-model="exportParam.beginEndTime"/>
        <input name="beginStartTime" v-model="exportParam.beginStartTime"/>
        <input name="business" v-model="exportParam.business"/>
        <input name="couponNo" v-model="exportParam.couponNo"/>
        <input name="coupon_mode" v-model="exportParam.coupon_mode"/>
        <input name="coupon_status" v-model="exportParam.coupon_status"/>
        <input name="coupon_type" v-model="exportParam.coupon_type"/>
        <input name="endEndTime" v-model="exportParam.endEndTime"/>
        <input name="endStartTime" v-model="exportParam.endStartTime"/>
        <input name="fuserPhone" v-model="exportParam.fuserPhone"/>
        <input name="pageSize" v-model="exportParam.pageSize"/>
        <input name="pageNo" v-model="exportParam.pageNo"/>
        </form>
        <!--表格-->

        <!--表格-->
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          stripe>
          <el-table-column
            header-align="center"
            align="center"
            prop="id"
            label="id"
            v-if=0>
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="couponNo"
            label="优惠券编号"
            width="120">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="tradeTag_name"
            label="活动标签"
            width="120">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="coupon_mode"
            label="奖项类型"
            width="120">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="business"
            label="商户名"
            width="120">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="t_cup_state"
            label="优惠券状态"
            width="120">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="coupon_type"
            label="优惠券类型"
            width="140">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="content"
            label="优惠券内容"
            width="130">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="fUser.realName"
            label="用户信息"
            width="110">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="fUser.phone"
            label="用户手机"
            width="140">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="activityDes"
            label="活动"
            width="120">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="startTime"
            label="生效时间"
            width="170">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="endTime"
            label="失效时间"
            width="170">
          </el-table-column>

          <el-table-column
            header-align="center"
            align="center"
            prop="updateDate"
            label="更新时间"
            width="170">
          </el-table-column>

          <el-table-column
            show-overflow-tooltip
            header-align="center"
            align="center"
            prop="remarks"
            label="备注"
            width="200">
          </el-table-column>

          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="modifyRecord(scope.row.id)">修改</el-button>
              <el-button @click="deleteRecord(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.pageNum"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.count">
        </el-pagination>

      </el-tab-pane>

      <!--优惠券配置添加-->
      <el-tab-pane label="优惠券配置添加" name="second" class="second">

        <el-form ref="form" :model="form" label-width="150px">

          <el-form-item label="优惠券编号:">
            <el-input v-model="form.couponNo" placeholder="填写优惠券编号"></el-input>
          </el-form-item>

          <!--<el-form-item label="城市:">-->
          <!--<el-select v-model="form.city" placeholder="选择城市" clearable>-->
          <!--<el-option label="成都市" value="1"></el-option>-->
          <!--<el-option label="湖州市" value="2"></el-option>-->
          <!--<el-option label="上海市" value="3"></el-option>-->
          <!--<el-option label="北京市" value="4"></el-option>-->
          <!--<el-option label="深圳市" value="5"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->

          <el-form-item label="商标:">
            <el-input v-model="form.trademark" v-show='false'></el-input>
            <el-upload
              ref="uploadAdd"
              list-type="picture-card"
              action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
              :data="Token"
              :on-success="successAddImg"
              :on-remove="onRemove"
              :before-upload="beforeUpload">
              <el-button type="primary" @click="clearUploadedImage">上传图片
                <!--<el-button type="primary" @click="clearAddImage">上传图片-->
                <i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="商户名:">
            <el-input v-model="form.business"></el-input>
          </el-form-item>

          <el-form-item label="优惠券类型:">
            <el-select v-model="form.type" placeholder="选择优惠券类型" clearable>
              <el-option v-for="(item,k) in coupon_type_obj" :label=item :value=k :key=k></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="优惠券内容:">
            <el-input v-model="form.content" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item label="详情url:">
            <el-input v-model="form.detailsUrl" placeholder="填写详情url"></el-input>
          </el-form-item>

          <el-form-item label="有效时间:">
            <el-date-picker
              v-model="form.startTime"
              type="date"
              placeholder="开始时间">
            </el-date-picker>
            -
            <el-date-picker
              v-model="form.endTime"
              type="date"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input v-model="form.remarks" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveData">保存</el-button>
            <el-button type="primary" @click="resetForm">重置</el-button>
            <el-button @click="returnBack">返回</el-button>
          </el-form-item>

        </el-form>

      </el-tab-pane>

      <!--优惠券批量导入-->
      <el-tab-pane label="优惠券批量导入" name="third" class="second">

        <el-form ref="form" :model="formBatch" label-width="150px">

          <el-form-item label="商标:">
            <el-input v-model="formBatch.trademark" v-show='false'></el-input>
            <el-upload
              ref="uploadBatch"
              list-type="picture-card"
              action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
              :data="Token"
              :on-success="successBatchImg"
              :on-remove="onRemove"
              :before-upload="beforeUpload">
              <el-button type="primary" @click="clearUploadedImage">上传图片
                <!--<el-button type="primary" @click="clearBatchImage">上传图片-->
                <i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </el-upload>
          </el-form-item>

          <!--<el-form-item label="城市:">-->
          <!--<el-select v-model="form_batch.city" placeholder="选择城市" clearable>-->
          <!--<el-option label="成都市" value="1"></el-option>-->
          <!--<el-option label="湖州市" value="2"></el-option>-->
          <!--<el-option label="上海市" value="3"></el-option>-->
          <!--<el-option label="北京市" value="4"></el-option>-->
          <!--<el-option label="深圳市" value="5"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->

          <el-form-item label="商户名:">
            <el-input v-model="formBatch.business"></el-input>
          </el-form-item>

          <el-form-item label="优惠券类型:">
            <el-select v-model="formBatch.type" placeholder="选择优惠券类型" clearable>
              <el-option v-for="(item,k) in coupon_type_obj" :label=item :value=k :key=k></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="优惠券内容:">
            <el-input v-model="formBatch.content" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item label="详情url:">
            <el-input v-model="formBatch.detailsUrl" placeholder="填写详情url"></el-input>
          </el-form-item>

          <el-form-item label="有效时间:">
            <el-date-picker
              v-model="formBatch.startTime"
              type="date"
              placeholder="开始时间">
            </el-date-picker>
            -
            <el-date-picker
              v-model="formBatch.endTime"
              type="date"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input v-model="formBatch.remarks" type="textarea" class='textarea'></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="selectFile">选择文件</el-button>
            <el-button type="primary" @click="importData">导入</el-button>
            <el-button @click="downloadTemplate">下载模板</el-button>
            <!--<el-button type="primary" @click="resetForm">重置</el-button>-->
            <el-button @click="returnBack">返回</el-button>
          </el-form-item>

        </el-form>

      </el-tab-pane>

    </el-tabs>

    <!--模态框-->
    <!--修改弹框-->
    <el-dialog title="修改" :visible.sync="modifyFormVisible">

      <el-form ref="form" :model="updateForm" label-width="150px">
        <el-form-item label="id:" v-if=0>
          <el-input v-model="updateForm.id"></el-input>
        </el-form-item>

        <el-form-item label="优惠券编号:">
          <el-input v-model="updateForm.couponNo" placeholder="填写优惠券编号"></el-input>
        </el-form-item>

        <el-form-item label="商标:">
          <img width="100%" :src="updateForm.trademark">
          <el-input v-model="updateForm.trademark" v-show='false'></el-input>
          <el-upload
            ref="upload"
            list-type="picture-card"
            action='http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com'
            :data="Token"
            :on-success="successUpdateImg"
            :on-remove="onRemove"
            :before-upload="beforeUpload">
            <el-button type="primary" @click="clearUploadedImage">上传图片
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="商户名:">
          <el-input v-model="updateForm.business"></el-input>
        </el-form-item>

        <el-form-item label="优惠券类型:">
          <el-select v-model="updateForm.type" placeholder="选择优惠券类型" clearable>
            <el-option v-for="(item,k) in coupon_type_obj" :label=item :value=k :key=k></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="优惠券内容:">
          <el-input v-model="updateForm.content" type="textarea" class='textarea'></el-input>
        </el-form-item>

        <el-form-item label="详情url:">
          <el-input v-model="updateForm.detailsUrl" placeholder="填写详情url"></el-input>
        </el-form-item>

        <el-form-item label="有效时间:">
          <el-date-picker
            v-model="updateForm.startTime"
            type="date"
            placeholder="开始时间">
          </el-date-picker>
          -
          <el-date-picker
            v-model="updateForm.endTime"
            type="date"
            placeholder="结束时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="备注:">
          <el-input v-model="updateForm.remarks" type="textarea" class='textarea'></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!--导出-->
    <el-dialog size='tiny' title="导出" :visible.sync="exportFormVisible" :show-close="false"
               :close-on-press-escape="false"
               :close-on-click-modal="false" class="demo-ruleForm ">
      <el-button @click="exportCurrent">导出当前页</el-button>
      <el-button @click="exportAll">导出所有</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelExport">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import Moment from 'moment'
  import Tools from '../../../../static/utils/tools.js'
  import baseUrl from '../../../../static/utils/baseUrl.js'

  export default {
    data () {
      return {
        Token: {}, // oss秘钥
        activeName: 'first',
        exportFormVisible: false, // 导出模态框
        modifyFormVisible: false,
        coupon_type_obj: {}, // 优惠券类型关系
        t_cup_state_obj: {}, // 优惠券领取状态
        coupon_mode_obj: {}, // 奖项类型
        coupon_trade_mode_obj: {}, // 活动标签
        tableData: [], // 所展示列表信息
        updateForm: {}, // 根据id更新某条数据
        formInline: {}, // 查询列表所需字段
        form: {}, // 添加新优惠券配置表单
        formBatch: {}, // 批量导入表单
        pagination: {pageSizes: [30, 50, 80, 100], pageSize: 30, total: 0, pageNum: 1},
        exportParam: {}
      }
    },
    created () {
      new Promise(() => {
        this.getType()
      })
        .then(this.getList())
    },
    methods: {
      // 点击根据条件进行查询
      search () {
        this.formInline.beginStartTime = (this.formInline.beginStartTime === undefined ? null : Moment(new Date(this.formInline.beginStartTime)).format('YYYY-MM-DD HH:mm:ss'))
        this.formInline.endStartTime = (this.formInline.endStartTime === undefined ? null : Moment(new Date(this.formInline.endStartTime)).format('YYYY-MM-DD HH:mm:ss'))
        this.formInline.beginEndTime = (this.formInline.beginEndTime === undefined ? null : Moment(new Date(this.formInline.beginEndTime)).format('YYYY-MM-DD HH:mm:ss'))
        this.formInline.endEndTime = (this.formInline.endEndTime === undefined ? null : Moment(new Date(this.formInline.endEndTime)).format('YYYY-MM-DD HH:mm:ss'))
//        if (!this.formInline.beginStartTime) {
//          this.formInline.beginStartTime = null
//        } else {
//          this.formInline.beginStartTime = Moment(this.formInline.beginStartTime).format('YYYY-MM-DD HH:mm:ss')
//        }
        this.exportParam = this.formInline
        console.log(this.exportParam)
        // 点击根据条件进行查询
        this.getList()
      },
      // 添加新优惠券
      saveData () {
        // 有效时间转化
        this.form.startTime = Moment(this.form.startTime).format('YYYY-MM-DD HH:mm:ss')
        this.form.endTime = Moment(this.form.endTime).format('YYYY-MM-DD HH:mm:ss')
        console.log(this.form)
        // 发送save请求，保存数据
        this.$ajax.get('activity/coupon/details/save', {params: this.form})
          .then(res => {
            this.open('success', res.data.msg)
            // 跳转到第一页 并刷新页面
            this.activeName = 'first'
            this.getList()
          })
          .catch(err => {
            this.open('info', err.data.msg)
//            console.log(err)
          })
//        this.Token = {} // 清空秘钥
      },
      // 获取当前行的详细信息
      modifyRecord (id) {
//        this.Token = {}
        this.modifyFormVisible = true
        this.$ajax.get('activity/coupon/details/form?id=' + id)
          .then(res => {
            this.updateForm = res.data.tCouponInfo
            console.log(this.updateForm)
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 更新 根据id更改某一条信息
      doUpdate () {
        this.modifyFormVisible = false
        this.updateForm.startTime = Moment(this.updateForm.startTime).format('YYYY-MM-DD HH:mm:ss')
        this.updateForm.endTime = Moment(this.updateForm.endTime).format('YYYY-MM-DD HH:mm:ss')
//        console.log(this.updateForm)
        // 发送save请求，保存数据
        this.$ajax.get('activity/coupon/details/save', {params: this.updateForm})
          .then(res => {
//            console.log(res)
            this.open('success', res.data.msg)
            // 刷新页面
            this.getList()
          })
          .catch(err => {
            this.open('info', err.data.msg)
            console.log(err)
          })
//        this.Token = {} // 清空秘钥
        this.clearUploadedImage() // 清空上传组件中图片
      },
      // 根据id删除当前行的信息
      delRecord (id) {
        this.$ajax.get('activity/coupon/details/delete?id=' + id)
          .then(res => {
            if (res.status === 200) {
              // 删除成功
              this.open('success', res.data.msg)
              // 刷新页面
              this.getList()
            } else {
              // 删除失败
              this.open('warning', res.data.msg)
            }
          })
          .catch(err => {
            // 删除失败
            this.open('warning', err.data.msg)
          })
      },
      // 重置功能
      resetForm () {
        this.clearUploadedImage()
//        this.Token = {} // 清空秘钥
        this.form = {} // 清空表单1
        this.formBatch = {} // 清空表单2
      },
      // 返回至列表 并清空表单
      returnBack () {
        this.activeName = 'first'
        // 并清空当前列表内容
        this.resetForm()
      },
      // 点击标签页时事件
      handleClick () {
        this.resetForm()
      },
      // 导出功能
      exportData () {
        this.exportFormVisible = true
      },
      // 取消导出
      cancelExport () {
        this.exportFormVisible = false
      },
      // 导出当前
      exportCurrent () {
        this.exportParam.pageNo = this.pagination.pageNo
        this.exportParam.pageSize = this.pagination.pageSize
        this.$refs['FileForm'].setAttribute('action', `${baseUrl}/activity/coupon/details/export`)
        this.$refs['FileForm'].submit()
        this.exportFormVisible = false
      },
      // 导出所有
      exportAll () {
        this.exportParam.pageSize = ''
        this.exportParam.pageNo = ''
        this.$refs['FileForm'].setAttribute('action', `${baseUrl}/activity/coupon/details/exportAll`)
        this.$refs['FileForm'].submit()
        this.exportFormVisible = false
      },
      selectFile () {},
      importData () {},
      downloadTemplate () {},
      // 封装
      // 获取优惠券类型
      getCouponType () {
        this.$ajax.get('activity/coupon/details/display?type=coupon_type')
          .then(res => {
            let couponType = res.data
            this.coupon_type_obj = Tools.nameRelation(couponType, 'value', 'label')
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 获取优惠券状态
      getCupState () {
        this.$ajax.get('activity/coupon/details/display?type=t_cup_state')
          .then(res => {
            let tCupState = res.data
            this.t_cup_state_obj = Tools.nameRelation(tCupState, 'value', 'label')
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 获取奖项类型
      getCouponMode () {
        this.$ajax.get('activity/coupon/details/display?type=coupon_mode')
          .then(res => {
            let couponMode = res.data
            this.coupon_mode_obj = Tools.nameRelation(couponMode, 'value', 'label')
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 获取活动标签
      getTradeTag () {
        this.$ajax.get('activity/coupon/details/display?type=coupon_trade_mode')
          .then(res => {
            let couponTradeMode = res.data
            this.coupon_trade_mode_obj = Tools.nameRelation(couponTradeMode, 'value', 'label')
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 获取各种类型
      getType () {
        this.getCouponType()
        this.getCupState()
        this.getCouponMode()
        this.getTradeTag()
      },
      // 首页请求优惠券列表
      getList () {
        this.$ajax.get('activity/coupon/details/list', {params: this.formInline})
          .then(res => {
//            console.log(res.data.page.list)
            this.tableData = res.data.page.list
            this.pagination.count = res.data.page.count
            if (res.data.page.list) {
              for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].coupon_type = Tools.k2value(this.coupon_type_obj, this.tableData[i].type)
                this.tableData[i].t_cup_state = Tools.k2value(this.t_cup_state_obj, this.tableData[i].state)
                this.tableData[i].coupon_mode = Tools.k2value(this.coupon_mode_obj, this.tableData[i].tag)
                this.tableData[i].tradeTag_name = Tools.k2value(this.coupon_trade_mode_obj, this.tableData[i].tradeTag)
//              this.tableData[i].coupon_type = this.coupon_type_obj[this.tableData[i].type]
//              this.tableData[i].t_cup_state = this.t_cup_state_obj[this.tableData[i].state]
              }
            } else {
              this.open('info', '没有符合此条件的相关信息')
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
      // 上传组件获取oss相关 通过node
      beforeUpload (file) {
        return new Promise((resolve) => {
          this.$ajax.get('beforeUpload/img', {params: {user_dir: 'couponBaseInfo'}})
            .then(res => {
//              console.log(res.data)
              this.Token = res.data
              this.Token.key = this.Token.dir + '/' + (+new Date()) + file.name
              // oss上图片的路径 在表单体提交之前拼接
              resolve()
            })
            .catch(err => {
              console.log(err)
            })
        })
      },
      // 上传图片成功的话  将src拼接放入表单中
      successAddImg () {
        this.form.trademark = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
      },
      successUpdateImg () {
        this.updateForm.trademark = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
      },
      successBatchImg () {
        this.formBatch.trademark = 'http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com/' + this.Token.key
      },
      // 移除图片时清空form表单中的图片地址
      onRemove () {
        this.updateForm.trademark = ''
        this.form.trademark = ''
        this.formBatch.trademark = ''
      },
      // 上传之前 清除原有图片
      clearUploadedImage () {
        // 如果有就清除
        if (this.updateForm.trademark) {
          this.$refs.upload.clearFiles()
        }
        if (this.form.trademark) {
          this.$refs.uploadAdd.clearFiles()
        }
        if (this.formBatch.trademark) {
          this.$refs.uploadBatch.clearFiles()
        }
        this.updateForm.trademark = ''
        this.form.trademark = ''
        this.formBatch.trademark = ''
      },
      // 改变请求条数功能
      handleSizeChange: function (val) {
//        console.log(val)
        this.formInline.pageSize = val
        this.getList()
      },
      // 翻页功能
      handleCurrentChange: function (val) {
//        console.log(val)
        this.formInline.pageNum = val
        this.getList()
      },
      // 显示的提示设置
      open (type, msg) {
        // 提示信息
        this.$message({
          type: type,
          message: msg
        })
      },
      // 删除时的提醒信息
      deleteRecord (id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.delRecord(id)
          })
          .catch(() => {
            this.open('info', '已取消删除')
          })
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .right {

  }

  .second .textarea, .second .el-input, .second .el-input__inner {
    width: 300px;
  }
</style>
