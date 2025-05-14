
import React from "react";
import { useTaskContext } from "@/contexts/TaskContext";
import TaskItem from "./TaskItem";
import { motion } from "framer-motion";

const FocusTasks: React.FC = () => {
  const { state } = useTaskContext();
  const focusTasks = state.tasks.filter(task => task.isFocusTask);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="mb-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-taskease-deep-purple">Daily Focus</h2>
        <span className={`text-sm px-3 py-1 rounded-full ${
          focusTasks.length === 3 
            ? "bg-taskease-purple/20 text-taskease-deep-purple" 
            : "bg-gray-100 text-gray-500"
        }`}>
          {focusTasks.length}/3
        </span>
      </div>
      
      {focusTasks.length === 0 ? (
        <motion.div 
          className="bg-gradient-to-r from-gray-50 to-taskease-light-purple/20 p-6 rounded-xl text-center border border-dashed border-gray-300"
          variants={item}
        >
          <p className="text-gray-500">
            Select up to 3 priority tasks to focus on today
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Click the star icon on your tasks to add them here
          </p>
        </motion.div>
      ) : (
        <div>
          {focusTasks.map((task, index) => (
            <motion.div key={task.id} variants={item} custom={index}>
              <TaskItem task={task} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default FocusTasks;
