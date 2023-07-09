<template>
  <div>首页</div>
  <p>{{ login }}</p>
  <el-button type="primary">dsfds</el-button>
  <el-time-picker placeholder="Arbitrary time" />
</template>

<script setup>
  import { storeToRefs } from 'pinia'

  import userStore from '@/store/user'

  const user = userStore()

  const { login } = storeToRefs(userStore())
</script>