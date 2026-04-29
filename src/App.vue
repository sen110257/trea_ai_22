<template>
  <div class="app-container">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
