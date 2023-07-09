<template>
  <div class="header">
    <img :src="logoImg" alt="">
    <div class="links">
      <router-link to="/home">聊天&工作</router-link>
      <router-link to="/api">接口文档</router-link>
      <router-link to="/account">账号管理</router-link>
      <router-link to="/about">关于我们</router-link>
    </div>
    <template v-if="login">
    </template>
    <template v-else>
      <div class="btns">
        <div class="btns_login" @click="handleShowLoginDialog">登录</div>
        <div class="btns_line">|</div>
        <div class="btns_register">注册</div>
      </div>
      </template>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import userStore from '@/store/user'
  import dialogStore from '@/store/dialog'
  import logoImg from '@/assets/logo.png'  
  
  const { login } = storeToRefs(userStore())
  const { loginDialog } = storeToRefs(dialogStore())

  /**
   * 显示登录弹框
   */
  const handleShowLoginDialog = () => {
    loginDialog.value = true
  }
</script>

<style lang="scss" scoped>
.header {
  // width: 100%;
  height: 56px;
  padding: 0 30px;
  background-color: #3f414e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > img {
    height: 36px;
  }
  >.links {
    display: flex;
    >a {
      margin: 0 40px;
      color: #e6e6e6;
      text-decoration: none;
      font-size: 20px;
      &.router-link-active {
        color: #ffffff;
        font-weight: 700;
      }
    }
  }
  >.btns {
    display: flex;
    color: #ffffff;
    > .btns_line {
      margin: 0 8px;
      line-height: 20px;
    }
    >.btns_login,>.btns_register {
      cursor: pointer;
    }
  }
}
</style>
