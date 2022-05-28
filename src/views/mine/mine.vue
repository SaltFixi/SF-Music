<template>
  <div class="mine">
    <topNav title="我的">
      <template #rg>
        <div style="color:#aaa;">
          <van-icon name="envelop-o" style="margin-right:20px;" />
          <van-icon name="setting-o" />
        </div>
      </template>
    </topNav>

    <div class="flex a-c c-p" style="margin:25px 0" v-if="!loginState" @click="$router.push({ name: 'login' })">
      <div class="userIcon">
        <i class="iconfont icon-icon-user"></i>
      </div>
      <h3 style="margin-left:10px">未登录</h3>
    </div>


    <IconList :data="mineList1" FontBackground="#A3B4FD" class="mineList1" />
    <IconList :data="mineList2" FontBackground="#A3B4FD" class="mineList2" />

    <div style="margin:20px 0">
      <h3>我的视频彩铃</h3>
    </div>

    <Footer />
  </div>
</template>

<script>
import topNav from 'coms/Layout/topNav.vue';
import Footer from 'coms/Layout/Footer.vue';
import IconList from 'coms/IconList/IconList.vue';
import { mineList1, mineList2 } from 'icon/iconList.js';
import { mapState } from 'vuex';
export default {
  components: {
    Footer,
    topNav,
    IconList
  },
  computed: {
    ...mapState('userInfo', ['loginState'])
  },
  data () {
    return {
      mineList1,
      mineList2
    }
  },
  mounted () {
    console.log(this.loginState);
  }
};
</script>

<style lang="scss" scoped>
.mine {
  padding: 15px;
  height: 90vh;
  background-color: #fbf6f6;
}

.userIcon {
  @include flexC();
  width: 50px;
  height: 50px;
  color: #fff;
  border-radius: 50%;
  background-color: #f6e4e4;
}

.mineList1,
.mineList2 {
  width: 100%;
  height: 90px;
  border-radius: 8px;
  background-color: #fff;
  margin-bottom: 10px;
}
</style>