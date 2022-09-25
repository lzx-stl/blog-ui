<template>
  <div>
    登录成功，正在转接中...
  </div>
</template>
<script>
import { getBack, setToken } from '@/utils/auth'
export default {
  name: 'AuthRedirect',
  mounted() {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    setToken(token)
    setTimeout(() => {
      this.$router.replace(getBack())
    }, 500)
  },
  render: function (h) {
    return h() // avoid warning message
  }
}
</script>
