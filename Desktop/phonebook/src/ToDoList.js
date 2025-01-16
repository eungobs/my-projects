import React, { useState, useEffect, useRef } from 'react';
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
  IconButton,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ReminderModal from './ReminderModal';
import { useNavigate } from 'react-router-dom';

// Create a dark theme for the app
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function ToDoList({ onLogout }) {
  const navigate = useNavigate();

  // State variables
  const [tasks, setTasks] = useState([]); // Stores the list of tasks
  const [opened, setOpened] = useState(false); // Controls whether the task form is open
  const [isReminderOpen, setIsReminderOpen] = useState(false); // Controls whether the reminder modal is open
  const [currentTask, setCurrentTask] = useState(null); // Stores the task being edited or viewed in the reminder
  const [searchTerm, setSearchTerm] = useState(''); // Stores the search term for filtering tasks

  // Refs for form inputs
  const taskTitle = useRef(null); // Ref for the task title input
  const taskSummary = useRef(null); // Ref for the task summary input
  const taskDateTime = useRef(null); // Ref for the task date and time input
  const taskPriority = useRef(null); // Ref for the task priority select input

  // Load tasks from local storage or JSON server
  const loadTasks = async () => {
    const localStorageTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (localStorageTasks.length === 0) {
      // If no tasks in local storage, fetch from JSON server
      const response = await fetch('http://localhost:3001/tasks');
      const tasksFromServer = await response.json();
      localStorage.setItem('tasks', JSON.stringify(tasksFromServer)); // Save to local storage
      setTasks(tasksFromServer); // Update state with tasks from server
    } else {
      setTasks(localStorageTasks); // Use tasks from local storage
    }
  };

  // Add a new task
  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask]; // Add the new task to the list
    setTasks(updatedTasks); // Update state
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to local storage

    // Send the new task to the server
    fetch('http://localhost:3001/tasks', {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  // Edit a task
  const editTask = (taskToEdit) => {
    setCurrentTask(taskToEdit); // Set the task being edited
    setOpened(true); // Open the task form
  };

  // Save an edited task
  const saveTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task // Replace the old task with the updated one
    );
    setTasks(updatedTasks); // Update state
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to local storage

    // Send the updated task to the server
    fetch(`http://localhost:3001/tasks/${updatedTask.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTask),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  // Handle task creation or update
  const handleCreateTask = () => {
    // Create a new task object with values from the form
    const newTask = {
      id: currentTask ? currentTask.id : Date.now(), // Use existing ID if editing, or generate a new one
      title: taskTitle.current.value, // Get title from ref
      summary: taskSummary.current.value, // Get summary from ref
      dateTime: taskDateTime.current.value, // Get date and time from ref
      priority: taskPriority.current.value, // Get priority from ref
    };

    if (currentTask) {
      // If editing, save the updated task
      saveTask(newTask);
    } else {
      // If creating a new task, add it to the list
      addTask(newTask);
    }

    setOpened(false); // Close the form
    setCurrentTask(null); // Reset the current task
  };

  // Delete a task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId); // Remove the task from the list
    setTasks(updatedTasks); // Update state
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to local storage

    // Delete the task from the server
    fetch(`http://localhost:3001/tasks/${taskId}`, {
      method: 'DELETE',
    });
  };

  // Filter tasks based on the search term
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) || // Match title
      task.summary.toLowerCase().includes(searchTerm.toLowerCase()) // Match summary
  );

  // Load tasks when the component mounts
  useEffect(() => {
    loadTasks();
  }, []);

  // Check for reminders every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toISOString().slice(0, 16); // Get current date and time in ISO format
      tasks.forEach((task) => {
        if (task.dateTime === now) {
          setCurrentTask(task); // Set the task for the reminder
          setIsReminderOpen(true); // Open the reminder modal
        }
      });
    }, 1000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [tasks]);

  // Close the reminder modal
  const closeReminderModal = () => {
    setIsReminderOpen(false); // Close the modal
    setCurrentTask(null); // Reset the current task
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container component="main">
        {/* App Bar with navigation buttons */}
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={onLogout}>Logout</Button>
            <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
            <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          </Toolbar>
        </AppBar>

        {/* Main content */}
        <Box display="flex" flexDirection="column" alignItems="center">
          {/* Search bar */}
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

          {/* Task form (visible when opened is true) */}
          {opened && (
            <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
              <Typography component="h2" variant="h5">{currentTask ? 'Edit Task' : 'New Task'}</Typography>
              {/* Task title input */}
              <TextField
                inputRef={taskTitle}
                label="Title"
                fullWidth
                margin="normal"
                required
                defaultValue={currentTask ? currentTask.title : ''}
              />
              {/* Task summary input */}
              <TextField
                inputRef={taskSummary}
                label="Summary"
                fullWidth
                margin="normal"
                defaultValue={currentTask ? currentTask.summary : ''}
              />
              {/* Task date and time input */}
              <TextField
                inputRef={taskDateTime}
                label="Date and Time"
                type="datetime-local"
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                defaultValue={currentTask ? currentTask.dateTime : ''}
              />
              {/* Task priority select input */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Priority</InputLabel>
                <Select
                  inputRef={taskPriority}
                  label="Priority"
                  defaultValue={currentTask ? currentTask.priority : 'Medium'}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
              {/* Form buttons */}
              <Box display="flex" justifyContent="space-between">
                <Button variant="contained" color="secondary" onClick={() => setOpened(false)}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleCreateTask}>Save Task</Button>
              </Box>
            </Paper>
          )}

          {/* Task list */}
          <Box mt={2} width="100%">
            <Typography component="h1" variant="h4" gutterBottom>My Tasks</Typography>
            {filteredTasks.length > 0 ? (
              // Display filtered tasks
              filteredTasks.map((task) => (
                <Paper key={task.id} elevation={3} sx={{ padding: 2, margin: 2 }}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6">{task.title}</Typography>
                    {/* Edit and delete buttons */}
                    <Box>
                      <IconButton onClick={() => editTask(task)} className="edit-button"><EditIcon /></IconButton>
                      <IconButton onClick={() => deleteTask(task.id)}><DeleteIcon /></IconButton>
                    </Box>
                  </Box>
                  <Typography>{task.summary || 'No summary was provided for this task'}</Typography>
                  <Typography>Reminder set for: {task.dateTime}</Typography>
                  <Typography>Priority: {task.priority}</Typography>
                </Paper>
              ))
            ) : (
              // Display message if no tasks
              <Typography>You have no tasks</Typography>
            )}
            {/* Button to open the task form */}
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpened(true)}>New Task</Button>
          </Box>
        </Box>

        {/* Reminder modal */}
        <ReminderModal isOpen={isReminderOpen} onClose={closeReminderModal} task={currentTask} />
      </Container>
    </ThemeProvider>
  );
}

export default ToDoList;

