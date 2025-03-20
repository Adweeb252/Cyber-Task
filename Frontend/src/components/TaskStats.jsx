/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

function TaskStats({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "high"
  ).length;

  const stats = [
    { label: "Total Tasks", value: totalTasks, color: "cyber-blue" },
    { label: "Completed", value: completedTasks, color: "cyber-purple" },
    { label: "High Priority", value: highPriorityTasks, color: "cyber-pink" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`glass-effect rounded-lg p-4 border-l-4 border-${stat.color}`}
        >
          <h3 className="text-lg font-orbitron text-gray-400">{stat.label}</h3>
          <p className={`text-3xl font-bold text-${stat.color}`}>
            {stat.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export default TaskStats;
