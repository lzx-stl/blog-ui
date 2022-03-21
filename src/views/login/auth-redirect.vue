<template>
  <div>
    登录成功，正在转接中, 本页面1s后自动关闭
  </div>
</template>
<script>
import {getToken, setToken} from "../../utils/auth";
export default {
  name: 'AuthRedirect',
  created() {
    const params = new URLSearchParams(window.location.search);
    console.log(window.location.search);
    const token = params.get('token');
    if (window.localStorage) {
      setToken(token);
      window.opener.location.reload();//刷新父窗口
      setTimeout(()=>{
        window.close()
      }, 1000)
    }
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
