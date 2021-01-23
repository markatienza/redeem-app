<template>
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