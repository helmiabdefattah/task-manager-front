import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import React, {useEffect, useState} from "react";
import {AuthProvider} from "./context/AuthContext";
import {toast, ToastContainer} from "react-toastify";
import {SocketProvider, useSocket} from './context/SocketContext';

interface TaskAssignedData {
    message: string;
}
const App = () => {
    const { socket } = useSocket();
    const loggedUser = JSON.parse(localStorage.getItem("userData") as string);

    useEffect(() => {

        const handleTaskAssigned = (data: TaskAssignedData) => {

            toast.info(data.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        };

        socket?.on('assign', handleTaskAssigned);

        // Cleanup on unmount
        return () => {
            socket?.off('assign', handleTaskAssigned);
        };
    }, []);



    return (
        <AuthProvider>
            <SocketProvider>
                <ToastContainer position="top-right" autoClose={3000} />
                <AppRoutes />
            </SocketProvider>
        </AuthProvider>
    );
};

export default App;
