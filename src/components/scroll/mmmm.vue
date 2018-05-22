<template>
  <div class="list" ref="scroll">
    <div class="content">
      <div v-for="item in rows" class="row">{{item}}</div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      rows: []
    };
  },
  methods: {
    initRows() {
      for (let index = 0; index < 100; index++) {
        this.rows.push(index + "行");
      }
    },
    initScroll() {
      this.$nextTick(() => {
        //注意此处是 this.$refs.xxx
        this.nenuScroll = new BScroll(this.$refs.scroll, {
          click: true,
          pullDownRefresh: {
            threshold: 80,
            stop: 40
          },
          pullUpLoad: {
            threshold: 0,
            moreTxt: "加载更多",
            noMoreTxt: "没有更多数据了",
          }
        });
        this.nenuScroll.on("pullingDown", () => {
          console.log('pullingDown');
        });
        this.nenuScroll.on("pullingUp", () => {
          console.log('pullingUp');
        });
      });
    }
  },
  mounted() {
    this.initRows();
    this.initScroll();
  }
};
</script>

<style lang="stylus" scoped>
.list {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .content {
    .row {
      display: block;
      width: 100%;
      height: 40px;
      background-color: #f1f2f3;
      border-bottom: 1px solid #e5e5e5;
    }
  }
}
</style>

