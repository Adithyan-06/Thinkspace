import { BrowserRouter as Router } from "react-router";
import MainLayout from "./pages/MainLayout";
import { AuthProvider } from "./lib/authContext";


export default function App() {
  return (
      <Router>
        <AuthProvider>
          <MainLayout />
        </AuthProvider>
      </Router>

  );
}
