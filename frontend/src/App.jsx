import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import ManagerDashboard from "./pages/Manager/ManagerDashboard";
import ManagerTasksPage from "./pages/Manager/ManagerTasksPage";
import ManagerTaskCreatePage from "./pages/Manager/ManagerTaskCreatePage";
import ManagerBadgesPage from "./pages/Manager/ManagerBadgesPage";
import ManagerUsersPage from "./pages/Manager/ManagerUsersPage";
import ManagerUserCreatePage from "./pages/Manager/ManagerUserCreatePage";
import ManagerReportsPage from "./pages/Manager/ManagerReportsPage";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import UnauthorizedPage from "./pages/UnauthorizedPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

      
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

      
          <Route
            path="/manager/dashboard"
            element={
              <ProtectedRoute role="manager">
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee/dashboard"
            element={
              <ProtectedRoute role="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager/tasks"
            element={
              <ProtectedRoute role="manager">
                <ManagerTasksPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager/tasks/create"
            element={
              <ProtectedRoute role="manager">
                <ManagerTaskCreatePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager/badges"
            element={
              <ProtectedRoute role="manager">
                <ManagerBadgesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager/users"
            element={
              <ProtectedRoute role="manager">
                <ManagerUsersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager/users/create"
            element={
              <ProtectedRoute role="manager">
                <ManagerUserCreatePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manager/reports"
            element={
              <ProtectedRoute role="manager">
                <ManagerReportsPage />
              </ProtectedRoute>
            }
          />

          
          <Route path="*" element={<Login/>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
