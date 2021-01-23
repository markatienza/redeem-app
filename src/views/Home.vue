<template>
  <NavBar
    v-bind:isAuthenticate="isAuthenticate"
    v-bind:user="user"
    @updateUser="updateUser"
  />

  <div class="home">
    <RedeemModal v-if="selectedItem" :item="selectedItem" />
    <div class="container">
      <div v-if="!selectedItem.name" class="items-container">
        <PrizeItem
          class="col-sm m-25"
          v-for="item of items"
          :key="item.name"
          :item="item"
          @selecItem="selecItem"
        />
      </div>
      <div v-if="selectedItem.name">
        <PrizeItemPreview :item="selectedItem" />
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.items-container {
  display: block;
}
</style>
<script>
// @ is an alias to /src
import NavBar from "../components/NavBar";
// import PrizeItem from "../components/PrizeItem";
import PrizeItem from "../components/PrizeItem";
import PrizeItemPreview from "../components/PrizeItemPreview";
import RedeemModal from "../components/RedeemModal";
import request from "../api/request";

export default {
  name: "Home",
  beforeCreate() {
    // Make a call to fetch the items
    console.log("before Create", this.$route.query);
    const name = this.$route.query.name;
    if (name) {
      request
        .get("/prizes/" + name)
        .then((response) => {
          if (response.data) {
            this.selectedItem = response.data.data;
          }
        })
        .then((err) => console.log(err));
    } else {
      request
        .get("/prizes/")
        .then((response) => {
          if (response.data) {
            this.items = response.data.data;
          }
        })
        .catch((err) => console.log(err));
    }
  },
  components: {
    NavBar,
    PrizeItem,
    PrizeItemPreview,
    RedeemModal,
  },
  data() {
    return {
      isAuthenticate: false,
      user: {},
      items: [],
      selectedItem: {},
      isOpen: false,
    };
  },
  methods: {
    updateUser(data) {
      this.user = data.user;
      this.isAuthenticate = data.status;
    },
    selecItem(data) {
      this.selectedItem = data;
      console.log(this.selectedItem);
    },
  },
};
</script>
