<template>

  <el-form :model="form" style="margin-left:20px">
    <!--<el-form :rules="rules" :model="form" label-width="120px">-->
    <h2>城市选择</h2>
    <el-select v-model="form.cityList" placeholder="推送城市添加" multiple style="width: 320px">
      <el-option
        v-for="(item,index) in areaRelation"
        :key="index"
        :label="item"
        :value="index">
      </el-option>
    </el-select>


    <h2>平台选择</h2>
    <el-checkbox-group v-model="form.osList">
      <el-checkbox label="1">Android</el-checkbox>
      <el-checkbox label="0">iOS</el-checkbox>
    </el-checkbox-group>


    <h2>展示效果</h2>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="view">
          <div class="sidebar"></div>
        </div>
      </el-col>
      <el-col :span="16"></el-col>
    </el-row>


    <el-form-item>
      <el-button type="primary" @click="" class="btn">保存</el-button>
      <el-button type="danger" @click="" class="btn">停用</el-button>
    </el-form-item>

  </el-form>


</template>

<script>
  import baseUrl from '../../utils/baseUrl'
  import Tools from '../../../static/js/tools.js'

  export default {
    name: 'message-inform',
    data () {
      return {
        areaRelation: {}, // 城市对应关系
        form: {
          cityList: [],
          osList: []
        }
      }
    },
    created () {
      this.getCityRelation()
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
              let relation = Tools.nameRelation(bikeAreaList, 'id', 'name')
              this.areaRelation = relation
            }
          })
          .catch(err => {
            console.log('getCityRelation报错')
            console.error(err)
          })
      }
    },
    watch: {
      filterText (val) {
        this.$refs.tree.filter(val)
      }
    }
  }
</script>

<style scoped>
  .view {
    border: 1px solid rgba(0, 0, 0, 0.06);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 35px;
    width: 375px;
    height: 669px;
    background-color: #fff;
    -webkit-border-radius: 45px;
    -moz-border-radius: 45px;
    border-radius: 45px;
    -webkit-box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.02), 0 0 32px 0 rgba(0, 0, 0, 0.07) inset;
    -moz-box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.02), 0 0 32px 0 rgba(0, 0, 0, 0.07) inset;
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.02), 0 0 32px 0 rgba(0, 0, 0, 0.07) inset;
  }

  .view .sidebar {
    width: 66%;
    height: 100%;
    background-color: #fff;
  }
</style>
