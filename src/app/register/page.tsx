"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { User, Mail, Lock, Loader2 } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh bg-transparent relative px-4">
      {/* Removed glass background for enterprise solid look */}
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-border bg-card rounded-3xl overflow-hidden p-2 hover-card-effect">
          <CardHeader className="space-y-2 text-center pb-6 pt-8">
            <CardTitle className="text-3xl font-extrabold text-[#0A1F44] tracking-tight">Create Account</CardTitle>
            <CardDescription className="text-muted-foreground font-semibold">Join the enterprise platform</CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Full Name Input */}
              <div className="space-y-2.5">
                <Label htmlFor="name" className="text-sm font-bold text-foreground">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                    className="h-12 pl-12 bg-background border border-border focus-visible:ring-[#0057D9] focus-visible:border-[#0057D9] rounded-xl"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-sm font-bold text-foreground">Work Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="h-12 pl-12 bg-background border border-border focus-visible:ring-[#0057D9] focus-visible:border-[#0057D9] rounded-xl"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2.5">
                <Label htmlFor="password" className="text-sm font-bold text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    className="h-12 pl-12 bg-background border border-border focus-visible:ring-[#0057D9] focus-visible:border-[#0057D9] rounded-xl"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-bold bg-[#0057D9] hover:bg-[#2563EB] text-white shadow-lg hover:shadow-[#0057D9]/15 transition-all hover:scale-[1.02] duration-300 rounded-xl" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Register"
                )}
              </Button>

            </form>

            <div className="mt-6 text-center text-sm font-semibold text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-[#0057D9] hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
