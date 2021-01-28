<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/home">
        <img src="@/assets/logo.png" alt="" width="40" height="35" />
        REDEEM APP
      </a>

      <div class="" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <div class="dropdown" v-if="isAuthenticate">
          <button
            class="btn btn-avatar"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              class="avatar"
              src="@/assets/img_avatar.png"
              alt=""
              width="30"
              height="24"
            />
            <span class="username">
              {{ user.firstName }} {{ user.lastName }}
            </span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <button
                class="dropdown-item btn btn-danger"
                v-on:click="logout()"
                >Logout</button
              >
            </li>
          </ul>
        </div>
        <button
          class="btn btn-success px-5"
          v-if="!isAuthenticate"
          v-on:click="login()"
        >
          Login
        </button>
      </div>
    </div>
  </nav>
</template>
<style lang="less" scoped>
.username {
  font-size: 0.7rem;
  font-weight: bold;
}
.avatar {
  margin-right: 0.6rem;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
}
.btn-avatar {
  display: flex;
}
</style>
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
          console.log(res.data.data.user);
          this.$emit("updateUser", { user: res.data.data.user, status: true });
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