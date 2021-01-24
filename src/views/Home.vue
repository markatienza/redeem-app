<template>
  <NavBar
    v-bind:isAuthenticate="isAuthenticate"
    v-bind:user="user"
    @updateUser="updateUser"
  />

  <LightBox
    v-if="selectedItem"
    :item="selectedItem"
    @selectItem="selectItem"
    @setItems="setItems"
  />
  <div class="home">
    <div class="container">
      <div v-if="!selectedItem.name" class="items-container">
        <PrizeItem
          class="col-sm m-25"
          v-for="item of items"
          :key="item.name"
          :item="item"
          @selectItem="selectItem"
        />
      </div>
      <div v-if="selectedItem.name">
        <PrizeDetail :item="selectedItem" />
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
import PrizeItem from "../components/PrizeItem";
import PrizeDetail from "../components/PrizeDetail";
import LightBox from "../components/LightBox";
import request from "../api/request";

export default {
  name: "Home",
  beforeMount() {
    // Make a call to fetch the items
    const name = this.$route.query.name;
    if (name) {
      this.selectItem({ name });
    } else {
      this.setItems();
    }
  },
  components: {
    NavBar,
    PrizeItem,
    PrizeDetail,
    LightBox,
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
    selectItem(data) {
      if (!data.name) return (this.selectedItem = data);
      request
        .get("/prizes/" + data.name)
        .then((response) => {
          if (response.data) {
            this.selectedItem = response.data.data;
          }
        })
        .catch((err) => console.log(err));
    },
    setItems() {
      request
        .get("/prizes")
        .then((response) => {
          if (response.data) {
            this.items = response.data.data;
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
