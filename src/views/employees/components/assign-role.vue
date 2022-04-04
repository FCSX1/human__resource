<template>
  <el-dialog title="分配角色" :visible="showDialog">
    <!-- 多选框组 -->
    <el-checkbox-group>
      <!-- 要循环的选项 -->

    </el-checkbox-group>
    <!-- 定义footer的插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      // 用户的id 当前要处理的那个用户的id
      type: String,
      default: null,
      required: true // 要求必须传该id
    }
  }
}
</script>

<style>

</style>
