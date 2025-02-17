import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import { useAuth } from "../context/AuthContext";
import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element }: { element: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to="/" /> : element;
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<PublicRoute element={<Login />} />} />
            <Route path="/register" element={<PublicRoute element={<Register />} />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/Dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/tasks" element={<ProtectedRoute element={<Tasks />} />} />
        </Routes>
    );
};

export default AppRoutes;
