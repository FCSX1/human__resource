<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <!-- <template v-slot:after></template> -->
        <el-button slot="after" type="primary" size="small">添加权限</el-button>
      </page-tools>
      <!-- 表格 -->
      <!-- 指定id为唯一属性的标识 -->
      <el-table border :data="list" row-key="id">
        <el-table-column
          label="名称"
          prop="name"
        />

        <el-table-column
          align="center"
          label="标识"
          prop="code"
        />

        <el-table-column
          align="center"
          label="描述"
          prop="description"
        />

        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <!-- 添加按钮只在 访问权的层级显示 当type==1 时才显示添加按钮 -->
            <el-button v-if="row.type === 1" type="text" size="small">添加</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async  getPermissionList() {
      // 记那个数据转化成了 待chilren的树形结构
      this.list = tranListToTreeData(await getPermissionList(), '0')
    }
  }
}
</script>

<style>

</style>
