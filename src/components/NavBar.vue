<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">REWARD APP</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <div class="dropdown" v-if="isAuthenticate">
          <button
            class="btn dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ user.firstName }} {{ user.lastName }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <a class="dropdown-item" href="#" v-on:click="logout()">logout</a>
            </li>
          </ul>
        </div>
        <button
          class="btn btn-success"
          v-if="!isAuthenticate"
          v-on:click="login()"
        >
          Login
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { deleteToken, getToken } from "../helpers/token";
import request from "../api/request";
export default {
  name: "NavBar",
  methods: {
    logout() {
      deleteToken();
      this.$emit("updateUser", { user: {}, status: false });
      this.$router.replace({ name: "Login" });
    },
    login() {
      this.$router.replace({ name: "Login" });
    },
  },
  beforeCreate() {
    const token = getToken();
    if (token) {
      request
        .post("/user/verify", { token })
        .then((res) => {
          this.$emit("updateUser", { user: res.data.data, status: true });
        })
        .catch((err) => {
          deleteToken();
          console.log(err);
        });
    }
  },
  props: {
    user: Object,
    isAuthenticate: Boolean,
  },
};
</script>