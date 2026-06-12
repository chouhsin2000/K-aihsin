<template>
  <div class="version-history">
    <el-timeline>
      <el-timeline-item
        v-for="version in document.versions"
        :key="version.versionId"
        :timestamp="formatDate(version.date)"
        placement="top"
      >
        <div class="version-item">
          <h4>版本 {{ version.versionId }}</h4>
          <p>{{ version.description }}</p>
          <el-button size="small" @click="downloadVersion(version)">下载此版本</el-button>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup>
const props = defineProps({
  document: Object
})

const formatDate = (date) => {
  return new Date(date).toLocaleString('zh-CN')
}

const downloadVersion = (version) => {
  window.location.href = version.filePath
}
</script>

<style scoped>
.version-history {
  padding: 20px 0;
}

.version-item {
  background-color: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
}

.version-item h4 {
  margin: 0 0 10px 0;
  color: #409eff;
}

.version-item p {
  margin: 0 0 10px 0;
  color: #666;
}
</style>