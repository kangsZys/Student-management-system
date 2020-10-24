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
              @keyup.enter.native="submitForm('loginForm')"
            ></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item label="验证码" prop="captcha">
            <el-input
              type="text"
              v-model="loginForm.captcha"
              autocomplete="off"
              @keyup.enter.native="submitForm('loginForm')"
              class="captchaInput"
            ></el-input>
            <span
              class="captcha"
              v-html="loginForm.captchaImg"
              @click="updateCaptcha"
            ></span>
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
import { login, getCaptcha, verifyCaptcha } from "@/api/index.js";
import { mapMutations } from "vuex";
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
    var validateCaptcha = (rule, value, callback) => {
      if (value.length !== 5) {
        callback(new Error("请输入正确格式的验证码"));
      } else {
        callback();
      }
    };
    return {
      timer: "",
      loginForm: {
        username: "admin",
        password: "admin",
        captcha: "12345",
        captchaImg: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        captcha: [{ validator: validateCaptcha, trigger: "blur" }]
      }
    };
  },
  mounted() {
    getCaptcha().then(res => {
      this.loginForm.captchaImg = res.data.img;
    });
  },
  methods: {
    updateCaptcha() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        getCaptcha().then(res => {
          this.loginForm.captchaImg = res.data.img;
        });
      }, 400);
    },
    ...mapMutations(["SET_USERINFO"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          verifyCaptcha(this.loginForm.captcha).then(res => {
            if (!res.data.state) {
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
                  // console.log(res);
                  if (res.data.state) {
                    this.$message.success("登陆成功,跳转中......");
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem(
                      "userInfo",
                      JSON.stringify(res.data.userInfo)
                    );
                    this.SET_USERINFO(res.data.userInfo);
                    this.$router.push("/Welcome");
                  } else {
                    this.$message.error("用户名或密码错误");
                    this.loginForm.password = "";
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              this.$message.error("验证码错误");
            }
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
.captcha {
  width: 100px;
  height: 40.8px;
  display: inline-block;
  background: #fff;
  vertical-align: middle;
  overflow: hidden;
}
.captchaInput {
  width: 120px;
  vertical-align: middle;
  margin-right: 20px;
}
</style>