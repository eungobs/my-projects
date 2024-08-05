import React, { useState, useEffect, useRef } from 'react';
import './todo.css';
import ReminderModal from './ReminderModal';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Container,
  CssBaseline,
  Box,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { fetchTasks, insertTask, deleteTask } from './db';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function ToDoList({ onLogout }) {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [opened, setOpened] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const taskTitle = useRef('');
  const taskSummary = useRef('');
  const taskDateTime = useRef('');
  const taskPriority = useRef('Medium');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchData();
  }, []);

  const handleCreateTask = async () => {
    const newTask = {
      title: taskTitle.current.value,
      summary: taskSummary.current.value,
      dateTime: taskDateTime.current.value,
      priority: taskPriority.current.value,
    };
    try {
      await insertTask(newTask.title, newTask.summary, newTask.dateTime, newTask.priority);
      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
      setOpened(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toISOString().slice(0, 16);
      tasks.forEach((task) => {
        if (task.dateTime === now) {
          setCurrentTask(task);
          setIsReminderOpen(true);
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [tasks]);

  const closeReminderModal = () => {
    setIsReminderOpen(false);
    setCurrentTask(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container component="main">
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={onLogout}>Logout</Button>
            <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
            <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          </Toolbar>
        </AppBar>
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
          {opened && (
            <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
              <Typography component="h2" variant="h5">New Task</Typography>
              <TextField
                inputRef={taskTitle}
                label="Title"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                inputRef={taskSummary}
                label="Summary"
                fullWidth
                margin="normal"
              />
              <TextField
                inputRef={taskDateTime}
                label="Date and Time"
                type="datetime-local"
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Priority</InputLabel>
                <Select
                  inputRef={taskPriority}
                  label="Priority"
                  defaultValue="Medium"
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  onClick={handleCreateTask}
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                >
                  Add Task
                </Button>
              </Box>
            </Paper>
          )}
          {filteredTasks.map(task => (
            <Paper key={task.id} elevation={3} sx={{ padding: 2, margin: 2, width: '100%' }}>
              <Typography component="h3" variant="h6">{task.title}</Typography>
              <Typography>{task.summary}</Typography>
              <Typography>{task.dateTime}</Typography>
              <Typography>{task.priority}</Typography>
              <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={() => handleDeleteTask(task.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
        <Box display="flex" justifyContent="center" m={2}>
          <Button
            onClick={() => setOpened(true)}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Add Task
          </Button>
        </Box>
        {isReminderOpen && currentTask && (
          <ReminderModal task={currentTask} onClose={closeReminderModal} />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default ToDoList;
