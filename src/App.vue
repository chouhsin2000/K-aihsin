<template>
  <el-container class="app-container">
    <el-header class="app-header">
      <div class="header-content">
        <h1>ECO文档管理系统</h1>
        <el-menu :default-active="activeMenu" mode="horizontal" router>
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/documents">文档管理</el-menu-item>
          <el-menu-item index="/upload">上传文件</el-menu-item>
          <el-menu-item index="/versions">版本记录</el-menu-item>
        </el-menu>
      </div>
    </el-header>
    <el-main class="app-main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeMenu = computed(() => route.path)
</script>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #409eff;
  color: white;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.header-content h1 {
  margin: 0;
  margin-right: 40px;
  font-size: 24px;
  white-space: nowrap;
}

.app-main {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
</style>