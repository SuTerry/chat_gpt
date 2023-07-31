<template>
  <el-dialog v-model="loginDialog" title="登录" width="500">
    <el-form :model="form" :rules="rules" ref="baseForm" label-position="top">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" autocomplete="off" type="password" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <span class="dialog-footer-left">
          <el-button link type="primary" @click="handleRegister">注册</el-button>
          <el-button link type="primary" @click="handleForget">忘记密码</el-button>
        </span>
        <span class="dialog-footer-right">
          <el-button type="primary" @click="handleSubmit">
            确定
          </el-button>
          <el-button @click="handleCloseDialog">取消</el-button>
        </span>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import dialogStore from '@/store/dialog'
import userStore from '@/store/user'
import { login } from '@/api/user'
const { loginDialog, registerDialog, forgetPWDialog } = storeToRefs(dialogStore())
const { userLogin } = userStore()

const form = reactive({
  email: '',
  password: '',
})

const baseForm = ref<any>(null)

const rules = {
  email: [
    { required: true, message: '请填写邮箱', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请填写密码', trigger: 'blur' },
  ],
}

/**
 * 关闭弹窗
 */
const handleCloseDialog = () => {
  baseForm.value?.resetFields()
  loginDialog.value = false
}

/**
 * 提交接口
 */
const handleSubmit = async () => {
  try {
    await baseForm.value.validate()
    const res = await login(form)
    ElMessage({
      message: '登录成功',
      type: 'success',
    })
    userLogin({ ...res.data })
    handleCloseDialog()
  } catch (_) { }
}

/**
 * 跳转注册弹窗
 */
const handleRegister = () => {
  handleCloseDialog()
  registerDialog.value = true
}

/**
 * 跳转忘记密码弹窗
 */
const handleForget = () => {
  handleCloseDialog()
  forgetPWDialog.value = true
}


</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: space-between;
}
</style>