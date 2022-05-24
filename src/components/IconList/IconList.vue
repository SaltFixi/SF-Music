<template>
  <div class="icon-list">
    <ul>
      <li v-for="(item, index) in data" :key="index">
        <i class="iconfont" :class="[{ small: size === 'small' }, item.icon]"
          :style="{ background: FontBackground, '-webkit-background-clip': 'text' }"></i>
        <span :style="{ color: textColor }">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      require: true
    },
    textColor: {
      type: String,
      default: '#666'
    },
    // 字体图标背景色默认是花里胡哨的渐变色
    FontBackground: {
      type: String
    },
    // size默认是中等大小，还有一种是small
    size: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-list {
  ul {
    @include flexSa();

    li {
      @include flexSb();
      flex-direction: column;
      cursor: pointer;
    }
  }
}

.iconfont {
  // 混入图标颜色
  @include icon();
}

.small {
  font-size: 23px;
}
</style>