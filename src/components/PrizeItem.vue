<template>
  <div class="col my-3">
    <div class="card shadow-sm" style="width: 25m">
      <img
        v-bind:src="item.image_url"
        class="card-img-top img"
        v-bind:alt="item.name"
      />
      <div class="card-body">
        <div class="card-text py-lg-4 my-lg-1">Win a {{ item.name }}</div>

        <button
          type="button"
          class="btn btn-warning br my-2 px-lg-5 px-sm-4 px-5 py-2"
          v-on:click="redeem()"
        >
          Redeem >
          <i class="fas fa-angle-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.img {
  height: 14rem;
}
.br {
  border-radius: 20px;
  font-size: 0.8em;
}
.card {
  border: none;
}
.card-text {
  font-weight: 900;
}
// Small Devices
@media (min-width: 320px) and (max-width: 768px) {
  .card-text {
    font-size: 1.2rem;
  }
  .img {
    height: 13rem;
  }
  .br {
    font-size: 0.8em;
  }
}

// Medium Devices
@media (min-width: 768px) and (max-width: 992px) {
  .card-text {
    font-size: 0.9rem;
  }
  .img {
    height: 10rem;
  }
  .br {
    font-size: 0.7em;
  }
}
//Large Devices
@media (min-width: 992px) and (max-width: 1200px) {
  .img {
    height: 12rem;
  }
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
      this.$emit("selectItem", this.item);
      this.$router.push({ path: "home", query: { name: this.item.name } });
    },
  },
};
</script>