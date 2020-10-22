<template>
  <div class="welcome">
    <template>
      <el-table
        :data="tableData"
        border
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column
          prop="username"
          label="登入账户"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="lastLogin.ip"
          label="上次登入ip"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="lastLogin.loginTime"
          label="上次登入时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="nowLogin.ip"
          label="本次登入ip"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="nowLogin.loginTime"
          label="本次登入时间"
          align="center"
        ></el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { getLoginLog } from "@/api/index.js";
export default {
  data() {
    return {
      loading: true,
      tableData: []
    };
  },
  mounted() {
    getLoginLog().then(res => {
      // console.log(res.data.data);
      this.tableData = res.data.data;
      this.loading = false;
    });
  }
};
</script>
<style>
.welcome {
  margin-top: 20px;
  width: 100%;
  height: 100%;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>