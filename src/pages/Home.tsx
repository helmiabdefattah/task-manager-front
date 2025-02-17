import React, {useEffect} from "react";
import styled from "styled-components";

const Home = () => {
    return (
        <Container>
            <Header>
                <h1>Welcome to Task Manager</h1>
                <p>Organize your tasks efficiently.</p>
            </Header>
            <Main>
                <Button>Create New Task</Button>
                <TaskList>
                    <TaskCard>
                        <h3>Task Title</h3>
                        <p>Task description goes here...</p>
                        <Status>In Progress</Status>
                    </TaskCard>
                    <TaskCard>
                        <h3>Another Task</h3>
                        <p>More task details...</p>
                        <Status completed>Completed</Status>
                    </TaskCard>
                </TaskList>
            </Main>
        </Container>
    );
};

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1.2rem;
    color: gray;
  }
`;

const Main = styled.main`
  width: 100%;
  max-width: 600px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 20px;
  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TaskCard = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Status = styled.span<{ completed?: boolean }>`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${(props) => (props.completed ? "green" : "orange")};
`;

export default Home;
