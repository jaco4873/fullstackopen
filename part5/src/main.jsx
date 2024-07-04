import ReactDOM from "react-dom/client"
import { NotificationContextProvider } from "../src/contexts/NotificationContext"
import { UserContextProvider } from "../src/contexts/UserContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import App from "./App"
import "./index.css"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>,
)
