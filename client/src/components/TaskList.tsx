import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  Box,
} from '@mui/material';
import { TaskApiService } from '../api';

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await TaskApiService.getAll();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await TaskApiService.create({ title });
      setTitle('');
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Task List
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="New Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleCreate}>
          Add Task
        </Button>
      </Box>
      <List>
        {tasks.length && tasks.map((task) => (
          <ListItem
            component='button'
            key={task.id}
            onClick={() => navigate(`/task/${task.id}`)}
          >
            <ListItemText
              primary={task.title}
              secondary={task.status}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;