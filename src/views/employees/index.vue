<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <!-- 左侧显示总记录数 -->
        <!-- <span slot="before">共16条记录</span> -->
        <template v-slot:before>
          <span>共{{ page.total }}条记录</span>
        </template>
        <!-- 右侧显示按钮  excel导入 excel导出 新增员工 -->
        <template v-slot:after>
          <el-button size="small" type="success">excel导入</el-button>
          <el-button size="small" type="danger">excel导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 表格组件 -->
      <el-table v-loading="loading" :data="list">
        <el-table-column type="index" label="序号" sortable="" />
        <el-table-column label="姓名" prop="username" sortable="" />
        <el-table-column label="工号" prop="workNumber" sortable="" />

        <el-table-column
          label="聘用形式"
          prop="formOfEmployment"
          :formatter="formatEmployment"
          sortable=""
        />

        <el-table-column label="部门" prop="departmentName" sortable="" />
        <!-- 作用域插槽来做 + 过滤器 -->
        <el-table-column label="入职时间" prop="timeOfEntry" sortable="">
          <!-- 两种方法都可 -->
          <!-- <template slot-scope="obj"></template> -->
          <!-- <template v-slot="obj">
            {{ obj.row.timeOfEntry }}
          </template> -->
          <template v-slot="{row}">
            <!-- 将时间进行格式化 -->
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>

        <el-table-column label="账户状态" prop="enableState" sortable="">
          <template v-slot="{row}">
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>

        <el-table-column label="操作" sortable="" fixed="right" width="280px">
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 放置分页组件 -->
      <el-row
        type="flex"
        justify="center"
        align="middle"
        style="height: 60px"
      >
        <el-pagination
          :current-page="page.page"
          :page-size="page.size"
          :total="page.total"
          layout="prev,pager,next"
          @current-change="changePage"
        />
      </el-row>
    </div>
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees' // 引入员工的枚举对象
export default {
  data() {
    return {
      list: [], // 接收数组
      page: {
        page: 1,
        size: 10,
        total: 0 // 总数
      },
      loading: false // 显示遮罩层
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    // newPage是最新的页码
    changePage(newPage) {
      this.page.page = newPage // 赋值最新页码
      this.getEmployeeList() // 重新拉去数据
    },
    // 格式化聘用形式
    formatEmployment(row, column, cellValue, index) {
      // 要去找 1所对应的值
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    }
  }
}
</script>

<style>

</style>
