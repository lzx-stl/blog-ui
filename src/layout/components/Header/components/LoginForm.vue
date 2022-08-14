<template>
  <div class="login-form-container">
    <div class="login-box">

      <div class="login-box-bottom">
        <div class="login-third">
          <p>其他登录方式</p>
          <div class="login-third-items">
            <svg class="icon"
                 @click="login('gitee')"
                 aria-hidden="true">
              <use xlink:href="#icon-gitee"></use>
            </svg>
            <svg class="icon"
                 @click="login('qq')"
                 aria-hidden="true">
              <use xlink:href="#icon-QQ"></use>
            </svg>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'

import Cookies from 'js-cookie'
import { setToken } from '@/utils/auth'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import openWindow from '@/utils/open-window'

export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        username: '',
        password: '',

        rememberMe: false
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', tirgger: 'blur' }
          // { min: 5, max: 10, message: '长度在5到10个字符', tirgger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', tirgger: 'blur' }
          // { min: 5, max: 10, message: '长度在5到10个字符', tirgger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCookie()
  },
  methods: {
    getCookie() {
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      this.form = {
        username: username === undefined ? this.form.username : username,
        password: password === undefined ? this.form.password : password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      }
    },
    goto(url) {
      const { href } = this.$router.resolve({ path: '/register' })
      window.open(href, '_blank')
    },
    login(source) {
      login(source).then((res) => {
        let son = openWindow(res, '', 800, 600)
        var loop = setInterval(function () {
          if (son.closed) {
            clearInterval(loop)
            window.location.reload()
          }
        }, 1000)
      })
      // console.log(this.form)
      // this.$refs.loginFormRef.validate(async (valid) => {
      //   if (!valid) return
      //   login(this.form).then((res) => {
      //     if (this.form.rememberMe) {
      //       Cookies.set('username', this.form.username, { expires: 30 })
      //
      //       Cookies.set('password', this.form.password, {expires: 30})
      //       Cookies.set('rememberMe', this.form.rememberMe, {expires: 30})
      //     } else {
      //       Cookies.remove('username')
      //       Cookies.remove('password')
      //       Cookies.remove('rememberMe')
      //     }
      //     window.localStorage.setItem('token', JSON.stringify(res.token))
      //     console.log(res)
      //     window.localStorage.setItem('uid', res.user.id)
      //     this.$router.replace('/back')
      //   })
      // })
    }
  }
}
</script>

<style lang="scss">
.login-form-container {
  height: 100%;
  background-image: url('http://r7n2cvhum.hn-bkt.clouddn.com/d0382a8ae8eab0b0dd9747e4323ecbe91645329737127.jpeg');
  background-size: 100% 100%;
  background-color: #f5f5f5;
  overflow: hidden;
  .login-box {
    position: relative;

    width: 100%;
    height: 260px;
    margin: 0 auto;
    background-color: #fff;
    .login-box-bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      border-bottom-left-radius: 2px;
      border-bottom-right-radius: 2px;
      box-sizing: border-box;
      padding: 0 24px 24px;
      font-size: 12px;
      color: #555666;
      .login-third {
        text-align: center;
        .login-third-items {
          padding-top: 20px;
          position: relative;
          margin-left: 16px;
          .login-third-item {
            height: 40px;
            background-color: #409eff;
            // background-image: url("https://wiki.connect.qq.com/wp-content/uploads/2016/12/Connect_logo_1.png");
            // background-size: 100% 100%;
          }
        }
      }

      .icon {
        font-size: 30px;
        cursor: pointer;
        margin-right: 30px;
      }
    }
  }
}

.login-form {
  margin: 100px auto;
  width: 300px;
}

.login-form .el-form-item {
  width: 100%;
  height: auto;
}
</style>
