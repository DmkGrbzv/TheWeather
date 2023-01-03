import { createRouter, createWebHashHistory } from "vue-router";

import TheWeather from "./pages/TheWeather.vue";
import Favorites from "./pages/Favorites.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: TheWeather },
    { path: "/favorites", component: Favorites },
  ],
});
