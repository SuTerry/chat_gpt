<script setup lang="ts">
</script>

<template>
  <router-view v-slot="{ Component }">
    <Keep-alive>
      <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
    </Keep-alive>
    <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
  </router-view>
</template>

<style scoped>
</style>
