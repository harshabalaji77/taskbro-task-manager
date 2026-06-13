import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Header from './pages/Header';
import ChangePassword from './pages/ChangePassword';
import { getMe, logout } from './services/api';

const getTasksKey = (userId) => `taskflow-tasks-${userId}`;

const loadTasksFromStorage = () => {
  try {
    const savedUser = localStorage.getItem('taskbro-user');
    if (savedUser) {
      const { _id } = JSON.parse(savedUser);
      if (_id) {
        const saved = localStorage.getItem(getTasksKey(_id));
        return saved ? JSON.parse(saved) : [];
      }
    }
  } catch {
    return [];
  }
  return [];
};

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [tasks, setTasks] = useState(loadTasksFromStorage);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('taskbro-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (user?._id) {
      const saved = localStorage.getItem(getTasksKey(user._id));
      setTimeout(() => {
        setTasks(saved ? JSON.parse(saved) : []);
      }, 0);
    } else {
      setTimeout(() => {
        setTasks([]);
      }, 0);
    }
  }, [user?._id]);

  useEffect(() => {
    if (user?._id) {
      localStorage.setItem(getTasksKey(user._id), JSON.stringify(tasks));
    }
  }, [tasks, user?._id]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('taskbro-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('taskbro-user');
    }
  }, [user]);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await getMe();
        if (data.success && data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.warn('Failed to fetch current user:', err);
      }
    };
    fetchMe();
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.warn('Backend logout failed, clearing client session anyway:', err);
    }
    setUser(null);
  };

  const handleAddTask = (newTask) => {
    if (taskToEdit) {
      setTasks(
        tasks.map((task) =>
          task.id === taskToEdit.id
            ? {
                ...task,
                ...newTask,
              }
            : task
        )
      );
      setTaskToEdit(null);
    } else {
      setTasks([
        {
          id: uuidv4(),
          ...newTask,
          completed: false,
          createdAt: new Date().toISOString(),
        },
        ...tasks,
      ]);
    }
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const inProgressTasks = tasks.filter((task) => !task.completed).length;

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Register />
            )
          }
        />

        <Route
          path="/*"
          element={
            <ProtectedRoute user={user}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="min-h-screen bg-gray-50">
                      <Header user={user} onLogout={handleLogout} />
                      <Dashboard
                        user={user}
                        tasks={tasks}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        taskToEdit={taskToEdit}
                        setTaskToEdit={setTaskToEdit}
                        handleAddTask={handleAddTask}
                        handleToggleComplete={handleToggleComplete}
                        handleDeleteTask={handleDeleteTask}
                        handleEditTask={handleEditTask}
                        completedTasks={completedTasks}
                        inProgressTasks={inProgressTasks}
                      />
                    </div>
                  }
                />
                <Route
                  path="/change-password"
                  element={<ChangePassword />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;