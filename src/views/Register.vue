<template>
  <div class="login">
    <h1>REGISTER</h1>
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
    <div>
      <input
        type="password"
        name="confirmPassword"
        v-model="input.confirmPassword"
        placeholder="Confirm Password"
      />
    </div>

    <div>
      <input
        type="text"
        name="firstName"
        v-model="input.firstName"
        placeholder="First Name"
      />
    </div>
    <div>
      <input
        type="text"
        name="lastName"
        v-model="input.lastName"
        placeholder="Last Name"
      />
    </div>
    <button type="button" v-on:click="register()">Register</button>
    <br />
    <button type="button" v-on:click="backToLogin()">Back to Login</button>
  </div>
</template>

<script>
import request from "../api/request";
// import { setToken } from "../helpers/token";
export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
      },
      error: {
        message: "",
      },
    };
  },
  methods: {
    register() {
      this.error.message = "";
      const data = { ...this.input };
      if (
        !data.username ||
        !data.password | !data.confirmPassword ||
        !data.firstName ||
        !data.lastName
      ) {
        this.error.message = "All fields are required!";
      } else if (data.password !== data.confirmPassword) {
        this.error.message = "Password don't match!";
      } else {
        request
          .post("/user", data)
          .then((response) => {
            const data = response.data;
            if (!data.data) {
              return (this.error.message = data.message);
            }
            this.$router.replace({ name: "Login" });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    backToLogin() {
      this.$router.replace({ name: "Login" });
    },
  },
};
</script>