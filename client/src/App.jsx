import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import { router } from "./routes";

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
