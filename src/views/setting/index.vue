<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 放置内容 -->
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <!-- 左侧的内容 -->
            <el-row style="height: 60px">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
              >新增角色</el-button>
            </el-row>
            <el-table border="">
              <el-table-column label="序号" width="120px" />
              <el-table-column label="名称" width="240px" />
              <el-table-column label="描述" />
              <el-table-column label="操作">
                <el-button size="small" type="success">分配权限</el-button>

                <el-button size="small" type="primary">编辑</el-button>

                <el-button size="small" type="danger">删除</el-button>
              </el-table-column>
            </el-table>
            <!-- 放置分页组件 -->
            <el-row
              type="flex"
              justify="center"
              style="height: 60px"
              align="middle"
            >
              <el-pagination layout="prev,pager,next" />
            </el-row>
          </el-tab-pane>
          <el-tab-pane alo label="公司信息">
            <!-- 右侧的内容 -->
            <el-alert type="info" :show-icon="true" :closable="false" title="对公司名、公司地址、营业执照、公司地区的更新，将使得公司资料被重叠审核，请谨慎修改" />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="企业名称">
                <el-input disabled style="width: 400px" />
              </el-form-item>

              <el-form-item label="公司地址">
                <el-input disabled style="width: 400px" />
              </el-form-item>

              <el-form-item label="公司电话">
                <el-input disabled style="width: 400px" />
              </el-form-item>

              <el-form-item label="邮箱">
                <el-input disabled style="width: 400px" />
              </el-form-item>

              <el-form-item label="备注">
                <el-input type="textarea" :rows="3" disabled style="width: 400px" />
              </el-form-item>
            </el-form>
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
