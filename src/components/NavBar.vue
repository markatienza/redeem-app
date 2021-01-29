<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" style="width: 0px" href="/home">
        <img src="@/assets/logo.png" alt="" width="40" height="35" />
        <span class="brand-title">REDEEMIFY</span>
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
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <button
          class="btn btn-success px-lg-5 px-sm-5 px-md-5"
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
  padding: 0px;
  display: flex;
}
</style>
<script>
import { mapState } from "vuex";
export default {
  name: "NavBar",
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      isAuthenticate: (state) => state.auth.isAuthenticate,
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
    login() {
      this.$router.replace({ name: "Login" });
    },
  },
  beforeCreate() {
    this.$store.dispatch("auth/updateUser");
  },
};
</script>