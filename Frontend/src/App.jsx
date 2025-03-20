import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskStats from './components/TaskStats';
import SearchBar from './components/SearchBar';
import { motion } from 'framer-motion';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'completed' && task.completed) ||
                         (filterStatus === 'active' && !task.completed);
    return matchesSearch && matchesStatus;
  });

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
    setIsModalOpen(false);
  };

  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  return (
    <div className="min-h-screen bg-cyber-dark p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-orbitron text-cyber-blue mb-4">
            Cyber Task Manager
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-cyber-purple text-white rounded-lg font-orbitron 
                         hover:bg-cyber-pink transition-colors duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              Add New Task
            </motion.button>
          </div>
        </header>

        <TaskStats tasks={tasks} />
        
        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggleComplete={toggleTaskComplete}
          onUpdate={updateTask}
        />

        {isModalOpen && (
          <TaskForm
            onSubmit={addTask}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </motion.div>
    </div>
  );
}

export default App;