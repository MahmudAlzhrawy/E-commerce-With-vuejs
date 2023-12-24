<template>
  <div class="prod">
    <div class="text">
      <h1 id="hh">Products</h1>
      <span> Welcome,Mr {{ Username }}</span>
    </div>

    <form class="d-flex" role="search">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        v-model="searchQuery"
      />
    </form>

    <div class="divid">
      <div class="con" v-for="product in filteredProducts" :key="product.id">
        <WatP
          :product="product"
          :isLoggedIn="isLoggedIn"
          @add-to-cart="addItemToCart"
        />
      </div>
    </div>
    <div class="up">
      <button><a href="#hh">up</a></button>
    </div>
  </div>
</template>

<script>
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
//import axios from "axios";
import WatP from "../components/PRODUCTS/Products box.vue";
//import { axidata } from "./views/ShoppingCart.vue";
export default {
  name: "ProductVue",
  data() {
    return {
      cartItems: [],
      searchsQuery: "",
      Username: "",
    };
  },
  components: { WatP },
  props: ["products", "isLoggedIn"],

  //   library.add(faSearch);
  created() {
    this.Username = localStorage.getItem("Username");
  },
  computed: {
    filteredProducts() {
      if (this.searchQuery === "") {
        return this.products;
      } else {
        const searchRegex = new RegExp(this.searchQuery, "i");
        return this.products.filter((product) =>
          product.title.match(searchRegex)
        );
      }
    },
  },
  methods: {
    addItemToCart(product) {
      // localStorage.getItem("cartItemsCount");
      const storedCartItems = localStorage.getItem("cartItems");
      if (storedCartItems) {
        this.cartItems = JSON.parse(storedCartItems);
      }
      const existingProduct = this.cartItems.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.totpr =
          existingProduct.price * existingProduct.quantity;
        this.$swal.fire({
          icon: "error",
          title: "Allready existing",
          confirmButtonText: "موافق",
          showConfirmButton: false,
          timer: 1200,
        });
      } else {
        product.quantity = 1;
        product.totpr = product.price * product.quantity; // إضافة المتغير quantity إلى المنتج الجديد
        this.cartItems.push(product);
        this.$swal.fire({
          icon: "success",
          title: "Successfuly Added",
          showConfirmButton: false,
          timer: 1200,
        });
        localStorage.setItem("cartItemsCount", this.cartItems.length);
      }
      // حفظ cartItems في Local Storage
      localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
      this.$emit("count");
      console.log(this.cartItems);
    },
  },
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}

.prod {
  .up {
    position: fixed;
    bottom: 0.5%;
    right: 20px;
    z-index: 99999999;
    button {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: rgb(33, 97, 134);
      border-color: transparent;
      color: #757474;
      font-size: 25px;
      animation-name: up-to-down;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      -webkit-border-radius: 50%;
    }
    @keyframes up-to-down {
      to {
        color: crimson;
        background-color: rgb(221, 224, 37);
        transform: translateY(-20px);
        -webkit-transform: translateY(-20px);
        -moz-transform: translateY(-20px);
        -ms-transform: translateY(-20px);
        -o-transform: translateY(-20px);
      }
    }
  }
  .text {
    text-align: center;
    h1 {
      padding-top: 30px;
      color: #c5c2c2;
      padding-left: 150px;
    }
  }
  margin-top: 17px;
  .d-flex {
    z-index: 100000;
    top: 0.5%;
    left: -2%;
    margin-bottom: 15px;
    width: 54%;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin-left: 30px;
  }
  .header {
    height: 50px;
  }

  .divid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(255px, 1fr));
    grid-gap: 10px;
  }
  .con {
    background-color: rgb(234, 238, 238);
    padding: 10px;
  }
  a {
    font-weight: bold;
    color: #053544;
    float: left;
    padding-left: 5px;
    text-decoration: none;
    transition: 0.7s ease;
    &:hover {
      color: #232f3e;
    }
    &.router-link-exact-active {
      color: #046790;
    }
  }

  @media (min-width: 530px) {
    .d-flex {
      left: 5%;
    }
  }
  @media (max-width: 285px) {
    .d-flex {
      width: 50%;
    }
  }
}
</style>
