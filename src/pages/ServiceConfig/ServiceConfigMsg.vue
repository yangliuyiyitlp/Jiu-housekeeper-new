<template>
  <div class="padding">
    <p class="left">通道名</p>
    <p>权重<i>{{resultNum}}</i></p>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <div>
        <el-form-item>
          <el-select v-model="formInline.name" clearable class="name">
            <el-option label="亿美" value="1"></el-option>
            <el-option label="聚合" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-button class="prevent" @click="numReduce">-</el-button>
        <input type="text" class="num" v-model="num">
        <el-button class="prevent" @click="numAdd">+</el-button>
        <el-progress :text-inside="true" :stroke-width="20" :percentage="num"></el-progress>
      </div>
      <div>
        <el-form-item>
          <el-select v-model="formInline.nameTwo" clearable class="name">
            <el-option label="亿美" value="1"></el-option>
            <el-option label="聚合" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-button class="prevent" @click="numReduceTwo">-</el-button>
        <input type="text" class="num" v-model="numTwo">
        <el-button class="prevent" @click="numAddTwo">+</el-button>
        <el-progress :text-inside="true" :stroke-width="20" :percentage="numTwo"></el-progress>
      </div>
      <!--<div>-->
      <!--<input type="text" v-model="nameThree" class="name">-->
      <!--<el-button class="prevent" @click="numReduceThree">-</el-button>-->
      <!--<input type="text" class="num" v-model="numThree">-->
      <!--<el-button class="prevent" @click="numAddThree">+</el-button>-->
      <!--<el-progress :text-inside="true" :stroke-width="18" :percentage="numThree"></el-progress>-->
      <!--</div>-->
      <!--<div>-->
      <!--<input type="text" v-model="nameFour" class="name">-->
      <!--<el-button class="prevent" @click="numReduceFour">-</el-button>-->
      <!--<input type="text" class="num" v-model="numFour">-->
      <!--<el-button class="prevent" @click="numAddFour">+</el-button>-->
      <!--<el-progress :text-inside="true" :stroke-width="18" :percentage="numFour"></el-progress>-->
      <!--</div>-->
      <!--<div>-->
      <!--<input type="text" v-model="nameFive" class="name">-->
      <!--<el-button class="prevent" @click="numReduceFive">-</el-button>-->
      <!--<input type="text" class="num" v-model="numFive">-->
      <!--<el-button class="prevent" @click="numAddFive">+</el-button>-->
      <!--<el-progress :text-inside="true" :stroke-width="18" :percentage="numFive"></el-progress>-->
      <!--</div>-->
    </el-form>
    <div class="btn">
      <el-button type="primary" @click="submit(form)">提交</el-button>
    </div>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        resultName: 0,
        resultNum: 0,
        formInline: {
          name: '0',
          nameTwo: '0'
        },
        num: 0,
        numTwo: 0
//        nameThree: '',
//        numThree: 0,
//        nameFour: '',
//        numFour: 0,
//        nameFive: '',
//        numFive: 0
      }
    },
    watch: {
      num (val) {
        if (typeof (val) !== Number && val !== '') {
          this.num = parseInt(val)
        } else if (val === '') {
          this.num = 0
        }
        this.resultNum = this.num + this.numTwo
      },
      numTwo (val) {
        if (typeof (val) !== Number && val !== '') {
          this.numTwo = parseInt(val)
        } else if (val === '') {
          this.numTwo = 0
        }
        this.resultNum = this.num + this.numTwo
      }
//      numThree (val) {
//        if (typeof (val) !== Number && val !== '') {
//          this.numThree = parseInt(val)
//        } else if (val === '') {
//          this.numThree = 0
//        }
//        this.resultNum = this.num + this.numTwo + this.numThree + this.numFour + this.numFive
//      },
//      numFour (val) {
//        if (typeof (val) !== Number && val !== '') {
//          this.numFour = parseInt(val)
//        } else if (val === '') {
//          this.numFour = 0
//        }
//        this.resultNum = this.num + this.numTwo + this.numThree + this.numFour + this.numFive
//      },
//      numFive (val) {
//        if (typeof (val) !== Number && val !== '') {
//          this.numFive = parseInt(val)
//        } else if (val === '') {
//          this.numFive = 0
//        }
//        this.resultNum = this.num + this.numTwo + this.numThree + this.numFour + this.numFive
//      },
//      name (val, old) {
//        this.resultName = valChange(this.resultName, val, old)
//      },
//      nameTwo (val, old) {
//        this.resultName = valChange(this.resultName, val, old)
//      },
//      nameThree (val, old) {
//        this.resultName = valChange(this.resultName, val, old)
//      },
//      nameFour (val, old) {
//        this.resultName = valChange(this.resultName, val, old)
//      },
//      nameFive (val, old) {
//        this.resultName = valChange(this.resultName, val, old)
//      }
    },
    methods: {
      numReduce () {
        if (this.num >= 10) {
          this.num -= 10
        }
      },
      numAdd () {
        if (this.num <= 90) {
          this.num += 10
        }
      },
      numReduceTwo () {
        if (this.numTwo >= 10) {
          this.numTwo -= 10
        }
      },
      numAddTwo () {
        if (this.numTwo <= 90) {
          this.numTwo += 10
        }
      },
//      numReduceThree () {
//        if (this.numThree >= 10) {
//          this.numThree -= 10
//        }
//      },
//      numAddThree () {
//        if (this.numThree <= 90) {
//          this.numThree += 10
//        }
//      },
//      numReduceFour () {
//        if (this.numFour >= 10) {
//          this.numFour -= 10
//        }
//      },
//      numAddFour () {
//        if (this.numFour <= 90) {
//          this.numFour += 10
//        }
//      },
//      numReduceFive () {
//        if (this.numFive >= 10) {
//          this.numFive -= 10
//        }
//      },
//      numAddFive () {
//        if (this.numFive <= 90) {
//          this.numFive += 10
//        }
//      },
      submit (form) {
        if (parseInt(this.formInline.name) <= 0 && parseInt(this.formInline.nameTwo) <= 0) {
          alert('请输入通道名')
          return false
        }
        if (this.resultNum <= 0) {
          alert('请输入占比')
          return false
        }
        if (this.resultNum >= 100) {
          alert('通道占比总和不能超过100')
          return false
        }
        this.$ajax.get('service/config/msg/', {params: this.formInline})
          .then()
          .catch()
      }
    }
  }

  //  function valChange (resultName, val, old) {
  //    if (val !== '' && old === '') {
  //      resultName += 1
  //    } else if (val === '' && old !== '') {
  //      resultName -= 1
  //    }
  //    return resultName
  //  }
</script>
<style scoped>
  .padding {
    padding-top: 100px;
    margin-left: 20%;
    width: 600px;
  }

  i {
    background-color: #ff4949;
    height: 15px;
    line-height: 15px;
    border-radius: 50%;
    color: #fff;
    display: inline-block;
    font-size: 8px;
    font-weight: 400;
    top: 8px;
    position: absolute;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    text-align: center;
  }

  .del {
    float: right;
    border-radius: 10px;
    background-color: #20a0ff;
    border: 1px solid #20a0ff;
    color: #fff;
    margin-left: 20px;
  }

  .prevent {
    height:36px;
    padding: 3px 10px;
  }

  .left {
    float: left;
    margin-right: 110px;
    text-align: center;
    width: 100px;
  }

  .btn {
    margin-top: 40px;
    text-align: right;
  }

  p {
    font-size: 20px;
    font-weight: 900;
    position: relative;
  }

  .el-progress {
    width: 200px;
    float: right;
  }

  .el-progress-bar__inner {
    background-color: #13ce66;
  }

  .num {
    width: 50px;
    text-align: center;
    height:30px;
  }

  button {
    cursor: pointer;
  }

  .name {
    width: 100px;
    height: 20px;
    text-align: center;
    margin-right: 72px;
  }
</style>
