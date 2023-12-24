import { createApp } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Swal from "sweetalert2";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
//import { BootstrapVueIcons } from "bootstrap-vue";
//import { createEventBus } from "./event-bus";
import App from "./App.vue";
import router from "./router";
import store from "./store";
library.add(faShoppingCart);
const firebaseConfig = {
  apiKey: "AIzaSyD91Uxnmn48gr09Ox7QxsQntlpMxbr-jgk",
  authDomain: "e-commerce-auth-89077.firebaseapp.com",
  projectId: "e-commerce-auth-89077",
  storageBucket: "e-commerce-auth-89077.appspot.com",
  messagingSenderId: "307576297575",
  appId: "1:307576297575:web:43a8328c54c2efadac5cc2",
  measurementId: "G-MKYQ9M8VPY",
};

// Initialize Firebase app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

const app = createApp(App);
app.use(store);
//app.use(BootstrapVueIcons);

app.use(router);
const eventBus = (app.config.globalProperties.$eventBus = createApp({}));
export default eventBus;
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");

app.config.globalProperties.$swal = Swal;
