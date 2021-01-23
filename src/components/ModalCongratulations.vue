<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="showCongratulationsModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Congratulations!</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>You redeemed</div>
          <div>{{ item.name }} ?</div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-md btn-warning"
            v-on:click="confirm()"
          >
            Yes
          </button>
          <button
            type="button"
            class="btn btn-md btn-outline-secondary"
            data-bs-dismiss="modal"
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
export default {
  name: "ModalConfirmation",
  updated() {
    console.log("xxxx yuodate", this.item);
  },
  created() {
    console.log("asdsadsadsadsa", this.item);
  },
  props: {
    item: Object,
  },
  methods: {
    confirm() {
      this.$emit("confirmRedeem", this.item);
    },
  },
};
</script>