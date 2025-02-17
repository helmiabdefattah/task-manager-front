import Stack from "@mui/material/Stack";
import {Task} from "../../types/Task";
import TasksCard from "./TasksCard";
import React, {useEffect, useState} from "react";
import TaskService from "../../services/TaskService";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers";
import {Draggable, Droppable } from "react-beautiful-dnd";
import Paper from '@mui/material/Paper';
import styled from "styled-components";
import {User} from "../../types";
import {Filter} from "./TasksBoard";

const Item = styled(Paper)`
    text-align: center;
    padding: 20px;
    border: none;
    border-radius: 30px!important;
`;

interface Props{
    type:string
    users:User[];
    statuses:string[];
    filters:Filter;
    showTask:(taskId:string) => void;
    deleteTask:(taskId:string) => void;
    changeStatus: (status: string, taskId: string) => Promise<void>;
    assignUser: (userId:string,taskId:string) => void;

}

const TaskColumn : React.FC<Props> = (props:Props) => {

    const [tasks,setTasks] = useState<Task[]>([]);
    const refreshState = useSelector(
        (state: RootState) => state.payload.reloadFetch
    );

    useEffect(() => {
        TaskService.search(props.type,props.filters).then((tasks:Task[]) => {
            setTasks(tasks);
        });


    }, [props, refreshState]);

    return(
        <Item>
            <ColumnHeader>{props.type}</ColumnHeader>
            <Stack spacing={2}>
            <Droppable droppableId={props.type}>{
                (provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {tasks.map((task:Task , index) => (
                            <TasksCard deleteTask={props.deleteTask} assignUser={props.assignUser} changeStatus={props.changeStatus} showTask={props.showTask} users={props.users} key={task._id} task={task} index={index} statuses={props.statuses} />
                        ))}
                        {provided.placeholder}
                    </div>
                )
            }
            </Droppable>
            </Stack>
        </Item>

    )
}
const styles = {
    card: {
        // Styles for each Grid2 item
        padding: '10px', // Example padding
        borderRadius: '10px', // Example border
        // Add other item styles like backgroundColor, margin, etc.
        backgroundColor: "#b4b4ff"
    },
};

const ColumnHeader = styled.h3`
    background-color: #b4b4ff;
    border-radius: 35px;
    padding: 20px;
    
`;
export default TaskColumn;

