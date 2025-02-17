import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import UserService from "../../services/UserService";
import { User } from "../../types";
import {useSocket} from "../../context/SocketContext";
import {useAuth} from "../../context/AuthContext";

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
    assignedUserId?: User | null;
    onAssignChange: (userId: string,taskId:string) => void;
    users:User[];
    taskId:string
}

const AssignedUser: React.FC<AssignedUserProps> = ({ assignedUserId, onAssignChange,users,taskId }) => {
    const [assignedUser, setAssignedUser] = useState<User | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { socket } = useSocket();
    useEffect(() => {
        if (assignedUserId) {
            setAssignedUser(assignedUserId);
        }
    }, [assignedUserId]);
    // Handle opening dropdown
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Handle selecting a new user
    const handleSelect = (user: User) => {
        setAssignedUser(user);
        onAssignChange(user._id,taskId);
        setAnchorEl(null);
        const authUser = JSON.parse(localStorage.getItem("userData") as string);

        const message = `${authUser?.user.username} assigned you a new Task`
        socket?.emit('assign', { user, taskId, message });
    };


    return (
        <div>
            <UserContainer onClick={handleClick}>
                <StyledAvatar src={(assignedUser?.avatar != null)?assignedUser?.avatar:assignedUser?.username} alt={assignedUser?.username} />
                <span>{assignedUser ? assignedUser.username : "Unassigned"}</span>
                <IconButton size="small">
                    <ArrowDropDownIcon />
                </IconButton>
            </UserContainer>

            {/* Dropdown Menu */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                {users.map((user) => (
                    <MenuItem className="assignMenuItem" key={user._id} onClick={() => handleSelect(user)}>
                        <Avatar src={(user.avatar != null)?user.avatar:user.username} alt={user.username} style={{ marginRight: 8, width: 30, height: 30 }} />
                        {user.username}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default AssignedUser;
