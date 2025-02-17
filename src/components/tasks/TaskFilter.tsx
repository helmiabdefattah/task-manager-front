import React, { useState, useEffect } from "react";
import {
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Avatar,
    Box,
    Typography,
    Stack,
    SelectChangeEvent, Checkbox, AvatarGroup, Dialog, DialogTitle, IconButton, DialogContent, Popover
} from "@mui/material";
import UserService from "../../services/UserService";
import { User } from "../../types";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

// Status Options
const statuses = ["backlog", "ready", "in-progress", "in-review", "completed"];

// Props Interface
interface FilterBarProps {
    onFilterChange: (filters: { status: string[]; users: string[]; search: string }) => void;
}

const TaskFilter: React.FC<FilterBarProps> = ({ onFilterChange }) => {
    const [status, setStatus] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        // Fetch users once
        UserService.getAll().then((res) => setUsers(res));
    }, []);

    // Handle Status Change
    const handleStatusChange = (event: SelectChangeEvent<string[]>) => {
        const newStatus = event.target.value as string[];
        setSelectedStatuses(newStatus);
        onFilterChange({ status: newStatus, users: selectedUsers, search });
    };

    // Handle Search Change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = event.target.value;
        setSearch(newSearch);
        onFilterChange({ status, users: selectedUsers, search: newSearch });
    };

    // Handle User Selection
    const toggleUserSelection = (userId: string) => {
        const updatedUsers = selectedUsers.includes(userId)
            ? selectedUsers.filter((id) => id !== userId) // Deselect
            : [...selectedUsers, userId]; // Select

        setSelectedUsers(updatedUsers);
        onFilterChange({ status, users: updatedUsers, search });
    };

    return (
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 2, m:5, borderRadius: 2 , backgroundColor:'rgba(211,211,246,0.25)' }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Status</InputLabel>
                <Select
                    multiple
                    value={selectedStatuses}
                    onChange={handleStatusChange}
                    label="Status"
                    renderValue={(selected:string[]) => selected.join(", ")}
                >
                    {statuses.map((status) => (
                        <MenuItem key={status} value={status}>
                            <Checkbox checked={selectedStatuses.includes(status)} />
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Search Field */}
            <TextField
                size="small"
                label="Search Tasks"
                variant="outlined"
                value={search}
                onChange={handleSearchChange}
                sx={{ flexGrow: 1 }}
            />

            {/* User Selection */}
            <Stack direction="row" spacing={1}>
                <AvatarGroup max={5}
                             slotProps={{
                                 additionalAvatar: {
                                     onClick: handleOpen,
                                 }
                             }}
                             sx={{ cursor: "pointer" }}>
                {users.map((user) => (
                    <Box key={user._id} onClick={() => toggleUserSelection(user._id)} sx={{ cursor: "pointer", position: "relative" }}>
                            <Avatar src={user.avatar || "/default-avatar.png"} alt={user.username} sx={{ width: 40, height: 40, opacity: selectedUsers.includes(user._id) ? 1 : 0.5 }} />
                                {selectedUsers.includes(user._id) && (
                                    <Typography variant="caption" sx={{ position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)", fontWeight: "bold", color: "green" }}>
                                        ✓
                                    </Typography>
                                )}
                    </Box>
                ))}
                </AvatarGroup>

                <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    <Box sx={{ padding: 1, minWidth: 200 }}>
                        {/* Close button */}
                        <IconButton onClick={handleClose} sx={{ position: "absolute", right: 5, top: 5 }}>
                            <CloseIcon />
                        </IconButton>

                        {users.map((user) => (
                            <Box
                                key={user._id}
                                onClick={() => toggleUserSelection(user._id)}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    padding: 1,
                                    cursor: "pointer",
                                    "&:hover": { backgroundColor: "#f5f5f5" }
                                }}
                            >
                                <Avatar src={user.avatar || "/default-avatar.png"} alt={user.username} sx={{ width: 40, height: 40 }} />
                                <Typography variant="body1">{user.username}</Typography>
                                {selectedUsers.includes(user._id) && (
                                    <Typography variant="caption" sx={{ fontWeight: "bold", color: "green" }}>
                                        ✓
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                </Popover>

            </Stack>
        </Stack>
    );
};

export default TaskFilter;
