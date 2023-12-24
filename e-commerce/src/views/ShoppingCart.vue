<template>
  <div class="cart-page">
    <h2>عربة التسوق</h2>
    <div class="card">
      <ul>
        <li
          v-for="product in cartItems"
          :key="product.id"
          style="list-style: none"
        >
          <div class="all">
            <div class="im">
              <img :src="product.images[0]" alt="Not Found" />
            </div>
            <div class="content">
              <p style="color: #aaa8a8; font-weight: 600">
                <span style="color: black">brand</span> :{{ product.brand }}
              </p>
              <p style="color: #aaa8a8; font-weight: 600">
                <span style="color: black">Name</span> :{{ product.title }}
              </p>
              <p style="color: #aaa8a8; font-weight: 600">
                <span style="color: black"> category</span> :{{
                  product.category
                }}
              </p>
              <p style="color: rgb(156, 107, 47); word-spacing: 1px">
                <span
                  style="color: black; font-weight: 600; letter-spacing: 2px"
                >
                  description </span
                >:{{ product.description }}
              </p>
              <p style="color: #aaa8a8">
                <span style="color: black; font-weight: 600">price</span> :{{
                  product.totpr
                }}$

                <span style="padding-left: 5px; color: black"
                  >Quantity:<button
                    style="
                      width: 20px;
                      height: 30px;
                      text-align: center;
                      border: solid 1px gray;
                    "
                    @click="decrementQuantity(product)"
                    class="quantity-button"
                  >
                    -</button
                  ><input
                    style="width: 20px; height: 30px; text-align: center"
                    type="text"
                    v-model.number="product.quantity"
                    class="quantity-input"
                    min="1"
                    readonly
                  />
                  <button
                    style="
                      width: 20px;
                      height: 30px;
                      text-align: center;
                      border: solid 1px gray;
                    "
                    @click="incrementQuantity(product)"
                    class="quantity-button"
                  >
                    +
                  </button>
                  <button @click="removeprod(product)" class="del-button">
                    <font-awesome-icon
                      icon="trash-alt"
                      style="color: rgb(219, 148, 15); font-size: 20px"
                    />
                  </button>
                </span>
              </p>
            </div>
          </div>
          <hr
            style="width: 80%; height: 2px; background-color: rgb(219, 148, 15)"
          />
        </li>
      </ul>
      <div class="totcos" v-if="cartItemsCount > 0">
        <span
          style="
            position: absolute;
            right: 20px;
            font-size: 28px;
            bottom: 0;
            padding-bottom: 0px;
            color: rgb(117, 36, 36);
            width: 150px;
          "
          >اجمالى السعر
        </span>
        <span
          style="
            position: absolute;
            left: 20px;
            font-size: 26px;
            padding-bottom: 0px;
            bottom: 0;
            font-weight: 600;
            color: black;
            width: 100px;
          "
          >{{ totalPrice }}$</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

//import axios from "axios";
export default {
  name: "ShoppingCart",
  data() {
    return {
      cartItems: [],
      cartItemsCount: 0,
      counter: 0,
    };
  },

  components: {
    FontAwesomeIcon,
  },

  mounted() {
    library.add(faTrashAlt);
    // استعادة cartItems من Local Storage
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  },

  methods: {
    removeprod(product) {
      // حذف المنتج من العربة
      // localStorage.getItem("cartItemsCount");
      const index = this.cartItems.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
        localStorage.setItem("cartItemsCount", this.cartItems.length);
      }
      const storedCartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];
      const storedIndex = storedCartItems.findIndex(
        (item) => item.id === product.id
      );
      if (storedIndex !== -1) {
        storedCartItems.splice(storedIndex, 1);
        this.cartItemsCount = this.cartItems.length;
        localStorage.setItem("cartItemsCount", this.cartItemsCount);
        localStorage.setItem("cartItems", JSON.stringify(storedCartItems));
      }
      this.$emit("count");
    },
    incrementQuantity(product) {
      if (product.quantity < 10) {
        product.quantity += 1;
        product.totpr = product.price * product.quantity;
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(JSON.parse(localStorage.getItem("cartItems")) || [])
      );
    },
    decrementQuantity(product) {
      if (product.quantity > 1) {
        product.quantity -= 1;
        product.totpr = product.price * product.quantity;
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(JSON.parse(localStorage.getItem("cartItems")) || [])
      );
    },
  },
  computed: {
    totalPrice() {
      let total = 0;
      for (let i = 0; i < this.cartItems.length; i++) {
        const product = this.cartItems[i];
        total += product.price * product.quantity;
      }
      return total;
    },
  },
};
</script>
<style lang="scss">
.cart-page {
  background-color: #ccc9c9;
  border: #f5f4f4;
  h2 {
    font: 2em sans-serif;
    padding-top: 50px;
  }
  .all {
    padding: 10px;
    background-color: #f5f4f4;
    align-items: center;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 10px;
    margin-top: 20px;
    p {
      padding-bottom: 0px;
      padding-top: 0px;
    }
    .im {
      text-align: left;
      width: 250px;
      img {
        height: 250px;
        width: 250px;
        border-radius: 5px;
      }
    }
    .totcos {
      margin: 10px;
      flex-wrap: wrap;
      display: flex;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
    .content {
      position: relative;
      text-align: left;
      width: 250px;
      padding-left: 20px;
      margin-bottom: 30px;
      .del-button {
        border-radius: 5px;
        margin-top: 20px;
        margin-bottom: 5px;
        padding: 5px 50px;
        position: absolute;
        left: 27%;
        top: 89%;
        transition: ease-in-out 0.6s;
        &:hover {
          transform: scale(1.1);
          border: solid 1px indigo;
          font-awesome-icon {
            color: aquamarine;
          }
        }
      }
    }
  }
}
</style>
