"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // EMAIL LOGIN
  const handleLogin = async () => {

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/dashboard";
  };

  // SIGNUP
  const handleSignup = async () => {

    const { error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created!");
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {

    const { error } =
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:3000",
        },
      });

    if (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-10 max-w-md mx-auto">

      <h1 className="text-3xl font-bold text-center">
        Login
      </h1>

      {/* EMAIL */}
      <input
        className="border p-2 rounded"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* PASSWORD */}
      <input
        className="border p-2 rounded"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* EMAIL LOGIN */}
      <button
        className="bg-black text-white p-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>

      {/* SIGNUP */}
      <button
        className="border p-2 rounded"
        onClick={handleSignup}
      >
        Create Account
      </button>

      {/* DIVIDER */}
      <div className="text-center text-gray-500">
        OR
      </div>

      {/* GOOGLE LOGIN */}
      <button
        className="border p-2 rounded flex items-center justify-center gap-2"
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </button>

    </div>
  );
}