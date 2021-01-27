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
      <!-- HEADER -->
      <div class="header row">
        <div class="header-text fs-2">Rewards</div>
      </div>
      <!-- CONTENT -->
      <div class="content row px-lg-5 pb-5">
        <div v-if="!selectedItem.name">
          <div class="content-header">
            <div class="content-header-t">
              Here is the full list of prizes that you can win.
            </div>
          </div>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
            <PrizeItem
              v-for="item of items"
              :key="item.name"
              :item="item"
              @selectItem="selectItem"
            />
          </div>
        </div>

        <div v-if="selectedItem.name">
          <PrizeDetail :item="selectedItem" />
        </div>
      </div>
      <!-- FOOTER -->
      <div class="footer row">
        <div class="footer-t fs-7 fw-bold">
          Terms & Condition | Privacy Policy
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.header {
  background-color: rgb(2, 116, 187);
  height: 170px;
  display: flex;
  align-items: center;
  .header-text {
    font-weight: 900;
    color: white;
  }
}
.content {
  background-color: rgb(234, 234, 234);
  .content-header {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    .content-header-t {
      color: #414141;
    }
  }
}

.items-container {
  display: block;
}
.footer {
  background: rgb(24, 24, 24);
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  .footer-t {
    color: white;
  }
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
      console.log(this.user)
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
