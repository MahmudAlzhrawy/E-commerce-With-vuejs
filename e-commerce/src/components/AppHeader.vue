<template>
  <div class="header">
    <ul class="sp">
      <li style="list-style: none" class="nav-item dropdown">
        <a
          style="color: rgb(199, 159, 48)"
          class="nav-link"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span
            class="icon"
            @click="chang"
            :style="
              chan
                ? 'border: solid 1px rgb(199, 159, 48)'
                : 'border: solid 1px white'
            "
          >
            <span></span>
            <span></span>
            <span></span>
          </span>
        </a>
        <ul class="drp" :style="appear ? 'display:block' : 'display:none'">
          <li class="nav-item dropdown">
            <a
              style="color: rgb(199, 159, 48)"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click="toggleDropdown"
            >
              Browse
            </a>
            <ul class="dropdown-menu">
              <li><hr class="dropdown-divider" /></li>
              <li>
                <router-link class="dropdown-item" to="/">Products</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              style="color: rgb(199, 159, 48)"
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Accounts
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/Sign-up"
                  >Sign Up</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/login" @click="loginout"
                  >Login</router-link
                >
              </li>
              <li>
                <a
                  v-if="isLoggedIn"
                  style="padding-left: 30px"
                  class="dropdown-item"
                  href="#"
                  @click="logout"
                >
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>

    <!-- this is for responseive disign -->

    <!-- try -->
    <ul class="browse">
      <li style="list-style: none" class="nav-item dropdown">
        <a
          style="color: rgb(199, 159, 48)"
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Browse
        </a>
        <ul class="dropdown-menu">
          <!-- <li>
            <a class="dropdown-item" href="#">
              <router-link to="/">Home</router-link></a
            >
          </li> -->
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a class="dropdown-item" href="#">
              <router-link to="/">products</router-link></a
            >
          </li>
        </ul>
      </li>
    </ul>
    <ul style="position: absolute; top: 14px" class="account">
      <li style="list-style: none" class="nav-item dropdown">
        <a
          style="color: rgb(199, 159, 48)"
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Accounts
        </a>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" href="#">
              <router-link to="/Sign-up">Sign Up</router-link></a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#">
              <router-link to="/login">Login</router-link></a
            >
          </li>
          <li>
            <a
              v-if="isLoggedIn"
              style="padding-left: 60px"
              class="dropdown-item"
              href="#"
              @click="logout"
            >
              Logout
            </a>
          </li>
        </ul>
      </li>
    </ul>
    <router-link to="/Cart" class="cart">
      <font-awesome-icon
        icon="shopping-cart"
        style="color: white; font-size: 20px"
        v-if="isLoggedIn"
      />
      <span
        v-if="cartItemsCount > 0 && isLoggedIn"
        style="
          background-color: red;
          color: white;
          border-radius: 50%;
          padding: 3px 6px;
          font-size: 12px;
          margin-bottom: 5px;
        "
        >{{ cartItemsCount }}</span
      >
    </router-link>
  </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
export default {
  name: "AppH",
  props: ["cartItemsCount", "products", "isLoggedIn"],

  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      searchQuery: "",
      dropdownVisible: false,
      innerDropdownOpen: false,
      chan: false,
      appear: false,
    };
  },
  mounted() {
    //this.isLoggedIn = localStorage.getItem("isLoggedIn");
    library.add(faShoppingCart);
  },
  methods: {
    chang() {
      this.chan = !this.chan;
      this.appear = !this.appear;
    },
    logout() {
      this.$emit("Log");
      this.$emit("logout");
    },
    loginout() {
      this.$emit("loginout");
    },
  },
};
</script>
<style lang="scss">
.header {
  z-index: 99999;
  width: 100%;
  padding: 15px;
  height: 47px;
  background-color: #726c7d;
  position: fixed;
  top: 0px;

  .account {
    display: block;
    right: 115px;
  }
  .browse {
    display: block;
    left: -30px;
  }
  .sp {
    display: none;
    top: 10px;
    .drp {
      background-color: #ffffff;
      top: 30px;
      left: 6px;
      width: 160px;
      text-align: left;
      padding: 7px;
      border-radius: 8px;
    }
  }
  .icon {
    width: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    border: solid 1px white;
    padding-left: 6px;
    padding-right: 6px;
    padding-top: 6px;
    border-radius: 4px;
    &:hover {
      span:nth-child(2) {
        width: 100%;
      }
    }

    span {
      background-color: #222;
      margin-bottom: 5px;
    }
    span:first-child {
      width: 100%;
      height: 2px;
    }
    span:nth-child(2) {
      width: 60%;
      height: 2px;
      transition: 0.3s;
      -webkit-transition: 0.3s;
      -moz-transition: 0.3s;
      -ms-transition: 0.3s;
      -o-transition: 0.3s;
    }
    span:last-child {
      width: 100%;
      height: 2px;
    }
  }
  .cart {
    position: absolute;
    right: 37px;
    top: 14px;
    .drob {
      display: block;
      position: absolute;
      right: 37px;
      top: 14px;
    }
  }
  ul {
    position: absolute;
  }

  a {
    font-weight: bold;
    color: #b8b4b4;
    float: left;
    padding-left: 30px;
    text-decoration: none;
    transition: 0.7s ease;
    &:hover {
      color: #232f3e;
    }
    &.router-link-exact-active {
      color: #046790;
    }
  }

  // Medium devices (tablets, 768px and up)
  @media (max-width: 850px) {
    .cart {
      right: 20px;
    }
    .account {
      display: none;
    }
    .browse {
      display: none;
    }
    .sp {
      display: block;
      left: -35px;
    }
  }
  @media (max-width: 287px) {
    .cart {
      right: 10px;
    }
    .account {
      display: none;
    }
    .browse {
      display: none;
    }
    .sp {
      display: block;
      left: -35px;
    }
  }
}
</style>
