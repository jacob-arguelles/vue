const routes = [
  {
    path: "/",
    component: () => import("../pages/Login.vue"),
  },
  {
    path: "/register",
    component: () => import("../pages/SignUp.vue"),
  },
  {
    path: "/catalog",
    component: () => import("../pages/Catalog.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("../pages/ErrorNotFound.vue"),
  },
];

export default routes;
