import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Icons component
const Icon = ({ name, className = "" }) => {
  const icons = {
    check: "✓",
    user: "👤",
    task: "📝",
    chart: "📊",
    calendar: "📅",
    priority: "⚡",
    edit: "✏️",
    delete: "🗑️",
    logout: "🚪",
    add: "➕",
    search: "🔍",
    filter: "🔧",
    bell: "🔔",
    settings: "⚙️",
    sun: "☀️",
    moon: "🌙"
  };
  
  return <span className={`icon ${className}`}>{icons[name] || "📦"}</span>;
};

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [newTask, setNewTask] = useState("");

  // API configuration
  const API_URL = "http://localhost:8000";
  axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";

  // Demo data for tasks
  const demoTasks = [
    {
      id: 1,
      title: "Complete internship project",
      description: "Build and deploy TaskFlow Pro application with all features",
      status: "in_progress",
      priority: "high",
      category: "work",
      due_date: "2024-01-20",
      created_at: "2024-01-13 10:00:00"
    },
    {
      id: 2,
      title: "Learn React hooks",
      description: "Master useState, useEffect, and custom hooks",
      status: "completed",
      priority: "medium",
      category: "learning",
      due_date: "2024-01-15",
      created_at: "2024-01-12 14:30:00"
    },
    {
      id: 3,
      title: "Database design",
      description: "Create MySQL schema with proper relationships",
      status: "todo",
      priority: "high",
      category: "work",
      due_date: "2024-01-18",
      created_at: "2024-01-13 09:15:00"
    },
    {
      id: 4,
      title: "UI/UX improvements",
      description: "Implement dark mode and responsive design",
      status: "in_progress",
      priority: "medium",
      category: "design",
      due_date: "2024-01-16",
      created_at: "2024-01-13 11:30:00"
    },
    {
      id: 5,
      title: "API documentation",
      description: "Write comprehensive API docs with examples",
      status: "todo",
      priority: "low",
      category: "documentation",
      due_date: "2024-01-25",
      created_at: "2024-01-13 12:45:00"
    }
  ];

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/register`, {
        email,
        password,
        full_name: fullName,
      });
      setMessage("Registration successful! You can now login.");
      setIsLogin(true);
      setEmail("");
      setPassword("");
      setFullName("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed. Try again.");
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
      });
      const { token: newToken } = response.data.data;
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setMessage("Welcome back! Dashboard loaded.");
      setEmail("");
      setPassword("");
      setTasks(demoTasks);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setTasks([]);
    setMessage("Logged out successfully. Come back soon!");
  };

  // Add new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const task = {
        id: tasks.length + 1,
        title: newTask,
        description: "New task description",
        status: "todo",
        priority: "medium",
        category: "general",
        due_date: new Date().toISOString().split("T")[0],
        created_at: new Date().toISOString()
      };
      setTasks([task, ...tasks]);
      setNewTask("");
      setMessage("Task added successfully!");
    }
  };

  // Update task status
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    setMessage("Task status updated!");
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    setMessage("Task deleted!");
  };

  // Load demo tasks on login
  useEffect(() => {
    if (token) {
      setTasks(demoTasks);
    }
  }, [token]);

  // Calculate statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === "completed").length,
    inProgress: tasks.filter(t => t.status === "in_progress").length,
    todo: tasks.filter(t => t.status === "todo").length,
    highPriority: tasks.filter(t => t.priority === "high").length,
  };

  // If not logged in, show auth screen
  if (!token) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-6 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
        <div className={`max-w-md w-full rounded-2xl shadow-2xl overflow-hidden ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          {/* Header */}
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <Icon name="check" className="text-3xl" />
            </div>
            <h1 className="text-3xl font-bold mb-2">TaskFlow Pro</h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Streamline your productivity</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 text-center font-medium transition-all ${
                isLogin 
                  ? `${darkMode ? 'bg-blue-900 text-white' : 'bg-blue-50 text-blue-600'} border-b-2 border-blue-500` 
                  : `${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`
              }`}
            >
              <Icon name="user" className="mr-2" />
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 text-center font-medium transition-all ${
                !isLogin 
                  ? `${darkMode ? 'bg-blue-900 text-white' : 'bg-blue-50 text-blue-600'} border-b-2 border-blue-500` 
                  : `${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`
              }`}
            >
              <Icon name="add" className="mr-2" />
              Register
            </button>
          </div>

          {/* Form */}
          <div className="p-8">
            {message && (
              <div className={`p-4 rounded-xl mb-6 ${message.includes("success") ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message}
              </div>
            )}

            <form onSubmit={isLogin ? handleLogin : handleRegister}>
              {!isLogin && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'
                    }`}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
              )}
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {isLogin ? "Sign In to Dashboard" : "Create Account"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="inline-flex items-center text-sm"
              >
                <Icon name={darkMode ? "sun" : "moon"} className="mr-2" />
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Demo: Use any credentials to login
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Top Bar */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <Icon name="check" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">TaskFlow Pro</h1>
                  <p className="text-sm opacity-75">Productivity Dashboard</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <Icon name={darkMode ? "sun" : "moon"} />
              </button>
              
              <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                <Icon name="bell" />
              </button>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition"
              >
                <Icon name="logout" className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="mb-8">
          <div className={`rounded-2xl p-8 shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white`}>
            <h2 className="text-2xl font-bold mb-2">Welcome back! 👋</h2>
            <p className="opacity-90">You have {stats.total} tasks to manage. {stats.completed > 0 && `Great job completing ${stats.completed} tasks!`}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { label: "Total Tasks", value: stats.total, icon: "task", color: "from-blue-500 to-blue-600" },
            { label: "Completed", value: stats.completed, icon: "check", color: "from-green-500 to-green-600" },
            { label: "In Progress", value: stats.inProgress, icon: "chart", color: "from-yellow-500 to-yellow-600" },
            { label: "To Do", value: stats.todo, icon: "calendar", color: "from-purple-500 to-purple-600" },
            { label: "High Priority", value: stats.highPriority, icon: "priority", color: "from-red-500 to-red-600" },
          ].map((stat, index) => (
            <div key={index} className={`bg-gradient-to-r ${stat.color} rounded-xl p-6 shadow-lg text-white`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm opacity-90">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className="text-2xl">
                  <Icon name={stat.icon} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Task Section */}
        <div className={`rounded-2xl shadow-lg p-6 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center mb-6">
            <Icon name="add" className="text-2xl mr-3" />
            <h2 className="text-xl font-bold">Add New Task</h2>
          </div>
          <form onSubmit={handleAddTask} className="flex gap-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className={`flex-1 px-6 py-4 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
              }`}
              placeholder="What needs to be done?"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* Tasks Section */}
        <div className={`rounded-2xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Icon name="task" className="text-2xl mr-3" />
              <h2 className="text-2xl font-bold">My Tasks</h2>
              <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
                {tasks.length} tasks
              </span>
            </div>
            
            <div className="flex space-x-3">
              <button className={`px-4 py-2 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition`}>
                <Icon name="filter" className="mr-2" />
                Filter
              </button>
              <button className={`px-4 py-2 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition`}>
                <Icon name="search" className="mr-2" />
                Search
              </button>
            </div>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">📋</div>
              <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
              <p className="opacity-75 mb-6">Start by adding your first task above</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`group p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                      : 'bg-gray-50 border-gray-200 hover:bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <span className={`w-3 h-3 rounded-full mr-3 ${
                          task.status === 'completed' ? 'bg-green-500' :
                          task.status === 'in_progress' ? 'bg-yellow-500' :
                          'bg-gray-400'
                        }`}></span>
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <span className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        }`}>
                          {task.priority} priority
                        </span>
                      </div>
                      
                      <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {task.description}
                      </p>
                      
                      <div className="flex items-center text-sm">
                        <Icon name="calendar" className="mr-2 opacity-60" />
                        <span className={`mr-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Due: {task.due_date}
                        </span>
                        <Icon name="chart" className="mr-2 opacity-60" />
                        <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {task.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-6">
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                        className={`px-3 py-1 rounded-lg border text-sm ${
                          darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                        }`}
                      >
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition"
                      >
                        <Icon name="delete" />
                      </button>
                      
                      <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition">
                        <Icon name="edit" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className="font-bold mb-4 flex items-center">
              <Icon name="settings" className="mr-2" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className={`w-full text-left px-4 py-3 rounded-xl transition ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}>
                Export Tasks
              </button>
              <button className={`w-full text-left px-4 py-3 rounded-xl transition ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}>
                Generate Report
              </button>
              <button className={`w-full text-left px-4 py-3 rounded-xl transition ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}>
                Settings
              </button>
            </div>
          </div>
          
          <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg md:col-span-2`}>
            <h3 className="font-bold mb-4">Activity Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Tasks completed today</span>
                <span className="font-bold text-green-600">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Avg. completion time</span>
                <span className="font-bold">2.4 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Productivity score</span>
                <span className="font-bold text-blue-600">87%</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`mt-12 py-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-2 font-medium">TaskFlow Pro • Professional Task Management</p>
          <p className="text-sm opacity-75">Built with React & PHP</p>
        </div>
      </footer>
    </div>
  );
}

export default App;