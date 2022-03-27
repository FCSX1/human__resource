<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容-头部 -->
      <el-card>
        <!-- 放置结构内容 -->
        <el-row type="flex" justify="space-between">
          <el-col>
            <!-- 左侧内容 -->
            <span>xxxxxxxxxxxxxxxx</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <!-- 放置下拉菜单 -->
              <el-col>
                <el-dropdown>
                  <!-- 内容 -->
                  <span>操作
                    <i class="el-icon-arrow-down" />
                  </span>
                  <!-- 具名插槽 -->
                  <el-dropdown-menu slot="dropdown">
                    <!-- 下拉选项 -->
                    <el-dropdown-item>
                      添加子部门
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
            <!-- 右侧内容 -->
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.tree-card{
  padding: 30px 140px;
  font-size: 14px;
}
</style>
