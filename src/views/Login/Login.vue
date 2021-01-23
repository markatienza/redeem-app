<template>
  <div class="login">
    <h1>Login</h1>
    <h3>{{ error.message }}</h3>
    <div>
      <input
        type="text"
        name="username"
        v-model="input.username"
        placeholder="Username"
      />
    </div>
    <div>
      <input
        type="password"
        name="password"
        v-model="input.password"
        placeholder="Password"
      />
    </div>
    <button type="submit" @click="login()">Login</button>
    <br />
    <button type="button" @click="register()">Register</button>
  </div>
</template>

<style lang="less" scoped>
@import "./login.style.less";
</style>
<script>
import request from "../../api/request";
import { setToken } from "../../helpers/token";
export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
      error: {
        message: "",
      },
    };
  },
  methods: {
    login() {
      this.error.message = "";
      const data = { ...this.input };
      if (data.username != "" && data.password != "") {
        request
          .post("/user/auth", data)
          .then((response) => {
            const { data } = response.data;
            console.log(data);
            if (!data.user) {
              return (this.error.message = data.message);
            }
            setToken(data.token);
            this.$emit("updateUser", {
              user: data.user,
              status: true,
            });
            this.$router.replace({ name: "Home" });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("A username and password must be present");
      }
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>