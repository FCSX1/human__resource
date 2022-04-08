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
          <el-button size="small" type="success" @click="$router.push('/import')">excel导入</el-button>
          <el-button size="small" type="danger" @click="exportData">excel导出</el-button>

          <el-button
            size="small"
            type="primary"
            @click="showDialog = true"
          >新增员工</el-button>
        </template>
      </page-tools>
      <!-- 表格组件 -->
      <el-table v-loading="loading" :data="list">
        <el-table-column type="index" label="序号" sortable="" />
        <el-table-column label="姓名" prop="username" sortable="" />
        <el-table-column width="120px" label="头像" align="center">
          <!-- 插槽 -->
          <!-- <template slot-scope="{row}" /> -->
          <template v-slot="{ row }">
            <img
              v-imagerror="require('@/assets/common/head.jpg')"
              :src="row.staffPhoto"
              style="border-radius: 50%; width: 100px; height: 100px; padding: 10px"
              alt=""
              @click="showQrCode(row.staffPhoto)"
            >
          </template>
        </el-table-column>
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
          <!-- <template slot-scope="{ row }"> -->
          <template v-slot="{row}">
            <el-button type="text" size="small" @click="$router.push(`/employyees/detail/${row.id}`)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>

            <el-button
              type="text"
              size="small"
              @click="editRole(row.id)"
            >角色</el-button>

            <el-button
              type="text"
              size="small"
              @click="delEmployee(row.id)"
            >删除</el-button>
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
    <!-- 放置组件弹层 -->
    <!-- sync修饰符 是子组件 去改变父组件的数据的一个语法糖 -->
    <AddEmployee :show-dialog.sync="showDialog" />
    <el-dialog title="二维码" :visible.sync="showCodeDialog">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
    <!-- 放置分配组件 -->
    <assign-role
      ref="assignRole"
      :show-role-dialog.sync="showRoleDialog"
      :user-id="userId"
    />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees' // 引入员工的枚举对象
import AddEmployee from './components/add-employee'
import { formatDate } from '@/filters'
import AssignRole from './components/assign-role'
import QrCode from 'qrcode'
export default {
  components: { AddEmployee, AssignRole },
  data() {
    return {
      list: [], // 接收数组
      page: {
        page: 1,
        size: 10,
        total: 0 // 总数
      },
      loading: false, // 显示遮罩层
      showDialog: false, // 默认关闭弹层
      showCodeDialog: false, // 显示二维码弹层
      showRoleDialog: false, // 显示分配角色弹层
      userId: null // 定义一个userId
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
    },
    // async delEmployee(id) {
    //   try {
    //     await this.$confirm('确定删除该员工吗？')
    //     // 点击了确定
    //     await delEmployee(id)
    //     this.$message.success('删除员工成功')
    //     this.getEmployeeList() // 重新拉去数据
    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    // 删除员工
    async delEmployee(id) {
      try {
        await this.$confirm('确认要删除吗')
        await delEmployee(id) // 调用删除接口
        // 执行完删除接口 则 后台删除完数据 但是我们没有重新调用接口获取数据所有还没有更新vue中获取到的数据
        // 这时进行判断
        // 判断当前页码是否只剩下一条数据 则这条数据就是被我们刚刚删除但是还没有更新时的数据 再判断 当前页码是否为1
        // 如果当前页码为1 则表示所有数据已删除完 若不为1 则获取上一页数据
        if (this.list.length === 1 && this.page.page !== 1) {
          --this.page.page
        }
        this.getEmployeeList() // 重新拉取数据
      } catch (err) {
        this.$message.error('已取消')
      }
    },
    exportData() {
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // 导出excel
      import('@/vendor/Export2Excel').then(async excel => {
      // excel是引入文件的导出对象
      // 导出 header从那来
      // data从那来
      // 现在没有一个接口获取所有的数据
      // 获取员工的接口 页码 每页条数
        const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
        const data = this.formatJson(headers, rows) // 返回的data就是 要导出的结构
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工资料',
          multiHeader, // 复杂表头
          merges // 合并选项
        })
      // excel.export_json_to_excel({
      //   header: ['姓名', '工资'],
      //   data: [['张三', '3000']],
      //   filename: '员工工资表'
      // })
      // [{username:'张三'}]  => [[]]
      // 既要转化 数据结构 还有和表头的顺序对应上
      // 要求转出的标题是中文
      })
    },
    // 将表头数据和数据进行对应
    // 原来的结构[{}] => 导出的data[[]]
    formatJson(headers, rows) {
      return rows.map(item => {
        // item是一个对象 {mobile:13211,username:'张三'}
        //  Object.keys(headers)= ["手机号","姓名".......]
        return Object.keys(headers).map(key => {
          // 需要判断一下字段
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            // 格式化日期
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            console.log(EmployeeEnum.hireType)

            const obj = EmployeeEnum.hireType.find(obj => obj.id === item[headers[key]])
            return obj ? obj.value : '未知'
          }
          return item[headers[key]]
        })
      })
      // return rows.map(item => Object.keys(headers).map(key => item[headers[key]]))  需要处理时间格式问题
    },
    showQrCode(url) {
      // url存在的情况下 才弹出层
      if (url) {
        this.showCodeDialog = true // 数据更新了 但是我的弹层会立刻出现吗？页面渲染是异步的
        // 有一个方法可以在上一次数据更新完毕，页面渲染完毕之后在执行 (this.$nextTick,Vue.nextTick)
        this.$nextTick(() => {
          // 此时可以确认已经有对象了
          QrCode.toCanvas(this.$refs.myCanvas, url) // 将地址转化成二维码
          // 如果转化的二维码后面信息 是一个地址的化 就会跳转到该地址 如果不是地址就会显示内容
        })
      } else {
        this.$message.warning('该用户还未上传头像')
      }
    },
    async editRole(id) {
      // 弹出层
      this.userId = id // props赋值 props赋值渲染是异步的
      await this.$refs.assignRole.getUserDetailById(id) // 调用子组件的方法
      this.showRoleDialog = true
    }
  }
}
</script>

<style>

</style>
