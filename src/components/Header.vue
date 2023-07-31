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
      <el-dropdown>
        <div class="user">
          {{ username }}
          <img src="@/assets/usericon.png" alt="">
        </div>
        <template #dropdown>
          <el-dropdown-menu class="custom-dropdown-menu">
            <!-- <el-dropdown-item>
              <el-button link :style="{color: '#15c299'}" >充值</el-button>
              <div>能量 : {{ energy }}</div>
            </el-dropdown-item> -->
            <el-dropdown-item @click="userOut">退出账号</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
    <template v-else>
      <div class="btns">
        <div class="btns_login" @click="handleShowLoginDialog">登录</div>
        <div class="btns_line">|</div>
        <div class="btns_register" @click="handleShowRegisterDialog">注册</div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import userStore from '@/store/user'
import dialogStore from '@/store/dialog'
import logoImg from '@/assets/logo.png'

const { login, username } = storeToRefs(userStore())
const { loginDialog, registerDialog } = storeToRefs(dialogStore())
const { userOut } = userStore()

/**
 * 显示登录弹框
 */
const handleShowLoginDialog = () => {
  loginDialog.value = true
}

/**
 * 显示注册弹框
 */
const handleShowRegisterDialog = () => {
  registerDialog.value = true
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
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 10px 0px;

  >img {
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

  .user {
    display: flex;
    align-items: center;
    color: #ffffff;
    > img {
      width: 20px;
      height: 20px;
      margin-left: 8px;
    }
  }

  >.btns {
    display: flex;
    color: #ffffff;

    >.btns_line {
      margin: 0 8px;
      line-height: 20px;
    }

    >.btns_login,
    >.btns_register {
      cursor: pointer;
    }
  }
}
</style>
