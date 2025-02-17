import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import {useAuth} from "./AuthContext";
import {toast} from "react-toastify";

// Define the type for the socket context
interface SocketContextType {
    socket: Socket | null;
}

// Create the context with a default value
const SocketContext = createContext<SocketContextType>({ socket: null });

// Custom hook to use the socket context
export const useSocket = () => useContext(SocketContext);

// Socket provider component
export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Initialize the socket connection
        const newSocket = io('http://localhost:3000', { transports: ['websocket'] });

        // Log all events (for debugging purposes)
        // newSocket.onAny((event, ...args) => {
        //     console.log(`Socket event: ${event}`, args);
        // });

        // Listen for the 'connect' event
        newSocket.on('connect', () => {
            console.log('Socket connected');
            setSocket(newSocket);
            const authUser = JSON.parse(localStorage.getItem("userData") as string);
            if(authUser){
                newSocket.emit('register',authUser?.user );
            }
        });

        // Listen for the 'disconnect' event
        newSocket.on('disconnect', () => {
            console.log('Socket disconnected');
        });
        newSocket.on('taskAssigned', (event) => {
            console.log(event)
            toast.info(event.message)
        });

        // Log the socket initialization (for debugging purposes)
        console.log('Socket initializing...');

        // Cleanup on unmount
        return () => {
            newSocket.disconnect(); // Disconnect the socket when the component unmounts
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};