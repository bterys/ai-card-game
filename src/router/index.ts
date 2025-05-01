import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Cards from '../views/Cards.vue'
import Shop from '../views/Shop.vue'
import Lineup from '../views/Lineup.vue'
import Battle from '../views/Battle.vue'

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },

  {
    path: "/cards",
    name: "cards",
    component: Cards,
  },
  {
    path: "/shop",
    name: "shop",
    component: Shop,
  },
  {
    path: "/lineup",
    name: "lineup",
    component: Lineup,
  },
  {
    path: "/battle",
    name: "battle",
    component: Battle,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router