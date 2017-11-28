<template>
  <div>
    <div class="right">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="会员邀请统计列表" name="first"class="padding">
          <!--筛选-->
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="邀请者">
              <el-input v-model="formInline.invitee" placeholder="邀请者"></el-input>
            </el-form-item>
            <el-form-item label="邀请者手机">
              <el-input v-model="formInline.invitee_phone" placeholder="邀请者手机"></el-input>
            </el-form-item>
            <el-form-item label="被邀请者">
              <el-input v-model="formInline.invited" placeholder="被邀请者"></el-input>
            </el-form-item>
            <el-form-item label="被邀请手机">
              <el-input v-model="formInline.invited_phone" placeholder="被邀请手机"></el-input>
            </el-form-item>
            <el-form-item label="被邀请状态">
              <el-select v-model="formInline.region3" placeholder="选择被邀请状态">
                <el-option label="实名用户" value="1"></el-option>
                <el-option label="临时用户" value="2"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="是否有效">
              <el-select v-model="formInline.region4" placeholder="选择是否有效">
                <el-option label="待更新" value="1"></el-option>
                <el-option label="有效" value="2"></el-option>
                <el-option label="无效" value="3"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="邀请时间:">
              <date-pickers></date-pickers>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="exportData">导出</el-button>
            </el-form-item>
          </el-form>

          <!--table-->
          <el-table
            :data="tableData"
            stripe
            border
            style="width: 100%">
            <el-table-column
              header-align="center"
              align="center"
              prop="invitee"
              label="邀请者">
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="invitee_phone"
              label="邀请者手机">
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="invited"
              label="被邀请者">
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="invited_phone"
              label="被邀请手机">
            </el-table-column>
            <el-table-column
              header-align="center"
              align="center"
              prop="invited_effective"
              label="是否有效邀请">
            </el-table-column>

            <el-table-column
              header-align="center"
              align="center"
              prop="invitee_time"
              label="邀请时间">
            </el-table-column>
          </el-table>

          <!--分页-->
          <paginations></paginations>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeName2: 'first',
        formInline: {
          invitee: '',
          invitee_phone: '',
          invited: '',
          invited_phone: '',
          region3: '',
          region4: ''
        },
        tableData: [{
          invitee: '99王小虎',
          invitee_phone: '13788947105',
          invited: '99王小虎',
          invited_phone: '13788947105',
          invited_effective: '待更新',
          invitee_time: '2017-2-5 21:52:45'
        }, {
          invitee: '99王小虎',
          invitee_phone: '13788947105',
          invited: '99王小虎',
          invited_phone: '13788947105',
          invited_effective: '待更新',
          invitee_time: '2017-2-5 21:52:45'
        }, {
          invitee: '99王小虎',
          invitee_phone: '13788947105',
          invited: '99王小虎',
          invited_phone: '13788947105',
          invited_effective: '待更新',
          invitee_time: '2017-2-5 21:52:45'
        }, {
          invitee: '99王小虎',
          invitee_phone: '13788947105',
          invited: '99王小虎',
          invited_phone: '13788947105',
          invited_effective: '待更新',
          invitee_time: '2017-2-5 21:52:45'
        }, {
          invitee: '99王小虎',
          invitee_phone: '13788947105',
          invited: '99王小虎',
          invited_phone: '13788947105',
          invited_effective: '待更新',
          invitee_time: '2017-2-5 21:52:45'
        }, {
          invitee: '99王小虎',
          invitee_phone: '13788947105',
          invited: '99王小虎',
          invited_phone: '13788947105',
          invited_effective: '待更新',
          invitee_time: '2017-2-5 21:52:45'
        }, {
          invitee: '99王小虎',
          invitee_phone: '13788947105',
          invited: '99王小虎',
          invited_phone: '13788947105',
          invited_effective: '待更新',
          invitee_time: '2017-2-5 21:52:45'
        }, {
          invitee: '99王小虎',
          invitee_phone: '13788947105',
          invited: '99王小虎',
          invited_phone: '13788947105',
          invited_effective: '待更新',
          invitee_time: '2017-2-5 21:52:45'
        }, {
          invitee: '99王小虎',
          invitee_phone: '13788947105',
          invited: '99王小虎',
          invited_phone: '13788947105',
          invited_effective: '待更新',
          invitee_time: '2017-2-5 21:52:45'
        }, {
          invitee: '99王小虎',
          invitee_phone: '13788947105',
          invited: '99王小虎',
          invited_phone: '13788947105',
          invited_effective: '待更新',
          invitee_time: '2017-2-5 21:52:45'
        }, {
          invitee: '99王小虎',
          invitee_phone: '13788947105',
          invited: '99王小虎',
          invited_phone: '13788947105',
          invited_effective: '待更新',
          invitee_time: '2017-2-5 21:52:45'
        }, {
          invitee: '99王小虎',
          invitee_phone: '13788947105',
          invited: '99王小虎',
          invited_phone: '13788947105',
          invited_effective: '待更新',
          invitee_time: '2017-2-5 21:52:45'
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
      }
    }
  }
</script>

<style scoped>
  .padding{
    padding-left:10px;
  }
</style>
