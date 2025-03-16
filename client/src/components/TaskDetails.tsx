import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { TaskApiService } from "../api";
import { Task, TaskStatus } from "../types/apiInterfaces";

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>();
  const [subtaskTitle, setSubtaskTitle] = useState("");

  const fetchTask = async () => {
    try {
      const data = await TaskApiService.getById(id!);
      setTask(data);
      setTitle(data.title);
      setDescription(data.description || "");
      setStatus(data.status);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await TaskApiService.update(id!, {
        title,
        description,
        status,
      });
      fetchTask();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await TaskApiService.delete(id!);
      navigate("/");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleAddSubtask = async () => {
    try {
      await TaskApiService.addSubtask(id!, {
        title: subtaskTitle,
      });
      setSubtaskTitle("");
      fetchTask();
    } catch (error) {
      console.error("Error adding subtask:", error);
    }
  };

  const handleSubtaskClick = (subtaskId: string) => {
    navigate(`/task/${subtaskId}`);
  };

  if (!task) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Task Details
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            label="Status"
          >
            <MenuItem value={TaskStatus.TODO}>TODO</MenuItem>
            <MenuItem value={TaskStatus.IN_PROGRESS}>IN PROGRESS</MenuItem>
            <MenuItem value={TaskStatus.DONE}>DONE</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          fullWidth
        />
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Subtasks
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              label="New Subtask Title"
              value={subtaskTitle}
              onChange={(e) => setSubtaskTitle(e.target.value)}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddSubtask}>
              Add Subtask
            </Button>
          </Box>
          <List>
            {task.subtasks.map((subtask: Task) => (
              <ListItem
                component="button"
                key={subtask.id}
                onClick={() => handleSubtaskClick(subtask.id)}
              >
                <ListItemText
                  primary={subtask.title}
                  secondary={subtask.status}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskDetails;
