import Vue from "vue";
import VueRouter from "vue-router";
import nextFactory from "./middleware/MiddlewareFactory";
import Fallback from "@/layouts/Fallback";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: Fallback,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  }
  return next();
});

export default router;
