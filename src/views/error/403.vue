<template>
    <div>
      <el-image :src="url" alt=""></el-image>
    </div>
</template>

<script>
import * as ec from '@/utils/errorCode' 
import {getData} from '@/api/article'
export default {
  computed:{
    // msg()
    // {
    //   return ec.default[403]
    // }
  
  },
  data()
  {
    return {
      url: '',
    }
  },
  mounted()
  {
    getData().then(res => {
      this.url = res
    })
  }
}
</script>

<style>

</style>