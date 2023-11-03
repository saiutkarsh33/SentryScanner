import ReactDOM from "react-dom/client";
import Popup from "./Popup.jsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider>
    <Popup />
  </MantineProvider>
);
