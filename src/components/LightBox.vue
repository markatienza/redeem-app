<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="showConfirmModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <h4 class="modal-body-title fw-bold" id="exampleModalLabel">
          {{ title }}
        </h4>
        <!-- CONFIMATION -->
        <div class="modal-body" v-if="isConfirm && !isNotValid">
          <img
            v-bind:src="item.image_url"
            v-bind:alt="item.name"
            class="img-circle m-3"
          />
          <div>Redeem for {{ item.name }} ?</div>
        </div>
        <!-- NOT LOGGED IN -->
        <div class="modal-body" v-if="isConfirm && isNotValid">
          <div>Please, login to redeem your prizes!</div>
        </div>
        <!-- CONGRATULATIONS -->
        <div class="modal-body" v-if="!isConfirm">
          <div>You redeemed</div>
          <div>{{ item.name }}</div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-md btn-warning"
            data-bs-dismiss="modal"
            v-on:click="backToHomePage()"
            v-if="!isConfirm || (isConfirm && isNotValid)"
          >
            {{ isConfirm && isNotValid ? "Okay" : "More Prizes" }}
          </button>
          <button
            type="button"
            class="btn btn-md btn-warning"
            v-on:click="confirmRedeem()"
            v-if="isConfirm && !isNotValid"
          >
            Yes
          </button>
          <button
            type="button"
            class="btn btn-md btn-outline-secondary"
            data-bs-dismiss="modal"
            v-if="isConfirm && !isNotValid"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.img-circle {
  border-radius: 100%;
  height: 10rem;
  width: 10rem;
}
.modal-header {
  border-bottom: none;
}
.modal-footer {
  align-items: center;
  justify-content: center;
  border-top: none;
  margin: 1rem 0;
  button {
    border-radius: 20px;
    width: 150px;
    width: 7.7rem;
    font-size: 0.7rem;
  }
}
.modal-title {
  font-size: 23px;
  font-weight: 900;
}
</style>
<script>
import { mapState } from "vuex";
export default {
  name: "RedeemModal",
  computed: {
    ...mapState({
      item: (state) => state.prizes.selectedItem,
      title: (state) => state.prizes.title,
      isConfirm: (state) => state.prizes.isConfirm,
      isNotValid: (state) => state.prizes.isNotValid,
    }),
  },
  methods: {
    confirmRedeem() {
      this.$store.dispatch("prizes/confirmRedeem", this.item.name);
    },
    backToHomePage() {
      this.$store.dispatch("prizes/selectItem", {});

      if (this.isConfirm && this.isNotValid)
        return this.$router.push({ name: "Login" });

      this.$store.dispatch("prizes/setItems");
      this.$store.commit("prizes/setConfirm", true);
      this.$router.replace({ name: "Home" });
    },
  },
};
</script>