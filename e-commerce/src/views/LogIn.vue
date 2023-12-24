<template>
  <div class="container">
    <h2 style="padding-top: 70px; font-weight: 600; color: black">
      قم بتسجيل الدخول الى حسابك
    </h2>
    <div class="fodi_2">
      <form class="px-4 py-3" @submit.prevent="login">
        <div class="mb-3">
          <label
            for="exampleDropdownFormEmail1"
            class="form-label"
            style="padding: 5px 0px"
            >User Name</label
          >
          <input
            type="text"
            v-model="username"
            class="form-control"
            placeholder="Username"
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleDropdownFormEmail1" class="form-label"
            >Email address</label
          >
          <input
            type="email"
            v-model="email"
            class="form-control"
            placeholder="email@example.com"
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleDropdownFormPassword1" class="form-label"
            >Password</label
          >
          <input
            type="password"
            v-model="password"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary">سجل الدخول</button>
      </form>
      <div style="padding: 0.5px 0px; background-color: #cccdce"></div>
      <a
        class="dropdown-item"
        href="#"
        style="text-align: right; text-decoration: none; padding: 10px 7px"
      >
        <router-link to="/Sign-up" style="text-decoration: none">
          ليس لديك حساب ؟ قم بانشاء حساب من هنا
        </router-link></a
      >
    </div>
  </div>
</template>
<script>
import firebase from "firebase/compat/app";
export default {
  data() {
    return {
      isLoggedIn: localStorage.getItem("isLoggedIn") === "true" || false,
      username: "",
      password: "",
      email: "",
    };
  },
  mounted() {
    // this.login();
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // Authentication successful
          this.isLoggedIn = true;
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("Username", this.username);
          this.$emit("Log");

          // Redirect the user to the products page
          this.$router.push("/products");
        })
        .catch((error) => {
          // Handle authentication error
          console.log(error);
          // Show a message or alert to the user
          this.$swal.fire({
            icon: "error",
            title: "هذا الحساب ليس مسجل",
            text: "يرجى إنشاء حساب أولاً",
            confirmButtonText: "موافق",
            customClass: {
              popup: "my-custom-popup-class",
              title: "my-custom-title-class",
              content: "my-custom-content-class",
              confirmButton: "my-custom-confirm-button-class",
            },
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  margin-top: 45px;
  padding-bottom: 40px;

  background-color: #eff1f3;
  .fodi_2 {
    margin-left: 370px;
    align-items: center;
    max-width: 455px;
    background-color: #ffffff;
    border-radius: 5px;
    align-items: center;
    text-align: left;
    border: solid 1px #cccdce;
    .dropdown-item {
      transition: 0.5s;
      &:hover {
        background-color: #eff1f3;
      }
    }
  }

  @media (min-width: 990px) and (max-width: 1200px) {
    .fodi_2 {
      margin-left: 260px;
    }
  }
  @media (min-width: 770px) and (max-width: 990px) {
    .fodi_2 {
      margin-left: 180px;
    }
  }
  @media (max-width: 769px) {
    .fodi_2 {
      margin-left: 20px;
    }
    h2 {
      margin-left: -90px;
    }
  }
  @media (max-width: 300px) {
    .dropdown-item {
      letter-spacing: -1px;
    }
    h2 {
      margin-left: 0px;
    }
  }
}
</style>
