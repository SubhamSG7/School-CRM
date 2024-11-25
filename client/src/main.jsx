import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AllRoutes } from "./Route.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AllRoutes>
      <App />
    </AllRoutes>
  </Provider>
);
