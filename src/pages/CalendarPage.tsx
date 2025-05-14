
import React from "react";
import { format, addDays, startOfWeek } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import BottomNav from "@/components/BottomNav";
import { useTaskContext } from "@/contexts/TaskContext";

const CalendarPage: React.FC = () => {
  const { state } = useTaskContext();
  const [date, setDate] = React.useState<Date>(new Date());

  // Create an array of days for the time slots display
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(startOfCurrentWeek, i));

  // Filter tasks for the selected date
  const tasksForDate = state.tasks.filter(task => {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    return (
      taskDate.getDate() === date.getDate() &&
      taskDate.getMonth() === date.getMonth() &&
      taskDate.getFullYear() === date.getFullYear()
    );
  });

  return (
    <div className="mobile-container">
      <header className="p-4 pb-2">
        <h1 className="text-2xl font-bold">Calendar</h1>
      </header>

      <div className="page-container">
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            className="rounded-md"
          />
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            {format(date, "EEEE, MMMM d, yyyy")}
          </h2>
        </div>

        {tasksForDate.length > 0 ? (
          <div className="space-y-3">
            {tasksForDate.map((task) => (
              <div 
                key={task.id} 
                className={`p-3 rounded-lg border ${
                  task.completed 
                    ? "bg-green-50 border-green-200" 
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-start">
                  <div className={`w-3 h-3 mt-1.5 rounded-full mr-2 priority-${task.priority}`} />
                  <div>
                    <h3 className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
                      {task.title}
                    </h3>
                    {task.dueDate && (
                      <p className="text-xs text-gray-500">
                        {format(new Date(task.dueDate), "h:mm a")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No tasks scheduled for this day</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default CalendarPage;
