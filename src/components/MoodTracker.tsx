
import React from "react";
import { useTaskContext } from "@/contexts/TaskContext";
import { MoodType } from "@/contexts/TaskContext";
import { Smile, Frown, Meh } from "lucide-react";

const MoodTracker: React.FC = () => {
  const { state, dispatch } = useTaskContext();
  const today = new Date().toISOString().split('T')[0];
  const currentMood = state.moods.find(m => m.date === today)?.mood || "neutral";

  const setMood = (mood: MoodType) => {
    dispatch({
      type: "SET_MOOD",
      payload: { date: today, mood }
    });
  };

  const MoodIcon: React.FC<{ 
    type: MoodType; 
    icon: React.ReactNode; 
    label: string 
  }> = ({ type, icon, label }) => (
    <div className="flex flex-col items-center">
      <div
        className={`mood-icon ${type === currentMood ? "active" : "inactive"}`}
        onClick={() => setMood(type)}
      >
        {icon}
      </div>
      <span className="text-xs mt-1 text-gray-500">{label}</span>
    </div>
  );

  return (
    <div className="my-6">
      <h2 className="text-lg font-semibold mb-4">How are you feeling today?</h2>
      <div className="flex justify-between px-6">
        <MoodIcon type="great" icon={<Smile className="h-5 w-5" />} label="Great" />
        <MoodIcon type="good" icon={<Smile className="h-5 w-5" />} label="Good" />
        <MoodIcon type="neutral" icon={<Meh className="h-5 w-5" />} label="Okay" />
        <MoodIcon type="bad" icon={<Frown className="h-5 w-5" />} label="Bad" />
        <MoodIcon type="terrible" icon={<Frown className="h-5 w-5" />} label="Terrible" />
      </div>
    </div>
  );
};

export default MoodTracker;
