import React, {useState} from "react";
import { FaTasks, FaUser, FaSignOutAlt } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {Input} from "../../styles";
import TaskService from "../../services/TaskService";
import {toast} from "react-toastify";
import {AiOutlineSend} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducers";

const AddTaskContainer  = styled("div")`
	position: relative;
	width: 50%;
    margin-left: 30px;
`;

const TaskInput  = styled(Input)`
	width: 100%;
    display: flex;
    padding: 20px 30px;
    border-radius: 50px;
    font-size: 25px;

`;

const AddTaskBtn  = styled("button")`
    position: absolute;
    width: 50px;
    height: 50px;
    margin: 12px;
    border-radius: 50px;
    right: -50px;
    top: 0;
    border: none;
    font-size: 15px;
    background-color: #2f74c0;
    color: white;
    transition: 0.2s all;
    box-shadow: 0 0 10px black;
    &:hover {
        background-color: #388ae2;
    }

    &:active {
        transform: scale(0.8);
        box-shadow: 0 0 5px black;
    }
`;


const AddTaskInput : React.FC = () => {
    const [task , setTask] = useState("");
    const dispatchData = useDispatch();
    const refreshState = useSelector(
        (state: RootState) => state.payload.reloadFetch
    );

    const storeTask = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const addTaskRequest:boolean = await TaskService.store({
            title:task
        })
        if (addTaskRequest){
            toast.success('Task Added Successfully')
            dispatchData({
                type: "SET_FETCH_RELOAD_DATA",
                payload: !refreshState,
            });
            setTask('')
        }
        else {
            toast.error('Something Went Wrong')
        }
    }

    return (
        <form onSubmit={storeTask}>
            <AddTaskContainer>
                <TaskInput
                    type="text"
                    placeholder="task title .."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                />
                <AddTaskBtn>
                    <AiOutlineSend />
                </AddTaskBtn>
            </AddTaskContainer>

        </form>
    )
}

export default AddTaskInput;