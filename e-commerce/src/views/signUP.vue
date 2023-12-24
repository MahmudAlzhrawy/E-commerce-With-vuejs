<template>
  <div class="container">
    <h2 style="padding-top: 70px; font-weight: 600; color: black">
      قم بانشاء حساب خاص بك من هنا
    </h2>
    <div class="fodi">
      <form class="px-4 py-3" @submit.prevent="userAuth">
        <div class="mb-3">
          <label
            for="exampleDropdownFormEmail1"
            class="form-label"
            style="padding: 5px 0px"
            >Email address</label
          >
          <input
            type="email"
            v-model="user.email"
            class="form-control"
            placeholder="email@example.com"
          />
        </div>
        <div class="mb-3">
          <label
            for="exampleDropdownFormPassword1"
            class="form-label"
            style="padding-top: 5px"
            >Password</label
          >
          <input
            type="password"
            v-model="user.password"
            class="form-control"
            placeholder="Password"
          />
        </div>

        <button type="submit" class="btn btn-primary" style="margin: 5px 0px">
          انشاء حساب
        </button>
      </form>
      <div style="padding: 0.5px 0px; background-color: #cccdce"></div>
      <a
        class="dropdown-item"
        href="#"
        style="text-align: right; text-decoration: none; padding: 10px 7px"
      >
        <router-link to="/login" style="text-decoration: none">
          هل لديك حساب بالفعل ؟ قم بتسجيل الدخول من هنا
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
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },

  methods: {
    userAuth() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then((res) => {
          res.user
            .updateProfile({
              displayName: this.user.name,
            })

            .then(() => {
              this.$router.push("/LogIn");
            });
          this.$swal.fire({
            icon: "success",
            title: "تم انشاء الحساب بنجاح",
            showConfirmButton: false,
            timer: 1200,
          });
        })
        .catch((error) => {
          alert(error.message);
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
  .fodi {
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
    .fodi {
      margin-left: 260px;
    }
  }
  @media (min-width: 770px) and (max-width: 990px) {
    .fodi {
      margin-left: 180px;
    }
  }
  @media (max-width: 769px) {
    .fodi {
      margin-left: 20px;
    }
  }
  @media (max-width: 300px) {
    .dropdown-item {
      letter-spacing: -1px;
    }
  }
}
</style>
