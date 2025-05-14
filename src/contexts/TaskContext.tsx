
import React, { createContext, useContext, useReducer, useEffect } from "react";

export type Priority = "low" | "medium" | "high";
export type MoodType = "great" | "good" | "neutral" | "bad" | "terrible";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  priority: Priority;
  isFocusTask: boolean;
  reminder?: string;
  tags?: string[];
}

export interface DailyMood {
  date: string;
  mood: MoodType;
}

type TaskState = {
  tasks: Task[];
  focusTasks: Task[];
  moods: DailyMood[];
  filter: "all" | "completed" | "pending";
  stats: {
    completedTasks: number;
    streakDays: number;
    totalTasks: number;
  };
};

type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "TOGGLE_TASK"; payload: string }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "SET_FOCUS_TASK"; payload: { id: string; focus: boolean } }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "SET_FILTER"; payload: "all" | "completed" | "pending" }
  | { type: "SET_MOOD"; payload: DailyMood };

const initialState: TaskState = {
  tasks: [
    {
      id: "1",
      title: "Buy groceries",
      description: "Milk, eggs, bread, fruits",
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: new Date(new Date().setHours(20, 0, 0, 0)).toISOString(),
      priority: "medium",
      isFocusTask: true
    },
    {
      id: "2",
      title: "Finish presentation",
      description: "Complete slides for the client meeting",
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
      priority: "high",
      isFocusTask: true
    },
    {
      id: "3",
      title: "Call plumber",
      description: "Fix leaking faucet",
      completed: false,
      createdAt: new Date().toISOString(),
      priority: "low",
      isFocusTask: false
    },
    {
      id: "4",
      title: "Morning meditation",
      description: "15 minutes of mindfulness",
      completed: true,
      createdAt: new Date().toISOString(),
      priority: "medium",
      isFocusTask: false
    }
  ],
  focusTasks: [],
  moods: [
    {
      date: new Date().toISOString().split('T')[0],
      mood: "good"
    }
  ],
  filter: "all",
  stats: {
    completedTasks: 12,
    streakDays: 3,
    totalTasks: 16
  }
};

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        stats: {
          ...state.stats,
          totalTasks: state.stats.totalTasks + 1
        }
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
        stats: {
          ...state.stats,
          completedTasks: state.tasks.find(t => t.id === action.payload)?.completed
            ? state.stats.completedTasks - 1
            : state.stats.completedTasks + 1
        }
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        stats: {
          ...state.stats,
          totalTasks: state.stats.totalTasks - 1,
          completedTasks: state.tasks.find(t => t.id === action.payload)?.completed
            ? state.stats.completedTasks - 1
            : state.stats.completedTasks
        }
      };
    case "SET_FOCUS_TASK":
      // Make sure we don't have more than 3 focus tasks
      const currentFocusTasks = state.tasks.filter(t => t.isFocusTask && t.id !== action.payload.id);
      
      if (action.payload.focus && currentFocusTasks.length >= 3) {
        return state; // Don't allow more than 3 focus tasks
      }
      
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, isFocusTask: action.payload.focus }
            : task
        )
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload
      };
    case "SET_MOOD":
      const existingMoodIndex = state.moods.findIndex(
        m => m.date === action.payload.date
      );
      
      let updatedMoods = [...state.moods];
      if (existingMoodIndex >= 0) {
        updatedMoods[existingMoodIndex] = action.payload;
      } else {
        updatedMoods = [...updatedMoods, action.payload];
      }
      
      return {
        ...state,
        moods: updatedMoods
      };
    default:
      return state;
  }
};

const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
}>({
  state: initialState,
  dispatch: () => null
});

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Calculate focus tasks
  useEffect(() => {
    const focusTasks = state.tasks.filter(task => task.isFocusTask);
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
