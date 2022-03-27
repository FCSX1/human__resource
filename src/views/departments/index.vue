<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容-头部 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
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

        <!-- 放置一个el-tree -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope='obj' 接收传递给插槽的数据 data 是每个节点的数据对象 -->
          <el-row
            slot-scope="{data}"
            type="flex"
            justify="space-between"
            align="middle"
            style="height: 40px;width: 100%"
          >
            <el-col>
              <!-- 左侧内容 -->
              <span>{{ data.name }}</span>
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <el-col>{{ data.manager }}</el-col>
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
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑部门</el-dropdown-item>
                      <el-dropdown-item>删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            <!-- 右侧内容 -->
            </el-col>
          </el-row>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departs: [{
        name: '总裁办',
        manager: '曹贼',
        children: [{ name: '董事会', manager: '小曹贼' }] },
      { name: '行政部', manager: '大耳贼' },
      { name: '人事部', manager: '碧眼贼' }],
      defaultProps: {
        label: 'name', // 表示从这个属性显示内容
        children: 'children' // 从这个属性去找子节点
      }
    }
  }
}
</script>

<style scoped>
.tree-card{
  padding: 30px 140px;
  font-size: 14px;
}
</style>
