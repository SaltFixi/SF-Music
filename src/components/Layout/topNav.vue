<template>
  <header class="header">
    <h2>
      <slot name="lf">{{ title }}</slot>
    </h2>
    <div class="c-p">
      <slot name="rg">
        <van-icon name="search" @click="search" />
      </slot>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '推荐'
    }
  },
  methods: {
    search () {
      this.$router.push({ name: 'search' })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  @include flexSb();
  margin: 10px 0;
  cursor: pointer;

  h2 {
    padding-bottom: 3px;
    border-bottom: 3px solid #7eb8ed;
  }
}
</style>
