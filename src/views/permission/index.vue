<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <!-- <template v-slot:after></template> -->
        <el-button slot="after" type="primary" size="small">添加权限</el-button>
      </page-tools>
      <!-- 表格 -->
      <el-table border="">
        <el-table-column align="center" label="名称" />

        <el-table-column align="center" label="标识" />

        <el-table-column align="center" label="描述" />

        <el-table-column align="center" label="操作">
          <template>
            <el-button type="text" size="small">添加</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
