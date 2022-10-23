<template>
    <div>
      <img v-lazy="url" alt=""></img>
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