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
              <!-- v-if="checkPermission('departments')" -->
              <el-dropdown-item

                command="add"
              >添加子部门</el-dropdown-item>
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
import { delDepartments } from '@/api/departments'
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
        // 添加子部门
        // 添加子部门 在当前点击的部门下 添加子部门 => this.treeNode就是当前点击的部门
        this.$emit('addDepts', this.treeNode) // 触发自定义事件 告诉父组件 显示弹层
      } else if (type === 'edit') {
        // 编辑部门
        this.$emit('editDepts', this.treeNode) // 触发自定义事件 点击谁 编辑谁
      } else {
        // 删除部门
        this.$confirm('确认删除吗?').then(() => {
          return delDepartments(this.treeNode.id) // 返回promise对象
        }).then(() => {
          // 只需要等到成功的时候 调用接口删除  后端数据变化了  但是前端没变   重新获取
          this.$emit('delDepts') // 触发自定义事件
          this.$message.success('删除部门成功')
        })
      }
    }
  }
}
</script>

<style>

</style>
