<template>
  <div>
    <!-- 给action一个#号 就不会报错了 -->
    <!-- file-list是上传的文件列表 可以绑定到上传组件上，让上传组件来显示 -->
    <!-- upload组件显示的是file-list -->
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :file-list="fileList"
      :class="{ disabled: fileComputed }"
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
    },
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid) // 将当前的删除文件排除在外
    //   this.fileList = fileList  // 两种方式都可
    },
    // 这里不能用push 这个钩子会执行多次
    changeFile(file, fileList) {
      // file是当前的文件  fileList是当前的最新数组 this.fileList
      this.fileList = fileList.map(item => item)
      // this.fileList = fileList.map(item => item) 这里为什么暂时不成功？ 因为现在还没有上传 所有第二次进来的数据 一定是个空的
      // 如果完成上传动作了 第一次进入 和第二次进去的fileList的长度应该都是1 应该都有数据
      // 上传成功 => 数据才能进来 => 腾讯云cos
    }
  }
}
</script>

<style >
.disabled .el-upload--picture-card {
  display: none
}
</style>
