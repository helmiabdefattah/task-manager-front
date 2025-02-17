import React from "react";
import { FaTasks, FaUser, FaSignOutAlt } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SidebarContainer = styled.div`
    width: 250px;
    min-height: 100vh;
    background: #1e293b;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const SidebarLink = styled(Link)`
    color: white;
    text-decoration: none;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;

    &:hover {
        background: #334155;
        border-radius: 5px;
    }
`;

const Sidebar: React.FC = () => {
    return (
        <SidebarContainer>
            <h2>Task Manager</h2>
            <SidebarLink to="/tasks">
                <FaTasks /> Tasks
            </SidebarLink>
            <SidebarLink to="/profile">
                <FaUser /> Profile
            </SidebarLink>
            <SidebarLink to="/logout">
                <FaSignOutAlt /> Logout
            </SidebarLink>
        </SidebarContainer>
    );
};

export default Sidebar;
