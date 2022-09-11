<template>
    <div>
      {{msg}}
    </div>
</template>

<script>
import * as ec from '@/utils/errorCode' 
export default {
  computed:{
    msg()
    {
      return ec.default[403]
    }
  }
}
</script>

<style>

</style>