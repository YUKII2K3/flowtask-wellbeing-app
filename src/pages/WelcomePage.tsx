import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-taskease-light-purple/30">
      <div className="w-full max-w-md text-center">
        <div className="mb-10 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-taskease-purple to-taskease-deep-purple mx-auto mb-6 flex items-center justify-center rounded-3xl shadow-lg">
            <Logo className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-taskease-purple to-taskease-deep-purple bg-clip-text text-transparent">FlowTask</h1>
          <p className="text-gray-600 mt-4 mb-8">
            Your personal task manager designed for productivity and well-being
          </p>
        </div>

        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Button 
            onClick={() => navigate("/login")} 
            className="w-full bg-gradient-to-r from-taskease-purple to-taskease-deep-purple hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Log In
          </Button>
          <Button 
            onClick={() => navigate("/signup")} 
            variant="outline" 
            className="w-full border-taskease-purple text-taskease-purple hover:bg-taskease-light-purple hover:text-taskease-deep-purple transition-all duration-300"
          >
            Sign Up
          </Button>
          <Button 
            onClick={() => navigate("/home")}
            variant="ghost" 
            className="w-full hover:bg-taskease-light-purple/50 transition-all duration-300"
          >
            Continue as Guest
          </Button>
        </div>

        <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-lg font-medium mb-6 text-taskease-deep-purple">Premium Features</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="premium-card hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-taskease-light-purple to-white flex items-center justify-center mb-2 mx-auto shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C4DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 11 3 3L22 4" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-taskease-deep-purple">Daily Focus</h3>
              <p className="text-xs text-gray-500 mt-1">Prioritize 3 key tasks</p>
            </div>
            
            <div className="premium-card hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-taskease-light-purple to-white flex items-center justify-center mb-2 mx-auto shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C4DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-taskease-deep-purple">Mood Tracking</h3>
              <p className="text-xs text-gray-500 mt-1">Monitor your well-being</p>
            </div>
            
            <div className="premium-card hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-taskease-light-purple to-white flex items-center justify-center mb-2 mx-auto shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C4DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8v4l3 3" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-taskease-deep-purple">Pomodoro Timer</h3>
              <p className="text-xs text-gray-500 mt-1">Focus with timed sessions</p>
            </div>
            
            <div className="premium-card hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-taskease-light-purple to-white flex items-center justify-center mb-2 mx-auto shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C4DFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20v-6" />
                  <path d="M12 14l-2-2 2-2 2 2-2 2Z" />
                  <path d="M12 8V4" />
                  <path d="M12 4h8.5L12 12H4l8 8h8.5" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-taskease-deep-purple">Progress Stats</h3>
              <p className="text-xs text-gray-500 mt-1">Track your productivity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
