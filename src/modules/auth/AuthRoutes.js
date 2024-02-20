import AuthLayout from "../../layouts/auth/AuthLayout";
import Login from "./components/Login";
import Success from "./components/Success";
import ForgotPassword from "./components/ForgotPassword";
import Password from "./components/Password";

export default [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "",
        name: "login",
        component: Login,
      },
      {
        path: "forgot-password",
        name: "forgotPassword",
        component: ForgotPassword,
      },
      {
        path: "password/:code",
        name: "setPassword",
        component: Password,
      },
      {
        path: "success",
        name: "success",
        component: Success,
      },
    ],
  },
];
