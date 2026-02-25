import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Container className="mui-app-container">
        <App />
      </Container>
    </BrowserRouter>
  </Provider>,
);
