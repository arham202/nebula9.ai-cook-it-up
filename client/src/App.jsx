import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Form from "./components/Form";
import Logout from "./components/Logout";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Cookies from "js-cookie";
import "./App.css";

const App = () => {
  const token = Cookies.get("token");

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/dashboard" /> : <Form />}
          />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
