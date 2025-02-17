import React, {useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import {toast} from "react-toastify";
import {useAuth} from "../../context/AuthContext";
import Profile from "./Profile";


const Navbar: React.FC = () => {

    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const { authUser, setAuthUser } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);
    const handleLogout = async () => {
        const logout:boolean = await AuthService.logout();
        if (logout){
            setIsAuthenticated(false)
        }else {
            toast.error('Failed try again')
        }
    };

    return (
        <NavbarContainer>
            <h3>Dashboard</h3>
            <LogoutButton>
                <Profile loggout={handleLogout}></Profile>
            </LogoutButton>
        </NavbarContainer>
    );
};

const NavbarContainer = styled.div`
    height: 60px;
    background: #f8fafc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const LogoutButton = styled.div`
    cursor: pointer;
    border-radius: 5px;
`;

export default Navbar;
