<template>
  <div class="main">
    <el-container>
      <el-header>
        <h1>论文 Push 系统</h1>
      </el-header>
      <el-main>
        <p style="font-size: 20px; margin-block-start: 0; margin-block-end: 0;">在这里记录你每天写作的论文字数，同时比拼一下和其他同学写作的进度，用于时刻提醒自己，好好学习！！！</p>
        <img style="position: relative; top: 0; width: 200px; height: 200px;" src="@/assets/nwu2.png" alt="西北大学">
      </el-main>
      <el-footer style="font-size: 16px">
        <b>版本 v1.1.0</b><br>
        <b>© 2020 - <span>{{ year }}</span> | 最终解释权归 Rex Joush 所有 </b><br>
      </el-footer>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',

  data() {
    return {
      year: new Date().getFullYear()
    }
  },

  created() {

  }
}
</script>

<style scoped>
body > .el-container {
  margin-bottom: 40px;
}
.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
}
.el-header, .el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

footer {
  text-align: center;
  position: relative;
  top: 50px;
}

footer p {
  margin: 0;
  color: #999;
}
</style>
