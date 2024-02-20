import store from "../../store";
import call from "@/service/http";
class DashboardService {
  subscribe() {
    store.subscribe((mutation) => {
      if (mutation.type === "Dashboard/SET_REQUEST_STACK") {
        call(
          mutation.payload.method,
          mutation.payload.endpoint,
          mutation.payload.payload
        )
          .then(() => {
            store.commit(
              "Dashboard/UNSET_REQUEST_IN_STACK",
              mutation.payload.payload
            );
          })
          .catch((err) => {
            store.commit(
              "Dashboard/UNSET_REQUEST_IN_STACK",
              mutation.payload.payload
            );

            store.commit("Dashboard/SET_REQUEST_ERROR", {
              payload: { ...mutation },
              message: err.response,
            });
          });
      }
    });
  }
}

export default new DashboardService();
