
import React from "react";
import { useTaskContext } from "@/contexts/TaskContext";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { format, subDays } from "date-fns";
import BottomNav from "@/components/BottomNav";

const StatsPage: React.FC = () => {
  const { state } = useTaskContext();

  // Prepare data for Pie Chart
  const pieData = [
    { name: "Completed", value: state.stats.completedTasks },
    { name: "Pending", value: state.stats.totalTasks - state.stats.completedTasks }
  ];
  const COLORS = ["#9b87f5", "#E5DEFF"];

  // Generate sample data for the last 7 days
  const generateWeekData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      data.push({
        date: format(date, "EEE"),
        completed: Math.floor(Math.random() * 10),
        created: Math.floor(Math.random() * 10 + 5)
      });
    }
    return data;
  };

  const weekData = generateWeekData();

  return (
    <div className="mobile-container">
      <header className="p-4 pb-2">
        <h1 className="text-2xl font-bold">Your Productivity</h1>
      </header>

      <div className="page-container">
        <div className="grid gap-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center">
              <span className="text-lg font-bold text-taskease-purple">{state.stats.totalTasks}</span>
              <span className="text-xs text-gray-500">Total Tasks</span>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center">
              <span className="text-lg font-bold text-green-500">{state.stats.completedTasks}</span>
              <span className="text-xs text-gray-500">Completed</span>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center">
              <span className="text-lg font-bold text-orange-500">{state.stats.streakDays}</span>
              <span className="text-xs text-gray-500">Day Streak</span>
            </div>
          </div>

          {/* Task Completion Chart */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Task Completion Rate</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Activity Chart */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Weekly Activity</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={weekData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" name="Completed" stackId="a" fill="#9b87f5" />
                  <Bar dataKey="created" name="Created" stackId="a" fill="#E5DEFF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Mood-Productivity Correlation */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Mood & Productivity</h2>
            <p className="text-sm text-gray-600 mb-4">
              Track how your mood affects your task completion rate over time.
            </p>
            <div className="flex items-center justify-center h-24 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-sm">
                Continue tracking your mood and completing tasks to see insights here.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default StatsPage;
