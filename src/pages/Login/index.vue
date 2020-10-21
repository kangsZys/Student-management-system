<template>
  <div class="login">
    <div class="left"></div>
    <div class="right">
      <div class="login-box">
        <h1>千锋管理系统</h1>
        <el-form
          :model="loginForm"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              type="text"
              v-model="loginForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              autocomplete="off"
             @change="submitForm('loginForm')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <video
        src="../../assets/video/bg_video.d2d602a9.mp4"
        muted="muted"
        autoplay="autoplay"
        loop="loop"
        preload="auto"
        class="bg-video"
      ></video>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/index.js";
import {mapMutations} from "vuex"
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["SET_USERINFO"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          // 本地校验通过
          let { username, password } = this.loginForm;
          login(username, password)
            .then(res => {
              loading.close();
              console.log(res);
              if (res.data.state) {
                this.$message.success("登陆成功");
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
                this.SET_USERINFO(res.data.userInfo)
                this.$router.push("/Welcome");
              } else {
                this.$message.error("用户名或密码错误");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.login {
  height: 100%;
}
.left {
  width: 50%;
  height: 100%;
  float: left;
  background: url(../../assets/images/bg2.fc58c850.png) no-repeat 50% 55%/50%;
}
.right {
  width: 50%;
  height: 100%;
  float: right;
}
.bg-video {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
.login-box {
  width: 400px;
  height: 480px;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 20%;
  left: 60%;
  border-radius: 10px;
}
h1 {
  color: #fff;
  margin-top: 100px;
  margin-bottom: 50px;
  text-align: center;
}
.el-button {
  width: 80%;
  background: linear-gradient(90deg, #1596fb, #002dff);
}
</style>