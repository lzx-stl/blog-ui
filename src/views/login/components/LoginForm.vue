<template>
  <div class="login-form-container">
    <!-- <div class="login-box">
      <el-form :model="form"
               class="login-form">
        <el-form-item>
          <el-input v-model="form.username"
                    placeholder="请输入用户名"
                    prefix-icon="el-icon-user">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password"
                    v-model="form.password"
                    prefix-icon="el-icon-lock"
                    placeholder="请输入密码"
                    show-password
                    style="user-select:none"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.rememberMe">记住我</el-checkbox>
          <el-button type="primary">登录</el-button>
        </el-form-item>
      </el-form>

    </div> -->
    <div class="login-box-bottom">

      <div class="login-third">

        <p>登录方式</p>
        <div class="login-third-items">
          <div class="login-third-item"
               v-for="icon in icons"
               :key="icon.name">
            <svg class="icon"
                 @click="login(icon.source)"
                 aria-hidden="true">
              <use :xlink:href="icon.class"></use>
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
import { setBack, setToken } from '@/utils/auth'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import openWindow from '@/utils/open-window'

export default {
  name: 'LoginForm',
  data() {
    return {
      icons: [
        {
          source: 'github',
          class: '#icon-github'
        },
        {
          source: 'gitee',
          class: '#icon-gitee'
        },
        {
          source: 'qq',
          class: '#icon-QQ'
        }
      ],
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
      // const username = Cookies.get('username')
      // const password = Cookies.get('password')
      // const rememberMe = Cookies.get('rememberMe')
      // this.form = {
      //   username: username === undefined ? this.form.username : username,
      //   password: password === undefined ? this.form.password : password,
      //   rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      // }
    },
    goto(url) {
      const { href } = this.$router.resolve({ path: '/register' })
      window.open(href, '_blank')
    },
    login(source) {
      login(source).then((res) => {
        window.location.href = res
        // let son = openWindow(res, '', 600, 400)
        // let that = this
        // var loop = setInterval(function () {
        //   if (son.closed) {
        //     clearInterval(loop)
        //     //判读登录状态
        //     window.location.reload()
        //   }
        // }, 1000)
      })
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
  background-color: #fff;
  opacity: 0.95;
  border-radius: 3px;
  
    padding: 50px 40px;
  .login-box {
    display: flex;
    justify-content: center;

    background-color: #fff;

    .login-form {
      // width: 380px;
      width: 100%;
      .el-form-item {
        .el-input,
        .el-button {
          width: 100%;
        }
      }
    }
  }

  .login-box-bottom {
    // position: absolute;
    // bottom: 0;
    // width: 100%;
    // border-bottom-left-radius: 2px;
    // border-bottom-right-radius: 2px;
    // box-sizing: border-box;
    // padding: 0 24px 24px;
    font-size: 12px;
    color: #555666;
    .login-third {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .login-third-items {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 20px;
        .login-third-item {
          padding: 0 20px;
        }
      }
    }

    .icon {
      font-size: 30px;
      cursor: pointer;
      // margin-right: 30px;
    }
  }
}
</style>
