<template>
  <h1>LOGIN</h1>
  <div class="login container col-sm-12 col-md-7 col-lg-6 mt-5">
    <h5 style="color: red">{{ error.message }}</h5>

    <div class="row mb-3">
      <label for="username" class="col-sm-3 col-form-label">Username</label>
      <div class="col-sm-9">
        <input
          type="text"
          class="form-control"
          v-model="input.username"
          id="username"
        />
      </div>
    </div>

    <div class="row mb-3">
      <label for="password" class="col-sm-3 col-form-label">Password</label>
      <div class="col-sm-9">
        <input
          type="password"
          class="form-control"
          v-model="input.password"
          id="password"
        />
      </div>
    </div>
    <div class="d-grid gap-2 col-12 mx-auto">
      <button class="btn btn-primary" type="button" @click="login()">
        Login
      </button>
      <button class="btn btn-success" type="button" @click="register()">
        Register
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Login",
  computed: {
    ...mapState({
      error: (state) => state.auth.error,
    }),
  },
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const data = { ...this.input };
      if (data.username != "" && data.password != "") {
        this.$store.dispatch("auth/login", data);
      } else {
        this.$store.commit(
          "auth/setErrorMsg",
          "Invalid username and password!"
        );
      }
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>