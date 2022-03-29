<template>
  <!-- 放置弹出组件 -->
  <el-dialog title="新增部门" :visible="showDialog" @close="btnCancel">
    <!-- 表单数据 label-width设置标题的宽度 -->
    <el-form
      ref="deptForm"
      :model="formData"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item
        label="部门名称"
        prop="name"
      >
        <el-input
          v-model="formData.name"
          style="width:80%"
          placeholder="1-50个字符"
        >
          <!--  -->
        </el-input>
      </el-form-item>

      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符">
          <!--  -->
        </el-input>
      </el-form-item>

      <el-form-item label="部门负责人" prop="manager">
        <!-- native修饰符 可以找到原生元素的事件 -->
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimle">
          <!-- 遍历选项 -->
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          >
            <!--  -->
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- 确认和消息 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnOK">确认</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 检查部门名称是否重复
    const checkNameRepeat = async(rule, value, callback) => {
      // value 是部门名称 要求和同级部门下的部门比较 有没有相同的 有相同的 不能过 / 不相同就可以过
      const { depts } = await getDepartments()
      // 去找同级部门下 有没有和value相同的数据
      // 找到同级部门的所有的子部门
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      // 如果isRepeat为true  表示找到了一样的名字
      isRepeat ? callback(new Error(`同级部门下已经存在这个${value}部门了`)) : callback()
    }

    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      // 要求编码 和所有的部门编码都不能重复 由于历史数据有可能 没有code 所以说这里加一个强制性条件就是 value值不为空
      const isRepeat = depts.some(item => item.code === value && value)
      isRepeat ? callback(new Error(`组织架构下已经存在这个${value}编码了`)) : callback()
    }
    return {
      // 定义一个表单数据
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称长度为1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkNameRepeat }
        ],

        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码长度为1-50个字符', trigger: 'blur' }, {
            trigger: 'blur', validator: checkCodeRepeat
          }
        ],

        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],

        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍长度为1-300个字符', trigger: 'blur' }
        ]
      }, // 校验规则 {key:数组}
      peoples: []
    }
  },
  methods: {
    async getEmployeeSimle() {
      this.peoples = await getEmployeeSimple()
    },
    btnOK() {
      // 手动校验表单
      this.$refs.deptForm.validate(async isOK => {
        if (isOK) {
          // 表单校验通过
          // 这里我们将ID设成了我们的pid
          await addDepartments({ ...this.formData, pid: this.treeNode.id })
          // 告诉父组件
          this.$emit('addDepts') // 触发一个自定义事件
          // 此时应该去修改showDialog值
          // 自定义事件的格式是 update:props名称
          this.$emit('update:showDialog', false)
          // 关闭dialog的时候会 触发el-dialog的close事件  所以这里不需要再单独的重置数据了
        }
      })
    },
    btnCancel() {
      // 关闭弹层
      this.$emit('update:showDialog', false)
      // 清除之前的校验数据
      this.$refs.deptForm.resetFields()
    }
  }
}
</script>

<style>

</style>
