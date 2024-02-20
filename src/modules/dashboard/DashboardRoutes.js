import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import DelegateList from "./components/DelegateList";
import Auth from "../../router/middleware/Auth";
import DelegateCard from "./components/DelegateCard.vue";
import Report from "./components/Report.vue";

export default [
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "",
        redirect: "/events/list",
      },
      {
        path: "delegates/:event",
        name: "DelegateList",
        components: {
          view: DelegateList,
        },
        meta: { middleware: [Auth], breadcrumb: "EventView" },
      },
      {
        path: "card/:event/:no?",
        name: "DelegateCard",
        components: {
          view: DelegateList,
          action: DelegateCard,
        },
        meta: { middleware: [Auth], breadcrumb: "EventView" },
      },
      {
        path: "report/:no/:entity",
        name: "Report",
        components: {
          view: Report,
        },
        meta: { middleware: [Auth], breadcrumb: "EventView" },
      },
    ],
  },
];
