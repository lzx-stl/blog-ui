<template>
  <div class="success-container">
    <el-col :sm="12"
            :lg="6">
      <el-result icon="success"
                 title="成功提示"
                 subTitle="请根据提示进行操作">
        <template slot="extra">
          <el-button type="primary"
                     size="medium">確定</el-button>
        </template>
      </el-result>
    </el-col>
  </div>

</template>

<script>
export default {
  name: 'Success'
}
</script>

<style>
.success-container{
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 100px auto;
}

.success-container .el-result{

  margin: 0 auto;
}
</style>