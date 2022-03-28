<template>
  <!-- 放置弹出组件 -->
  <el-dialog title="新增部门" :visible="true">
    <!-- 表单数据 label-width设置标题的宽度 -->
    <el-form label-width="120px">
      <el-form-item label="部门名称">
        <el-input style="width:80%" placeholder="1-50个字符">
          <!--  -->
        </el-input>
      </el-form-item>

      <el-form-item label="部门编码">
        <el-input style="width:80%" placeholder="1-50个字符">
          <!--  -->
        </el-input>
      </el-form-item>

      <el-form-item label="部门负责人">
        <el-select style="width:80%" placeholder="请选择">
          <!--  -->
        </el-select>
      </el-form-item>

      <el-form-item label="部门介绍">
        <el-input style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- 确认和消息 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small">取消</el-button>
        <el-button size="small" type="primary">确认</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {

}
</script>

<style>

</style>
