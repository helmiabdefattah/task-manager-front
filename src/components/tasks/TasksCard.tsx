import Card from "@mui/material/Card";
import React from "react";
import {Task} from "../../types/Task";
import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";
import moment from "moment";
import AssignedUser from "./AssignedUser";
import {User} from "../../types";
import ChangeStatus from "./ChanegStatus";
import TaskOptions from "./TaskOptions";

const TaskCard = styled(Card)`
    text-align: left;
    padding: 0px 10px;
    margin: 15px 0;
    border-radius: 30px;
    background-color: rgba(215, 215, 255, 0.53) !important;
`;

const TaskTitle = styled('h3')`
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    color: #3b3bdc;
    text-decoration: underline;
`;

const TaskDescription = styled('div')`
    font-weight: 400;
    font-size: 14px;
    margin: 10px;
`;
const TaskFooter = styled('div')`
    text-align: right;
    font-weight: 400;
    font-size: 14px;
    margin: 10px;
`;
const TaskoOtions = styled('div')`
    text-align: right;
    font-weight: 600;
    font-size: 16px;
    margin: 10px;
`;

interface Props  {
    task:Task;
    index:number;
    users:User[];
    statuses:string[];
    showTask:(taskId:string) => void;
    deleteTask:(taskId:string) => void;
    changeStatus: (status: string, taskId: string) => Promise<void>;
    assignUser: (userId:string,taskId:string) => void;

}

const TasksCard : React.FC<Props> = ({task,index,users,statuses,showTask,changeStatus,assignUser,deleteTask}:Props) =>{
    return (
        <>
            <Draggable draggableId={task._id} index={index}>{
                (provided) =>(
                    <TaskCard ref={provided.innerRef}
                          {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <TaskoOtions className="text-muted px-1">
                            <TaskOptions onDelete={()=> deleteTask(task._id)} onEdit={()=> showTask(task._id)}
                            ></TaskOptions>
                        </TaskoOtions>
                        <TaskTitle  onClick={()=> showTask(task._id)}>
                            {task.title}
                        </TaskTitle>
                        <TaskDescription>
                            {(task.description != '' && task.description != null) ? (task.description.length > 100 ? task.description.substring(0, 100) + '...' : task.description) : 'no description ...'}
                        </TaskDescription>
                        <AssignedUser taskId={task._id} users={users} assignedUserId={task.assignedTo} onAssignChange={assignUser} />
                        <ChangeStatus key={task._id} task={task} onAssignChange={changeStatus} statuses={statuses} />
                        <TaskFooter className="text-muted px-1">{moment.utc(task.createdAt).fromNow()}</TaskFooter>
                    </TaskCard>
                )
            }
            </Draggable>
        </>
    )
}

export default TasksCard;
