<template>
  <div class="container">
    <div class="cards">
      <div class="img">
        <img :src="product.images[0]" alt="Not Found" />
      </div>
      <div class="aude">
        <div class="tit">
          <h2>{{ product.title }}</h2>
        </div>
        <p class="dis">{{ truncateText(product.description, 50) }}</p>
        <div class="price">
          <p class="pri">Price: {{ product.price }}$</p>
        </div>
      </div>
    </div>

    <div class="boutt">
      <button v-on:click="addProductToCart(product)">اضف الى العربه</button
      ><router-link class="det" :to="`/product-details/${product.id}`"
        ><button>عرض المزيد</button></router-link
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "WatP",
  props: ["product", "isLoggedIn"],
  methods: {
    addProductToCart(product) {
      if (this.isLoggedIn) {
        this.$emit("add-to-cart", product);
      } else {
        this.$swal.fire({
          icon: "error",
          title: "لا يمكنك اضافه المنتج",
          text: "الرجاء تسجيل الدخول اولا لاضافه المنتج الى العربه",
          confirmButtonText: "موافق",
          showConfirmButton: false,
        });
      }
    },
    truncateText(text, maxLength) {
      if (text.length <= maxLength) {
        return text;
      } else {
        return text.substring(0, maxLength) + "عرض المزيد";
      }
    },
  },
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}
.container {
  .tit {
    h2 {
      font-size: 20px;
    }
    padding-top: 8px;

    text-align: center;
  }
  padding-left: 20px;
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  .img {
    display: flex;
    flex-wrap: wrap;
    padding-top: 10px;

    img {
      width: calc(100% / 1.1);
      height: 280px;
      border-radius: 5px;
    }
  }
  .boutt {
    text-align: center;
    button {
      width: 130px;
      padding: 5px;
      background-color: #ffd814;
      border: none;
      margin-right: 15px;
      margin-bottom: 10px;
      border-radius: 4px;
      font-size: 20px;
      transition: ease-in-out 0.6s;
      &:hover {
        transform: scale(1.1);
        border: solid 2px rgb(95, 93, 93);
      }
    }
  }
  .det {
    padding-left: 33px;
    button {
      width: 130px;
      padding: 5px;
      background-color: #ffd814;
      border: none;
      margin-right: 15px;
      margin-bottom: 10px;
      border-radius: 4px;
      font-size: 20px;
      transition: ease-in-out 0.6s;
      &:hover {
        transform: scale(1.1);
        border: solid 2px rgb(65, 64, 64);
      }
    }
  }
  .aude {
    position: relative;
    margin-top: 10px;
    background-color: white;
    text-align: left;
    align-items: center;
    justify-content: center;
    width: calc(100% / 1.1);
    border-radius: 10%;
    height: 200px;
    .dis {
      padding: 5px;
      letter-spacing: -1px;
      color: rgb(136, 135, 135);
      flex-wrap: wrap;
    }
    .pri {
      position: absolute;
      bottom: -8%;
      left: 20%;
      text-align: center;
      padding-bottom: 15px;
      font-size: 20px;
      color: rgb(70, 3, 3);
    }
  }

  @media (width: 1280px) {
    .det {
      padding-left: 55px;
    }
  }
  @media (width: 1024px) {
    .det {
      padding-left: 66px;
    }
  }
  @media (width: 912px) {
    .det {
      padding-left: 52px;
    }
  }
  @media (width: 820px) {
    .det {
      padding-left: 28px;
    }
  }

  @media (max-width: 360px) {
    .det {
      padding-left: 78px;
    }
  }
  @media (width: 375px) {
    .det {
      padding-left: 86px;
    }
  }
  @media (width: 768px) {
    .det {
      padding-left: 89px;
    }
  }
  @media (width: 280px) {
    .det {
      padding-left: 37px;
    }
  }
}
</style>
