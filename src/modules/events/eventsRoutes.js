import DashboardLayout from "../../layouts/dashboard/DashboardLayout";
import EventCard from "./components/EventCard.vue";
import EventList from "./components/EventList.vue";
import EventView from "./components/EventView.vue";
import Auth from "@/router/middleware/Auth";

export default [
  {
    path: "/events",
    component: DashboardLayout,
    children: [
      {
        path: "list",
        name: "EventList",
        components: {
          view: EventList,
        },
        meta: { middleware: [Auth], breadcrumb: "Dashboard" },
      },
      {
        path: "EventView/:code",
        name: "EventView",
        components: {
          view: EventView,
        },
        meta: { middleware: [Auth], breadcrumb: "EventView" },
      },
      {
        path: "event-card/:no?",
        name: "EventCard",
        components: {
          view: EventCard,
        },
        meta: { middleware: [Auth], breadcrumb: "EventView" },
      },
    ],
  },
];
