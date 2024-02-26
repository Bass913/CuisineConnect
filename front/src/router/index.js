import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "@/utils/auth";

const routes = [
  {
    meta: {
      title: "Accueil",
    },
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    meta: {
      title: "Chat",
    },
    path: "/chat",
    name: "chat",
    component: () => import("@/views/ChatView.vue"),
  },
  {
    meta: {
      title: "Profil",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
  },
  {
    meta: {
      title: "Connexion",
    },
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    meta: {
      title: "Morpion",
    },
    path: "/tic-tac-toe",
    name: "tic-tac-toe",
    component: () => import("@/views/TicTacToeView.vue"),
  },
  {
    meta: {
      title: "Inscription",
    },
    path: "/register",
    name: "register",
    component: () => import("@/views/RegisterView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.path !== "/login" && to.path !== "/register" && !isAuthenticated()) {
    next("/login");
  } else {
    next();
  }
});

export default router;
