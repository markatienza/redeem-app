<template>
  <NavBar />

  <LightBox
    v-if="selectedItem"
  />
  <div class="home">
    <div class="container">
      <!-- HEADER -->
      <div class="header row">
        <div class="header-text fs-2">Rewards</div>
      </div>
      <!-- CONTENT -->
      <div class="content row px-lg-5 pb-5">
        <div v-if="!selectedItem.name && !isLoading">
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
            />
          </div>
        </div>

        <div v-if="selectedItem.name && !isLoading">
          <PrizeDetail :item="selectedItem" />
        </div>
      </div>
      <!-- FOOTER -->
      <div class="footer row mb-1">
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
import { mapState } from "vuex";
import NavBar from "../components/NavBar";
import PrizeItem from "../components/PrizeItem";
import PrizeDetail from "../components/PrizeDetail";
import LightBox from "../components/LightBox";
// import request from "../api/request";

export default {
  name: "Home",
  components: {
    NavBar,
    PrizeItem,
    PrizeDetail,
    LightBox,
  },
  computed: {
    ...mapState({
      items: (state) => state.prizes.items,
      isLoading: (state) => state.prizes.isLoading,
      selectedItem: (state) => state.prizes.selectedItem,
    }),
  },
  beforeCreate() {
    // Make a call to fetch the items
    const name = this.$route.query.name;
    if (name) {
      this.$store.dispatch("prizes/selectItem", { name });
    } else {
      this.$store.dispatch("prizes/setItems");
    }
  },

  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    // selectItem(data) {
    //   if (!data.name) return (this.selectedItem = data);
    //   this.$store.dispatch("prizes/selectItem", data);
    // },
    setItems() {
      this.$store.dispatch("prizes/setItems");
    },
  },
};
</script>
