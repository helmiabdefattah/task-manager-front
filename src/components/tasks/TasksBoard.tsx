import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import TaskService from "../../services/TaskService";
import {RootState} from "../../reducers";
import TaskColumn from "./TaskColumn";
import {Grid2} from "@mui/material";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {toast} from "react-toastify";
import {User} from "../../types";
import UserService from "../../services/UserService";
import TaskFilter from "./TaskFilter";
import TaskDetailsModal from "./TaskDetailsModal";
import styled from "styled-components";
import {Main} from "next/document";
import {red} from "@mui/material/colors";

export interface Filter {
    status: string[],
    users: string[],
    search: string
}

const TasksBoard : React.FC = () => {
    const dispatchData = useDispatch();
    const [columns,setColumns] = useState<string[]>([]);
    const [filters, setFilters] = useState({ status: [], users: [], search: "" });

    const refreshState = useSelector(
        (state: RootState) => state.payload.reloadFetch
    );

    const [users, setUsers] = useState<User[]>([]);
    const [showTaskId, setShowTaskId] = useState<string>('');
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const showTask = (showTaskId:string) =>{
        setShowTaskId(showTaskId);
        setModalOpen(true);
    }
    const handleClose = () => {
        setShowTaskId('');
        setModalOpen(false);
    }

    useEffect(() => {
        UserService.getAll().then((res) => {
            setUsers(res);
        });
        TaskService.getColumns().then((columns:string[]) => {
            setColumns(columns);
        });

    }, [refreshState,filters]);

    const onChangeFilter = (filters:Filter) => {
        setFilters({ status: filters.status as never [], users: filters.users as never[], search: filters.search });
    }
    const onDragTask = async (result: DropResult): Promise<void> => {
        if (result.destination?.droppableId == result.source.droppableId){
            return ;
        }
        const updateRequest = await TaskService.update({
            id: result.draggableId,
            status: result.destination?.droppableId
        })
        if (updateRequest){
            dispatchData({
                type: "SET_FETCH_RELOAD_DATA",
                payload: !refreshState,
            });
            toast.success('status updated successfully')
        }
        else {
            toast.error('failed to change status')
        }
    }
    const changeStatus = async (status: string, taskId: string) => {
        const updateRequest = await TaskService.update({
            id: taskId,
            status: status
        })
        if (updateRequest) {
            dispatchData({
                type: "SET_FETCH_RELOAD_DATA",
                payload: !refreshState,
            });
            toast.success('status updated successfully')
        } else {
            toast.error('failed to change status')
        }
    }
    const assignUser = (userId:string,taskId:string) => {
        TaskService.assign(userId,taskId).then((res)=>{
            if (res){
                dispatchData({
                    type: "SET_FETCH_RELOAD_DATA",
                    payload: !refreshState,
                });
                toast.success('Task Added Successfully')
            }
            else {
                toast.error('Something Went Wrong')
            }
        });
    }
    const deleteTask = (taskId:string) => {
        TaskService.deleteTask(taskId).then((res)=>{
            if (res){
                dispatchData({
                    type: "SET_FETCH_RELOAD_DATA",
                    payload: !refreshState,
                });
            }
        });
    }
    return (
        <>
            <DragDropContext onDragEnd={onDragTask}>
                <Grid2 size={12} key={"filter"}>
                    <TaskFilter onFilterChange={onChangeFilter} />
                </Grid2>
                <BoardContainer>
                    <Board>
                        <Grid2 container spacing={3}>
                            {columns.map((column:string) => (
                                <Grid2 size={"grow"} key={column} style={styles.gridItem}>
                                    <TaskColumn deleteTask={deleteTask} assignUser={assignUser} changeStatus={changeStatus} showTask={showTask} users={users} type={column} key={column} statuses={columns} filters={filters} />
                                </Grid2>
                            ))}
                        </Grid2>
                    </Board>
                </BoardContainer>
            </DragDropContext>
            <TaskDetailsModal assignUser={assignUser} users={users} statuses={columns} changeStatus={changeStatus} taskId={showTaskId} open={modalOpen} onClose={handleClose} />
        </>
    )
}

const Board = styled.div`
min-width: 1500px!important;
    overflow: auto;
`;

const BoardContainer = styled.div`
    max-width: 100vw !important;
    overflow: auto;
    background-color: rgba(199, 199, 255, 0.84);
    padding: 30px;
    margin: 30px;
    border-radius: 50px;
`;

const styles = {
    gridContainer: {
        // display: 'flex', // Or 'grid' if using grid layout features
        // flexDirection: 'column', // If you want columns to stack vertically
        // Add other container styles like width, height, padding, etc.
    },
    gridItem: {
        // Styles for each Grid2 item
        padding: '10px', // Example padding
        borderRadius: '10px', // Example border
        // Add other item styles like backgroundColor, margin, etc.
        backgroundColor: "#b4b4ff"
    },
};


export default TasksBoard;
