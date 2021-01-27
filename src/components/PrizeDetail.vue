<template>
  <div class="container pd-cont pt-4">
    <div class="row">
      <!-- IMAGE -->
      <div class="col-lg-7 col-md-7">
        <img
          class="img-fluid img"
          v-bind:src="item.image_url"
          v-bind:alt="item.name"
        />
      </div>
      <!-- CARD -->
      <div class="col-lg-5 col-md-5">
        <div class="card p-lg-3">
          <div class="card-body pb-lg-5">
            <div class="card-title">Win a {{ item.name }}</div>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item py-lg-2">
              <button
                type="button"
                class="btn btn-redeem btn-warning my-2 fw-light"
                data-bs-toggle="modal"
                data-bs-target="#showConfirmModal"
                v-on:click="showModal()"
              >
                Redeem >
              </button>
            </li>
            <li class="list-group-item pb-lg-3 st-text">
              <div v-if="item.quantity > 0">
                {{ item.quantity }} left in stock
              </div>
              <div class="item-footer" v-else>Out of stock!</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- DESCRIPTION  -->
    <div class="col-12 mt-5 py-5 d-container">
      <div class="row">
        <div class="col-lg-3 col-md-3 col-sm-5 d-title">Description</div>
        <div class="col d-text">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.img {
  height: 100%;
}
.btn {
  border-radius: 20px;
}
.d-container {
  border-top: 1px solid #959595;
  .d-title {
    display: block;
    text-align: left;
    font-size: 1.5rem;
    font-weight: 900;
  }
  .d-text {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
  }
}
.card {
  display: flex;
  align-items: flex-start;
  .card-body {
    padding: 0;
  }
  .card-body .card-title {
    font-weight: 900;
  }
  .list-group {
    width: 100%;
    .list-group-item {
      display: flex;
      width: 100%;
      align-items: flex-start;
    }
  }
}
.st-text {
  font-size: 0.7rem;
}

// Small Devices
@media (min-width: 320px) and (max-width: 767px) {
  .img {
    padding: 1rem 0;
  }
  .card-title {
    font-size: 1.2rem;
    padding: 0.5rem 0.5rem 1.5rem 0.5rem;
  }
  .btn-redeem {
    padding: 0.5rem 3rem;
    font-size: 0.7rem;
  }
  .d-text {
    display: block;
    text-align: left;
  }
}

// Medium Devices
@media (min-width: 768px) and (max-width: 992px) {
  .btn-redeem {
    padding: 0.5rem 3rem;
    font-size: 0.7rem;
  }
  .card-title {
    font-size: 1.2rem;
    padding: 0.5rem 0.5rem 1.5rem 0.5rem;
  }
  .img {
    height: 13rem;
  }
}
//Large Devices
@media (min-width: 992px) and (max-width: 1200px) {
  .img {
    height: 19rem;
  }
  .pd-cont {
    padding: 0 3rem;
  }
  .btn-redeem {
    padding: 0.5rem 3rem;
    font-size: 0.7rem;
  }
  .card-title {
    font-size: 1.5rem;
    font-weight: 900;
  }
}
// X-Large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
  .img {
    height: 19rem;
  }
  .card-title {
    font-size: 1.2rem;
  }
  .btn-redeem {
    padding: 0.5rem 3rem;
    font-size: 0.7rem;
  }
  .pd-cont {
    padding: 0 7rem;
  }
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