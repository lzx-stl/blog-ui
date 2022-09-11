<template>
  <div>
    登录成功，正在转接中...
  </div>
</template>
<script>
import { setToken } from '@/utils/auth'
export default {
  name: 'AuthRedirect',
  mounted() {
    const params = new URLSearchParams(window.location.search)
    console.log(window.location.search)
    const token = params.get('token')
    setToken(token)    

    setTimeout(()=>{
      window.close();
    }, 1000)
  },
  render: function (h) {
    return h() // avoid warning message
  }
}
</script>
