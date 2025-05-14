
import React, { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import FocusTasks from "@/components/FocusTasks";
import TaskList from "@/components/TaskList";
import MoodTracker from "@/components/MoodTracker";
import PomodoroTimer from "@/components/PomodoroTimer";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";

const HomePage: React.FC = () => {
  const [showPomodoro, setShowPomodoro] = useState(false);
  const { toast } = useToast();
  
  const togglePomodoro = () => {
    setShowPomodoro(!showPomodoro);
    if (!showPomodoro) {
      toast({
        title: "Pomodoro Timer",
        description: "Focus on your tasks with timed sessions!",
        duration: 3000,
      });
    }
  };
  
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
    <div className="mobile-container">
      <header className="p-4 pb-0 flex items-center justify-between">
        <div className="flex items-center">
          <Logo className="h-8 w-8 mr-2 text-taskease-purple" />
          <div>
            <h1 className="text-2xl font-bold text-taskease-purple">FlowTask</h1>
            <p className="text-sm text-gray-500">{format(new Date(), "EEEE, MMMM d")}</p>
          </div>
        </div>
        <button 
          onClick={togglePomodoro}
          className="w-10 h-10 rounded-full bg-taskease-light-purple flex items-center justify-center hover:bg-taskease-purple transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={showPomodoro ? "#ffffff" : "#7C4DFF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </button>
      </header>

      <motion.div 
        className="page-container"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {showPomodoro && (
          <motion.div variants={item}>
            <PomodoroTimer />
          </motion.div>
        )}
        
        <motion.div variants={item}>
          <FocusTasks />
        </motion.div>
        
        <motion.div variants={item}>
          <MoodTracker />
        </motion.div>
        
        <motion.div variants={item}>
          <TaskList />
        </motion.div>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default HomePage;
