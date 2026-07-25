
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Tasks from "./components/Tasks/Tasks";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTokenStore } from "./store/token-store";

const queryClient = new QueryClient();

function App() {
  const { token } = useTokenStore();
  const isAuthenticated = !!token;
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/tasks" replace /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/tasks" replace />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={isAuthenticated ? <Tasks /> : <Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </QueryClientProvider>
  )
}

export default App;
