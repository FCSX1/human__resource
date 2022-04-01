<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 放置一个el-card -->
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置内容 -->
            <el-form label-width="120px">
              <el-form-item label="用户名">
                <el-input style="width: 300px" />
              </el-form-item>

              <el-form-item label="密码">
                <el-input style="width: 300px" type="password" />
              </el-form-item>

              <el-form-item>
                <el-button type="primary">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="个人详情">
            <!-- 放置内容 -->
          </el-tab-pane>

          <el-tab-pane label="岗位信息">
            <!-- 放置内容 -->
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
