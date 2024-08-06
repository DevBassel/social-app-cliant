import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserProvider from "./context/userContext.tsx";
import WebSocketProvider from "./context/WebSocketContext.tsx";
import ActiveChateProvider from "./context/activeChateContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <UserProvider>
        <ChakraProvider theme={theme}>
          <ActiveChateProvider>
            <WebSocketProvider>
              <App />
            </WebSocketProvider>
          </ActiveChateProvider>
        </ChakraProvider>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      </UserProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
