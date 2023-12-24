import { createRouter, createWebHistory } from "vue-router";
import ProductVue from "../views/ProductView.vue";

const routes = [
  {
    path: "/",
    name: "products",
    component: ProductVue,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/shop",
    name: "shop",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ShopView.vue"),
  },

  {
    path: "/Product-details/:productId",
    name: "productsdatiles",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProductDetails.vue"),
  },
  {
    path: "/Cart",
    name: "ShoppingCart",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ShoppingCart.vue"),
  },
  {
    path: "/Sign-up",
    name: "sign-up",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/signUP.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LogIn.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
