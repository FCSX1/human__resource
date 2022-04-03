<template>
  <div>
    <!-- 给action一个#号 就不会报错了 -->
    <!-- file-list是上传的文件列表 可以绑定到上传组件上，让上传组件来显示 -->
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
      :class="{ disabled : fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img
        :src="imgUrl"
        alt=""
        style="width:100%"
      >
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [{ url: 'https://img0.baidu.com/it/u=178892670,2966992691&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400' }],
      showDialog: false,
      imgUrl: ''
    }
  },
  computed: {
    // 如果它为true 表示就不应该显示 + 号上传了
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    // 点击预览事件
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    }
  }
}
</script>

<style scoped>
.disabled .el-upload--picture-card {
    display: none;
}
</style>
