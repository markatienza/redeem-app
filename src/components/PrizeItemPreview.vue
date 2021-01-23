<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <img
          class="img-fluid img"
          v-bind:src="item.image_url"
          v-bind:alt="item.name"
        />
      </div>
      <div class="container col-6">
        <div class="row">
          <div class="col-12-sm">
            <div class="item-name">{{ item.name }}</div>
          </div>
          <hr />
          <div class="col-12-sm p-3 mt-4 mb-5 bs">
            <button
              type="button"
              class="btn btn-warning br"
              v-on:click="showModal()"
            >
              Redeem
              <i class="fas fa-angle-right"></i>
            </button>
          </div>
          <hr />
          <div class="col-12-sm">
            <div class="item-footer">{{ item.quantity }} left in stock</div>
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
  font-size: 40px;
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
  width: 90%;
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
};
</script>