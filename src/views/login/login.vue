<template>
  <div class="login">
    <div class="flex a-c j-b">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <a style="color: #c3a9f6" @click="isPwdLogin = !isPwdLogin">
        {{ isPwdLogin ? '切换验证码登录' : '切换密码登录' }}
      </a>
    </div>

    <div class="icon-box">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinle3"></use>
      </svg>
    </div>

    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="phone" autofocus name="phone" label="手机号" placeholder="请输入手机号" />
        <!-- 验证码登录 -->
        <van-field v-show="!isPwdLogin" v-model="captcha" center clearable name="captcha" label="短信验证码"
          placeholder="请输入短信验证码">
          <template #extra>
            <van-button v-show="send" size="small" color="#C3A9F6" @click="verifyPhone">发送验证码</van-button>
            <a style="color: #c3a9f6" v-show="!send" v-if="resend" @click="verifyPhone">重新发送</a>
            <div v-else>{{ count }}s</div>
          </template>
        </van-field>
        <!-- 密码登录 -->
        <van-field v-show="isPwdLogin" v-model="password" type="password" name="password" label="密码"
          placeholder="请输入密码" />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block color="#C3A9F6" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Toast } from 'vant'
import { sentCaptcha, verifyCaptcha, loginCellphone } from 'api/api.js'
import { useRouter } from 'vue-router'
import md5 from 'js-md5';
import { useStore } from 'vuex'
import storage from 'utils/storage.js';
export default {
  setup () {
    const phone = ref('13789912055') // 手机号
    const captcha = ref('') // 验证码
    const send = ref(true) // 发送验证码
    const resend = ref(true) // 重复发送验证码
    const count = ref(0) // 倒计时
    const isPwdLogin = ref(false) // 是否切换密码登录
    const password = ref('531723263') // 密码
    const router = useRouter()
    const store = useStore()

    const verifyPhone = () => {
      if (!phone.value) {
        Toast({ message: '请输入手机号', position: 'bottom' })
      } else if (/^1[3456789]\d{9}$/.test(phone.value) === false) {
        Toast({ message: '请输入正确的手机号', position: 'bottom' })
      } else {
        send.value = false
        sendCaptcha()
      }
    }

    let timer = ref(null)
    const sendCaptcha = async () => {
      // 1.发送验证码
      const TIME_COUNT = 60
      if (!timer) {
        count.value = TIME_COUNT
        resend.value = false
        timer = setInterval(() => {
          if (count.value == 0) {
            resend.value = true
            captcha.value = ''
            clearInterval(timer)
            timer = null
            return
          }
          count.value--
        }, 1000)
      } else {
        resend.value = true
        captcha.value = ''
        clearInterval(timer)
        timer = null
      }

      // 2.倒计时
      const data = await sentCaptcha(phone.value)
      let msg = ''

      if (data.code === 200) msg = '已发送验证码'
      else msg = data.message
      Toast({ message: msg, position: 'bottom' })
      console.log(data)
    }

    const onSubmit = async (values) => {
      // console.log('submit', values);
      try {
        let data = null
        let msg = ''
        if (!isPwdLogin.value) { // 不是密码登录及短信登录
          if (!values.phone || !values.captcha) {
            Toast({ message: '请输入手机号或验证码', position: 'bottom' })
            return
          }
          const res = await loginCellphone({ phone: values.phone, captcha: values.captcha })
          data = res
        } else { // 密码登录
          if (!values.phone || !values.password) {
            Toast({ message: '请输入手机号或密码', position: 'bottom' })
            return
          }
          const res = await loginCellphone({ phone: values.phone, md5_password: md5(values.password) })
          data = res
        }

        console.log('data', data);
        if (data.code === 200) {
          store.dispatch('userInfo/setInfo', data);
          // 将数据存储在本地
          storage.set('userInfo', data)
          router.replace({ path: '/home' })
          msg = '登录成功'
        } else {
          msg = data.message
        }
        Toast({ message: msg, position: 'bottom' })

      } catch (error) {
        captcha.value = ''
        const msg = error.response.data.message
        Toast({ message: msg, position: 'bottom' })
      }

    }

    return {
      phone,
      captcha,
      send,
      resend,
      count,
      isPwdLogin,
      password,
      onSubmit,
      verifyPhone
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  margin: 20px 10px;
}

.icon-box {
  @include flexC();
  margin: 20px 0;
}

.icon {
  width: 120px;
  height: 120px;
}
</style>