<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style>
#app {
  height: 100%;
}
#nprogress .bar {
  background: red !important;
}

.spinner-icon {
  border-top-color: #f56c6c !important;
  border-left-color: #003df1 !important;
}
.el-menu--collapse .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}

.el-menu--collapse .el-menu-item .el-submenu__icon-arrow,
.el-menu--collapse .el-submenu .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
/* .el-menu-item-group .el-menu-item {
  padding: 0 0 0 30px;
} */

.el-menu-item-group .el-menu-item-group__title {
  padding: 0;
}
</style>