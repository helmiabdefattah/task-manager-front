import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, IconButton, Button, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import AssignedUser from "./AssignedUser";
import TaskService from "../../services/TaskService";
import {User} from "../../types";
import ChangeStatus from "./ChanegStatus";
import {toast} from "react-toastify";

// Styled Components
const ModalContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: #fff;
  //box-shadow: 24px;
  padding: 24px;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SaveButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
`;

// Props
interface TaskDetailsModalProps {
    taskId: string | null;
    open: boolean;
    onClose: () => void;
    changeStatus: (status: string, taskId: string) => Promise<void>;
    assignUser: (userId:string,taskId:string) => void;
    users:User[];
    statuses:string[];
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ taskId, open, onClose, users, changeStatus, statuses, assignUser }) => {
    const [task, setTask] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<{ title: boolean; description: boolean }>({
        title: false,
        description: false,
    });

    useEffect(() => {
        if (taskId) {
            setLoading(true);
            TaskService.getTaskById(taskId)
                .then((res) => {
                    console.log(res)
                    setTask(res)
                })
                .catch((err) => console.error("Error fetching task:", err))
                .finally(() => setLoading(false));
        }
    }, [taskId]);

    const handleEditClick = (field: "title" | "description") => {
        setIsEditing((prev) => ({ ...prev, [field]: true }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (task) setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (task) {
            task.id = task._id;
            TaskService.update(task).then(() => {
                setIsEditing({ title: false, description: false })
                toast.success("updated successfully")
            }).catch(()=> toast.error("Failed to update"));
        }
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="task-details-modal">
            <ModalContainer>
                <Header>
                    <Typography variant="h6">Task Details</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Header>

                {loading ? (
                    <CircularProgress />
                ) : task ? (
                    <>
                        {isEditing.title ? (
                            <TextField fullWidth name="title" value={task.title} onChange={handleChange} autoFocus />
                        ) : (
                            <Typography variant="h5" onClick={() => handleEditClick("title")} sx={{ cursor: "pointer" }}>
                                {task.title}
                            </Typography>
                        )}

                        {isEditing.description ? (
                            <TextField fullWidth name="description" value={task.description} onChange={handleChange} multiline rows={3} />
                        ) : (
                            <Typography onClick={() => handleEditClick("description")} sx={{ cursor: "pointer", mt: 2 }}>
                                {task.description !== "" ? task.description : "Click to add description..."}
                            </Typography>
                        )}

                        <AssignedUser taskId={task._id} users={users} assignedUserId={task.assignedTo} onAssignChange={assignUser} />
                        <ChangeStatus key={task._id} task={task} onAssignChange={changeStatus} statuses={statuses} />
                        <SaveButton variant="contained" color="primary" onClick={handleSave}>
                            Save Changes
                        </SaveButton>
                    </>
                ) : (
                    <Typography>No task found</Typography>
                )}
            </ModalContainer>
        </Modal>
    );
};

export default TaskDetailsModal;
