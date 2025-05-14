
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Timer, Play, Pause, SkipForward, Volume2, VolumeX } from "lucide-react";
import { toast } from "@/components/ui/sonner";

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

interface TimerSettings {
  focus: number;
  shortBreak: number;
  longBreak: number;
}

const PomodoroTimer: React.FC = () => {
  const DEFAULT_SETTINGS: TimerSettings = {
    focus: 25 * 60, // 25 minutes in seconds
    shortBreak: 5 * 60, // 5 minutes in seconds
    longBreak: 15 * 60, // 15 minutes in seconds
  };
  
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [volume, setVolume] = useState(50);
  
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize ambient sound
  useEffect(() => {
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_2cce3450dc.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume / 100;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Update audio volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  // Play/pause ambient sound based on soundOn state
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (soundOn && isRunning) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    } else {
      audioRef.current.pause();
    }
  }, [soundOn, isRunning]);
  
  // Timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            
            // Play completion sound
            const completionSound = new Audio('/notification.mp3');
            completionSound.play();
            
            // Show notification
            toast.success(`${mode === 'focus' ? 'Focus' : 'Break'} time completed!`, {
              description: `${mode === 'focus' ? 'Take a break!' : 'Ready to focus again?'}`,
            });
            
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode]);
  
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(DEFAULT_SETTINGS[mode]);
  };
  
  const changeMode = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(DEFAULT_SETTINGS[newMode]);
  };
  
  const toggleSound = () => {
    setSoundOn(!soundOn);
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const progressPercentage = (timeLeft / DEFAULT_SETTINGS[mode]) * 100;
  
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-taskease-purple/10 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Timer className="mr-2 text-taskease-purple" />
          Pomodoro Timer
        </h2>
        <div className="flex items-center space-x-2">
          {soundOn ? (
            <Volume2 
              className="h-5 w-5 text-gray-400 cursor-pointer hover:text-taskease-purple" 
              onClick={toggleSound}
            />
          ) : (
            <VolumeX 
              className="h-5 w-5 text-gray-400 cursor-pointer hover:text-taskease-purple" 
              onClick={toggleSound}
            />
          )}
          {soundOn && (
            <Slider
              className="w-20"
              defaultValue={[volume]}
              max={100}
              step={1}
              onValueChange={([val]) => setVolume(val)}
            />
          )}
        </div>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className="text-center">
          <div className="relative w-36 h-36 mx-auto mb-4">
            <div className="w-full h-full rounded-full bg-gray-100 absolute" />
            <div 
              className="w-full h-full rounded-full bg-gradient-to-r from-taskease-purple to-taskease-deep-purple absolute"
              style={{ 
                clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
                opacity: 0.2
              }}
            />
            <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
              <span className="text-3xl font-bold text-taskease-deep-purple">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          
          <div className="flex justify-center space-x-3 mb-4">
            <Button
              size="sm"
              variant={mode === 'focus' ? "default" : "outline"}
              className={mode === 'focus' ? "bg-taskease-purple" : ""}
              onClick={() => changeMode('focus')}
            >
              Focus
            </Button>
            <Button
              size="sm"
              variant={mode === 'shortBreak' ? "default" : "outline"}
              className={mode === 'shortBreak' ? "bg-taskease-purple" : ""}
              onClick={() => changeMode('shortBreak')}
            >
              Short Break
            </Button>
            <Button
              size="sm"
              variant={mode === 'longBreak' ? "default" : "outline"}
              className={mode === 'longBreak' ? "bg-taskease-purple" : ""}
              onClick={() => changeMode('longBreak')}
            >
              Long Break
            </Button>
          </div>
          
          <div className="flex justify-center space-x-3">
            <Button 
              onClick={toggleTimer} 
              className="bg-taskease-purple hover:bg-taskease-deep-purple"
            >
              {isRunning ? <Pause className="mr-1" /> : <Play className="mr-1" />}
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button 
              onClick={resetTimer} 
              variant="outline"
            >
              <SkipForward className="mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
