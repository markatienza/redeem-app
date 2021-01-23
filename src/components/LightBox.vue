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
          <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
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
}
.modal-footer {
  align-items: center;
  justify-content: center;
  button {
    border-radius: 20px;
    width: 150px;
  }
}
.modal-title {
  font-size: 23px;
  font-weight: 900;
}
</style>
<script>
import request from "../api/request";
export default {
  name: "RedeemModal",
  data() {
    return {
      title: "Are you sure?",
      isConfirm: true,
      isNotValid: false,
    };
  },
  methods: {
    confirmRedeem() {
      request
        .post("/prizes/deductQuantity", { name: this.item.name })
        .then((response) => {
          const data = response.data.data;
          if (data) {
            this.$emit("selectItem", data);
            this.isConfirm = !this.isConfirm;
            this.title = "Congratulations!";
          }
        })
        .catch((err) => {
          console.log(err);
          if (!err.isSuccess) {
            this.title = "Please Login!";
            this.isNotValid = true;
          }
        });
    },
    backToHomePage() {
      if (this.isConfirm && this.isNotValid) return (window.location = "/login");
      window.location = "/home";
    },
  },
  props: {
    item: Object,
  },
};
</script>