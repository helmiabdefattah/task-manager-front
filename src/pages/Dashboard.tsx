import React from "react";
import styled from "styled-components";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import AddTaskInput from "../components/tasks/AddTaskInput";
import TasksBoard from "../components/tasks/TasksBoard";

export  const DashboardContainer = styled.div`
    display: flex;
    min-height: 100vh;
`;

export const Content = styled.div`
    flex: 1;
    padding: 20px;
    background: #f1f5f9;
`;

const Dashboard: React.FC = () => {
    return (
        <DashboardContainer>
            {/*<Sidebar />*/}
            <Content>
                <Navbar />
                <AddTaskInput/>
                <TasksBoard/>
            </Content>
        </DashboardContainer>
    );
};

export default Dashboard;
