import Landing from "./Views/Landing";
import LandingLayout from "@/layouts/landing/LandingLayout";

export default [
  {
    path: "/",
    component: LandingLayout,
    children: [
      {
        path: "",
        component: Landing,
      },
    ],
  },
];
