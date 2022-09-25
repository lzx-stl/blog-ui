<template>
  <div class="login-container">
    <div class="login-zone">
      <login-form></login-form>
    </div>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue'

export default {
  components: {
    LoginForm
  }
}
</script>

<style lang="scss">
.login-container {
  height: 100vh;
  overflow: hidden;
  background-image: url('https://w.wallhaven.cc/full/l3/wallhaven-l3r3zr.jpg');
  background-size: 100% 100%;
  .login-zone {
    float: right;
    margin: 150px;
    width: 450px;
    box-sizing: content-box;
    // padding: 20px;
  }
}
</style>