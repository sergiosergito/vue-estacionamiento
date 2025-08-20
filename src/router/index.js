import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ParkingLotView from "@/views/ParkingLotView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/parking-lot",
    name: "parkingLot",
    component: ParkingLotView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
