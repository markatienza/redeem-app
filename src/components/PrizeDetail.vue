<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-8 col-lg-6">
        <img
          class="img-fluid img"
          v-bind:src="item.image_url"
          v-bind:alt="item.name"
        />
      </div>
      <div class="container col-md-4 col-lg-6 col-xs-12 mt-5">
        <div class="row">
          <div class="col-12-sm">
            <div class="item-name">Win a {{ item.name }}</div>
          </div>
          <hr />
          <div class="col-12-sm p-3 mt-4 mb-5 bs">
            <button
              type="button"
              class="btn btn-warning br"
              data-bs-toggle="modal"
              data-bs-target="#showConfirmModal"
              v-on:click="showModal()"
            >
              Redeem
              <i class="fas fa-angle-right"></i>
            </button>
          </div>
          <hr />
          <div class="col-12-sm">
            <div class="item-footer" v-if="item.quantity > 0">
              {{ item.quantity }} left in stock
            </div>
            <div class="item-footer" v-else>Out of stock!</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.card {
  float: left;
  display: block;
}
.item-name {
  display: flex;
  font-size: 1.5em;
  font-weight: 900;
}
.item-footer {
  display: flex;
}
.bs {
  display: flex;
  button {
    width: 230px;
    height: 50px;
  }
}
.img {
  width: 100%;
}

.br {
  border-radius: 20px;
}
</style>
<script>
export default {
  name: "PrizeItemPreview",
  props: {
    item: Object,
  },
  methods: {
    showModal() {
      this.$emit("selectedItem", this.item);
    },
  },
};
</script>