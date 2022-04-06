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
    <!-- 新建编辑弹层 -->
    <el-dialog :visible="showDialog" title="新增编辑">
      <!-- 表单 -->
      <el-form label-width="120px">
        <el-form-item label="名称">
          <el-input
            v-model="formData.name"
            style="width: 90%"
          />
        </el-form-item>

        <el-form-item label="标识">
          <el-input
            v-model="formData.code"
            style="width: 90%"
          />
        </el-form-item>

        <el-form-item label="描述">
          <el-input
            v-model="formData.description"
            style="width: 90%"
          />
        </el-form-item>

        <el-form-item label="开启">
          <!-- 当值为1时 激活 当值为0时 不激活 -->
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            :inactive-value="0"
            style="width: 90%"
          />
        </el-form-item>
      </el-form>
      <!-- 底部的确定和取消 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button
            type="primary"
            size="small"
          >
            确定
          </el-button>

        </el-col>
        <el-col :span="6">
          <el-button>
            取消
          </el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
export default {
  data() {
    return {
      list: [],
      showDialog: true,
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到了那个节点下
        enVisible: '0' // 开门
      }
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async  getPermissionList() {
      // 将数据转化成了 带chilren的树形结构
      this.list = tranListToTreeData(await getPermissionList(), '0')
    }
  }
}
</script>

<style>

</style>
