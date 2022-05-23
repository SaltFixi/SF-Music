<template>
  <div class="promotion">
    <div class="promotion-lf">
      <i class="iconfont icon-xuanchuantuiguang"></i>
      <span class="promotion-title">推广活动</span>
    </div>
    <span class="promotion-rg">喜马拉雅畅听包，享专属流量任性听歌 》</span>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.icon-xuanchuantuiguang {
  font-size: 16px;
}

.promotion {
  @include flexSb();
  margin: 20px 0;
  height: 35px;
  line-height: 35px;
  background-color: #f7f9f8;
  border-radius: 15px;

  .promotion-title {
    margin-left: 10px;
    font-weight: 500;
    font-size: 15px;
  }

  .promotion-rg {
    font-size: 10px;
    color: #aaa;
  }
}

.iconfont {
  @include icon();
}
</style>