<script setup lang="ts">
  import GptHeader from '@/components/Header.vue'
  import LoginDialog from './components/LoginDialog.vue';
</script>

<template>
  <gpt-header></gpt-header>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
  </router-view>
  <LoginDialog />
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
