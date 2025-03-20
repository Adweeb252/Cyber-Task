import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ searchQuery, setSearchQuery, filterStatus, setFilterStatus }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative"
      >
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyber-blue" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="pl-10 pr-4 py-2 bg-cyber-dark text-white rounded-lg border border-cyber-blue 
                     focus:border-cyber-pink focus:outline-none w-full md:w-64"
        />
      </motion.div>
      
      <motion.select
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="px-4 py-2 bg-cyber-dark text-white rounded-lg border border-cyber-blue 
                   focus:border-cyber-pink focus:outline-none"
      >
        <option value="all">All Tasks</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </motion.select>
    </div>
  );
}

export default SearchBar;