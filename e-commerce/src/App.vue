<!-- eslint-disable prettier/prettier -->
<template>
  <app-h
    :cartItemsCount="cartItemsCount"
    :products="products"
    :isLoggedIn="isLoggedIn"
    @logout="logout"
    @loginout="loginout"
  />
  <router-view
    :products="products"
    @count="count"
    @Log="Log"
    :isLoggedIn="isLoggedIn"
    :cartItemsCount="cartItemsCount"
  >
  </router-view>

  <footer class="text-center text-lg-start bg-light text-muted">
    <!-- Section: Social media -->
    <section
      class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
    >
      <!-- Left -->
      <div class="me-5 d-none d-lg-block">
        <span>Get connected with us on social networks:</span>
      </div>
      <!-- Left -->

      <!-- Right -->
      <div>
        <a href="" class="me-4 text-reset">
          <font-awesome-icon icon="facebook" />
        </a>
        <a href="" class="me-4 text-reset">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="" class="me-4 text-reset">
          <i class="fab fa-google"></i>
        </a>
        <a href="" class="me-4 text-reset">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="" class="me-4 text-reset">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="" class="me-4 text-reset">
          <i class="fab fa-github"></i>
        </a>
      </div>
      <!-- Right -->
    </section>
    <!-- Section: Social media -->

    <!-- Section: Links  -->
    <section class="">
      <div class="container text-center text-md-start mt-5">
        <!-- Grid row -->
        <div class="row mt-3">
          <!-- Grid column -->
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <!-- Content -->
            <h6 class="text-uppercase fw-bold mb-4">
              <i class="fas fa-gem me-3"></i>Company name
            </h6>
            <p>
              Here you can use rows and columns to organize your footer content.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">Products</h6>
            <p>
              <a href="#!" class="text-reset">Electronic devices</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Foods</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Foruntire</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Jewelry</a>
            </p>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">Useful links</h6>
            <p>
              <a href="#!" class="text-reset">Pricing</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Settings</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Orders</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Help</a>
            </p>
          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
            <p><i class="fas fa-home me-3"></i>Assiut</p>
            <p>
              <i class="fas fa-envelope me-3"></i>
              mahmudnagi192003@gmail.com
            </p>
            <p><i class="fas fa-phone me-3"></i> +201149564002</p>
            <p><i class="fas fa-print me-3"></i> +201123737836</p>
          </div>
          <!-- Grid column -->
        </div>
        <!-- Grid row -->
      </div>
    </section>
    <!-- Section: Links  -->

    <!-- Copyright -->
    <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05)">
      © 2021 Copyright:
      <a class="text-reset fw-bold" href="#">MZ-Stores</a>
    </div>
    <!-- Copyright -->
  </footer>
  <!-- Footer -->
</template>
<script>
import AppH from "@/components/AppHeader.vue";
import firebase from "firebase/compat/app";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

import axios from "axios";
export default {
  name: "APp",
  components: { AppH, FontAwesomeIcon },
  data() {
    return {
      isLoggedIn: false,
      products: [],
      cartItemsCount: 0,
      searchQuery: "",
      chan: false,
    };
  },

  mounted() {
    library.add(faFacebook);
    this.fetchData();
    this.count();
    this.Log();
  },

  methods: {
    async fetchData() {
      axios
        .get("https://dummyjson.com/products")
        .then((response) => {
          const data = response.data;
          this.products = data.products;
          // تعامل مع البيانات المسترجعة هنا
          console.log(data.products);
        })
        .catch((error) => {
          // التعامل مع الأخطاء هنا
          console.error("حدث خطأ في الاستدعاء:", error);
        });
    },
    //احضار المنتجات التى تم اضافتها الى العربه
    count() {
      const storedCartItemsCount = localStorage.getItem("cartItemsCount");
      if (storedCartItemsCount) {
        this.cartItemsCount = parseInt(storedCartItemsCount);
      }
    },

    logout() {
      this.isLoggedIn = localStorage.getItem("isLoggedIn");
      // Perform the logout action
      // Example:
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Logout successful
          // Clear any user-related data or state
          this.$swal.fire({
            icon: "success",
            title: "تم تسجيل الخروج من الحساب بنجاح",
          });
          this.isLoggedIn = false;
          localStorage.setItem("isLoggedIn", false);
          // Redirect the user to the login page
          this.$router.push("/login");
        })
        .catch((error) => {
          // Handle logout error
          console.log(error);
          // Show a message or alert to the user
          alert("An error occurred during logout. Please try again.");
        });
    },
    Log() {
      this.isLoggedIn = localStorage.getItem("isLoggedIn");
    },
    chang() {
      this.chan = !this.chan;
    },
    loginout() {
      this.isLoggedIn = false;
      localStorage.setItem("isLoggedIn", false);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #041325;
}
</style>
