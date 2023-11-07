import ReactDOM from "react-dom/client";
import Popup from "./Popup.jsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

const myTheme = {
  radius: { sm: 10, md: 20, lg: 30 },
  colorScheme: 'light', // or 'dark' if you prefer
  fontFamily: 'Roboto, sans-serif',
  primaryFontFamily: 'Open Sans, sans-serif',
  //radius: { sm: 10, md: 20, lg: 30 }, // Adjust these values for different levels of curvature
  colors: {
    // Define a new color in your theme (or extend an existing one)
    cream: ['#f5f5dc'],
  },
  components: {
    // Style specific components
    Paper: {
      defaultProps: {
        //radius: 'md', // This applies rounded edges to all Paper components
      },
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.cream[0],
          borderRadius: theme.radius.md, // Use the cream color defined above
        },
      }),
    },
    // Add other component overrides if necessary
  },
  other: {
    body: {
      backgroundColor: '#f5f5dc',
    },
  }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider theme={myTheme}>
    <Popup />
  </MantineProvider>
);
