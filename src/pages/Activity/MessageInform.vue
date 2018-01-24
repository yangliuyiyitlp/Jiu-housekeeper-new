<template>
  <el-form ref="form" :rules="rules" :model="form" label-width="120px">

    <el-form-item label="id:" v-if=false>
      <el-input v-model="form.id"></el-input>
    </el-form-item>

    <div class="one">
      <h1>基础内容</h1>

      <el-form-item label="任务描述:" prop="description">
        <el-input v-model="form.description" placeholder="输入任务描述"
                  style="width: 360px"></el-input>
      </el-form-item>

      <el-form-item label="标题:" prop="pushTitle">
        <el-input v-model="form.pushTitle" placeholder="推送内容的标题 例:赳赳单车" style="width:360px"></el-input>
      </el-form-item>

      <el-form-item label="内容:" prop="appPushContent">
        <!--<el-input v-model="form.appPushContent" type="textarea" class='textarea' style="width:430px;height:110px"></el-input>-->
        <el-input v-model="form.appPushContent" type="textarea" class='textarea'></el-input>
      </el-form-item>
    </div>

    <div class="two">
      <h1>目标人群</h1>

      <el-form-item label="推送时间:" prop="pushTime">
        <el-date-picker
          style="width:215px"
          v-model="form.pushTime"
          format="yyyy-MM-dd HH:mm"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="目标人群:" prop="pushTarget">
        <el-radio-group v-model="form.pushTarget">
          <el-radio label=0>全部用户</el-radio>
          <el-radio label=1>部分用户</el-radio>
        </el-radio-group>

        <div v-show="+form.pushTarget===1 ? true:false">

          <el-form-item label="平台:">
            <el-checkbox-group v-model="form.osList">
              <el-checkbox label="0" key="0">Android</el-checkbox>
              <el-checkbox label="1" key="1">iOS</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="推送城市:">
            <!--添加城市可多选-->
            <el-select v-model="form.cityIds" placeholder="推送城市添加" multiple v-show="!form.id">
              <el-option
                v-for="(item,index) in areaRelation"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>

            <!--修改城市时为单选-->
            <el-select v-model="form.areaId" placeholder="推送城市修改" v-show="form.id">
              <el-option
                v-for="(item,index) in areaRelation"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
          </el-form-item>

        </div>

      </el-form-item>

    </div>

    <div class="three">
      <h1>后续行为</h1>

      <el-form-item label="后续动作:" prop="pushIntent">
        <el-radio-group v-model="form.pushIntent">
          <el-radio v-for="(item,index) in pushIntentRelation" :key="index" :label="index">{{item}}</el-radio>
        </el-radio-group>

        <div>
          <el-form-item label="URL:" v-show="(+form.pushIntent===1) ? true:false">
            <el-input v-model="form.jumpUrl" style="width:460px" placeholder="请填写以http或https开头的地址"></el-input>
          </el-form-item>

          <el-form-item label="跳转至:" v-show="(+form.pushIntent===2) ? true:false">
            <el-select v-model="form.activitiesInfoId" style="width:360px" placeholder="请选择" clearable>
              <el-option
                v-for="(item,index) in activtyRelation"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
          </el-form-item>
        </div>

      </el-form-item>

    </div>

    <el-form-item>
      <el-button type="primary" @click="resetForm">清空</el-button>
      <el-button type="primary" @click="saveData">保存</el-button>
      <el-button @click="goBack">返回</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
  export default {
    name: 'message-inform'
  }
</script>

<style scoped>

</style>
