"use client";

import { useEffect } from "react";
import { authStore } from "@/lib/authStore";

export default function AuthProvider({ children }) {

  useEffect(() => {
    authStore.init();
  }, []);

  return children;
}