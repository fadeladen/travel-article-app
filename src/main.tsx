import { createRoot } from "react-dom/client";
import "./assets/styles/app.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/index.ts";
import { PersistGate } from "redux-persist/integration/react";

const basename =
  import.meta.env.MODE === "production" ? "/travel-article-app" : "/";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={basename}>
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="bg-white p-3 text-center text-xs">Loading...</div>
        }
        persistor={persistor}
      >
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
