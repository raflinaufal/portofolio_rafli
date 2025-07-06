"use client";
import { useState } from "react";

export default function TestLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Test Login Form</h1>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email:
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
              className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          
          <div className="p-4 bg-card border rounded-md">
            <p className="text-sm text-muted-foreground">Email: {email}</p>
            <p className="text-sm text-muted-foreground">Password: {password}</p>
            <p className="text-sm text-muted-foreground mt-2">Form is working correctly!</p>
          </div>
        </form>
      </div>
    </div>
  );
} 