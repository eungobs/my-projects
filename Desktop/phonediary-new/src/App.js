import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import ToDoList from './ToDoList';
import Profile from './Profile';
import Logout from './Logout';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';
import { initDatabase, fetchTasks, insertTask } from './db'; // Updated import

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [db, setDb] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        const dbInstance = await initDatabase();
        setDb(dbInstance);
        const initialTasks = await fetchTasks();
        setTasks(initialTasks);
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };
    setupDatabase();
  }, []);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      setIsLoading(false);
      window.location.href = '/login';
    }, 2000);
  };

  const addTask = async (title, summary, dateTime, priority) => {
    if (db) {
      try {
        await insertTask(title, summary, dateTime, priority);
        const updatedTasks = await fetchTasks();
        setTasks(updatedTasks);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route 
            path="/todo-list" 
            element={<ToDoList 
              onLogout={handleLogout} 
              tasks={tasks} 
              addTask={addTask} 
            />} 
          />
          <Route path="/profile" element={<Profile />} />
          <Route 
            path="/logout" 
            element={<Logout 
              onLogout={handleLogout} 
              isLoading={isLoading} 
            />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

