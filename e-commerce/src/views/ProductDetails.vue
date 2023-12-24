<template>
  <div class="data">
    <div class="disc">
      <span
        ><h4>Product Description:</h4>
        <p>{{ product.description }}</p></span
      >
      <span
        ><h4>Product Name:</h4>
        <p>{{ product.title }}</p></span
      >
    </div>

    <div class="imge">
      <img
        v-for="img in product.images"
        :src="img"
        alt="not found"
        :key="img"
      />
    </div>
    <span class="boutt"
      ><button @click="addItemToCart(product)">اضف الى العربه</button></span
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: null,
    };
  },
  props: ["products", "isLoggedIn"],
  created() {
    // استرجاع البيانات عند تحميل المكون
    const productId = this.$route.params.productId;

    // قم بإجراء استدعاء API اللازم هنا باستخدام معرف المنتج واحفظ البيانات في الخاصية `product`
    this.product = this.products.find((p) => p.id === parseInt(productId));
    //هنا بيقوم بفحص اذا كان ال id تاذى بداخل ال products مطابق لل id الذى عثر عليه اثناء تمريره فى ال router ويخزنه داخل product.
  },
  methods: {
    addItemToCart(product) {
      if (this.isLoggedIn) {
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
            showConfirmButton: false,
            confirmButtonText: "موافق",
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
        // console.log(this.cartItems);
      } else {
        this.$swal.fire({
          icon: "error",
          title: "لا يمكنك اضافه المنتج",
          text: "الرجاء تسجيل الدخول اولا لاضافه المنتج الى العربه",
          confirmButtonText: "موافق",
          customClass: {
            popup: "my-custom-popup-class",
            title: "my-custom-title-class",
            content: "my-custom-content-class",
            confirmButton: "my-custom-confirm-button-class",
          },
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.data {
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
  grid-gap: 10px;
  .disc {
    background-color: #f6f6f6ec;

    width: auto;
  }
  .boutt {
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
  .imge {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 10px;
    background-color: #f6f6f6ec;

    img {
      width: 200px;
      height: 200px;
      justify-content: center;
      text-align: center;
    }
  }
  @media (max-width: 410px) {
    img {
      display: block;
      margin: 0 auto; /* لتوسيط الصورة أفقياً */
    }
  }
}
</style>
