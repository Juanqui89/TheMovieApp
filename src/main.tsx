import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/CSS/index.css";
import "./assets/CSS/Queries.css";
import { ThemeProvider} from "react-bootstrap";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider
  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
  minBreakpoint="xxs"
>
    <App />
</ThemeProvider>;
  </React.StrictMode>
);
