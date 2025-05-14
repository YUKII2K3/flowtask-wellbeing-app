import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTaskContext, Priority } from "@/contexts/TaskContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Mic, Calendar as CalendarIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import BottomNav from "@/components/BottomNav";

const AddTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isFocusTask, setIsFocusTask] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    const newTask = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: date ? date.toISOString() : undefined,
      priority,
      isFocusTask
    };
    
    dispatch({ type: "ADD_TASK", payload: newTask });
    navigate("/home");
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // This is a placeholder for voice recognition
    // In a real app, we would integrate with SpeechRecognition API
    if (!isRecording) {
      setTimeout(() => {
        setTitle("Voice recorded task");
        setDescription("This task was created using voice input");
        setIsRecording(false);
      }, 2000);
    }
  };

  return (
    <div className="mobile-container">
      <header className="p-4 pb-2">
        <h1 className="text-2xl font-bold">Add New Task</h1>
      </header>

      <div className="page-container">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="title">Task Title</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="icon" 
                onClick={handleVoiceInput}
                className={isRecording ? "text-red-500 animate-pulse" : ""}
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="What needs to be done?"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Add details about this task..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <RadioGroup 
              value={priority} 
              onValueChange={(value) => setPriority(value as Priority)}
              className="flex"
            >
              <div className="flex items-center space-x-2 mr-4">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="font-normal">Low</Label>
              </div>
              <div className="flex items-center space-x-2 mr-4">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="font-normal">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="font-normal">High</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date (optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center space-x-2">
            <Switch 
              id="focus-task" 
              checked={isFocusTask}
              onCheckedChange={setIsFocusTask}
            />
            <Label htmlFor="focus-task">Add to Daily Focus (max 3 tasks)</Label>
          </div>

          <Button type="submit" className="w-full bg-taskease-purple hover:bg-taskease-deep-purple">
            Create Task
          </Button>
        </form>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default AddTaskPage;
