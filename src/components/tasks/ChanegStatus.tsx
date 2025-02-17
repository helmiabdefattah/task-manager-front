import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {Menu, MenuItem, IconButton, Avatar, Select, SelectChangeEvent} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import UserService from "../../services/UserService";
import { User } from "../../types";
import {Task} from "../../types/Task";

// Styled components
const UserContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 8px;
    padding: 5px;
    border-radius: 8px;
    transition: background 0.2s ease-in-out;

    &:hover {
        background: #f0f0f0;
    }
`;

const StyledAvatar = styled(Avatar)`
    width: 40px;
    height: 40px;
`;

// Props type
interface AssignedUserProps {
    task:Task;
    statuses: string[];
    onAssignChange: (status:string, taskId: string) => void;
}

const ChangeStatus: React.FC<AssignedUserProps> = ({ task,statuses,onAssignChange }) => {
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
            if (task) {
                setStatus(task.status);
        }
    }, [task]);

    const handleSelect = (e: SelectChangeEvent) => {
        setStatus(e.target.value)
        onAssignChange(e.target.value,task._id);
    };

    return (
        <div>
            <Select
                labelId="changestatus"
                key={"changestatus"}
                value={status}
                label="Status"
                onChange={handleSelect}
            >
                {statuses.map((status) => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}

            </Select>
        </div>
    );
};

export default ChangeStatus;
