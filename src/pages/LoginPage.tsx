import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import Logo from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, googleLogin, continueAsGuest } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      
      toast.success("Logged in successfully", {
        description: "Welcome back to FlowTask!"
      });
      
      navigate("/home");
    } catch (error) {
      toast.error("Login failed", {
        description: "Please check your credentials and try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      await googleLogin();
      
      toast.success("Logged in with Google successfully", {
        description: "Welcome to FlowTask!"
      });
      
      navigate("/home");
    } catch (error) {
      toast.error("Google login failed", {
        description: "An error occurred during Google login."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    continueAsGuest();
    toast("Continuing as guest", {
      description: "You can create an account anytime to save your data."
    });
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <Logo className="h-10 w-10 mr-2" />
            <h1 className="text-3xl font-bold text-taskease-purple">FlowTask</h1>
          </div>
          <p className="text-gray-600 mt-2">Log in to manage your tasks</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-taskease-purple hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-taskease-purple hover:bg-taskease-deep-purple"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <Button 
            type="button" 
            variant="outline"
            className="w-full mb-4 flex items-center justify-center gap-2"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M19.0801 10.2034C19.0801 9.54771 19.0213 8.91731 18.9128 8.30811H10.2V11.9624H15.1744C14.9269 13.1218 14.2672 14.1231 13.2944 14.7784V17.1484H16.2856C18.0554 15.5079 19.0801 13.0877 19.0801 10.2034Z"
                fill="#4285F4"
              />
              <path
                d="M10.2 19.2003C12.7 19.2003 14.7955 18.3715 16.2856 17.1484L13.2944 14.7784C12.4574 15.3352 11.3863 15.6527 10.2 15.6527C7.77035 15.6527 5.72432 14.0253 4.97241 11.8275H1.88391V14.2724C3.36775 17.1959 6.55432 19.2003 10.2 19.2003Z"
                fill="#34A853"
              />
              <path
                d="M4.97241 11.8275C4.76126 11.2708 4.64568 10.6693 4.64568 10.0508C4.64568 9.43224 4.76126 8.83081 4.97241 8.27406V5.82919H1.88391C1.19561 7.10916 0.800049 8.5409 0.800049 10.0508C0.800049 11.5607 1.19561 12.9924 1.88391 14.2724L4.97241 11.8275Z"
                fill="#FBBC05"
              />
              <path
                d="M10.2 4.44865C11.6033 4.44865 12.8695 4.94865 13.8652 5.89088L16.5125 3.24356C14.7912 1.6359 12.6995 0.707031 10.2 0.707031C6.55432 0.707031 3.36775 2.7115 1.88391 5.63493L4.97241 8.07981C5.72432 5.88206 7.77035 4.44865 10.2 4.44865Z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-taskease-purple hover:underline font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            className="w-full mb-2"
            onClick={handleGuestLogin}
            disabled={isLoading}
          >
            Continue as Guest
          </Button>
          <p className="text-xs text-gray-500">
            No account required to try the app
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
