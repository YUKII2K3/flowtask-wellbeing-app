
import React from "react";
import { useTaskContext } from "@/contexts/TaskContext";
import TaskItem from "./TaskItem";

interface TaskListProps {
  showCompleted?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ showCompleted = true }) => {
  const { state } = useTaskContext();
  
  const pendingTasks = state.tasks.filter(task => !task.completed && !task.isFocusTask);
  const completedTasks = state.tasks.filter(task => task.completed);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Tasks</h2>
      
      {pendingTasks.length === 0 ? (
        <p className="text-sm text-gray-500 p-4 bg-gray-50 rounded-lg text-center">
          No pending tasks. Add a new task to get started.
        </p>
      ) : (
        <div className="mb-6">
          {pendingTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}

      {showCompleted && completedTasks.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-2 mt-8 flex items-center">
            <span>Completed</span>
            <span className="text-sm ml-2 bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              {completedTasks.length}
            </span>
          </h2>
          <div>
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;
