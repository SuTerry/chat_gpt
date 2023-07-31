<template>
  <el-dialog v-model="registerDialog" title="注册" width="500" :before-close="beforeClose">
    <el-form :model="form" :rules="rules" ref="baseForm" label-position="top">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordAgain">
        <el-input v-model="form.passwordAgain" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱验证码" prop="verifycode">
        <el-col :span="17">
          <el-input v-model="form.verifycode" autocomplete="off" />
        </el-col>
        <el-col :span="6" :offset="1">
          <el-button class="verifycode" @click="handleSend" :disabled="verifycodeTime !== 0">
            {{ verifycodeTime === 0 ? '发送验证码' : `${verifycodeTime}后重新获取` }}
          </el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <span class="dialog-footer-left">
          <el-button link type="primary" @click="handleLogin">登录</el-button>
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
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import dialogStore from '@/store/dialog'
import { verifyemail, register } from '@/api/user'
const { loginDialog, registerDialog } = storeToRefs(dialogStore())

const form = reactive({
  email: '',
  username: '',
  password: '',
  passwordAgain: '',
  verifycode: '',
})

const verifycodeTime = ref(0)

const baseForm = ref<any>(null)

/**
 * 校验两次密码是否一致
 * @param _ 
 * @param value 
 * @param callback 
 */
const validatePasswordConfirmation = (_: any, value: any, callback: any) =>
  value === form.password ? callback() : callback(new Error('两次密码不一致'))


const rules = {
  email: [
    { required: true, message: '请填写邮箱', trigger: 'blur' },
  ],
  username: [
    { required: true, message: '请填写用户名', trigger: 'blur' },
    { min: 2, max: 33, message: '用户名需要大于2位小于33位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请填写密码', trigger: 'blur' },
    { min: 7, max: 65, message: '密码需要大于7位小于65位', trigger: 'blur' },
  ],
  passwordAgain: [
    { required: true, message: '请再次填写密码', trigger: 'blur' },
    { validator: validatePasswordConfirmation, trigger: 'blur' },
  ],
  verifycode: [
    { required: true, message: '请填写验证码', trigger: 'blur' },
  ],
}

/**
 * 关闭弹窗
 */
const handleCloseDialog = () => {
  registerDialog.value = false
}

/**
 * 关闭前的回调
 * @param done 
 */
const beforeClose = (done: any) => {
  baseForm.value.resetFields()
  done()
}

/**
 * 提交接口
 */
const handleSubmit = async () => {
  try {
    await baseForm.value.validate()
    const res = await register(form)
    if (res.code === 0) {
      ElMessage({
        message: '注册成功，请登录',
        type: 'success',
      })
      handleLogin()
    }
  } catch (_) { }
}

/**
 * 跳转登录弹窗
 */
const handleLogin = () => {
  handleCloseDialog()
  loginDialog.value = true
}

/**
 * 发送验证码
 */
const handleSend = async () => {
  try {
    await baseForm.value.validateField('email')
    verifycodeTimeChange()
    const res = await verifyemail({ email: form.email, type: 'register' })
    if (res.code === 0) ElMessage({
      message: '邮箱验证码已发送',
      type: 'success',
    })
  } catch (_) {

  }
}

/**
 * 倒计时按钮
 */
const verifycodeTimeChange = () => {
  if (verifycodeTime.value !== 0) return
  verifycodeTime.value = 60
  const timer = setInterval(() => {
    if (verifycodeTime.value > 0) return verifycodeTime.value--
    clearInterval(timer)
  }, 1000)
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: space-between;
}

.verifycode {
  width: 100%;
}
</style>