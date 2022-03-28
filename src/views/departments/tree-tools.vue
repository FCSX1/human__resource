<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px;width: 100%"
  >
    <el-col>
      <!-- 左侧内容 -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <!-- 放置下拉菜单 -->
        <el-col>
          <el-dropdown @command="operateDepts">
            <!-- 内容 -->
            <span>操作
              <i class="el-icon-arrow-down" />
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- 右侧内容 -->
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    // 定义传入的属性
    treeNode: {
      required: true, // 对象类型
      type: Object // 要求对方使用您的组件的时候，必须传treeNode属性，如果不传 就会报错
    },
    isRoot: {
      type: Boolean,
      default: false
    }

  },
  methods: {
    // 点击  编辑  删除  新增时触发
    operateDepts(type) {
      if (type === 'add') {
        // 添加了部门
      } else if (type === 'edit') {
        // 编辑部门
      } else {
        // 删除部门
      }
    }
  }
}
</script>

<style>

</style>
