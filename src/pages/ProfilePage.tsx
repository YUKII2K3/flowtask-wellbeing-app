
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BottomNav from "@/components/BottomNav";
import { toast } from "@/components/ui/sonner";
import Logo from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated", {
      description: "Your profile changes have been saved successfully."
    });
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, we would actually implement dark mode
    // by adding/removing a class from the document body
    
    if (!isDarkMode) {
      toast.success("Dark mode enabled", {
        description: "The app theme has been switched to dark mode."
      });
    } else {
      toast("Light mode enabled", {
        description: "The app theme has been switched to light mode."
      });
    }
  };

  return (
    <div className="mobile-container">
      <header className="p-4 pb-2 flex items-center">
        <Logo className="h-6 w-6 mr-2" />
        <h1 className="text-2xl font-bold">Profile</h1>
      </header>

      <div className="page-container">
        <div className="flex flex-col items-center mb-8">
          <Avatar className="h-24 w-24 mb-4">
            {user?.photoUrl ? (
              <AvatarImage src={user.photoUrl} alt={user.name} />
            ) : (
              <AvatarFallback className="bg-taskease-purple text-white text-xl">
                {user?.name.substring(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            )}
          </Avatar>
          <h2 className="text-xl font-semibold">{user?.name || "User"}</h2>
          <p className="text-gray-500">{user?.email || "user@example.com"}</p>
          
          {user?.provider === "google" && (
            <div className="mt-2 bg-gray-100 px-3 py-1 rounded-full text-xs flex items-center">
              <svg width="14" height="14" viewBox="0 0 20 20" className="mr-1">
                <path d="M19.0801 10.2034C19.0801 9.54771 19.0213 8.91731 18.9128 8.30811H10.2V11.9624H15.1744C14.9269 13.1218 14.2672 14.1231 13.2944 14.7784V17.1484H16.2856C18.0554 15.5079 19.0801 13.0877 19.0801 10.2034Z" fill="#4285F4"/>
                <path d="M10.2 19.2003C12.7 19.2003 14.7955 18.3715 16.2856 17.1484L13.2944 14.7784C12.4574 15.3352 11.3863 15.6527 10.2 15.6527C7.77035 15.6527 5.72432 14.0253 4.97241 11.8275H1.88391V14.2724C3.36775 17.1959 6.55432 19.2003 10.2 19.2003Z" fill="#34A853"/>
                <path d="M4.97241 11.8275C4.76126 11.2708 4.64568 10.6693 4.64568 10.0508C4.64568 9.43224 4.76126 8.83081 4.97241 8.27406V5.82919H1.88391C1.19561 7.10916 0.800049 8.5409 0.800049 10.0508C0.800049 11.5607 1.19561 12.9924 1.88391 14.2724L4.97241 11.8275Z" fill="#FBBC05"/>
                <path d="M10.2 4.44865C11.6033 4.44865 12.8695 4.94865 13.8652 5.89088L16.5125 3.24356C14.7912 1.6359 12.6995 0.707031 10.2 0.707031C6.55432 0.707031 3.36775 2.7115 1.88391 5.63493L4.97241 8.07981C5.72432 5.88206 7.77035 4.44865 10.2 4.44865Z" fill="#EA4335"/>
              </svg>
              Google Account
            </div>
          )}
          
          {user?.provider === "guest" && (
            <div className="mt-2 bg-gray-100 px-3 py-1 rounded-full text-xs">
              Guest Account
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm space-y-4 mb-6">
          <h3 className="font-semibold text-lg">App Settings</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-gray-500">Use dark theme</p>
            </div>
            <Switch 
              checked={isDarkMode}
              onCheckedChange={toggleDarkMode}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifications</p>
              <p className="text-sm text-gray-500">Enable task reminders</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sound Effects</p>
              <p className="text-sm text-gray-500">Play sounds for actions</p>
            </div>
            <Switch />
          </div>
        </div>
        
        <Button 
          variant="destructive" 
          className="w-full mb-8"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
