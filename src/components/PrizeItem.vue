<template>
  <div class="card col-sm m-3" style="width: 20rem">
    <img
      v-bind:src="item.image_url"
      class="card-img-top"
      v-bind:alt="item.name"
    />
    <div class="card-body">
      <h3 class="card-title fw-bolder m-5">Win a {{ item.name }}</h3>
      <!-- <p class="card-text">
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </p> -->
      <button type="button" class="btn btn-warning br" v-on:click="redeem()">
        Redeem
        <i class="fas fa-angle-right"></i>
      </button>
    </div>
  </div>
</template>
<style lang="less" scoped>
.card {
  float: left;
}
.img {
  height: 270px;
}
.br {
  border-radius: 20px;
}
</style>
<script>
export default {
  name: "PrizeItem",
  props: {
    item: Object,
  },
  methods: {
    redeem() {
      this.$emit("selecItem", this.item);
      this.$router.push({ path: "home", query: { name: this.item.name } });
    },
  },
};
</script>