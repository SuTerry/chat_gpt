<template>
  <el-dialog v-model="loginDialog" title="Shipping address">
    <el-form :model="form" :rules="rules" ref="baseForm" label-position="top">
      <el-form-item label="邮箱" prop="email" >
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password" >
        <el-input v-model="form.password" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">
          确定
        </el-button>
        <el-button @click="handleCloseDialog">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import dialogStore from '@/store/dialog'
  const { loginDialog } = storeToRefs(dialogStore())

  const form = reactive({
    email: '',
    password: '',
  })

  const baseForm = ref(null)

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
    loginDialog.value = false
  }

  const handleSubmit = async () => {
    const result = await baseForm.value.validate()
    console.log(result, 'result');
    
  }
</script>

<style lang="scss" scoped>
</style>