<template>
  <upload-excel :on-success="success" />
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  methods: {
    async success({ header, results }) {
      // header中的数据 是中文 results中的数据也是中文
      // 新增的员工的属性是一致的
      // username: '',  姓名
      // mobile: '',  手机号
      // formOfEmployment: '',
      // workNumber: '',  工号
      // departmentName: '',
      // timeOfEntry: '',  入职日期
      // correctionTime: ''  转正日期
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      /* var arr = []
      results.forEach(item => {
        const userInfo = {}
        Object.keys(item).forEach(key => {
          // 现在key是中文
          userInfo[userRelations[key]] = item[key] // 将原来中文对应的值 赋值给原来英文对应的值
        })
        arr.push(userInfo)
      }) */
      var newArr = results.map(item => {
        var userInfo = {}
        Object.keys(item).forEach(key => {
          userInfo[userRelations[key]] = item[key] // 将原来中文对应的值 赋值给原来英文对应的值
        })
        return userInfo
      })
      await importEmployee(newArr) // 接收一个数组
      this.$message.success('导入excel成功')
      this.$router.back() // 回到上一个页面
    }
  }
}
</script>

<style>

</style>
