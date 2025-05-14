
import React from "react";
import { format } from "date-fns";
import { Check, Star } from "lucide-react";
import { Task } from "@/contexts/TaskContext";
import { useTaskContext } from "@/contexts/TaskContext";
import { toast } from "@/components/ui/sonner";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { dispatch } = useTaskContext();

  const toggleTask = () => {
    dispatch({ type: "TOGGLE_TASK", payload: task.id });
    
    // Show success notification when completing a task
    if (!task.completed) {
      toast.success("Task completed!", {
        description: "Great job on completing your task!",
        duration: 3000,
      });
    }
  };

  const toggleFocusTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ 
      type: "SET_FOCUS_TASK", 
      payload: { id: task.id, focus: !task.isFocusTask } 
    });
    
    // Show notification when adding to focus tasks
    if (!task.isFocusTask) {
      toast.success("Added to focus tasks", {
        description: "This task is now in your daily focus.",
        duration: 3000,
      });
    }
  };

  return (
    <div 
      className={`task-card ${task.completed ? "border-green-200 bg-green-50" : ""} 
                  ${task.isFocusTask ? "border-taskease-purple" : ""}`}
      onClick={toggleTask}
    >
      <div className="flex-shrink-0">
        <div 
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${task.completed 
                        ? "bg-green-500 border-green-500" 
                        : "border-gray-300"}`}
        >
          {task.completed && <Check className="h-4 w-4 text-white" />}
        </div>
      </div>
      
      <div className="flex-grow">
        <h3 className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
          {task.title}
        </h3>
        
        {task.description && (
          <p className={`text-sm text-gray-600 ${task.completed ? "line-through text-gray-400" : ""}`}>
            {task.description}
          </p>
        )}
        
        {task.dueDate && (
          <div className="text-xs text-gray-500 mt-1">
            Due: {format(new Date(task.dueDate), "h:mm a, MMM d")}
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Star
          onClick={toggleFocusTask}
          className={`h-5 w-5 cursor-pointer ${
            task.isFocusTask 
              ? "fill-taskease-purple text-taskease-purple" 
              : "text-gray-300 hover:text-gray-400"
          }`}
        />
        <div className={`priority-indicator priority-${task.priority}`}></div>
      </div>
    </div>
  );
};

export default TaskItem;
