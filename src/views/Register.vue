<template>
  <h1>REGISTRATION</h1>
  <div class="container mt-5">
    <h3 style="color: red">{{ error.message }}</h3>
    <form class="row col-6 mx-auto g-6">
      <div class="row mb-3">
        <label for="username" class="col-sm-3 col-form-label">Username</label>
        <div class="col-sm-9">
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="input.username"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="password" class="col-sm-3 col-form-label">Password</label>
        <div class="col-sm-9">
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="input.password"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="confirmPassword" class="col-sm-3 col-form-label"
          >Confirm Password</label
        >
        <div class="col-sm-9">
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            v-model="input.confirmPassword"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="firstName" class="col-sm-3 col-form-label"
          >First Name</label
        >
        <div class="col-sm-9">
          <input
            type="text"
            class="form-control"
            id="firstName"
            v-model="input.firstName"
          />
        </div>
      </div>
      <div class="row mb-3">
        <label for="lastName" class="col-sm-3 col-form-label">Last Name</label>
        <div class="col-sm-9">
          <input
            type="text"
            class="form-control"
            id="lastName"
            v-model="input.lastName"
          />
        </div>
      </div>
    </form>
    <div class="d-grid gap-2 col-5 mx-auto">
      <button class="btn btn-primary" type="button" @click="register()">
        Create new account
      </button>
      <button class="btn btn-success" type="button" @click="backToLogin()">
        Back To Login
      </button>
    </div>
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