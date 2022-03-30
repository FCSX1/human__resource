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
            <!-- 给表格绑定数据 -->
            <el-table border="" :data="list">
              <el-table-column
                header-align="left"
                align="center"
                type="index"
                label="序号"
                width="120px"
              />
              <el-table-column
                align="center"
                prop="name"
                label="名称"
                width="240px"
              />
              <el-table-column
                align="center"
                prop="description"
                label="描述"
              />
              <el-table-column align="center" label="操作">
                <!-- 作用域插槽 -->
                <template slot-scope="{ row }">
                  <el-button size="small" type="success">分配权限</el-button>

                  <el-button
                    size="small"
                    type="primary"
                    @click="editRole(row.id)"
                  >编辑</el-button>

                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteRole(row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 放置分页组件 -->
            <el-row
              type="flex"
              justify="center"
              style="height: 60px"
              align="middle"
            >
              <el-pagination
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                layout="prev,pager,next"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane alo label="公司信息">
            <!-- 右侧的内容 -->
            <!-- 并不是所有的表单都需要 model rules -->
            <el-alert type="info" :show-icon="true" :closable="false" title="对公司名、公司地址、营业执照、公司地区的更新，将使得公司资料被重叠审核，请谨慎修改" />
            <el-form
              label-width="120px"
              style="margin-top: 50px"
            >
              <el-form-item label="企业名称">
                <el-input
                  v-model="formData.name"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>

              <el-form-item label="公司地址">
                <el-input
                  v-model="formData.companyAddress"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>

              <el-form-item label="公司电话">
                <el-input
                  v-model="formData.companyPhone"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>

              <el-form-item label="邮箱">
                <el-input
                  v-model="formData.mailbox"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>

              <el-form-item label="备注">
                <el-input
                  v-model="formData.remarks"
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 放置一个弹层组件 -->
    <el-dialog title="编辑部门" :visible="showDialog">
      <el-form
        :model="roleForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" />
        </el-form-item>

        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <!-- 放置一个footer插槽 -->
      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-button size="small">取消</el-button>
          <el-button type="primary" size="small">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      list: [], // 承接数组
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 10,
        total: 0 // 记录总数
      },
      formData: {
        // 公司信息
      },
      showDialog: false, // 控制弹层显示
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空',
            trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList() // 获取角色列表
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId) // 赋值给formData
    },
    changePage(newPage) {
      // newPage 是当前点击的页码
      this.page.page = newPage // 将当前页码赋值给当前的最新页码
      this.getRoleList()
    },
    async deleteRole(id) {
      // 提示
      try {
        await this.$confirm('确认删除该角色吗')
        // 只有点击了确定 才能进入到下方
        await deleteRole(id) // 调用删除接口
        this.getRoleList() // 重新加载数据
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },
    editRole(id) {
      this.showDialog = true // 显示弹层
    }
  }
}
</script>

<style>

</style>
