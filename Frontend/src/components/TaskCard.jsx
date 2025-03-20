import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';

function TaskCard({ task, onDelete, onToggleComplete, onUpdate, isDragging }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors = {
    high: 'border-cyber-pink',
    medium: 'border-cyber-purple',
    low: 'border-cyber-blue',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedTask);
    setIsEditing(false);
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        task-card glass-effect rounded-lg p-4
        ${priorityColors[task.priority]}
        ${isDragging ? 'z-50 shadow-2xl' : ''}
        border-2 hover:animate-glow
      `}
    >
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="w-full bg-cyber-dark text-white p-2 rounded"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="w-full bg-cyber-dark text-white p-2 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-cyber-blue px-4 py-2 rounded hover:bg-opacity-80"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-cyber-pink px-4 py-2 rounded hover:bg-opacity-80"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-start mb-4">
            <h3 className={`text-xl font-orbitron ${task.completed ? 'line-through text-gray-500' : 'text-cyber-blue'}`}>
              {task.title}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-cyber-blue hover:text-cyber-pink transition-colors"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="text-cyber-pink hover:text-cyber-blue transition-colors"
              >
                <FaTrash />
              </button>
            </div>
          </div>
          <p className="text-gray-300 mb-4">{task.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-cyber-blue">
              Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            </span>
            <button
              onClick={() => onToggleComplete(task.id)}
              className={`
                p-2 rounded-full transition-colors
                ${task.completed ? 'bg-cyber-purple' : 'bg-cyber-dark'}
              `}
            >
              <FaCheck className={task.completed ? 'text-white' : 'text-gray-600'} />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default TaskCard;