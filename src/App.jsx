import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import LeadDetails from "./pages/LeadDetails";

// Redirects to /login if the user is not authenticated
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Layout>{children}</Layout> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/leads"
          element={
            <PrivateRoute>
              <Leads />
            </PrivateRoute>
          }
        />
        <Route
          path="/leads/:id"
          element={
            <PrivateRoute>
              <LeadDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
