<template>
  <div class="login-form-container">

  </div>
</template>

<script>
import { login } from '@/api/user'

import Cookies from 'js-cookie'

import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
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
    login() {
      login().then(res =>{
        window.open(
            res
            ,'', 'width=804,height=610,top=120,left=150')
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

<style>
.login-form-container {
  height: 100%;
  background-image: url("http://r7n2cvhum.hn-bkt.clouddn.com/d0382a8ae8eab0b0dd9747e4323ecbe91645329737127.jpeg");
  background-size: 100% 100%;
  overflow: hidden;
}

.login-form{
  margin: 100px auto;
  width: 300px;
}

.login-form .el-form-item{
  width: 100%;
  height: auto;
}



</style>
