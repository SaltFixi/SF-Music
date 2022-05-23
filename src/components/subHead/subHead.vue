<template>
  <header class="subHead">
    <h2 class="title">{{ title }}</h2>
    <div class="arrow" @click="$emit('handleMore')">
      <van-icon name="arrow" size="14" />
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  },
}
</script>

<style lang="scss" scoped>
.subHead {
  @include flexSb();
  height: 30px;
  line-height: 30px;

  .arrow {
    display: flex;
    justify-content: end;
    align-items: center;
    padding-right: 5px;
    height: 18px;
    width: 38px;
    border: 1px solid #ddd;
    border-radius: 10px;
    z-index: 10;
  }

}
</style>
