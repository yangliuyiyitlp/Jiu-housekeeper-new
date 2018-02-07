<template>
  <div>
    <div id="myChart" :style="{'width':'900px', 'height':'400px', 'margin-top':'10px'}"></div>
  </div>
</template>
<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/line')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  require("echarts/lib/component/legendScroll");
  export default {
    props:{
      text:String,
      dataString:Array,
      dataContent:Array,
      seriesContent:Array
    },
    data(){
      return{

      }
    },
    mounted(){
      this.drawLine()
    },
    methods:{
      drawLine () {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: this.text
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:this.dataString
          },
          grid: {
            left: '3%',
            right: '0%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.dataContent
          },
          yAxis: {
            type: 'value'
          },
          series: this.seriesContent
        })
      }
    }
  }
</script>
