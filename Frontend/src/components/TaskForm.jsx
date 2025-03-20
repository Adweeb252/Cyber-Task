/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";

function TaskForm({ onSubmit, onClose }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-effect rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-orbitron text-cyber-blue mb-6">
          New Task
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-cyber-pink mb-2">Title</label>
            <input
              type="text"
              required
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="w-full bg-cyber-dark text-white p-2 rounded border border-cyber-blue focus:border-cyber-pink"
            />
          </div>
          <div>
            <label className="block text-cyber-pink mb-2">Description</label>
            <textarea
              required
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              className="w-full bg-cyber-dark text-white p-2 rounded border border-cyber-blue focus:border-cyber-pink"
            />
          </div>
          <div>
            <label className="block text-cyber-pink mb-2">Priority</label>
            <select
              value={task.priority}
              onChange={(e) => setTask({ ...task, priority: e.target.value })}
              className="w-full bg-cyber-dark text-white p-2 rounded border border-cyber-blue focus:border-cyber-pink"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-cyber-pink mb-2">Due Date</label>
            <input
              type="date"
              required
              value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              className="w-full bg-cyber-dark text-white p-2 rounded border border-cyber-blue focus:border-cyber-pink"
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-cyber-dark text-white rounded hover:bg-cyber-pink transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyber-blue text-white rounded hover:bg-cyber-purple transition-colors"
            >
              Create Task
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default TaskForm;
